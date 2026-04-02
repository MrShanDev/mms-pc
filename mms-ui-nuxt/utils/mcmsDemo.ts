/**
 * MCMS / 主站模版切换：runtimeConfig.public.mcmsDemoTemplate 或 NUXT_PUBLIC_MCMS_DEMO_TEMPLATE
 * - `off`：主站钛业门户（路由前缀 {@link OFF_SITE_ROUTE_PREFIX}，`pages/off/`，`components/off/`）
 * - 其余：MCMS 示例子站 id（furniture | apparel | digital | shoes | appliances）
 */
export const MCMS_DEMO_TEMPLATE_IDS = [
  'furniture',
  'apparel',
  'digital',
  'shoes',
  'appliances'
] as const

export type McmsDemoTemplateId = (typeof MCMS_DEMO_TEMPLATE_IDS)[number]

export type McmsDemoConfigValue = 'off' | McmsDemoTemplateId

export function isMcmsDemoTemplateId(v: unknown): v is McmsDemoTemplateId {
  return MCMS_DEMO_TEMPLATE_IDS.includes(v as McmsDemoTemplateId)
}

export function parseMcmsDemoTemplate(v: unknown): McmsDemoConfigValue {
  if (v === 'off' || v === '' || v == null) return 'off'
  if (isMcmsDemoTemplateId(v)) return v
  return 'off'
}

/** 是否为主站钛业模版（未启用 MCMS 示例子路径） */
export function isMcmsDemoOff(v: unknown): boolean {
  return parseMcmsDemoTemplate(v) === 'off'
}

/** 主站页面目录 `pages/off/` 对应的 URL 前缀；`/` 与旧路径会由中间件重定向至此 */
export const OFF_SITE_ROUTE_PREFIX = '/off' as const

/** 是否为登录页路径（含旧 `/login`） */
export function isAuthLoginRoutePath(path: string): boolean {
  const p = (path.split('?')[0]?.split('#')[0] || '').trim()
  return p === '/login' || p === `${OFF_SITE_ROUTE_PREFIX}/login`
}

const LEGACY_OFF_PREFIXES = ['/about', '/news', '/contact', '/product'] as const

/** `/about` 等未带前缀的主站路径（仅 off 模版下由中间件改写） */
export function isLegacyOffSitePath(path: string): boolean {
  return LEGACY_OFF_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))
}

export interface McmsNavItem {
  label: string
  to?: string
  hash?: string
  children?: McmsNavItem[]
}

export interface McmsNewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
}

export interface McmsProductTile {
  title: string
  image: string
  caption?: string
}

export interface McmsSlide {
  title: string
  subtitle?: string
  image: string
}

export interface McmsTemplateContent {
  id: McmsDemoTemplateId
  referenceUrl: string
  siteTitle: string
  siteTitleEn?: string
  metaTitle: string
  metaDescription: string
  nav: McmsNavItem[]
  footerCopyright: string
  techSupport?: string
  aboutPage: {
    kicker: string
    title: string
    lead: string
    paragraphs: string[]
    image: string
    /** 家具模版「了解更多」等 */
    cta?: string
  }
  newsPage: { title: string; items: McmsNewsItem[] }
  contactPage: {
    title: string
    email: string
    phones: string[]
    address?: string
    links?: { label: string; href: string }[]
    extra?: string
  }
  home: Record<string, unknown>
}
