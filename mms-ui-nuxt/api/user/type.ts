/**
 * 用户相关类型定义
 */

// 登录请求
export interface LoginRequest {
    username: string
    password: string
}

// 注册请求（字段名需与后端 /login-api/v1/register 一致时可再调整）
export interface RegisterRequest {
    phone: string
    smsCode: string
    password: string
    /** 登录账号，可与手机号相同或由后端分配 */
    account?: string
    /** 显示昵称 / 联系人 */
    nickname?: string
    /** 企业注册扩展（若后端支持） */
    companyName?: string
    companyAddress?: string
}

// 短信验证码登录请求
export interface SmsLoginRequest {
    phone: string
    smsCode: string
    invitationCode?: string
}

// 发送短信验证码请求
export interface SendSmsCodeRequest {
    phone: string
    type: number  // 验证码类型：1-注册 2-登录 3-修改密码 4-支付密码 5-更换手机号 6-实名认证 7-验证当前账号手机号安全 8-支付密码设置/修改
}

// 二维码登录轮询请求
export interface QrCodePollingRequest {
    uuid: string
    orderNo?: string
}

// 获取服务号登录二维码响应（后端返回 url 与 qrCodeUrl，dev 下 url 为占位）
export interface ServiceQrCodeResponse {
    uuid: string
    url?: string
    qrCodeUrl?: string  // 与 url 同值；prod 为微信二维码图片 URL
}

// 更新用户信息请求
export interface UpdateMemberRequest {
    type: number  // 更新类型：1:手机号 2:密码 3:昵称 4:头像 5:性别 6:账号 7:生日 8:背景图 9:支付密码 10:QQ 11:联系手机
    memberId?: string  // 用户ID（后端可从token获取）
    nickname?: string  // 昵称
    account?: string  // 账号
    sex?: number  // 性别
    phone?: string  // 手机号（type=1更换手机用，个人资料页不可修改）
    qq?: string  // 联系QQ
    contactPhone?: string  // 联系手机（可与账号登录手机号不同）
    password?: string  // 密码
    payPassword?: string  // 支付密码 type=9
    headPortrait?: string  // 头像
    smsCode?: string  // 短信验证码（新手机号）
    oldSmsCode?: string  // 原手机号验证码（更换场景必传）
    birthday?: string  // 生日
    memberBgImg?: string  // 背景图
}

// 实名认证信息
export interface Authentication {
    pageSize: number
    pageNum: number
    orderByColumn: string
    isAsc: string
    status: number
    sort: number
    remark: string
    tenantId: string
    revision: number
    createdBy: number
    createdTime: string
    updatedBy: number
    updatedTime: string
    id: string
    memberId: string
    name: string
    number: string
    phone: string
    imageFront: string
    imageBack: string
    businessLicense: string
    sex: string
    address: string
    nationality: string
}

// 二维码登录轮询响应数据
export interface QrCodePollingData {
    sort: number
    createdTime: string
    remark: string
    status: number
    tenantId: string
    revision: number
    id: string
    nickname: string
    account: string
    sex: number
    phone: string
    password: string
    headPortrait: string
    birthday: string
    wxOpenid: string
    reputationScore: number
    level: number
    invitationCode: string
    payPassword: string
    privateKey: string
    alipayOpenid: string
    douyinOpenid: string
    lastLoginIp: string
    authentication: Authentication | null
    token: string
    city: string
    signature: string
    tags: string
    memberBgImg: string
}

// Token 自动登录响应（与 QrCodePollingData 结构相同）
export interface TokenLoginResponse {
    sort: number
    createdTime: string
    remark: string
    status: number
    tenantId: string
    revision: number
    id: string
    nickname: string
    account: string
    sex: number
    phone: string
    password: string
    headPortrait: string
    birthday: string
    wxOpenid: string
    reputationScore: number
    level: number
    invitationCode: string
    payPassword: string
    privateKey: string
    alipayOpenid: string
    douyinOpenid: string
    lastLoginIp: string
    authentication: Authentication | null
    token: string
    city: string
    signature: string
    tags: string
    memberBgImg: string
}

// 登录响应
export interface LoginResponse {
    id: string
    phone: string
    nickname: string
    headPortrait: string
    sex: number  // 性别：1-男，2-女，3-未知
    birthday: string | null
    city: string
    signature: string | null
    level: number
    reputationScore: number
    memberBgImg: string | null
    tags: string | null
    invitationCode: string | null
    privateKey: string | null
    lastLoginIp: string
    status: number
    sort: number
    createdTime: string
    remark: string | null
    tenantId: string | null
    revision: number
    authentication: string | null
    payPassword: string | null
    password: string | null
    account: string | null
    wxOpenid: string | null
    alipayOpenid: string | null
    douyinOpenid: string | null
    token: string
}

// 用户信息（Store中使用）
export interface UserInfo {
    id: string
    phone: string
    qq?: string | null  // 联系QQ
    contactPhone?: string | null  // 联系手机（可与账号登录手机号不同）
    nickname: string
    headPortrait: string
    sex: number
    birthday: string | null
    city: string
    signature: string | null
    level: number
    reputationScore: number
    memberBgImg: string | null
    tags: string | null
    invitationCode: string | null
    privateKey: string | null
    lastLoginIp: string
    status: number
    sort: number
    createdTime: string
    remark: string | null
    tenantId: string | null
    revision: number
    authentication: string | null
    hasAuthentication: boolean | null  // 是否已完成认证（实名或实人认证）
    hasEmail: boolean | null  // 是否已绑定邮箱
    hasPhone: boolean | null  // 是否已绑定手机号
    hasPassword: boolean | null  // 是否已设置密码
    hasPayPassword?: boolean | null  // 是否已设置支付密码
    payPassword: string | null
    password: string | null
    account: string | null
    wxOpenid: string | null
    alipayOpenid: string | null
    douyinOpenid: string | null
    email?: string | null
    roles?: string[]
    permissions?: string[]
}