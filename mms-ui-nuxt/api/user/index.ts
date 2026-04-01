import { http } from '@/utils/request'
import type { ApiResponse } from '@/types/request'

import type {
    LoginRequest,
    RegisterRequest,
    SmsLoginRequest,
    SendSmsCodeRequest,
    LoginResponse,
    QrCodePollingRequest,
    QrCodePollingData,
    ServiceQrCodeResponse,
    UpdateMemberRequest,
    TokenLoginResponse
} from './type'

/**
 * 用户密码登录
 * @param data 登录请求参数
 * @returns Promise<ApiResponse<LoginResponse>>
 */
export const login = (data: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return http.post<LoginResponse>('/auth/login', data)
}

/**
 * 会员注册（手机号 + 短信验证码 + 密码）
 * 若实际网关路径不同，请在本处修改。
 */
export const registerMember = (data: RegisterRequest): Promise<ApiResponse<LoginResponse>> => {
    return http.post<LoginResponse>('/login-api/v1/register', data)
}

/**
 * 短信验证码登录
 * @param data 短信登录请求参数
 * @returns Promise<ApiResponse<LoginResponse>>
 */
export const smsLogin = (data: SmsLoginRequest): Promise<ApiResponse<LoginResponse>> => {
    return http.post<LoginResponse>('/login-api/v1/login', data)
}

/**
 * 发送短信验证码
 * @param data 发送短信验证码请求参数
 * @returns Promise<ApiResponse<null>>
 */
export const sendSmsCode = (data: SendSmsCodeRequest): Promise<ApiResponse<null>> => {
    return http.post<null>('/base-api/v1/smsCode', data)
}

/**
 * 用户退出登录
 * @param data 可选参数对象（如果需要传递额外数据）
 * @returns Promise<ApiResponse<null>>
 */
export const logout = (data?: Record<string, any>): Promise<ApiResponse<null>> => {
    return http.post<null>('/login-api/v1/logout', data || {})
}

/**
 * 二维码登录轮询
 * @param data 轮询请求参数（包含 uuid 和可选的 orderNo）
 * @returns Promise<ApiResponse<QrCodePollingData>>
 */
export const qrCodePolling = (data: QrCodePollingRequest): Promise<ApiResponse<QrCodePollingData>> => {
    return http.post<QrCodePollingData>('/login-api/v1/oauth-polling', data)
}

/**
 * 获取服务号登录二维码
 * @param data 可选参数对象（如果需要传递额外数据）
 * @returns Promise<ApiResponse<ServiceQrCodeResponse>>
 */
export const getServiceQrCode = (data?: Record<string, any>): Promise<ApiResponse<ServiceQrCodeResponse>> => {
    return http.post<ServiceQrCodeResponse>('/login-api/v1/oauth-authorize', data || {})
}

/**
 * 更新用户信息
 * @param data 更新用户信息请求参数
 * @returns Promise<ApiResponse<any>>
 */
export const updateMember = (data: UpdateMemberRequest): Promise<ApiResponse<any>> => {
    return http.post<any>('/member-api/v1/updateMember', data)
}

/**
 * Token 自动登录
 * 使用存储的 token 自动登录，token 会自动从 header 中获取
 * @returns Promise<ApiResponse<TokenLoginResponse>>
 */
export const tokenLogin = (): Promise<ApiResponse<TokenLoginResponse>> => {
    return http.get<TokenLoginResponse>('/login-api/v1/tokenLogin')
}

/**
 * 获取用户信息
 * @returns Promise<ApiResponse<any>>
 */
export const getUserInfo = (): Promise<ApiResponse<any>> => {
    return http.get<any>('/member-api/v1/info')
}

/**
 * 重置/找回密码（未登录时用，需输入手机号 - 登录页忘记密码场景）
 * @param data 包含手机号、验证码和新密码的对象
 */
export const resetPassword = (data: { phone: string; smsCode: string; password: string }): Promise<ApiResponse<any>> => {
    return http.post<any>('/login-api/v1/findPassword', data)
}

/**
 * 已登录用户修改密码（验证码发送到绑定手机，不可指定他人手机）
 * @param data 验证码和新密码
 */
export const changePassword = (data: { smsCode: string; password: string }): Promise<ApiResponse<any>> => {
    return http.post<any>('/member-api/v1/changePassword', data)
}

/**
 * 发送修改密码验证码到当前用户绑定手机（需登录）
 */
export const sendPasswordChangeSms = (): Promise<ApiResponse<any>> => {
    return http.post<any>('/member-api/v1/sendPasswordChangeSms')
}

/**
 * 会员实名认证（使用绑定手机号）
 * @param data 认证请求参数
 * @returns Promise<ApiResponse<any>>
 */
export const authenticationWithBoundPhone = (data: { name: string; idNumber: string; code: string }): Promise<ApiResponse<any>> => {
    return http.get<any>('/member-api/v1/authenticationWithBoundPhone', { params: data })
}

/**
 * 发送邮箱验证码
 * @param data 包含类型和邮箱地址的对象
 * @returns Promise<ApiResponse<null>>
 */
export const sendEmailCode = (data: { type: number; email: string }): Promise<ApiResponse<null>> => {
    return http.post<null>('/base-api/v1/sendEmailCode', data)
}

/**
 * 设置邮箱
 * @param params 包含邮箱和验证码的参数
 * @returns Promise<ApiResponse<any>>
 */
export const setEmail = (params: { email: string; code: string }): Promise<ApiResponse<any>> => {
    return http.get<any>('/member-api/v1/setEmail', { params })
}

/**
 * 邮箱密码登录
 * @param data 包含邮箱和密码的对象
 * @returns Promise<ApiResponse<any>>
 */
export const emailLogin = (data: { email: string; password: string }): Promise<ApiResponse<any>> => {
    return http.post<any>('/login-api/v1/accountLogin', data)
}

/**
 * 邮箱重置密码
 * @param data 包含邮箱、验证码和新密码的对象
 * @returns Promise<ApiResponse<any>>
 */
export const resetPasswordByEmail = (data: { email: string; code: string; password: string }): Promise<ApiResponse<any>> => {
    return http.post<any>('/login-api/v1/findPasswordByEmail', data)
}

/** 微信绑定二维码响应 */
export interface WechatBindAuthorizeResponse {
    uuid: string
    url: string
    qrCodeUrl: string
}

/**
 * 获取微信绑定二维码（会员中心-绑定微信，需登录）
 */
export const getWechatBindQrCode = (): Promise<ApiResponse<WechatBindAuthorizeResponse>> => {
    return http.post<WechatBindAuthorizeResponse>('/member-api/v1/wechat/bind/authorize')
}

/**
 * 微信绑定轮询（会员中心-绑定微信）
 * @param uuid 二维码唯一标识
 */
export const wechatBindPolling = (uuid: string): Promise<ApiResponse<string>> => {
    return http.post<string>('/member-api/v1/wechat/bind/polling', { uuid })
}

