/**
 * WebSocket 通信工具类
 * 功能：心跳检测、自动重连、消息队列
 * 适配后端MMS WebSocket协议
 */

import type { WSConfig, WSMessage } from '@/types/chat'

type MessageHandler = (message: any) => void
type ErrorHandler = (error: Event) => void
type StatusChangeHandler = (status: 'connecting' | 'connected' | 'disconnected' | 'reconnecting') => void

// 后端指令枚举（与后端CmdEnum对应）
const CMD = {
    SYS_PING: 0,           // 心跳
    SUCCEED: 1,            // 连接成功
    USER_LIST: 100001,     // 获取用户列表
    SEND_MSG: 100002       // 发送消息
}

// 字符串指令（与后端SocketConstant对应）
const CMD_STR = {
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
    JOIN_GROUP: 'join_group',
    LEAVE_GROUP: 'leave_group',
    GET_ONLINE_USERS: 'get_online_users',
    SEND_PRIVATE_MSG: 'send_private_msg',
    SEND_GROUP_MSG: 'send_group_msg'
}

export class WebSocketClient {
    private ws: WebSocket | null = null
    private config: Required<WSConfig>
    private messageHandlers: Set<MessageHandler> = new Set()
    private errorHandlers: Set<ErrorHandler> = new Set()
    private statusHandlers: Set<StatusChangeHandler> = new Set()

    // 心跳相关
    private heartbeatTimer: ReturnType<typeof setTimeout> | null = null
    private heartbeatTimeoutTimer: ReturnType<typeof setTimeout> | null = null
    private lastHeartbeatTime: number = 0

    // 重连相关
    private reconnectTimer: ReturnType<typeof setTimeout> | null = null
    private reconnectCount: number = 0
    private isManualClose: boolean = false

    // 消息队列（连接断开时缓存消息）
    private messageQueue: WSMessage[] = []
    private maxQueueSize: number = 100

    // 连接状态
    private status: 'connecting' | 'connected' | 'disconnected' | 'reconnecting' = 'disconnected'

    constructor(config: WSConfig) {
        this.config = {
            url: config.url,
            heartbeatInterval: config.heartbeatInterval || 30000,
            reconnectInterval: config.reconnectInterval || 5000,
            reconnectAttempts: config.reconnectAttempts || 5,
            token: config.token || ''
        }
    }

