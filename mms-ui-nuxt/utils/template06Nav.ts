/**
 * template06 顶栏导航 DTO：由演示站 `nav` 与产品分类拼装，
 * 供 `buildTemplate06NavDto`、`api/demoSite.fetchDemoSiteNavigation` 使用。
 */
import type { DemoNavItem, DemoTemplateContent } from '@/utils/demoSite'
import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'

/** 与 `useTemplate06Routes().home` 等一致 */
const BASE = MAIN_SITE_ROUTE_PREFIX

function normPath(p?: string): string {
  if (!p) return ''
  return p.replace(/\/$/, '') || '/'
}

function pickNavLabel(
  c: DemoTemplateContent,
  role: 'home' | 'product' | 'about' | 'news' | 'contact',
  fallback: string
): string {
  const testers: Record<typeof role, (n: DemoNavItem) => boolean> = {
    home: (n) => {
      const p = normPath(n.to)
      return p === BASE || p === `${BASE}/`
    },
    product: (n) => /\bproducts?\b/i.test(n.to || '') || (n.to || '').includes(`${BASE}/product`),
    about: (n) => (n.to || '').includes('/about'),
    news: (n) => (n.to || '').includes('/news'),
    contact: (n) => (n.to || '').includes('/contact')
  }
  return c.nav.find(testers[role])?.label?.trim() || fallback
}

export type Template06NavProductChild = {
  /** `el-menu-item` 的 index：路由 path 或 `pc-{categoryId}` */
  index: string
  /** `null` 表示「全部品类」，由页面 i18n 渲染 */
  label: string | null
}

export type Template06NavEntry =
  | {
      kind: 'product'
      label: string
      submenuIndex: 'product'
      children: Template06NavProductChild[]
    }
  | {
      kind: 'link'
      label: string
      index: string
    }

export interface Template06NavDto {
  /** 与当前主导航顺序一致：产品下拉 → 首页 → 关于 → 新闻 → 联系 */
  entries: Template06NavEntry[]
}

/**
 * 由站点演示内容（或接口返回的同构 JSON）生成 template06 主导航。
 * 文案来自 `content.nav`；产品子类来自 `productCatalog`。
 */
export function buildTemplate06NavDto(c: DemoTemplateContent): Template06NavDto {
  const productPath = `${BASE}/product`
  const categories =
    c.productCatalog?.categories.map((cat) => ({
      index: `pc-${cat.id}`,
      label: cat.label
    })) ?? []

  const entries: Template06NavEntry[] = [
    {
      kind: 'product',
      label: pickNavLabel(c, 'product', '产品中心'),
      submenuIndex: 'product',
      children: [{ index: productPath, label: null }, ...categories]
    },
    {
      kind: 'link',
      label: pickNavLabel(c, 'home', '首页'),
      index: BASE
    },
    {
      kind: 'link',
      label: pickNavLabel(c, 'about', '公司简介'),
      index: `${BASE}/about`
    },
    {
      kind: 'link',
      label: pickNavLabel(c, 'news', '新闻中心'),
      index: `${BASE}/news`
    },
    {
      kind: 'link',
      label: pickNavLabel(c, 'contact', '联系我们'),
      index: `${BASE}/contact`
    }
  ]

  return { entries }
}
