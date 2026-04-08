/**
 * 六套演示模版整站内容表：`DEMO_SITE_TEMPLATES.template0X` 与 `api/demoSite` 同源；
 * 由 `SITE_DEMO_CONTENT` 经 `buildDemoContentForTemplate` 仅替换 `id` 与 `/template01` → `/template0X`。
 */
import type { DemoSiteTemplateId, DemoTemplateContent } from '@/utils/demoSite'
import { buildDemoContentForTemplate } from '@/utils/demoSiteContent'

export const DEMO_SITE_TEMPLATES: Record<DemoSiteTemplateId, DemoTemplateContent> = {
  template01: buildDemoContentForTemplate('template01'),
  template02: buildDemoContentForTemplate('template02'),
  template03: buildDemoContentForTemplate('template03'),
  template04: buildDemoContentForTemplate('template04'),
  template05: buildDemoContentForTemplate('template05'),
  template06: buildDemoContentForTemplate('template06')
}
