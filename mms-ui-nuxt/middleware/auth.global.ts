/**
 * 全局认证中间件 - 前置守卫
 * 检查用户登录状态、权限验证等
 * 
 * 注意：token 有效性验证已在 plugins/auth-init.client.ts 中完成
 * 这里主要处理路由级别的认证检查
 */
import { useUserStore } from '@/stores/user'
import { getLocalStorageItem } from '@/utils/browser'
import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'

const OFF_AUTH_PATHS = [
  `${MAIN_SITE_ROUTE_PREFIX}/login`,
  `${MAIN_SITE_ROUTE_PREFIX}/register`,
  `${MAIN_SITE_ROUTE_PREFIX}/forgot-password`
]

const offAuthPathSet = new Set(OFF_AUTH_PATHS)

export default defineNuxtRouteMiddleware(async (to, from) => {
    const userStore = useUserStore()
    const token = userStore.token || getLocalStorageItem('token')

    // 检查是否需要登录才能访问该路由
    const requiresAuth = to.meta.requiresAuth === true

    // 检查是否有特定权限要求
    const requiredPermissions = (to.meta.permissions as string[]) || []

    // 如果需要认证但没有用户信息（token无效或不存在）
    if (requiresAuth && (!userStore.user || !userStore.isLoggedIn)) {
        // 保存当前路由以便登录后返回
        const redirect = encodeURIComponent(to.fullPath)

        return navigateTo(`${MAIN_SITE_ROUTE_PREFIX}/login?redirect=${redirect}`)
    }

    // 已登录用户无需再进入登录/注册/找回密码页
    if ((userStore.user || userStore.isLoggedIn) && offAuthPathSet.has(to.path)) {
        const redirectUrl = (to.query.redirect as string) || '/'
        try {
            return navigateTo(decodeURIComponent(redirectUrl))
        } catch {
            return navigateTo('/')
        }
    }

    // 权限验证
    if (requiredPermissions.length > 0 && userStore.user) {
        const userPermissions = userStore.user.permissions || []

        const hasPermission = requiredPermissions.some(permission =>
            userPermissions.includes(permission)
        )

        if (!hasPermission) {
            return navigateTo('/unauthorized')
        }
    }

    // 设置页面标题（site.name 来自 nuxt.config.ts 的 runtimeConfig.public.site）
    if (to.meta.title) {
        const config = useRuntimeConfig()
        const siteName = config.public?.site?.name || 'Nuxt App'
        const pageTitle = typeof to.meta.title === 'function'
            ? to.meta.title(to)
            : to.meta.title

        useHead({
            title: `${pageTitle} - ${siteName}`
        })
    }
})