export const DEFAULT_THEME_ID = 'classic' as const

export const APP_THEME_IDS = ['classic', 'modern'] as const

export type AppThemeId = (typeof APP_THEME_IDS)[number]

export function isValidTheme(v: unknown): v is AppThemeId {
  return APP_THEME_IDS.includes(v as AppThemeId)
}

/** 与 i18n `header.themeClassic` / `header.themeModern` 对应 */
export const APP_THEMES: { id: AppThemeId; nameKey: string }[] = [
  { id: 'classic', nameKey: 'header.themeClassic' },
  { id: 'modern', nameKey: 'header.themeModern' }
]
