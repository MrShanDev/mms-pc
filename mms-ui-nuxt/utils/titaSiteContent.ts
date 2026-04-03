/**
 * 主站（`NUXT_PUBLIC_DEMO_SITE_TEMPLATE=template06` / 钛业门户）静态业务数据：产品、新闻、页脚联系方式等。
 * 单一语言展示，不按界面 locale 切换；界面文案用 i18n（见 i18n/CONVENTIONS.md）。
 * 主站路由：`pages/template06/`（对外前缀见 `MAIN_SITE_ROUTE_PREFIX`，`utils/demoSite.ts`）。
 * 页面 UI：`pages/template06/_components/`（Home、About 等）。
 * 示例子站聚合数据见 `demoSiteTemplates.ts`。
 */

export const IMG_BIKE =
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=960&q=80'
export const IMG_WORKSHOP =
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'

export const companyName = 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.'

export const footerLead =
  'Founded in 2025 in Baoji High-tech Zone, Shaanxi Tuotaizhe Metal Technology Co, Ltd. is a tech-driven enterprise focusing on non-ferrous metals and alloy materials.'

export const hotlineTel = '+8618220735352'
export const hotlineDisplay = '+86 18220735352'

/** 主站（template06）联系邮箱，与页脚 / 联系页共用 */
export const customerEmail = 'titalife0917@gmail.com'

/** 备案公示链接与展示文案 */
export const icpRecordHref = 'http://beian.miit.gov.cn/'
export const icpRecordText = '陕ICP备2026001012号'

const navProductCategoriesSeed = [
  { id: 'cat-mountain-bike', label: 'Titanium alloy mountain bikes and accessories' },
  { id: 'cat-road-bike', label: 'Titanium alloy road bikes and accessories' },
  { id: 'cat-folding-bike', label: 'Titanium alloy folding bikes and accessories' },
  { id: 'cat-small-wheel-bike', label: 'Titanium alloy small-wheel bikes and accessories' },
  { id: 'cat-gravel-bike', label: 'Titanium alloy gravel road bikes and accessories' }
] as const

export const navProductCategories = navProductCategoriesSeed.map((c) => ({ ...c }))

export type ProductCategoryId = (typeof navProductCategoriesSeed)[number]['id']

export interface ShowcaseProduct {
  title: string
  image: string
}

export interface ProductCategoryDetail {
  id: string
  label: string
  intro: string
  products: ShowcaseProduct[]
}

export const productCategoriesDetailed: ProductCategoryDetail[] = [
  {
    id: 'cat-mountain-bike',
    label: navProductCategoriesSeed[0]!.label,
    intro:
      'Lightweight Ti frames and components for trail and XC, engineered for durability and corrosion resistance in harsh environments.',
    products: [
      {
        title: 'TIOK M2 27.5 Titanium Alloy Mountain Bike, 12-Speed High-End Titanium Alloy Bike',
        image: IMG_BIKE
      },
      {
        title:
          'TIOK Titanium Alloy Mountain Bike, 27-speed Off-Road Hydraulic Disc Brakes, High Load Capacity for Long-Distance Riding',
        image: IMG_BIKE
      }
    ]
  },
  {
    id: 'cat-road-bike',
    label: navProductCategoriesSeed[1]!.label,
    intro:
      'Road and endurance geometries with internal routing options, disc and rim-compatible lineups for club and elite riders.',
    products: [
      {
        title:
          'TIOKAR3 aerodynamic road bike with titanium alloy wheels, internal cable routing, hydraulic disc brakes, and integrated carbon fiber handlebars.',
        image: IMG_BIKE
      },
      {
        title:
          'TIOK 22-inch 451 disc brake titanium alloy small wheel bicycle, city adult 11-speed flat handlebar road bike',
        image: IMG_BIKE
      }
    ]
  },
  {
    id: 'cat-folding-bike',
    label: navProductCategoriesSeed[2]!.label,
    intro:
      'Compact fold designs for urban multimodal travel; titanium keeps weight low without sacrificing ride quality.',
    products: [
      {
        title:
          'TIOK Titanium Alloy Small Cloth Folding Bicycle Retro City 7-speed 16 inch Triple Folding Bicycle',
        image: IMG_BIKE
      }
    ]
  },
  {
    id: 'cat-small-wheel-bike',
    label: navProductCategoriesSeed[3]!.label,
    intro:
      '451 and 16"–20" wheel platforms for city and travel; stable handling with premium small-wheel geometry.',
    products: [
      {
        title:
          'TIOK 22-inch 451 titanium alloy bicycle, small wheels, 11-speed urban adult, flat handlebars, road bike with hydraulic disc brakes.',
        image: IMG_BIKE
      }
    ]
  },
  {
    id: 'cat-gravel-bike',
    label: navProductCategoriesSeed[4]!.label,
    intro:
      'Clearance for wide tires, mount points for racks and mudguards, optimized for mixed surfaces and long gravel events.',
    products: [
      {
        title: 'TIOK Titanium Gravel Road Bike with Threshold Axle, Handlebars, 22-Speed Hydraulic Disc Brakes',
        image: IMG_BIKE
      },
      {
        title:
          'TIOK Titanium Gravel Road Bike with Threshold Axles, Flat Handlebars, 22-Speed Hydraulic Disc Brakes',
        image: IMG_BIKE
      }
    ]
  }
]

