import { computed, watch } from 'vue'
import type { SiteLocaleCode } from '@/i18n/available-locales'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

/**
 * 在官方 @nuxtjs/i18n 之上保留项目惯用 API：
 * `setLocale`、`t(path, params?)`、`headerText`
 *
 * 演示模版 template01～template06 页面应与 template06 一致：用本 composable 取 `t` / `locale`，
 * 站点 SEO 文案使用根级键 `about` / `news` / `contact` / `product` / `meta.homeDesc` 等（见 zh.json / en.json），
 * 正文仍来自 `DEMO_SITE_TEMPLATES` 同源数据。
 */
export function useAppLocale() {
  const { locale, setLocale: i18nSetLocale, t: i18nT } = useI18n()

  const setLocale = (code: SiteLocaleCode) => {
    void i18nSetLocale(code)
  }

  const t = (key: string, params?: Record<string, string>) => i18nT(key, params ?? {}) as string

  const headerText = computed(() => ({
    companyLine: t('header.companyLine'),
    login: t('header.login'),
    signUp: t('header.signUp'),
    logOut: t('header.logOut'),
    logoutConfirm: t('header.logoutConfirm'),
    logoutConfirmTitle: t('header.logoutConfirmTitle'),
    ok: t('header.ok'),
    cancel: t('header.cancel'),
    loggedOut: t('header.loggedOut')
  }))

  if (import.meta.client) {
    watch(
      locale,
      (v) => {
        document.documentElement.lang = getLocaleLanguage(v)
        document.documentElement.dir = getLocaleDir(v)
      },
      { immediate: true }
    )
  }

  return { locale, setLocale, t, headerText }
}
