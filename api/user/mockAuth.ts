/**
 * 纯前端演示：无真实会员接口时走模拟登录（与 template06 购物演示等一致）。
 * 关闭：环境变量 `NUXT_PUBLIC_AUTH_MOCK=false`
 */
import type { ApiResponse } from '@/types/request'
import { getLocalStorageItem } from '@/utils/browser'
import type { LoginRequest, LoginResponse, TokenLoginResponse } from './type'

/** 与真实 token 区分，便于 auth 插件识别 */
export const MOCK_AUTH_TOKEN_PREFIX = 'mock-jwt.'

export function isAuthMockEnabled(): boolean {
  if (typeof window === 'undefined') return false
  const v = import.meta.env.NUXT_PUBLIC_AUTH_MOCK as string | undefined
  if (v === 'false' || v === '0') return false
  // 默认模拟登录（纯前端演示）；接真实会员接口时设置 NUXT_PUBLIC_AUTH_MOCK=false
  return true
}

export function isMockAuthToken(token: string | null | undefined): boolean {
  return !!token && token.startsWith(MOCK_AUTH_TOKEN_PREFIX)
}

function mockTokenFromUsername(username: string): string {
  return `${MOCK_AUTH_TOKEN_PREFIX}${encodeURIComponent(username)}`
}

function usernameFromMockToken(token: string): string {
  const rest = token.slice(MOCK_AUTH_TOKEN_PREFIX.length)
  try {
    return decodeURIComponent(rest) || 'demo'
  } catch {
    return 'demo'
  }
}

function buildLoginData(username: string): LoginResponse {
  const u = username.trim() || 'demo'
  const phone = /^1\d{10}$/.test(u) ? u : ''
  return {
    id: `mock-${u}`,
    phone,
    nickname: u,
    headPortrait: '',
    sex: 3,
    birthday: null,
    city: '',
    signature: null,
    level: 1,
    reputationScore: 0,
    memberBgImg: null,
    tags: null,
    invitationCode: null,
    privateKey: null,
    lastLoginIp: '127.0.0.1',
    status: 1,
    sort: 0,
    createdTime: new Date().toISOString(),
    remark: null,
    tenantId: null,
    revision: 0,
    authentication: null,
    payPassword: null,
    password: null,
    account: u,
    wxOpenid: null,
    alipayOpenid: null,
    douyinOpenid: null,
    token: mockTokenFromUsername(u)
  }
}

export function mockPasswordLogin(data: LoginRequest): ApiResponse<LoginResponse> {
  const username = (data.username || '').trim()
  if (!username) {
    return {
      code: 400,
      msg: '请输入账号',
      message: '请输入账号',
      data: null as unknown as LoginResponse
    }
  }
  if (!data.password || data.password.length < 8) {
    return {
      code: 400,
      msg: '密码至少 8 位',
      message: '密码至少 8 位',
      data: null as unknown as LoginResponse
    }
  }
  const user = buildLoginData(username)
  return {
    code: 0,
    msg: 'ok',
    message: 'ok',
    data: user
  }
}

export function mockTokenLoginRequest(): ApiResponse<TokenLoginResponse> {
  const token = getLocalStorageItem('token')
  if (!isMockAuthToken(token)) {
    return {
      code: 401,
      msg: '未登录或 token 无效',
      message: '未登录或 token 无效',
      data: null as unknown as TokenLoginResponse
    }
  }
  const username = usernameFromMockToken(token!)
  const login = buildLoginData(username)
  login.token = token!
  return {
    code: 0,
    msg: 'ok',
    message: 'ok',
    data: login as unknown as TokenLoginResponse
  }
}
