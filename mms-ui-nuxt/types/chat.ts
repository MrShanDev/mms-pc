/**
 * 聊天系统类型定义
 */

// 消息类型枚举
export enum MessageType {
    TEXT = 'text',           // 文字消息
    EMOJI = 'emoji',         // 表情
    IMAGE = 'image',         // 图片
    VOICE = 'voice',         // 语音
    VIDEO = 'video',         // 视频
    SYSTEM = 'system',       // 系统通知
    ORDER = 'order',         // 订单消息
    TRANSFER = 'transfer',   // 账号转移
    FORM = 'form',           // 交易表单
    BARGAIN_OFFER = 'bargain_offer',     // 买家出价
    BARGAIN_COUNTER = 'bargain_counter', // 卖家还价
    ORDER_CONFIRM = 'order_confirm',     // 订单确认卡片
    PRODUCT_CARD = 'product_card',       // 商品卡片
    BARGAIN_REQUEST = 'bargain_request'  // 砍价请求
}

// 会话分类
export type ConversationCategory = 'all' | 'bargain' | 'private' | 'group'

// 会话标签类型
export type ConversationTagType = 'official' | 'presale' | 'trade' | 'friend' | 'buyer' | 'seller'

// 发送者角色枚举
export enum SenderRole {
    USER = 'user',           // 普通用户
    CUSTOMER_SERVICE = 'customer_service', // 客服
    SYSTEM = 'system'        // 系统
}

// 会话类型枚举
export enum ConversationType {
    PRIVATE = 'private',     // 私聊
    GROUP = 'group',         // 群聊
    BARGAIN = 'bargain'      // 砍价
}

// 消息发送状态
export enum MessageStatus {
    SENDING = 'sending',     // 发送中
    SUCCESS = 'success',    // 发送成功
    FAILED = 'failed',      // 发送失败
    RECALL = 'recall'       // 已撤回
}

// WebSocket 消息类型
export enum WSMessageType {
    HEARTBEAT = 'heartbeat',           // 心跳
    HEARTBEAT_RESPONSE = 'heartbeat_response', // 心跳响应
    CHAT_MESSAGE = 'chat_message',     // 聊天消息
    READ_RECEIPT = 'read_receipt',     // 已读回执
    TYPING = 'typing',                 // 正在输入
    ONLINE_STATUS = 'online_status',   // 在线状态
    ERROR = 'error'                    // 错误消息
}

// 基础消息接口
export interface BaseMessage {
    id: string                          // 消息ID
    conversationId: string              // 会话ID
    senderId: string                    // 发送者ID
    senderName: string                  // 发送者昵称
    senderAvatar?: string               // 发送者头像
    senderRole: SenderRole              // 发送者角色
    messageType: MessageType            // 消息类型
    content: any                        // 消息内容
    timestamp: number                   // 时间戳
    status?: MessageStatus              // 消息状态
    isRead?: boolean                    // 是否已读
}

// 文字消息
export interface TextMessage extends BaseMessage {
    messageType: MessageType.TEXT
    content: string
}

// 表情消息
export interface EmojiMessage extends BaseMessage {
    messageType: MessageType.EMOJI
    content: {
        emoji: string                     // 表情符号或表情包URL
        text?: string                     // 表情对应文字
    }
}

// 图片消息
export interface ImageMessage extends BaseMessage {
    messageType: MessageType.IMAGE
    content: {
        url: string                       // 图片URL
        thumbnail?: string                // 缩略图
        width?: number
        height?: number
        size?: number                     // 文件大小(字节)
    }
}

// 语音消息
export interface VoiceMessage extends BaseMessage {
    messageType: MessageType.VOICE
    content: {
        url: string                       // 语音URL
        duration: number                  // 时长(秒)
        size?: number
    }
}

// 视频消息
export interface VideoMessage extends BaseMessage {
    messageType: MessageType.VIDEO
    content: {
        url: string                       // 视频URL
        thumbnail?: string                // 视频封面
        duration: number                  // 时长(秒)
        width?: number
        height?: number
        size?: number
    }
}

// 系统通知消息
export interface SystemMessage extends BaseMessage {
    messageType: MessageType.SYSTEM
    senderRole: SenderRole.SYSTEM
    content: {
        text: string                      // 通知内容
        type?: 'info' | 'warning' | 'success' | 'error'
    }
}

// 订单消息
export interface OrderMessage extends BaseMessage {
    messageType: MessageType.ORDER
    content: {
        orderId: string                   // 订单ID
        orderNo: string                   // 订单号
        productName: string               // 商品名称
        price: number                     // 价格
        status: string                    // 订单状态
        createTime: number                // 创建时间
        action?: string                   // 操作按钮文字
        actionUrl?: string                // 操作链接
    }
}

// 账号转移消息
export interface TransferMessage extends BaseMessage {
    messageType: MessageType.TRANSFER
    content: {
        accountId: string                 // 账号ID
        accountName: string               // 账号名称
        fromUser: string                  // 转出用户
        toUser: string                    // 转入用户
        status: 'pending' | 'completed' | 'failed'
        transferTime?: number             // 转移时间
        remark?: string                   // 备注
    }
}