    /**
     * 连接 WebSocket
     */
    connect(): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('[WebSocket] 已经连接')
            return
        }
        // 防止并发：若正在连接中，忽略本次调用，避免多连接
        if (this.status === 'connecting') {
            console.log('[WebSocket] 已在连接中，跳过重复调用')
            return
        }

        // 若已有连接中/关闭中的旧连接，先关闭再新建，避免多连接
        if (this.ws) {
            this.ws.onopen = null
            this.ws.onclose = null
            this.ws.onerror = null
            this.ws.onmessage = null
            this.ws.close()
            this.ws = null
        }

        this.isManualClose = false
        this.setStatus('connecting')

        try {
            // 构建连接URL（携带token）
            const url = this.config.token
                ? `${this.config.url}?token=${this.config.token}`
                : this.config.url

            this.ws = new WebSocket(url)
            this.ws.onopen = this.onOpen.bind(this)
            this.ws.onmessage = this.onMessage.bind(this)
            this.ws.onerror = this.onError.bind(this)
            this.ws.onclose = this.onClose.bind(this)

            console.log('[WebSocket] 正在连接...', url)
        } catch (error) {
            console.error('[WebSocket] 连接失败:', error)
            this.handleReconnect()
        }
    }

    /**
     * 断开连接
     */
    disconnect(): void {
        this.isManualClose = true
        this.clearTimers()

        if (this.ws) {
            this.ws.close()
            this.ws = null
        }

        this.setStatus('disconnected')
        console.log('[WebSocket] 已断开连接')
    }

    /**
     * 发送消息
     */
    send(message: WSMessage): boolean {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('[WebSocket] 连接未就绪，消息已加入队列')
            this.addToQueue(message)
            return false
        }

        try {
            const data = JSON.stringify(message)
            this.ws.send(data)
            console.log('[WebSocket] 发送消息:', message)
            return true
        } catch (error) {
            console.error('[WebSocket] 发送消息失败:', error)
            this.addToQueue(message)
            return false
        }
    }
    
    /**
     * 发送私聊消息（适配后端协议）
     * @param messageId 客户端生成的消息ID，后端会使用此ID保存，便于撤回时匹配
     */
    sendPrivateMessage(receiverId: string, content: any, contentType: string = 'text', conversationId?: string, messageId?: string): boolean {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('[WebSocket] 连接未就绪')
            return false
        }
        
        const messageData: Record<string, any> = {
            receiverId,
            content: typeof content === 'string' ? content : JSON.stringify(content),
            contentType
        }
        
        if (conversationId) messageData.conversationId = conversationId
        if (messageId) messageData.messageId = messageId
        
        const message = {
            cmd: CMD_STR.SEND_PRIVATE_MSG,
            data: JSON.stringify(messageData)
        }
        
        this.ws.send(JSON.stringify(message))
        return true
    }
    
    /**
     * 发送群聊消息（适配后端协议）
     * @param messageId 客户端生成的消息ID，后端会使用此ID保存，便于撤回时匹配
     */
    sendGroupMessage(chatRoomId: string, content: any, contentType: string = 'text', messageId?: string): boolean {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.warn('[WebSocket] 连接未就绪')
            return false
        }
        
        const messageData: Record<string, any> = {
            chatRoomId,
            content: typeof content === 'string' ? content : JSON.stringify(content),
            contentType
        }
        if (messageId) messageData.messageId = messageId
        
        const message = {
            cmd: CMD_STR.SEND_GROUP_MSG,
            data: JSON.stringify(messageData)
        }
        
        this.ws.send(JSON.stringify(message))
        return true
    }
    
    /**
     * 加入群组（适配后端协议）
     */
    joinGroup(chatRoomId: string): boolean {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            return false
        }
        
        const message = {
            cmd: CMD_STR.JOIN_GROUP,
            data: JSON.stringify({ chatRoomId })
        }
        
        this.ws.send(JSON.stringify(message))
        return true
    }

    /**
     * 注册消息监听器
     */
    addMessageListener(handler: MessageHandler): () => void {
        this.messageHandlers.add(handler)
        return () => this.messageHandlers.delete(handler)
    }

    /**
     * 注册错误监听器
     */
    addErrorListener(handler: ErrorHandler): () => void {
        this.errorHandlers.add(handler)
        return () => this.errorHandlers.delete(handler)
    }

    /**
     * 注册状态变化监听器
     */
    onStatusChange(handler: StatusChangeHandler): () => void {
        this.statusHandlers.add(handler)
        return () => this.statusHandlers.delete(handler)
    }

    /**
     * 获取当前状态
     */
    getStatus(): string {
        return this.status
    }

    /**
     * 更新Token
     */
    updateToken(token: string): void {
        this.config.token = token
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            // 重新连接以使用新token
            this.disconnect()
            setTimeout(() => this.connect(), 100)
        }
    }

    // ============ 私有方法 ============

    private onOpen(event: Event): void {
        console.log('[WebSocket] 连接成功')
        this.setStatus('connected')
        this.reconnectCount = 0

        // 启动心跳
        this.startHeartbeat()

        // 发送队列中的消息
        this.flushMessageQueue()
    }

    private onMessage(event: MessageEvent): void {
        try {
            const rawData = JSON.parse(event.data)
            console.log('[WebSocket] 收到消息:', rawData)
            
            // 处理后端协议格式 {cmd: number, data: any}
            const message = this.transformMessage(rawData)

            // 处理心跳响应（cmd=0 返回 true）
            if (rawData.cmd === CMD.SYS_PING) {
                this.lastHeartbeatTime = Date.now()
                this.clearHeartbeatTimeout()
                return
            }
            
            // 处理连接成功（cmd=1 返回sessionId），但「私聊消息发送成功」需转给监听器以触发刷新
            if (rawData.cmd === CMD.SUCCEED) {
                const data = rawData.data
                if (data === '私聊消息发送成功' || data === '群聊消息发送成功') {
                    // 发送成功回执，转给 chat store 刷新列表
                    this.messageHandlers.forEach(handler => {
                        try { handler({ cmd: CMD.SUCCEED, data, type: 'send_ack' }) } catch (e) { console.error(e) }
                    })
                    return
                }
                console.log('[WebSocket] 会话ID:', data)
                return
            }

            // 通知所有监听器
            this.messageHandlers.forEach(handler => {
                try {
                    handler(message)
                } catch (error) {
                    console.error('[WebSocket] 消息处理器错误:', error)
                }
            })
        } catch (error) {
            console.error('[WebSocket] 解析消息失败:', error)
        }
    }
    
    /**
     * 将后端消息格式转换为前端格式
     */
    private transformMessage(rawData: any): any {
        // 如果已经是标准格式，直接返回
        if (rawData.messageId || rawData.id) {
            return rawData
        }
        
        // 转换后端格式 {cmd, data} 为前端格式
        return {
            cmd: rawData.cmd,
            data: rawData.data,
            timestamp: Date.now()
        }
    }

    private onError(event: Event): void {
        console.error('[WebSocket] 连接错误:', event)
        this.errorHandlers.forEach(handler => {
            try {
                handler(event)
            } catch (error) {
                console.error('[WebSocket] 错误处理器异常:', error)
            }
        })
    }

    private onClose(event: CloseEvent): void {
        console.log('[WebSocket] 连接关闭:', event.code, event.reason)
        this.clearTimers()
        this.setStatus('disconnected')

        // 非手动关闭则尝试重连
        if (!this.isManualClose) {
            this.handleReconnect()
        }
    }

    /**
     * 启动心跳
     */
    private startHeartbeat(): void {
        this.clearHeartbeatTimer()

        this.heartbeatTimer = setInterval(() => {
            if (this.ws && this.ws.readyState === WebSocket.OPEN) {
                // 后端心跳格式: {cmd: 0, data: "ping"}
                const heartbeatMessage = {
                    cmd: CMD.SYS_PING,
                    data: 'ping'
                }
                this.ws.send(JSON.stringify(heartbeatMessage))

                // 设置心跳超时检测（10秒内未收到响应则认为连接异常）
                this.heartbeatTimeoutTimer = setTimeout(() => {
                    console.warn('[WebSocket] 心跳超时，重新连接')
                    this.disconnect()
                    this.handleReconnect()
                }, 10000)
            }
        }, this.config.heartbeatInterval)
    }

    /**
     * 清除心跳超时定时器
     */
    private clearHeartbeatTimeout(): void {
        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer)
            this.heartbeatTimeoutTimer = null
        }
    }

    /**
     * 清除心跳定时器
     */
    private clearHeartbeatTimer(): void {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer)
            this.heartbeatTimer = null
        }
        this.clearHeartbeatTimeout()
    }

    /**
     * 处理重连
     */
    private handleReconnect(): void {
        if (this.isManualClose) {
            return
        }

        if (this.reconnectCount >= this.config.reconnectAttempts) {
            console.error('[WebSocket] 达到最大重连次数，停止重连')
            this.setStatus('disconnected')
            return
        }

        this.reconnectCount++
        this.setStatus('reconnecting')

        console.log(`[WebSocket] 尝试重连 (${this.reconnectCount}/${this.config.reconnectAttempts})`)

        this.reconnectTimer = setTimeout(() => {
            this.connect()
        }, this.config.reconnectInterval)
    }

    /**
     * 清除所有定时器
     */
    private clearTimers(): void {
        this.clearHeartbeatTimer()

        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer)
            this.reconnectTimer = null
        }
    }

    /**
     * 设置连接状态
     */
    private setStatus(status: 'connecting' | 'connected' | 'disconnected' | 'reconnecting'): void {
        if (this.status !== status) {
            this.status = status
            this.statusHandlers.forEach(handler => {
                try {
                    handler(status)
                } catch (error) {
                    console.error('[WebSocket] 状态处理器错误:', error)
                }
            })
        }
    }

    /**
     * 添加消息到队列
     */
    private addToQueue(message: WSMessage): void {
        // 跳过心跳消息
        if (message.type === 'heartbeat') {
            return
        }

        if (this.messageQueue.length >= this.maxQueueSize) {
            this.messageQueue.shift() // 移除最旧的消息
        }
        this.messageQueue.push(message)
    }

    /**
     * 发送队列中的消息
     */
    private flushMessageQueue(): void {
        if (this.messageQueue.length === 0) {
            return
        }

        console.log(`[WebSocket] 发送队列中的 ${this.messageQueue.length} 条消息`)

        const queue = [...this.messageQueue]
        this.messageQueue = []

        queue.forEach(message => {
            this.send(message)
        })
    }
}

// 创建单例实例
let wsClientInstance: WebSocketClient | null = null

/**
 * 获取 WebSocket 客户端实例
 */
export function getWebSocketClient(config?: WSConfig): WebSocketClient {
    if (!wsClientInstance && config) {
        wsClientInstance = new WebSocketClient(config)
    }

    if (!wsClientInstance) {
        throw new Error('[WebSocket] 请先初始化 WebSocket 客户端')
    }

    return wsClientInstance
}

/**
 * 重置 WebSocket 客户端（用于测试或重新初始化）
 */
export function resetWebSocketClient(): void {
    if (wsClientInstance) {
        wsClientInstance.disconnect()
        wsClientInstance = null
    }
}
