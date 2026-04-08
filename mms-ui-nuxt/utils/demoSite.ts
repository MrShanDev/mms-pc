/**
 * 示例站模版：runtimeConfig.public.demoSiteTemplate 或 NUXT_PUBLIC_DEMO_SITE_TEMPLATE
 * （兼容旧环境变量 NUXT_PUBLIC_MCMS_DEMO_TEMPLATE，见 nuxt.config）
 * - 仅接受字面量 `template01` … `template06`（非法值按 {@link DEFAULT_DEMO_SITE_TEMPLATE} 回退）
 * - `template06`：钛业主站（{@link MAIN_SITE_ROUTE_PREFIX}，`pages/template06/`），与 template01～05 **共用同源演示数据**（见 `demoSiteTemplates.ts`）
 * - `template01` … `template05`：示例子站，路由 `/template0X`
 */
export const DEMO_SITE_TEMPLATE_IDS = [
  'template01',
  'template02',
  'template03',
  'template04',
  'template05',
  'template06'
] as const

export type DemoSiteTemplateId = (typeof DEMO_SITE_TEMPLATE_IDS)[number]

/** 与 `demoSiteTemplate` 配置取值一致（含主站 template06） */
export const DEMO_SITE_CONFIG_IDS = DEMO_SITE_TEMPLATE_IDS

export type DemoSiteConfigValue = (typeof DEMO_SITE_CONFIG_IDS)[number]

/** 与 `nuxt.config.ts` 中 `runtimeConfig.public.demoSiteTemplate` 默认值保持一致 */
export const DEFAULT_DEMO_SITE_TEMPLATE: DemoSiteConfigValue = 'template02'

export type DemoSiteMainPortal = Extract<DemoSiteConfigValue, 'template06'>

export function isDemoSiteTemplateId(v: unknown): v is DemoSiteTemplateId {
  return DEMO_SITE_TEMPLATE_IDS.includes(v as DemoSiteTemplateId)
}

export function isDemoSiteConfigValue(v: unknown): v is DemoSiteConfigValue {
  return typeof v === 'string' && (DEMO_SITE_CONFIG_IDS as readonly string[]).includes(v)
}

export function parseDemoSiteTemplate(v: unknown): DemoSiteConfigValue {
  if (isDemoSiteConfigValue(v)) return v
  return DEFAULT_DEMO_SITE_TEMPLATE
}

export function isDemoSiteMainPortal(v: unknown): boolean {
  return parseDemoSiteTemplate(v) === 'template06'
}

/** 主站（template06）URL 前缀 */
export const MAIN_SITE_ROUTE_PREFIX = '/template06' as const

/** 是否为登录页路径（含根路径 `/login`） */
export function isAuthLoginRoutePath(path: string): boolean {
  const p = (path.split('?')[0]?.split('#')[0] || '').trim()
  return p === '/login' || p === `${MAIN_SITE_ROUTE_PREFIX}/login`
}

const LEGACY_BARE_SITE_PREFIXES = ['/about', '/news', '/contact', '/product'] as const

/** `/about` 等未带模版前缀的路径（仅 template06 下由中间件改写到 {@link MAIN_SITE_ROUTE_PREFIX}） */
export function isLegacyOffSitePath(path: string): boolean {
  return LEGACY_BARE_SITE_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
}

export interface DemoNavItem {
  label: string
  to?: string
  hash?: string
  children?: DemoNavItem[]
}

/** 新闻中心子栏目（template01 等对演示站） */
export type DemoNewsCategoryKey = 'company' | 'industry' | 'faq'

export interface DemoNewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  bodyParagraphs?: string[]
  category?: DemoNewsCategoryKey
}

/** 新闻列表侧栏子栏目（与演示数据 `newsPage.subTabs` 对齐） */
export interface DemoNewsSubTab {
  query: string
  category: DemoNewsCategoryKey
  label: string
}

export interface DemoProductTile {
  title: string
  image: string
  caption?: string
}

export interface DemoSlide {
  title: string
  subtitle?: string
  image: string
}

export interface DemoProductCategory {
  id: string
  label: string
  slug: string
}

export interface DemoProductMediaEntry {
  title: string
  description?: string
  images?: string[]
  cta?: { label: string; href: string }
}

export interface DemoProductDetail {
  id: string
  slug: string
  categoryId: string
  title: string
  subtitle?: string
  image: string
  gallery?: string[]
  summary?: string
  detailParagraphs?: string[]
  specs: { label: string; value: string }[]
  moq: string
  leadTime: string
  mediaEntries?: DemoProductMediaEntry[]
}

export interface DemoProductCatalog {
  pageTitle: string
  pageLead?: string
  categories: DemoProductCategory[]
  products: DemoProductDetail[]
}

export interface DemoPrivacySection {
  heading: string
  paragraphs: string[]
}

export interface DemoTemplateContent {
  id: DemoSiteTemplateId
  referenceUrl: string
  siteTitle: string
  siteTitleEn?: string
  metaTitle: string
  metaDescription: string
  nav: DemoNavItem[]
  footerCopyright: string
  techSupport?: string
  aboutPage: {
    kicker: string
    title: string
    lead: string
    paragraphs: string[]
    image: string
    cta?: string
    trustBlocks?: { title: string; paragraphs: string[]; image?: string }[]
  }
  newsPage: { title: string; items: DemoNewsItem[]; subTabs?: DemoNewsSubTab[] }
  contactPage: {
    title: string
    email: string
    phones: string[]
    address?: string
    links?: { label: string; href: string }[]
    extra?: string
    whatsapp?: string
    whatsappHref?: string
    formIntro?: string
    bannerImage?: string
    bannerLead?: string
    wechatQrImage?: string
    wechatLine?: string
  }
  home: Record<string, unknown>
  productCatalog?: DemoProductCatalog
  privacyPage?: {
    title: string
    updatedAt?: string
    sections: DemoPrivacySection[]
  }
  faqPage?: {
    title: string
    intro?: string
    items: { q: string; a: string }[]
  }
  casesPage?: {
    title: string
    intro?: string
    items: { title: string; excerpt: string; client?: string; image?: string }[]
  }
}
