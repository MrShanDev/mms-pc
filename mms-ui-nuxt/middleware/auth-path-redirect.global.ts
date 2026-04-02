import { OFF_SITE_ROUTE_PREFIX } from '@/utils/mcmsDemo'

/** 认证相关页面仅保留在 `pages/off/`，旧根路径重定向（需在 auth.global 之前执行） */
const AUTH_LEGACY: Record<string, string> = {
  '/login': `${OFF_SITE_ROUTE_PREFIX}/login`,
  '/register': `${OFF_SITE_ROUTE_PREFIX}/register`,
  '/forgot-password': `${OFF_SITE_ROUTE_PREFIX}/forgot-password`
}

export default defineNuxtRouteMiddleware((to) => {
  const target = AUTH_LEGACY[to.path]
  if (!target) return
  return navigateTo({ path: target, query: to.query, hash: to.hash }, { replace: true })
})
