/**
 * 全站 HTTP 封装（基于 ofetch/axios 风格）：业务 API、上传、客服聊天等请求出口。
 * 基址与环境见 `api/config.ts`；业务模块通过 `import { http } from '@/utils/request'` 调用。
 */
import { $fetch } from 'ofetch'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import * as qs from 'qs'
import type { ApiResponse, RequestConfig, HttpMethod } from '@/types/request'
import { HttpStatus, ApiError } from '@/types/request'
import * as config from '@/api/config'

// ==================== 工具函数 ====================

// 加载实例
let loadingInstance: any = null

// 获取浏览器指纹
const getFingerprint = (): string => {
    // 简化的指纹生成
    return 'fingerprint-' + Math.random().toString(36).substr(2, 9)
}

// 参数转换
const tansParams = (params: Record<string, any>): string => {
    return qs.stringify(params, { allowDots: true })
}

// 加密函数（简化版）
const encrypt = (data: any): string => {
    // 在实际项目中，这里应该实现真正的加密逻辑
    return JSON.stringify(data)
}

// 解密函数（简化版）
const decrypt = (data: any): any => {
    // 在实际项目中，这里应该实现真正的解密逻辑
    return data
}

// 使用函数创建请求实例，以便在运行时获取配置
const createRequestInstance = (baseURL: string) => {
    // 如果 baseURL 为空或者是相对路径，不设置 baseURL，让 processBaseUrl 处理
    const fetchConfig: any = {
        timeout: 50000,
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'App-Id': getFingerprint(),
            'Content-Language': 'CN'
        }
    };

    // 只有当 baseURL 是完整的 URL 时才设置
    if (baseURL && (baseURL.startsWith('http://') || baseURL.startsWith('https://'))) {
        fetchConfig.baseURL = baseURL;
    }

    return $fetch.create(fetchConfig);
};

/** 基础 URL 配置键：appApiUrl=主API，chatApiUrl=客服通信(mi) */
type BaseUrlConfigKey = 'appApiUrl' | 'chatApiUrl'

// 请求客户端类
export class HttpClient {
    private baseUrl: string
    private defaultTimeout: number
    private requestInstance: any
    private baseUrlConfigKey: BaseUrlConfigKey

    constructor(
        baseUrl: string,
        defaultTimeout: number = 50000,
        baseUrlConfigKey: BaseUrlConfigKey = 'appApiUrl'
    ) {
        this.baseUrl = baseUrl
        this.defaultTimeout = defaultTimeout
        this.baseUrlConfigKey = baseUrlConfigKey
        this.requestInstance = createRequestInstance(this.baseUrl);
    }

    // ==================== 配置管理 ====================

    // 更新 baseUrl 的方法
    setBaseUrl(newBaseUrl: string): void {
        this.baseUrl = newBaseUrl
        // 重新创建实例以使用新的基础 URL
        this.requestInstance = createRequestInstance(this.baseUrl);
    }

