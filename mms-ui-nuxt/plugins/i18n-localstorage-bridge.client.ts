/**
 * 兼容旧版在 localStorage 中保存的 app-locale，迁移到与模块一致的 Cookie（cookieKey: app-locale）
 */
import { isSupportedLocale } from '@/i18n/available-locales'

export default defineNuxtPlugin({
  name: 'i18n-localstorage-bridge',
  enforce: 'pre',
  setup() {
    if (!import.meta.client) return
    const key = 'app-locale'
    const stored = localStorage.getItem(key)
    if (!stored || !isSupportedLocale(stored)) return
    const hasCookie = document.cookie.split(';').some((c) => c.trim().startsWith(`${key}=`))
    if (hasCookie) return
    document.cookie = `${key}=${stored}; Path=/; Max-Age=31536000; SameSite=Lax`
  }
})
