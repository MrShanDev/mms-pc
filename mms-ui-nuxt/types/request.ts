// 定义通用响应格式
export interface ApiResponse<T = any> {
    code: number
    msg: string
    message: string
    data: T
    total?: number
    rows?: T[]
    isSecurity?: boolean
    status?: boolean  // 用于二维码轮询等场景
}

// 定义 HTTP 状态码枚举
export enum HttpStatus {
    SUCCESS = 200,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    ERROR = 500
}

// 定义请求配置接口
export interface RequestConfig {
    // 是否需要防止数据重复提交
    isRepeatSubmit?: boolean
    // 是否需要加密
    isEncrypt?: boolean
    // 是否显示加载状态
    showLoading?: boolean
    // 超时时间
    timeout?: number
    // 请求头
    headers?: Record<string, string>
    // 查询参数
    params?: Record<string, any>
    // 请求体
    data?: any
    // 国际化语言
    lang?: string
    // 加密类型
    encryptType?: string
    // 加密状态
    encryptState?: string
}

// 定义错误类型
export class ApiError extends Error {
    constructor(
        public status: number,
        public code: number,
        message: string,
        public data?: any
    ) {
        super(message)
        this.name = 'ApiError'
    }
}

// 定义 HTTP 方法类型
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'