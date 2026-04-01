import { defineNuxtPlugin } from 'nuxt/app'
import { useUserStore } from '@/stores/user'
import { getLocalStorageItem, safeLocalStorage } from '@/utils/browser'
import { tokenLogin } from '@/api/user'

/**
 * 认证初始化判断函数
 * 检查响应是否表示认证成功
 */
function isAuthSuccess(response: any): boolean {
    return response &&
        (response.code === 0 || (response.code === 200 && response.status === true)) &&
        response.data
}

/**
 * 认证错误判断函数
 * 检查响应是否表示认证错误（token 无效）
 */
function isAuthError(response: any): boolean {
    // 401: 未授权
    // 403: 禁止访问（后端 tokenLogin 接口返回此错误码表示"请先登录"）
    // 4001: Sa-Token 特定的未登录错误码
    // 200 且 status: false: 业务失败
    // 500: 服务器错误（可能是 token 校验异常）
    return response?.code === 401 ||
        response?.code === 403 ||
        response?.code === 4001 ||
        (response?.code === 200 && response?.status === false) ||
        response?.code === 500
}

/**
 * 处理登录成功
 */
function handleLoginSuccess(userStore: any, userData: any) {
    console.log('[Auth Init] 登录成功，用户ID:', userData.id)

    // 将 TokenLoginResponse 格式转换为 UserInfo 格式
    const userInfo: any = {
        ...userData,
        authentication: userData.authentication ? JSON.stringify(userData.authentication) : null,
        birthday: userData.birthday || null,
        signature: userData.signature || null,
        memberBgImg: userData.memberBgImg || null,
        tags: userData.tags || null,
        remark: userData.remark || null,
        tenantId: userData.tenantId || null
    }

    userStore.setUser(userInfo)

    // 更新 localStorage 中的 token（如果服务器返回了新 token）
    if (userData.token) {
        const storage = safeLocalStorage()
        if (storage) {
            storage.setItem('token', userData.token)
        }
    }

    console.log('[Auth Init] 用户信息已更新')
}

/**
 * 处理登录失败 - 清除无效的登录状态
 */
function handleLoginFailure(userStore: any) {
    console.log('[Auth Init] Token 已失效，清除登录状态')
    userStore.logout()

    const storage = safeLocalStorage()
    if (storage) {
        storage.removeItem('token')
        storage.removeItem('userInfo')
        storage.removeItem('permissions')
        storage.removeItem('roles')
    }
}

export default defineNuxtPlugin(async (nuxtApp: any) => {
    console.log('[Auth Init] 插件开始执行')
    const userStore = useUserStore()

    // 检查是否有 token
    const token = getLocalStorageItem('token')
    console.log('[Auth Init] token:', token ? '存在' : '不存在')
    console.log('[Auth Init] userStore.user:', userStore.user ? '存在' : '不存在')
    console.log('[Auth Init] userStore.isLoggedIn:', userStore.isLoggedIn)

    // 如果没有 token，确保清除所有登录状态
    if (!token) {
        if (userStore.isLoggedIn || userStore.user) {
            console.log('[Auth Init] 没有 token 但有登录状态，清除无效状态')
            handleLoginFailure(userStore)
        } else {
            console.log('[Auth Init] 用户未登录，跳过验证')
        }
        return
    }

    // 有 token，需要验证其有效性
    // 关键改动：无论本地是否有用户信息，都要验证 token 有效性
    // 这样可以确保页面显示的登录状态与后端一致
    console.log('[Auth Init] 开始验证 Token 有效性...')
    try {
        const response = await tokenLogin()
        console.log('[Auth Init] tokenLogin 响应:', response?.code, response?.status)

        if (isAuthSuccess(response)) {
            handleLoginSuccess(userStore, response.data)
        } else if (isAuthError(response)) {
            // Token 无效，清除登录状态
            handleLoginFailure(userStore)
        } else {
            // 其他未知情况，保守处理：保持当前状态但记录警告
            console.warn('[Auth Init] 未知的响应状态:', response)

            // 如果本地有用户信息，初始化聊天模块
            if (userStore.isLoggedIn && userStore.user) {
                const chatStore = useChatStore()
                chatStore.initChat(
                    String(userStore.user.id),
                    userStore.user.nickname || '',
                    userStore.user.headPortrait || ''
                )
            }
        }
    } catch (error) {
        // 网络错误或其他异常
        const errorMessage = error instanceof Error ? error.message : String(error)
        console.error('[Auth Init] tokenLogin 异常:', errorMessage)

        // 检查是否是认证相关错误
        if (errorMessage.includes('401') ||
            errorMessage.includes('Unauthorized') ||
            errorMessage.includes('token') ||
            errorMessage.includes('登录')) {
            handleLoginFailure(userStore)
        } else {
            // 网络错误等，保持当前状态，等待下次验证
            console.log('[Auth Init] 网络错误，保持当前登录状态')
        }
    }
})