import type { DemoSiteTemplateId, DemoTemplateContent } from '@/utils/demoSite'
import { TEMPLATE01_DEMO_SITE_CONTENT } from '@/utils/template01MingsoftMock'

/** 与 template01 静态 mock 同源；各模版通过 {@link buildDemoContentForTemplate} 仅替换路由前缀 */
export const SITE_DEMO_CONTENT: DemoTemplateContent = TEMPLATE01_DEMO_SITE_CONTENT

function rewriteTemplatePaths<T>(content: T, fromPrefix: string, toPrefix: string): T {
  if (content === null || content === undefined) return content
  if (typeof content === 'string') {
    return content.split(fromPrefix).join(toPrefix) as T
  }
  if (Array.isArray(content)) {
    return content.map((x) => rewriteTemplatePaths(x, fromPrefix, toPrefix)) as T
  }
  if (typeof content === 'object') {
    const o = content as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const k of Object.keys(o)) {
      out[k] = rewriteTemplatePaths(o[k], fromPrefix, toPrefix)
    }
    return out as T
  }
  return content
}

/**
 * 基于 template01 演示数据生成指定模版的内容：除 `id` 与站内路径前缀外结构一致，
 * 便于多模版共用同一套 CMS/接口字段。
 */
export function buildDemoContentForTemplate(id: DemoSiteTemplateId): DemoTemplateContent {
  const base = JSON.parse(JSON.stringify(SITE_DEMO_CONTENT)) as DemoTemplateContent
  const from = '/template01'
  const to = `/${id}`
  const merged = rewriteTemplatePaths(base, from, to)
  merged.id = id
  return merged
}

/**
 * template02 对齐 361.mstore 演示站：英文主导航与区块标题（路径仍为 /template02/...）
 * 参考：https://361.mstore.demo.mingsoft.net/html/web/index.html
 */
export function applyTemplate02Mstore361Patch(content: DemoTemplateContent): DemoTemplateContent {
  const c = JSON.parse(JSON.stringify(content)) as DemoTemplateContent
  const base = '/template02'
  c.nav = [
    { label: 'Home', to: base },
    { label: 'Brand', to: `${base}/about` },
    { label: 'Products', to: `${base}/products` },
    { label: 'Blog', to: `${base}/news` },
    { label: 'Contact', to: `${base}/contact` }
  ]
  c.aboutPage = { ...c.aboutPage, kicker: 'Brand' }
  const home = c.home as Record<string, unknown>
  home.productKicker = 'Products'
  home.newsKicker = 'Blog'
  home.contactKicker = 'Contact'
  if (c.productCatalog) {
    c.productCatalog = { ...c.productCatalog, pageTitle: 'Products' }
  }
  c.newsPage = { ...c.newsPage, title: 'Blog' }
  c.contactPage = { ...c.contactPage, title: 'Contact' }
  return c
}

/**
 * template03 对齐 392.mstore 演示站：英文导航与子菜单（路径 /template03/...）
 * 参考：https://392.mstore.demo.mingsoft.net/
 */
