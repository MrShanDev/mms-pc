import type { RouteLocationRaw } from 'vue-router'

/** 内页 path_bg 面包屑 */
export type E9Crumb = { label: string; to?: RouteLocationRaw }

/** e9.mstore 演示站 News 子栏目（与导航一致） */
export const TEMPLATE04_E9_NEWS_TABS = [
  { query: 'company', label: 'Company dynamics', category: 'company' as const },
  { query: 'industry', label: 'Industry news', category: 'industry' as const },
  { query: 'faq', label: 'Product FAQ', category: null }
] as const
