/**
 * template05（e7 风格）内页专用：面包屑类型与新闻子栏目 Tab 常量，与侧栏布局、新闻列表筛选一致。
 */
import type { RouteLocationRaw } from 'vue-router'

/** e7 内页 path_bg 面包屑 */
export type E7Crumb = { label: string; to?: RouteLocationRaw }

/** 与 e7 导航、新闻子栏目一致（与 template04 e9 英文标签相同） */
export const TEMPLATE05_E7_NEWS_TABS = [
  { query: 'company', label: 'Company dynamics', category: 'company' as const },
  { query: 'industry', label: 'Industry news', category: 'industry' as const },
  { query: 'faq', label: 'Product FAQ', category: null }
] as const
