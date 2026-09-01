import { computed, watch } from 'vue'
import type { SiteLocaleCode } from '@/i18n/available-locales'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

/**
 * 在官方 @nuxtjs/i18n 之上保留项目惯用 API：
 * `setLocale`、`t(path, params?)`、`headerText`
 *
 * **接口字段 vs i18n** 以 `docs/demo-site-api.md` 为准：`DemoTemplateContent` 中的数据直接展示；仅文档未覆盖的 UI 文案用 `t()`（见 `i18n/CONVENTIONS.md`）。
 * 语言切换：`DemoLocaleSwitch`（`aria-label` → `header.langSelect`）。
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
