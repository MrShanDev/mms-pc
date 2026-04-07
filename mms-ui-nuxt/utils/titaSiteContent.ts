/**
 * 主站（template06）与多页共用的 **类型**、canonical、备案链接等。
 * 业务展示数据与 template01～05 同源，见 `DEMO_SITE_TEMPLATES.template06`（`useTitaSite`、`template06ViewModel.ts`）。
 */

export interface ShowcaseProduct {
  title: string
  image: string
  /** 与 `DemoProductDetail` 一致，用于详情/加购 */
  id: string
  slug: string
  categoryId: string
}

export interface ProductCategoryDetail {
  id: string
  label: string
  intro: string
  products: ShowcaseProduct[]
}

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  body?: string
}

/** 备案公示（演示站）；正文与公司信息来自 `demoSiteTemplates` */
export const icpRecordHref = 'http://beian.miit.gov.cn/'
export const icpRecordText = '陕ICP备2026001012号'

export function useTitaCanonical(path: string) {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const link = base ? [{ rel: 'canonical', href: `${base}${path === '/' ? '/' : path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return { link, og }
}
