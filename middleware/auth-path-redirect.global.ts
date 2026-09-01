import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'

/** 认证相关页面在 `pages/template06/`，旧根路径重定向（需在 auth.global 之前执行） */
const AUTH_LEGACY: Record<string, string> = {
  '/login': `${MAIN_SITE_ROUTE_PREFIX}/login`,
  '/register': `${MAIN_SITE_ROUTE_PREFIX}/register`,
  '/forgot-password': `${MAIN_SITE_ROUTE_PREFIX}/forgot-password`
}

export default defineNuxtRouteMiddleware((to) => {
  const target = AUTH_LEGACY[to.path]
  if (!target) return
  return navigateTo({ path: target, query: to.query, hash: to.hash }, { replace: true })
})