    // 合并配置
    private mergeConfig(config: RequestConfig = {}): RequestConfig {
        return {
            isRepeatSubmit: false,
            isEncrypt: false,
            showLoading: false,
            timeout: this.defaultTimeout,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'App-Id': getFingerprint(),
                'Content-Language': 'CN',
                ...config.headers
            },
            ...config
        }
    }

    // ==================== URL 和参数处理 ====================

    // 处理基础路径，类似于 getEnv 的逻辑
    private processBaseUrl(url: string): string {
        // 如果 URL 已经是完整 URL，则直接返回
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }

        // 尝试获取运行时配置中的基础 API URL（appApiUrl 或 chatApiUrl）
        let effectiveBaseUrl = this.baseUrl;
        try {
            effectiveBaseUrl = (config.apiConfig as Record<string, string>)[this.baseUrlConfigKey] ?? this.baseUrl;
        } catch (e) {
            // 如果无法获取运行时配置，则使用默认的 baseUrl
            console.warn('Could not access runtime config, using default base URL');
        }

        // 确保 effectiveBaseUrl 末尾没有斜杠，url 开头有斜杠
        effectiveBaseUrl = effectiveBaseUrl.replace(/\/$/, '');

        // 如果 URL 以 / 开头，拼接基础 URL
        if (url.startsWith('/')) {
            return effectiveBaseUrl + url;
        }

        // 否则拼接基础 URL 和路径
        return `${effectiveBaseUrl}/${url}`;
    }

    // 构建完整 URL
    private buildUrl(url: string, params?: Record<string, any>): string {
        // 处理基础路径，类似于 getEnv 的逻辑
        let fullUrl = this.processBaseUrl(url);

        // 追加时间戳，防止GET请求缓存
        const timestamp = new Date().getTime()
        if (params) {
            params.t = timestamp
        } else {
            params = { t: timestamp }
        }

        if (params) {
            const queryString = tansParams(params)
            if (queryString) {
                fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString
            }
        }

        return fullUrl
    }

    // ==================== 请求处理 ====================

    // 添加认证头
    private addAuthHeader(headers: Record<string, string>): Record<string, string> {
        // 从 localStorage 获取 token
        const token = localStorage.getItem('token')
        if (token) {
            return {
                ...headers,
                'Authorization': `${token}`
            }
        }
        return headers
    }

    // 显示加载状态
    private showLoading() {
        if (loadingInstance) {
            loadingInstance.close()
        }
        loadingInstance = ElLoading.service({
            text: '加载中请稍候...',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }

    // 关闭加载状态
    private closeLoading() {
        if (loadingInstance) {
            loadingInstance.close()
            loadingInstance = null
        }
    }

    // 发送请求
    async request<T = any>(
        url: string,
        method: HttpMethod = 'GET',
        config: RequestConfig = {}
    ): Promise<ApiResponse<T>> {
        const mergedConfig = this.mergeConfig(config)

        // 显示加载状态
        if (mergedConfig.showLoading) {
            this.showLoading()
        }

        // 构建 URL 和参数
        let fullUrl = this.processBaseUrl(url);
        let body = mergedConfig.data

        // 构建完整请求URL
        let requestUrl = fullUrl.startsWith('http') ? fullUrl : `${this.baseUrl}${fullUrl}`;

        // 在浏览器环境中，构建完整URL
        if (typeof window !== 'undefined' && !requestUrl.startsWith('http')) {
            // 确保路径之间只有一个斜杠
            const cleanPath = requestUrl.startsWith('/') ? requestUrl : `/${requestUrl}`;
            requestUrl = `${window.location.protocol}//${window.location.host}${cleanPath}`;
        }

        // 重要：对于代理请求，我们不应构建完整URL，而是使用相对路径让代理处理
        // 因此，我们将 requestUrl 设置回 fullUrl，让代理处理
        requestUrl = fullUrl;

        // 检查是否需要防止重复提交
        const isRepeatSubmit = mergedConfig.headers &&
            Object.keys(mergedConfig.headers).includes('isRepeatSubmit') &&
            mergedConfig.headers['isRepeatSubmit'] === 'true';

        // 检查是否需要加密
        const isEncrypt = mergedConfig.headers &&
            Object.keys(mergedConfig.headers).includes('Encrypt-Type') &&
            mergedConfig.headers['Encrypt-State'] === 'open';

        if (method.toUpperCase() === 'GET') {
            fullUrl = this.buildUrl(url, mergedConfig.params)
        } else {
            // 对于非GET请求，如果有params，也添加到URL中
            if (mergedConfig.params) {
                const queryString = tansParams(mergedConfig.params)
                const separator = url.includes('?') ? '&' : '?'
                fullUrl = url + separator + queryString
            } else {
                fullUrl = url
            }
            const isFormData = typeof FormData !== 'undefined' && body instanceof FormData
            // 添加时间戳（multipart 不注入字段，避免破坏 FormData）
            if (!isFormData) {
                if (body == null) {
                    body = { t: new Date().getTime() }
                } else if (typeof body === 'object' && body !== null) {
                    ;(body as Record<string, unknown>).t = new Date().getTime()
                }
            }

            // 防止数据重复提交
            if (
                !isFormData &&
                isRepeatSubmit &&
                (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')
            ) {
                if (typeof body === 'object' && body !== null) {
                    ;(body as Record<string, unknown>).nonce = new Date().getTime()
                }
            }

            // 加密处理
            if (isEncrypt && (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT')) {
                if (typeof body === 'object' && body !== null && !isFormData) {
                    body = {
                        appId: mergedConfig.headers?.['App-Id'],
                        data: body,
                        sign: encrypt(body),
                        timestamp: new Date().getTime()
                    }
                } else if (!isFormData) {
                    body = {}
                }
            }
        }

        // 处理请求头
        let headers = { ...mergedConfig.headers }
        headers = this.addAuthHeader(headers)

        const isMultipart =
            typeof FormData !== 'undefined' && mergedConfig.data instanceof FormData
        if (isMultipart) {
            delete (headers as Record<string, string | undefined>)['Content-Type']
        }

        // 处理请求体
        if (method !== 'GET' && method !== 'DELETE' && body && typeof body === 'object') {
            if (typeof FormData !== 'undefined' && body instanceof FormData) {
                // 保持 multipart，由运行时自动带 boundary
            } else {
                body = JSON.stringify(body)
            }
        }

        // 构建完整请求URL
        const fullRequestUrl = this.baseUrl.startsWith('http') ? fullUrl : `${window.location.origin}${fullUrl}`;

        try {
            const response = await this.requestInstance(fullUrl, {
                method,
                headers,
                body: method !== 'GET' && method !== 'DELETE' ? body : undefined,
                timeout: mergedConfig.timeout,
                params: method.toUpperCase() === 'GET' ? undefined : mergedConfig.params
            }) as ApiResponse<T>



            // 关闭加载状态
            if (mergedConfig.showLoading) {
                this.closeLoading()
            }

            // 统一处理响应数据
            if (response && typeof response === 'object' && 'code' in response) {
                const apiResponse = response as ApiResponse<T>

                // 处理特定错误码
                if (apiResponse.code && apiResponse.code !== HttpStatus.SUCCESS) {
                    // token 过期或者账号已在别处登录
                    // 401: 未授权, 403: 禁止访问（后端 tokenLogin 返回此错误表示"请先登录"）, 4001: Sa-Token 未登录错误码
                    if (apiResponse.code === HttpStatus.UNAUTHORIZED || 
                        apiResponse.code === HttpStatus.FORBIDDEN || 
                        apiResponse.code === 4001) {
                        // 清除登录状态
                        try {
                            // 动态导入 userStore 避免循环依赖
                            const { useUserStore } = await import('@/stores/user')
                            const userStore = useUserStore()
                            userStore.logout()
                        } catch (e) {
                            // 如果无法获取 store，手动清除 localStorage
                            console.warn('无法获取 userStore，手动清除 localStorage')
                            if (typeof window !== 'undefined') {
                                localStorage.removeItem('token')
                                localStorage.removeItem('userInfo')
                                localStorage.removeItem('permissions')
                                localStorage.removeItem('roles')
                            }
                        }

                        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                            confirmButtonText: '重新登录',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            window.location.replace("/")
                        }).catch(() => { })

                        throw new ApiError(
                            apiResponse.code,
                            apiResponse.code,
                            '无效的会话，或者会话已过期，请重新登录。',
                            apiResponse.data
                        )
                    }

                    if (apiResponse.code === HttpStatus.NOT_FOUND) {
                        if (!mergedConfig.silentError) {
                            ElMessage({
                                message: '您的请求不存在~',
                                type: 'warning',
                            })
                        }
                        throw new ApiError(
                            HttpStatus.NOT_FOUND,
                            apiResponse.code,
                            '您的请求不存在~',
                            apiResponse.data
                        )
                    }

                    const errorMsg = apiResponse.msg || apiResponse.message || '请求失败'
                    throw new ApiError(
                        200,
                        apiResponse.code,
                        errorMsg,
                        apiResponse.data
                    )
                }

                // 解密处理
                if (apiResponse.hasOwnProperty('isSecurity') && (apiResponse as any)['isSecurity'] === true) {
                    if (apiResponse.data && typeof apiResponse.data === 'object' && (apiResponse.data as any).hasOwnProperty("total")) {
                        const dataObj = apiResponse.data as any;
                        apiResponse.total = Number(dataObj.total);
                        apiResponse.rows = decrypt(dataObj.rows);
                        delete (apiResponse as any).data;
                    } else if (apiResponse.data) {
                        (apiResponse as any).data = decrypt(apiResponse.data);
                    }
                    delete (apiResponse as any).isSecurity;
                }

                return apiResponse
            }

            return response as ApiResponse<T>
        } catch (error: any) {
            console.error('请求错误:', error)

            // 关闭加载状态
            if (mergedConfig.showLoading) {
                this.closeLoading()
            }

            // 处理网络错误（silentError 时后台同步不弹提示，避免打扰用户）
            if (error.name === 'FetchError') {
                if (!mergedConfig.silentError) {
                    if (error.message.indexOf('timeout') !== -1) {
                        ElMessage.error('网络超时')
                    } else if (error.message === 'Network Error') {
                        ElMessage.error('网络连接错误')
                    } else {
                        ElMessage.error('服务没启动 / 接口路径找不到')
                    }
                }

                throw new ApiError(
                    error.statusCode || 500,
                    error.statusCode || 500,
                    error.message || '网络请求失败',
                    null
                )
            }

            throw error
        }
    }

    // ==================== 请求方法 ====================

    // GET 请求
    async get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(url, 'GET', config)
    }

    // POST 请求
    async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(url, 'POST', { ...config, data })
    }

    // PUT 请求
    async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(url, 'PUT', { ...config, data })
    }

    // DELETE 请求
    async delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(url, 'DELETE', config)
    }

    // PATCH 请求
    async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return this.request<T>(url, 'PATCH', { ...config, data })
    }

    // 通用下载方法
    async download(url: string, data: any, fileName?: string): Promise<void> {
        loadingInstance = ElLoading.service({
            text: '正在下载数据，请稍候',
            background: 'rgba(0, 0, 0, 0.7)'
        })

        try {
            const response = await this.post<Blob>(url, data, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            })

            // 模拟文件下载逻辑
            if (response.data) {
                // 文件下载完成
            }

            loadingInstance.close()
        } catch (error) {
            ElMessage.error('下载文件出现错误，请联系管理员！')
            loadingInstance.close()
            throw error
        }
    }
}

