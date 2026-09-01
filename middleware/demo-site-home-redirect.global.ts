import {
  isLegacyOffSitePath,
  isDemoSiteMainPortal,
  parseDemoSiteTemplate,
  MAIN_SITE_ROUTE_PREFIX
} from '@/utils/demoSite'

/**
 * 首页与主站路径统一：
 * - 示例子站模版：`/` → `/{id}`（如 /template01）
 * - 主站 template06：`/` → `/template06`；`/about` 等 → `/template06/about`…
 * - 兼容旧 URL：`/off`、`/mcms/...` → 新路径（`/mcms` 为历史前缀，仅用于跳转兼容）
 */
export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const template = config.public.demoSiteTemplate

  if (to.path === '/off' || to.path.startsWith('/off/')) {
    const path = to.path.replace(/^\/off(\/|$)/, '/template06$1') || '/template06'
    if (path !== to.path) {
      return navigateTo({ path, query: to.query, hash: to.hash }, { replace: true })
    }
  }

  if (to.path === '/mcms' || to.path.startsWith('/mcms/')) {
    const stripped = to.path.replace(/^\/mcms(\/|$)/, '/')
    const path = stripped === '' ? '/' : stripped
    return navigateTo({ path, query: to.query, hash: to.hash }, { replace: true })
  }

  if (isDemoSiteMainPortal(template)) {
    if (to.path === MAIN_SITE_ROUTE_PREFIX || to.path.startsWith(`${MAIN_SITE_ROUTE_PREFIX}/`)) {
      return
    }
    if (to.path === '/') {
      return navigateTo(MAIN_SITE_ROUTE_PREFIX, { replace: true })
    }
    if (isLegacyOffSitePath(to.path)) {
      return navigateTo(`${MAIN_SITE_ROUTE_PREFIX}${to.path}`, { replace: true })
    }
    return
  }

  const id = parseDemoSiteTemplate(template)
  if (id === 'template06') {
    return
  }
  if (to.path === '/') {
    return navigateTo(`/${id}`, { replace: true })
  }
})