export function getProductCategory(id: string, _locale?: string): ProductCategoryDetail | undefined {
  return productCategoriesDetailed.find((c) => c.id === id)
}

export const showcaseProducts: ShowcaseProduct[] = productCategoriesDetailed.flatMap((c) => c.products)

export const heroSlides: { image: string; title: string }[] = [
  { image: IMG_BIKE, title: productCategoriesDetailed[1]!.products[1]!.title },
  { image: IMG_BIKE, title: productCategoriesDetailed[0]!.products[0]!.title },
  { image: IMG_BIKE, title: productCategoriesDetailed[4]!.products[0]!.title }
]

export const profileParagraphs: string[] = [
  'Founded in 2025 in Baoji High-tech Zone, Shaanxi Tuotaizhe Metal Technology Co., Ltd. is a tech-driven enterprise focusing on non-ferrous metals and alloy materials.',
  'We mainly engage in non-ferrous metal rolling processing, R&D and sales of new metal functional materials. Meanwhile, we are involved in metal products manufacturing, production and sales of titanium alloy bicycles, spare parts, outdoor products, titanium cups and kettles. We also conduct new material technology R&D and import & export trade. Relying on the industrial and location advantages of Baoji "China Titanium Valley", we take technological innovation as the core, provide customers with integrated solutions of metal material processing, product sales and technical services, and strive to achieve dual breakthroughs in market and technology in the metal technology field.'
]

export const aboutSideImage = IMG_WORKSHOP

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  /** 详情正文；缺省则详情页用 excerpt */
  body?: string
}

export const newsList: NewsItem[] = [
  {
    id: 'news-speaker-evaluation',
    title: 'Main indicators of speakers and methods of evaluating speakers',
    excerpt:
      'The parameter of power is actually a basic parameter to measure the performance of a multimedia speaker, but because of the intentional avoidance of the manufacturer, in the description of many products, the power has become a meaningless parameter.',
    date: '2020-07-11',
    image: IMG_WORKSHOP,
    body:
      'The parameter of power is actually a basic parameter to measure the performance of a multimedia speaker, but because of the intentional avoidance of the manufacturer, in the description of many products, the power has become a meaningless parameter. In practice, consumers should look at rated power, sensitivity, and distortion together rather than peak marketing numbers alone.'
  },
  {
    id: 'news-drums-enlightenment',
    title: 'Drums are a better weapon for musical enlightenment',
    excerpt:
      'A well-qualified development psychologist and a professor at Harvard University in the United States once said: "Among all the intelligences that individuals may have, musical intelligence is the earliest." There are two important functions of early childhood music education.',
    date: '2020-06-28',
    image: IMG_WORKSHOP,
    body:
      'A well-qualified development psychologist and a professor at Harvard University in the United States once said: "Among all the intelligences that individuals may have, musical intelligence is the earliest." There are two important functions of early childhood music education: cultivating rhythm and listening, and supporting social collaboration through ensemble play.'
  },
  {
    id: 'news-drums-learning-guide',
    title: 'Dry goods-how to learn drums',
    excerpt:
      'There are three keys to unlocking the treasure trove of human wisdom: one is a number, one is a letter, and the other is a musical note." Hugo\'s famous saying illustrates the importance of music education.',
    date: '2020-06-28',
    image: IMG_WORKSHOP,
    body:
      'There are three keys to unlocking the treasure trove of human wisdom: one is a number, one is a letter, and the other is a musical note." Hugo\'s famous saying illustrates the importance of music education. For beginners, short daily practice with a metronome and basic stick control exercises often yields better results than occasional long sessions.'
  },
  {
    id: 'news-synth-drum-sound',
    title: 'How to make a drum sound using a synthesizer',
    excerpt:
      'Using drum kit sound material is a very easy task, and there are many websites on the market like Splice and Sounds.com that can provide a lot of resources.',
    date: '2020-06-28',
    image: IMG_WORKSHOP,
    body:
      'Using drum kit sound material is a very easy task, and there are many websites on the market like Splice and Sounds.com that can provide a lot of resources. Layer samples with subtle velocity variation and gentle EQ so programmed parts still feel organic alongside acoustic instruments.'
  }
]

export function useTitaCanonical(path: string) {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const link = base ? [{ rel: 'canonical', href: `${base}${path === '/' ? '/' : path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return { link, og }
}