// ==================== 工厂函数和导出 ====================

// 工厂函数用于创建 HttpClient 实例
export function createHttpClient(baseUrl: string = '/api', defaultTimeout: number = 50000, baseUrlConfigKey: BaseUrlConfigKey = 'appApiUrl'): HttpClient {
    return new HttpClient(baseUrl, defaultTimeout, baseUrlConfigKey)
}

// 使用 Nuxt 的运行时配置来动态设置基础 URL
const getBaseUrl = (): string => {
    try {
        const fullUrl = config.apiConfig.appApiUrl;
        if (fullUrl && fullUrl !== '') return fullUrl;
    } catch (e) {
        console.warn('Could not access apiConfig, falling back to default');
    }
    return '';
};

const getChatBaseUrl = (): string => {
    try {
        const fullUrl = (config.apiConfig as Record<string, string>).chatApiUrl;
        if (fullUrl && fullUrl !== '') return fullUrl;
    } catch (e) {
        console.warn('Could not access chatApiUrl, falling back to appApiUrl');
    }
    return getBaseUrl();
};

// 延迟初始化 httpClient，确保在正确的上下文中获取运行时配置
let _httpClient: HttpClient;
let _httpChatClient: HttpClient;

export const getHttpClient = (): HttpClient => {
    if (!_httpClient) {
        _httpClient = createHttpClient(getBaseUrl(), 50000, 'appApiUrl');
    }
    return _httpClient;
};

