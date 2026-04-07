import type { DemoTemplateContent } from '@/utils/demoSite'
import type { ProductCategoryDetail, NewsItem, ShowcaseProduct } from '@/utils/titaSiteContent'

/** 主站首页轮播：横幅图 + 标题（优先同索引产品名，其次新闻标题） */
export function buildHeroSlidesFromDemo(c: DemoTemplateContent): { image: string; title: string }[] {
  const home = c.home as { bannerSlides?: { image: string }[] }
  const slides = home.bannerSlides?.length ? home.bannerSlides : [{ image: c.aboutPage.image }]
  const products = c.productCatalog?.products ?? []
  const newsItems = c.newsPage.items
  return slides.map((s, i) => ({
    image: s.image,
    title: products[i]?.title ?? newsItems[i]?.title ?? c.siteTitle
  }))
}

export function buildShowcaseProductsFromDemo(c: DemoTemplateContent): ShowcaseProduct[] {
  const products = c.productCatalog?.products ?? []
  return products.slice(0, 12).map((p) => ({
    title: p.title,
    image: p.image,
    id: p.id,
    slug: p.slug,
    categoryId: p.categoryId
  }))
}

export function buildProductCategoriesDetailedFromDemo(c: DemoTemplateContent): ProductCategoryDetail[] {
  const cat = c.productCatalog
  if (!cat) return []
  return cat.categories.map((row) => ({
    id: row.id,
    label: row.label,
    intro: (cat.pageLead && String(cat.pageLead).trim()) ? cat.pageLead! : row.label,
    products: cat.products
      .filter((p) => p.categoryId === row.id)
      .map((p) => ({
        title: p.title,
        image: p.image,
        id: p.id,
        slug: p.slug,
        categoryId: p.categoryId
      }))
  }))
}

export function buildNewsListFromDemo(c: DemoTemplateContent): NewsItem[] {
  return c.newsPage.items.map((n) => ({
    id: n.id,
    title: n.title,
    excerpt: n.excerpt,
    date: n.date,
    image: n.image,
    body: n.bodyParagraphs?.join('\n\n')
  }))
}

export function buildNavProductCategoriesFromDemo(c: DemoTemplateContent): { id: string; label: string }[] {
  return c.productCatalog?.categories.map((x) => ({ id: x.id, label: x.label })) ?? []
}

export function getCategoryByIdFromDemo(c: DemoTemplateContent, id: string): ProductCategoryDetail | undefined {
  return buildProductCategoriesDetailedFromDemo(c).find((x) => x.id === id)
}

/** `tel:` 链接用，保留数字与前导 + */
export function phoneToTelHref(display: string): string {
  const t = display.replace(/[^\d+]/g, '')
  return t || '+8600000000000'
}
