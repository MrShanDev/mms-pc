import { computed } from 'vue'
import {
  APP_THEMES,
  DEFAULT_THEME_ID,
  type AppThemeId,
  isValidTheme
} from '@/themes/available-themes'

const COOKIE_KEY = 'app-theme'

/** 网站模版（视觉主题）：持久化 Cookie，与语言切换相互独立 */
export function useAppTheme() {
  const cookie = useCookie<AppThemeId>(COOKIE_KEY, {
    default: () => DEFAULT_THEME_ID,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax'
  })

  const theme = computed<AppThemeId>({
    get() {
      const v = cookie.value
      return isValidTheme(v) ? v : DEFAULT_THEME_ID
    },
    set(v: AppThemeId) {
      if (isValidTheme(v)) cookie.value = v
    }
  })

  function setTheme(id: AppThemeId) {
    if (isValidTheme(id)) cookie.value = id
  }

  return { theme, setTheme, themes: APP_THEMES }
}
