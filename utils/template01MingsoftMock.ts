/**
 * template01 源演示数据（`TEMPLATE01_DEMO_SITE_CONTENT`）：B2B 工厂站信息架构参考 mingsoft 演示站。
 * 经 `demoSiteContent.buildDemoContentForTemplate` 复制为 template02～06；类型为 `DemoTemplateContent`（见 `docs/demo-site-api.md`）。
 */
import type {
  DemoNewsCategoryKey,
  DemoProductCategory,
  DemoProductDetail,
  DemoTemplateContent
} from '@/utils/demoSite'

export const TEMPLATE01_REFERENCE_URL = 'https://193.mstore.demo.mingsoft.net/' as const

/** 演示站静态资源（与 https://193.mstore.demo.mingsoft.net/ 同源，保证视觉一致） */
export const TEMPLATE01_DEMO_ORIGIN = 'https://193.mstore.demo.mingsoft.net' as const

export function template01DemoAsset(path: string): string {
  return `${TEMPLATE01_DEMO_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

const img = (id: string, w = 900) => `https://images.unsplash.com/${id}?w=${w}&q=80`

export const TEMPLATE01_IMAGES = {
  mop: img('photo-1581578731548-c64695cc6952'),
  heroSide: img('photo-1556911220-e15b29be8c8f'),
  factory: img('photo-1581091226825-a6a2a5aee158'),
  team: img('photo-1522071820081-009f0129c71c'),
  cert: img('photo-1450101499163-c8848c66ca85'),
  news: img('photo-1581578731548-c64695cc6952'),
  galleryShowcase: img('photo-1563453392212-6c3a9327f84b'),
  galleryDetail: img('photo-1628177142898-93e36e4e3a50')
} as const

const NEWS_EXCERPT_1 =
  '1.首先将旋转拖把放在平坦的表面上，并用脚用力按压板，尽可能靠近金属部分。2.用左手握住拖把手柄，逆时针旋转底座。当你听到“咔嗒”声时，意味着拖把的把手和头被分开了。此时，您可以卸下旧的拖把头。3.用水和钢丝球清洁拖把手柄。准备一个新的拖把头并将其平放在地上。将拖把手柄顺时针旋转至头部中心，也会发出“咔嗒'

const NEWS_EXCERPT_2 =
  '1.使用旋转拖把时必须轻拿轻放。尽管大多数拖把由不锈钢制成，但用力过大会导致接口磨损，并且可能无法旋转。2.旋转式拖把不适合清洁太粗糙的地面，这会对拖把头造成很大的损坏。此外，旋转拖把不能用于擦拭重油污区域。后期清洗困难，严重时会直接报废拖把头。3.在使用旋转拖把的过程中，尽量避免使用大量的清洁剂，因为清'

const COMPANY_INTRO =
  '某某清洁工具有限公司一家专业生产家用清洁产品的大型公司。本公司专业生产各种旋转拖把，具有完整科学的质量管理体系。公司成立于2008年，位于中国河北省巴州市尖茶铺西台山。毗邻京津地区，交通便利，占地面积大。现代拥有全套生产线和一个完全能够接受大订单的大型车间。它是中国领先的高端时'

const AUX_LINE =
  '辅助描述辅助描述辅助描述辅助描述辅助描述辅助描述辅助描述'

const CATEGORIES: DemoProductCategory[] = [
  { id: 'cat-mop', label: '旋转拖把桶组', slug: 'mop-bucket' },
  { id: 'cat-parts', label: '拖把头 / 配件', slug: 'mop-parts' }
]

/** 产品 slug 尾段：语义化，避免纯数字 */
const PRODUCT_SLUG_KEYS = [
  'eight-shape-bucket',
  'eight-shape-bucket-pro',
  'dual-drive-bucket',
  'microfiber-portable-set',
  'heavy-duty-bucket',
  'compact-apartment-mop',
  'commercial-system',
  'replacement-head-bundle'
] as const

function productDetail(
  i: number,
  cat: DemoProductCategory,
  title: string,
  slugSuffix: string
): DemoProductDetail {
  const slug = `${cat.slug}-${slugSuffix}`
  const specs: DemoProductDetail['specs'] = [
    { label: '材质', value: 'PP 桶体 + 不锈钢杆（可定制铝合金）' },
    { label: '桶容量', value: '约 8–12 L（按型号）' },
    { label: '包装', value: '彩盒 / 中性外箱，支持贴标' },
    { label: '定制', value: '手柄颜色、Logo 丝印、外箱设计' }
  ]
  const moq = i % 2 === 0 ? '500 套（含桶+杆）' : '800 件（单品）'
  const leadTime = '首批 25–35 个工作日（视排期与认证要求）'
  const specLine = specs.map((s) => `${s.label}：${s.value}`).join('；')
  return {
    id: `product-${slug}`,
    slug,
    categoryId: cat.id,
    title,
    subtitle: '家用旋转清洁系统 · 支持定制 OEM/ODM',
    image: TEMPLATE01_IMAGES.mop,
    gallery: [TEMPLATE01_IMAGES.galleryShowcase, TEMPLATE01_IMAGES.galleryDetail, TEMPLATE01_IMAGES.mop],
    summary:
      '加厚桶体、省力旋转杆，适配多数标准替换头。适合电商批发、礼品渠道与跨境电商装箱方案。',
    detailParagraphs: [
      '本产品为家用旋转拖把系统演示数据，版式参考行业 B2B 演示站产品详情页。桶体采用加厚 PP 材质，旋转机构经疲劳测试，适合日常家庭与轻度商业清洁场景。',
      `主要参数：${specLine}。以上为占位文案，上线后由内容后台维护。`,
      `订单方式：MOQ ${moq}，首批交期 ${leadTime}。支持装柜前视频验货与第三方检验配合。`
    ],
    specs,
    moq,
    leadTime,
    mediaEntries: [
      {
        title: '产线实拍',
        description: '注塑、组装与检验环节可追溯；支持装柜前视频验货（试单可预约）。',
        images: [TEMPLATE01_IMAGES.factory, TEMPLATE01_IMAGES.galleryShowcase]
      },
      {
        title: '证书与合规',
        description: '可配合提供常规检测报告与出口文件模板；大客户可启动专项验厂流程。',
        images: [TEMPLATE01_IMAGES.cert],
        cta: { label: '索取证书清单', href: '/template01/contact' }
      }
    ]
  }
}

function buildCatalog(): NonNullable<DemoTemplateContent['productCatalog']> {
  const titles = [
    '8 shape rotating mop bucket',
    '8 shape rotating mop bucket Pro',
    'Spin mop dual-drive bucket',
    'Portable microfiber spin mop set',
    'Heavy-duty spin mop bucket',
    'Compact spin mop for apartment',
    'Commercial spin mop system',
    'Replacement mop head bundle'
  ]
  const products = titles.map((title, i) => {
    const cat = i < 5 ? CATEGORIES[0]! : CATEGORIES[1]!
    return productDetail(i, cat, title, PRODUCT_SLUG_KEYS[i]!)
  })
  return {
    pageTitle: '产品中心',
    pageLead: AUX_LINE,
    categories: [...CATEGORIES],
    products
  }
}

const TEMPLATE01_CATALOG = buildCatalog()

/** 供 `nuxt.config` 预渲染（固定页面 product-detail + query） */
export const TEMPLATE01_PRODUCT_PRERENDER_PATHS = TEMPLATE01_CATALOG.products.map(
  (p) => `/template01/product-detail?slug=${encodeURIComponent(p.slug)}`
)

export function template01ProductBySlug(content: DemoTemplateContent, slug: string): DemoProductDetail | undefined {
  return content.productCatalog?.products.find((p) => p.slug === slug)
}

export function template01RelatedProducts(
  content: DemoTemplateContent,
  currentSlug: string,
  limit = 3
): DemoProductDetail[] {
  const catalog = content.productCatalog
  const cur = template01ProductBySlug(content, currentSlug)
  if (!catalog || !cur) return []
  const same = catalog.products.filter((p) => p.slug !== currentSlug && p.categoryId === cur.categoryId)
  const rest = catalog.products.filter((p) => p.slug !== currentSlug && p.categoryId !== cur.categoryId)
  return [...same, ...rest].slice(0, limit)
}

/** 新闻中心子 Tab（与 `newsPage.subTabs` 一致，供列表/详情侧栏） */
export const TEMPLATE01_NEWS_TABS: { category: DemoNewsCategoryKey; label: string; query: string }[] = [
  { category: 'company', label: '公司新闻', query: 'company' },
  { category: 'industry', label: '行业资讯', query: 'industry' },
  { category: 'faq', label: '产品常见问题', query: 'faq' }
]

export function template01NewsById(content: DemoTemplateContent, id: string) {
  return content.newsPage.items.find((n) => n.id === id)
}

export function template01NewsAdjacent(content: DemoTemplateContent, id: string) {
  const items = content.newsPage.items
  const idx = items.findIndex((n) => n.id === id)
  if (idx < 0) return { prev: undefined as undefined, next: undefined as undefined }
  return {
    prev: idx > 0 ? items[idx - 1] : undefined,
    next: idx < items.length - 1 ? items[idx + 1] : undefined
  }
}

export const TEMPLATE01_DEMO_SITE_CONTENT: DemoTemplateContent = {
  id: 'template01',
  referenceUrl: TEMPLATE01_REFERENCE_URL,
  siteTitle: '站点标题，可配置',
  siteTitleEn: 'Factory Demo | B2B Cleaning Tools | OEM ODM Spin Mop',
  metaTitle: '演示站点标题，可配置',
  metaDescription:
    '某某清洁工具有限公司一家专业生产家用清洁产品的大型公司。本公司专业生产各种旋转拖把，具有完整科学的质量管理体系。',
  nav: [
    { label: '首页', to: '/template01' },
    { label: '产品中心', to: '/template01/products' },
    { label: '公司介绍', to: '/template01/about' },
    { label: '新闻中心', to: '/template01/news' },
    { label: '联系我们', to: '/template01/contact' }
  ],
  footerCopyright: '站点版权信息，可配置',
  techSupport: '技术支持:',
  aboutPage: {
    kicker: '公司介绍',
    title: '某某清洁工具有限公司',
    lead: AUX_LINE,
    paragraphs: [COMPANY_INTRO],
    image: TEMPLATE01_IMAGES.heroSide,
    cta: '了解更多 >>',
    trustBlocks: [
      {
        title: '工厂与产能',
        paragraphs: [
          '自建厂房与注塑、装配线，支持大批量订单与滚动排期；可提供产线参观与第三方验厂配合。',
          '质量团队执行来料、过程与出货检验，关键尺寸与功能全检比例可按协议约定。'
        ],
        image: TEMPLATE01_IMAGES.factory
      },
      {
        title: '团队与服务',
        paragraphs: [
          '外贸业务员与工程同事协同报价、打样与包装方案，响应时区覆盖主要采购市场。',
          '从首样到量产的文档与变更记录可归档，便于长期合作与复购。'
        ],
        image: TEMPLATE01_IMAGES.team
      },
      {
        title: '资质与背书',
        paragraphs: [
          '配合常见测试与认证路径；可按目标市场补充标签、说明书与合规文件模板。',
          '与多家贸易公司与电商品牌保持长期供货，支持看厂、寄样与小额试单。'
        ],
        image: TEMPLATE01_IMAGES.cert
      }
    ]
  },
  newsPage: {
    title: '新闻中心',
    subTabs: [
      { query: 'company', category: 'company', label: '公司新闻' },
      { query: 'industry', category: 'industry', label: '行业资讯' },
      { query: 'faq', category: 'faq', label: '产品常见问题' }
    ],
    items: [
      {
        id: 'news-replace-mop-head',
        title: '如何更换旋转拖把的头部',
        category: 'industry',
        excerpt: NEWS_EXCERPT_1,
        date: '2023-07-06',
        image: TEMPLATE01_IMAGES.news,
        bodyParagraphs: [
          '1.首先将旋转拖把放在平坦的表面上，并用脚用力按压板，尽可能靠近金属部分。',
          '2.用左手握住拖把手柄，逆时针旋转底座。当你听到“咔嗒”声时，意味着拖把的把手和头被分开了。此时，您可以卸下旧的拖把头。',
          '3.用水和钢丝球清洁拖把手柄。准备一个新的拖把头并将其平放在地上。将拖把手柄顺时针旋转至头部中心，也会发出“咔嗒”声，表示安装完成。',
          '4.提起拖把，仔细观察拖把头和拖把柄是否完全匹配，如果可以，可以正常使用。'
        ]
      },
      {
        id: 'news-mop-usage-notes',
        title: '使用旋转拖把的注意事项',
        category: 'company',
        excerpt: NEWS_EXCERPT_2,
        date: '2023-07-06',
        image: TEMPLATE01_IMAGES.news,
        bodyParagraphs: [
          '1.使用旋转拖把时必须轻拿轻放。尽管大多数拖把由不锈钢制成，但用力过大会导致接口磨损，并且可能无法旋转。',
          '2.旋转式拖把不适合清洁太粗糙的地面，这会对拖把头造成很大的损坏。此外，旋转拖把不能用于擦拭重油污区域。',
          '3.使用过程中尽量避免使用大量的强酸强碱清洁剂，以免加速塑料件老化。',
          '上线后可将本段替换为 CMS 富文本正文。'
        ]
      },
      {
        id: 'news-mop-daily-care',
        title: '旋转拖把日常保养小贴士',
        category: 'industry',
        excerpt:
          '定期清洗桶体与脱水篮，避免积水产生异味；拖把头拧干后再晾晒可延长纤维寿命。本文为演示占位。',
        date: '2023-07-06',
        image: TEMPLATE01_IMAGES.news,
        bodyParagraphs: [
          '桶体建议每次使用后排空积水，并用清水冲洗内壁与脱水篮。',
          '拖把头若出现明显磨损或掉毛，应及时更换，以免影响清洁效果与地板安全。',
          '长期不用时，请将整套产品置于干燥通风处存放。'
        ]
      }
    ]
  },
  contactPage: {
    title: '联系我们',
    email: '123456789@qq.com',
    phones: ['488-888-8888', '18888888888'],
    address: '北京市天安门',
    extra: '在线咨询',
    whatsapp: '+86 188 8888 8888',
    whatsappHref: 'https://wa.me/8618888888888',
    formIntro: '留下需求与联系方式，我们将在 1–2 个工作日内回复（演示表单不提交后端）。',
    bannerImage: template01DemoAsset('/upload/cms/category/1688608258562.jpg'),
    bannerLead: AUX_LINE,
    wechatLine: '微信号：MopFactory-Service（演示，上线请替换为真实账号）'
  },
  productCatalog: TEMPLATE01_CATALOG,
  casesPage: {
    title: '案例与客户见证',
    intro: '以下为演示占位，用于展示「社会证明」模块；上线后替换为真实案例与许可使用的客户评价。',
    items: [
      {
        title: '跨境电商品牌 — 旋转拖把整箱出口',
        excerpt: '12 周内完成包装升级与批次验货，欧洲渠道复购率提升（数据为示例）。',
        client: '某深圳贸易公司',
        image: TEMPLATE01_IMAGES.mop
      },
      {
        title: '连锁商超 — 季节性促销组合装',
        excerpt: '按卖场堆头尺寸定制外箱与组合配比，保障大促期间供货节奏。',
        client: '某华北零售企业',
        image: TEMPLATE01_IMAGES.galleryDetail
      }
    ]
  },
  home: {
    topLang: ['ENGLISH', '中文'],
    navLangInline: ['中文', 'ENGLISH'],
    demoLogoSrc: template01DemoAsset('/upload/image/20211205/1638673578796255.png'),
    bannerSlides: [
      { image: template01DemoAsset('/upload/image/20220329/1648534245487471.jpg') },
      { image: template01DemoAsset('/upload/image/20220329/1648534229538487.jpg') }
    ],
    sideImgContact: template01DemoAsset('/193/images/video-img-1.jpg'),
    sideImgAbout: template01DemoAsset('/193/images/video-img-2.jpg'),
    about: {
      title: '公司介绍',
      lead: AUX_LINE,
      body: COMPANY_INTRO,
      cta: '了解更多 >>'
    },
    contactBanner: { label: '联系' },
    aboutMini: { label: '公司介绍' },
    productKicker: '产品中心',
    productLead: AUX_LINE,
    productTiles: TEMPLATE01_CATALOG.products.map((p) => ({
      title: p.title,
      image: p.image,
      slug: p.slug
    })),
    newsKicker: '新闻中心',
    newsLead: AUX_LINE,
    newsItems: [
      {
        title: '如何更换旋转拖把的头部',
        date: '2023-07-06',
        excerpt: `如何更换旋转拖把的头部\n${NEWS_EXCERPT_1}`
      },
      {
        title: '使用旋转拖把的注意事项',
        date: '2023-07-06',
        excerpt: `使用旋转拖把的注意事项\n${NEWS_EXCERPT_2}`
      },
      {
        title: '旋转拖把日常保养小贴士',
        date: '2023-07-06',
        excerpt: `旋转拖把日常保养小贴士\n定期清洗桶体与脱水篮……`
      }
    ],
    contactKicker: '联系我们',
    contactOnline: '在线咨询'
  }
}

export const TEMPLATE01_NEWS_PRERENDER_PATHS = TEMPLATE01_DEMO_SITE_CONTENT.newsPage.items.map(
  (n) => `/template01/news-detail?id=${encodeURIComponent(n.id)}`
)