export function applyTemplate03Mstore392Patch(content: DemoTemplateContent): DemoTemplateContent {
  const c = JSON.parse(JSON.stringify(content)) as DemoTemplateContent
  const base = '/template03'
  const cats = c.productCatalog?.categories ?? []
  const slug1 = cats[0]?.slug ?? ''
  const slug2 = cats[1]?.slug ?? slug1
  c.nav = [
    { label: 'Home', to: base },
    {
      label: 'ABOUT US',
      to: `${base}/about`,
      children: [{ label: 'FACTORY', to: `${base}/cases` }]
    },
    {
      label: 'PRODUCTS',
      to: `${base}/products`,
      children: [
        { label: 'CLASS ONE', to: slug1 ? `${base}/products?category=${slug1}` : `${base}/products` },
        { label: 'CLASS TWO', to: slug2 ? `${base}/products?category=${slug2}` : `${base}/products` },
        { label: 'CLASS THREE', to: `${base}/products` },
        { label: 'CLASS FOUR', to: `${base}/products` }
      ]
    },
    { label: 'NEWS', to: `${base}/news` },
    { label: 'MESSAGE', to: `${base}/message` },
    { label: 'CONTACT', to: `${base}/contact` }
  ]
  if (c.productCatalog) {
    c.productCatalog = { ...c.productCatalog, pageTitle: 'PRODUCTS' }
  }
  c.newsPage = { ...c.newsPage, title: 'NEWS' }
  c.contactPage = { ...c.contactPage, title: 'CONTACT' }
  if (c.casesPage) {
    c.casesPage = { ...c.casesPage, title: 'FACTORY' }
  }
  const home = c.home as Record<string, unknown>
  home.productKicker = 'PRODUCTS'
  home.newsKicker = 'NEWS'
  return c
}

/**
 * template04 对齐 e9.mstore 演示站：Bootstrap 导航与首页区块（路径 /template04/...）
 * 参考：https://e9.mstore.demo.mingsoft.net/
 */
export function applyTemplate04MstoreE9Patch(content: DemoTemplateContent): DemoTemplateContent {
  const c = JSON.parse(JSON.stringify(content)) as DemoTemplateContent
  c.referenceUrl = 'https://e9.mstore.demo.mingsoft.net/'
  const base = '/template04'
  const cats = c.productCatalog?.categories ?? []
  const s1 = cats[0]?.slug ?? ''
  const s2 = cats[1]?.slug ?? ''
  c.nav = [
    { label: 'Home', to: base },
    { label: 'About us', to: `${base}/about` },
    {
      label: 'Product',
      to: `${base}/products`,
      children: [
        { label: 'First series', to: s1 ? `${base}/products?category=${s1}` : `${base}/products` },
        { label: 'Second series', to: s2 ? `${base}/products?category=${s2}` : `${base}/products` },
        { label: 'Third series', to: `${base}/products` },
        { label: 'Fourth series', to: `${base}/products` },
        { label: 'Fifth series', to: `${base}/products` },
        { label: 'Sixth Series', to: `${base}/products` }
      ]
    },
    {
      label: 'News',
      to: `${base}/news`,
      children: [
        { label: 'Company dynamics', to: `${base}/news?category=company` },
        { label: 'Industry news', to: `${base}/news?category=industry` },
        { label: 'Product FAQ', to: `${base}/news?category=faq` }
      ]
    },
    {
      label: 'Case',
      to: `${base}/cases`,
      children: [
        { label: 'Latest case', to: `${base}/cases?sort=latest` },
        { label: 'Classic case', to: `${base}/cases?sort=classic` }
      ]
    },
    {
      label: 'Download',
      to: `${base}/download`,
      children: [
        { label: 'Help documentation', to: `${base}/download#help` },
        { label: 'File download', to: `${base}/download#files` }
      ]
    },
    { label: 'Contact us', to: `${base}/contact` },
    { label: 'Feedback', to: `${base}/feedback` }
  ]
  c.aboutPage = { ...c.aboutPage, kicker: 'About us' }
  c.newsPage = { ...c.newsPage, title: 'News' }
  c.contactPage = { ...c.contactPage, title: 'Contact us' }
  if (c.productCatalog) {
    const seriesLabels = ['First series', 'Second series', 'Third series', 'Fourth series', 'Fifth series', 'Sixth Series']
    const categories = c.productCatalog.categories.map((cat, i) => ({
      ...cat,
      label: seriesLabels[i] ?? cat.label
    }))
    c.productCatalog = { ...c.productCatalog, pageTitle: 'Product', categories }
  }
  if (c.casesPage) {
    c.casesPage = { ...c.casesPage, title: 'Case' }
  }
  const home = c.home as Record<string, unknown>
  home.productKicker = 'Product'
  home.newsKicker = 'News'
  home.caseKicker = 'Case'
  home.contactKicker = 'Contact us'
  return c
}

