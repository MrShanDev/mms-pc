import type { DemoSiteTemplateId, DemoTemplateContent } from '@/utils/demoSite'
import { buildDemoContentForTemplate } from '@/utils/demoSiteContent'

/**
 * 五套模版（template01～template05）共用同一套通用演示数据：以 template01 的 `SITE_DEMO_CONTENT` 为源，
 * 经 `buildDemoContentForTemplate` 仅替换 `id` 与站内路径前缀（/template01 → /template0X），字段结构一致。
 */
export const DEMO_SITE_TEMPLATES: Record<DemoSiteTemplateId, DemoTemplateContent> = {
  template01: buildDemoContentForTemplate('template01'),
  template02: buildDemoContentForTemplate('template02'),
  template03: buildDemoContentForTemplate('template03'),
  template04: buildDemoContentForTemplate('template04'),
  template05: buildDemoContentForTemplate('template05')
}