// 交易表单消息
export interface FormMessage extends BaseMessage {
    messageType: MessageType.FORM
    content: {
        formId: string                    // 表单ID
        title: string                     // 表单标题
        fields: Array<{                   // 表单字段
            name: string
            label: string
            type: 'text' | 'number' | 'select' | 'textarea'
            required: boolean
            options?: Array<{ label: string, value: any }>
            value?: any
        }>
        submitUrl: string                 // 提交接口
        status?: 'pending' | 'submitted' | 'expired'
    }
}

// 砍价商品信息（消息体携带，不依赖缓存）
export interface BargainProductInfo {
    productId: string
    productName?: string
    productImage?: string
    originalPrice?: number
}

// 买家出价消息
export interface BargainOfferMessage extends BaseMessage {
    messageType: MessageType.BARGAIN_OFFER
    content: {
        price: number                     // 出价金额
        description?: string              // 出价说明
        canModify?: boolean               // 是否可修改
        productInfo?: BargainProductInfo  // 商品信息（消息体携带）
    }
}

// 卖家还价消息
export interface BargainCounterMessage extends BaseMessage {
    messageType: MessageType.BARGAIN_COUNTER
    content: {
        price: number                     // 还价金额
        description?: string              // 还价说明
        canBuy?: boolean                  // 是否可立即购买
        canOffer?: boolean                // 是否可继续出价
        productInfo?: BargainProductInfo  // 商品信息（消息体携带）
        originalPrice?: number            // 商品原价（便于展示）
    }
}

// 订单确认卡片消息
export interface OrderConfirmMessage extends BaseMessage {
    messageType: MessageType.ORDER_CONFIRM
    content: {
        title: string                     // 标题
        sellMode: string                  // 出售模式
        sellPrice: number                 // 出售价格
        platformFee: number               // 平台费用
        mentionUser?: string              // @用户
    }
}

// 商品卡片消息
export interface ProductCardMessage extends BaseMessage {
    messageType: MessageType.PRODUCT_CARD
    content: {
        productId: string                 // 商品ID
        productName: string               // 商品名称
        productImage?: string             // 商品图片
        price: number                     // 商品价格
    }
}

// 砍价请求消息（客服可见）
export interface BargainRequestMessage extends BaseMessage {
    messageType: MessageType.BARGAIN_REQUEST
    content: {
        productId: string                 // 商品ID
        productName: string               // 商品名称
        productImage?: string             // 商品图片
        originalPrice: number             // 原价
        offerPrice?: number               // 出价（买家填写）
    }
}

// 消息联合类型
export type ChatMessage =
    | TextMessage
    | EmojiMessage
    | ImageMessage
    | VoiceMessage
    | VideoMessage
    | SystemMessage
    | OrderMessage
    | TransferMessage
    | FormMessage
    | BargainOfferMessage
    | BargainCounterMessage
    | OrderConfirmMessage
    | ProductCardMessage
    | BargainRequestMessage

// 会话信息
export interface Conversation {
    id: string                          // 会话ID
    type: ConversationType              // 会话类型
    name: string                        // 会话名称
    avatar?: string                     // 会话头像
    lastMessage?: ChatMessage           // 最后一条消息
    unreadCount: number                 // 未读数量
    timestamp: number                   // 最后消息时间
    members?: Array<{                   // 群聊成员
        userId: string
        userName: string
        avatar?: string
        role?: SenderRole
    }>
    isPinned?: boolean                  // 是否置顶
    isMuted?: boolean                   // 是否免打扰
    tag?: string                        // 标签文字（如：官方、密友、交易群）
    tagType?: ConversationTagType       // 标签类型
    onlineStatus?: string               // 在线状态描述
    serviceTime?: string                // 服务时间
    isMuted2?: boolean                  // 群禁言
    // 砍价相关
    bargainInfo?: {
        productId: string               // 商品ID
        productName: string             // 商品名称
        productImage?: string           // 商品图片
        productDesc?: string            // 商品描述（如：王者荣耀-苹果微信 | 可二次实名 | 无防沉迷）
        originalPrice: number           // 原价
        currentOffer?: number           // 当前出价
        sellerName?: string             // 卖家名称
    }
}

// WebSocket 消息格式
export interface WSMessage {
    type: WSMessageType                 // WebSocket消息类型
    data?: any                          // 消息数据
    timestamp: number                   // 时间戳
    messageId?: string                  // 消息ID（用于回执）
}

// WebSocket 连接配置
export interface WSConfig {
    url: string                         // WebSocket地址
    heartbeatInterval?: number          // 心跳间隔(ms)，默认30000
    reconnectInterval?: number          // 重连间隔(ms)，默认5000
    reconnectAttempts?: number          // 最大重连次数，默认5
    token?: string                      // 认证token
}

// 文件上传响应
export interface UploadResponse {
    success: boolean
    url: string                         // 文件访问URL
    thumbnail?: string                  // 缩略图URL
    fileName?: string                   // 文件名
    fileSize?: number                   // 文件大小
    duration?: number                   // 媒体时长
    width?: number                      // 图片/视频宽度
    height?: number                     // 图片/视频高度
}

// 发送消息参数（简化版，用于 sendMessage 方法）
export interface SendMessageParams {
    conversationId: string              // 会话ID
    senderRole?: SenderRole             // 发送者角色，默认 user
    messageType?: MessageType           // 消息类型，默认 text
    content: any                        // 消息内容
}
