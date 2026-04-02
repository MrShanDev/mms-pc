import {
  isLegacyOffSitePath,
  isMcmsDemoOff,
  OFF_SITE_ROUTE_PREFIX,
  parseMcmsDemoTemplate
} from '@/utils/mcmsDemo'

/**
 * 首页与主站路径统一：
 * - MCMS 模版：`/` → `/mcms/{id}`
 * - 主站 off：`/` → `/off`；`/about` 等旧路径 → `/off/about`…（与 `pages/off/` 一致）
 */
export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig()
  const template = config.public.mcmsDemoTemplate

  if (isMcmsDemoOff(template)) {
    if (to.path === OFF_SITE_ROUTE_PREFIX || to.path.startsWith(`${OFF_SITE_ROUTE_PREFIX}/`)) {
      return
    }
    if (to.path === '/') {
      return navigateTo(OFF_SITE_ROUTE_PREFIX, { replace: true })
    }
    if (isLegacyOffSitePath(to.path)) {
      return navigateTo(`${OFF_SITE_ROUTE_PREFIX}${to.path}`, { replace: true })
    }
    return
  }

  const id = parseMcmsDemoTemplate(template)
  if (to.path === '/') {
    return navigateTo(`/mcms/${id}`, { replace: true })
  }
})
