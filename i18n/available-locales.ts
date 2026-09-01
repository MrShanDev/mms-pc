/**
 * 与 nuxt.config 中 i18n.locales 保持一致（模块的 lazy file 路径相对于 i18n/）
 * 接口字段与 i18n 划分：见项目根 `docs/demo-site-api.md` 与 `i18n/CONVENTIONS.md`
 */
export const availableLocales = [
  { code: 'zh', language: 'zh-CN', name: '简体中文', file: 'zh.json' },
  { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
  { code: 'ja', language: 'ja-JP', name: '日本語', file: 'ja.json' },
  { code: 'ko', language: 'ko-KR', name: '한국어', file: 'ko.json' },
  { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
  { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
  { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
  { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' }
] as const

export type SiteLocaleCode = (typeof availableLocales)[number]['code']

export type AppLocale = SiteLocaleCode

export function getLocaleLanguage(code: string): string {
  const row = availableLocales.find((l) => l.code === code)
  return (row?.language ?? 'en-US') as string
}

export function getLocaleDir(code: string): 'ltr' | 'rtl' {
  const row = availableLocales.find((l) => l.code === code)
  return row && 'dir' in row && (row as { dir?: string }).dir === 'rtl' ? 'rtl' : 'ltr'
}

/** 顶栏/调试：是否支持的语言代码 */
export function isSupportedLocale(code: string): code is SiteLocaleCode {
  return availableLocales.some((l) => l.code === code)
}