/**
 * template05 对齐 e7.mstore 演示站：顶部 Logo+搜索、navbar-static-top、首页区块顺序（路径 /template05/...）
 * 参考：https://e7.mstore.demo.mingsoft.net/
 */
export function applyTemplate05MstoreE7Patch(content: DemoTemplateContent): DemoTemplateContent {
  const c = JSON.parse(JSON.stringify(content)) as DemoTemplateContent
  c.referenceUrl = 'https://e7.mstore.demo.mingsoft.net/'
  const base = '/template05'
  const cats = c.productCatalog?.categories ?? []
  const s1 = cats[0]?.slug ?? ''
  const s2 = cats[1]?.slug ?? ''
  c.nav = [
    { label: 'Home', to: base },
    { label: 'About us', to: `${base}/about` },
    {
      label: 'Product',
      to: `${base}/products`,
      children: [
        { label: 'First series', to: s1 ? `${base}/products?category=${s1}` : `${base}/products` },
        { label: 'Second series', to: s2 ? `${base}/products?category=${s2}` : `${base}/products` },
        { label: 'Third series', to: `${base}/products` },
        { label: 'Fourth series', to: `${base}/products` },
        { label: 'Fifth series', to: `${base}/products` },
        { label: 'Sixth Series', to: `${base}/products` }
      ]
    },
    {
      label: 'News',
      to: `${base}/news`,
      children: [
        { label: 'Company dynamics', to: `${base}/news?category=company` },
        { label: 'Industry news', to: `${base}/news?category=industry` },
        { label: 'Product FAQ', to: `${base}/news?category=faq` }
      ]
    },
    {
      label: 'Case',
      to: `${base}/cases`,
      children: [
        { label: 'Latest case', to: `${base}/cases?sort=latest` },
        { label: 'Classic case', to: `${base}/cases?sort=classic` }
      ]
    },
    {
      label: 'Download',
      to: `${base}/download`,
      children: [
        { label: 'Help documentation', to: `${base}/download#help` },
        { label: 'File download', to: `${base}/download#files` }
      ]
    },
    { label: 'Contact us', to: `${base}/contact` },
    { label: 'Feedback', to: `${base}/feedback` }
  ]
  c.aboutPage = { ...c.aboutPage, kicker: 'About us' }
  c.newsPage = { ...c.newsPage, title: 'News' }
  c.contactPage = { ...c.contactPage, title: 'Contact us' }
  if (c.productCatalog) {
    const seriesLabels = ['First series', 'Second series', 'Third series', 'Fourth series', 'Fifth series', 'Sixth Series']
    const categories = c.productCatalog.categories.map((cat, i) => ({
      ...cat,
      label: seriesLabels[i] ?? cat.label
    }))
    c.productCatalog = { ...c.productCatalog, pageTitle: 'Product', categories }
  }
  if (c.casesPage) {
    c.casesPage = { ...c.casesPage, title: 'Case' }
  }
  const home = c.home as Record<string, unknown>
  home.productKicker = 'Product'
  home.newsKicker = 'News'
  home.caseKicker = 'Case'
  home.contactKicker = 'Contact us'
  home.demoLogoSrc = 'https://e7.mstore.demo.mingsoft.net/upload/appLogo/1704855689017.png'
  home.e7FootLogoSrc = 'https://e7.mstore.demo.mingsoft.net/e7/img/53007d5b00000.png'
  home.bannerSlides = [
    { image: 'https://e7.mstore.demo.mingsoft.net/upload/other/2018/08/08/71232886bd5f7575f70de26af3ab602d.jpg' },
    { image: 'https://e7.mstore.demo.mingsoft.net/upload/other/2018/08/08/33ea491f4a77405c2d4a175e6f5b5d36.jpg' }
  ]
  return c
}
