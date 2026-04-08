import type { DemoNewsCategoryKey, DemoNewsSubTab, DemoTemplateContent } from '@/utils/demoSite'

export function demoNewsSubTabs(C: DemoTemplateContent): DemoNewsSubTab[] {
  return C.newsPage.subTabs ?? []
}

export function demoNewsTabLabelByQuery(C: DemoTemplateContent, query: string | undefined): string {
  if (!query) return C.newsPage.title
  const tab = demoNewsSubTabs(C).find((t) => t.query === query)
  return tab?.label ?? C.newsPage.title
}

/** 稿件分类对应的子栏目（e7/e9 详情页标题、面包屑） */
export function demoNewsSubTabForCategory(
  C: DemoTemplateContent,
  category: DemoNewsCategoryKey | undefined
): DemoNewsSubTab | undefined {
  if (!category) return undefined
  return demoNewsSubTabs(C).find((t) => t.category === category)
}

export function demoNewsQueryIsValid(C: DemoTemplateContent, q: string | undefined): boolean {
  if (!q) return false
  return demoNewsSubTabs(C).some((t) => t.query === q)
}

export function demoNewsCategoryForQuery(
  C: DemoTemplateContent,
  query: string
): DemoNewsCategoryKey | null | undefined {
  return demoNewsSubTabs(C).find((t) => t.query === query)?.category ?? undefined
}