/** 客服通信专用客户端，指向 mms-servers-mi */
export const getHttpChatClient = (): HttpClient => {
    if (!_httpChatClient) {
        _httpChatClient = createHttpClient(getChatBaseUrl(), 50000, 'chatApiUrl');
    }
    return _httpChatClient;
};

// httpClient 导出也需要延迟初始化
export const httpClient = {
    get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().get<T>(url, config);
    },
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().post<T>(url, data, config);
    },
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().put<T>(url, data, config);
    },
    delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().delete<T>(url, config);
    },
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().patch<T>(url, data, config);
    },
    download(url: string, data: any, fileName?: string): Promise<void> {
        return getHttpClient().download(url, data, fileName);
    },
    setBaseUrl(newBaseUrl: string): void {
        getHttpClient().setBaseUrl(newBaseUrl);
    }
};

// 导出便捷方法
export const http = {
    get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().get<T>(url, config);
    },
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().post<T>(url, data, config);
    },
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().put<T>(url, data, config);
    },
    delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().delete<T>(url, config);
    },
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpClient().patch<T>(url, data, config);
    },
    download(url: string, data: any, fileName?: string): Promise<void> {
        return getHttpClient().download(url, data, fileName);
    }
}

// 全局设置基础 URL 的函数
export function setGlobalBaseUrl(newBaseUrl: string): void {
    getHttpClient().setBaseUrl(newBaseUrl)
}

// 提供一个工厂函数，允许在 Nuxt 上下文中创建具有正确配置的客户端
export const createNuxtReadyHttpClient = (runtimeConfig?: any): HttpClient => {
    let baseUrl = '/';

    if (runtimeConfig?.public?.appBaseApi) {
        baseUrl = runtimeConfig.public.appBaseApi;
    } else if (runtimeConfig?.public?.appApiUrl) {
        baseUrl = runtimeConfig.public.appApiUrl;
    } else if (runtimeConfig?.public?.baseUrl) {
        baseUrl = runtimeConfig.public.baseUrl;
    }

    return createHttpClient(baseUrl);
};

/** 客服通信专用 http 客户端（指向 mms-servers-mi：/chat/*、/websocket/*） */
export const httpChatClient = {
    get<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpChatClient().get<T>(url, config);
    },
    post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpChatClient().post<T>(url, data, config);
    },
    put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpChatClient().put<T>(url, data, config);
    },
    delete<T = any>(url: string, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpChatClient().delete<T>(url, config);
    },
    patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
        return getHttpChatClient().patch<T>(url, data, config);
    },
};

export default httpClient