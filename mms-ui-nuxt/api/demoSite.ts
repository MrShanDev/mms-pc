import type { DemoNewsItem, DemoProductDetail, DemoSiteTemplateId, DemoTemplateContent } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import type { Template06NavDto } from '@/utils/template06Nav'
import { buildTemplate06NavDto } from '@/utils/template06Nav'

/** 模拟网络延迟（毫秒），上线对接真实接口时可移除 */
const MOCK_DELAY_MS = 0

function delay(ms: number): Promise<void> {
  return ms > 0 ? new Promise((r) => setTimeout(r, ms)) : Promise.resolve()
}

/** 同步读取当前构建的演示站内容（与页面内 DEMO_SITE_TEMPLATES 一致） */
export function getDemoSiteContentSync(id: DemoSiteTemplateId): DemoTemplateContent {
  return DEMO_SITE_TEMPLATES[id]
}

/**
 * 异步获取站点内容（未来可替换为 `GET /api/site/:templateId`）。
 * 当前实现返回与 template01 同构的 mock，仅路由前缀不同；字段定义见 `docs/demo-site-api.md`。
 */
export async function fetchDemoSiteContent(id: DemoSiteTemplateId): Promise<DemoTemplateContent> {
  await delay(MOCK_DELAY_MS)
  return getDemoSiteContentSync(id)
}

/**
 * 主站（template06）顶部主导航：与 {@link fetchDemoSiteContent} 同源，由站点内容 + 产品分类拼装。
 * 上线可替换为 `GET /api/site/:templateId/navigation` 或合并进站点详情接口的 `nav` 字段。
 */
export async function fetchDemoSiteNavigation(id: DemoSiteTemplateId): Promise<Template06NavDto> {
  await delay(MOCK_DELAY_MS)
  const c = getDemoSiteContentSync(id)
  return buildTemplate06NavDto(c)
}

/** 新闻列表（列表页 / 分类筛选可在此扩展 query） */
export async function fetchDemoNewsList(
  id: DemoSiteTemplateId
): Promise<{ title: string; items: DemoNewsItem[] }> {
  await delay(MOCK_DELAY_MS)
  const c = getDemoSiteContentSync(id)
  return { title: c.newsPage.title, items: c.newsPage.items }
}

/** 单篇新闻 */
export async function fetchDemoNewsById(
  id: DemoSiteTemplateId,
  newsId: string
): Promise<DemoNewsItem | undefined> {
  await delay(MOCK_DELAY_MS)
  return getDemoSiteContentSync(id).newsPage.items.find((n) => n.id === newsId)
}

/** 产品目录（含分类与全部产品） */
export async function fetchDemoProductCatalog(id: DemoSiteTemplateId) {
  await delay(MOCK_DELAY_MS)
  const c = getDemoSiteContentSync(id)
  return c.productCatalog ?? null
}

/** 单个产品详情 */
export async function fetchDemoProductBySlug(
  id: DemoSiteTemplateId,
  slug: string
): Promise<DemoProductDetail | undefined> {
  await delay(MOCK_DELAY_MS)
  const cat = getDemoSiteContentSync(id).productCatalog
  return cat?.products.find((p) => p.slug === slug)
}

/** 联系页与页脚展示用 */
export async function fetchDemoContactPage(id: DemoSiteTemplateId) {
  await delay(MOCK_DELAY_MS)
  return getDemoSiteContentSync(id).contactPage
}
