import { computed } from 'vue'
import { fetchDemoSiteNavigation } from '@/api/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { buildTemplate06NavDto, type Template06NavDto } from '@/utils/template06Nav'

const NAV_KEY = 'demo-site-navigation-template06'

/**
 * template06 主导航：统一走 {@link fetchDemoSiteNavigation}（与演示站点内容同源）。
 * 请求失败或未就绪时回退为本地 `DEMO_SITE_TEMPLATES.template06` 构建结果。
 */
export function useTemplate06Navigation() {
  const { data, error, status } = useAsyncData(NAV_KEY, () => fetchDemoSiteNavigation('template06'))

  const navDto = computed<Template06NavDto>(() => {
    if (data.value && !error.value) return data.value
    return buildTemplate06NavDto(DEMO_SITE_TEMPLATES.template06)
  })

  return { navDto, status, error }
}
