/**
 * 演示站「整站内容」深拷贝与路径重写：`SITE_DEMO_CONTENT` 来自 template01 源数据，
 * {@link buildDemoContentForTemplate} 将 `/template01` 替换为 `/template0X`。字段定义见 `docs/demo-site-api.md`。
 */
import type { DemoSiteTemplateId, DemoTemplateContent } from '@/utils/demoSite'
import { TEMPLATE01_DEMO_SITE_CONTENT } from '@/utils/template01MingsoftMock'

export const SITE_DEMO_CONTENT: DemoTemplateContent = TEMPLATE01_DEMO_SITE_CONTENT

function rewriteTemplatePaths<T>(content: T, fromPrefix: string, toPrefix: string): T {
  if (content === null || content === undefined) return content
  if (typeof content === 'string') {
    return content.split(fromPrefix).join(toPrefix) as T
  }
  if (Array.isArray(content)) {
    return content.map((x) => rewriteTemplatePaths(x, fromPrefix, toPrefix)) as T
  }
  if (typeof content === 'object') {
    const o = content as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const k of Object.keys(o)) {
      out[k] = rewriteTemplatePaths(o[k], fromPrefix, toPrefix)
    }
    return out as T
  }
  return content
}

/**
 * 基于 template01 演示数据生成指定模版的内容：除 `id` 与站内路径前缀外结构一致，
 * 便于多模版共用同一套 CMS/接口字段。
 */
export function buildDemoContentForTemplate(id: DemoSiteTemplateId): DemoTemplateContent {
  const base = JSON.parse(JSON.stringify(SITE_DEMO_CONTENT)) as DemoTemplateContent
  const from = '/template01'
  const to = `/${id}`
  const merged = rewriteTemplatePaths(base, from, to)
  merged.id = id
  return merged
}
