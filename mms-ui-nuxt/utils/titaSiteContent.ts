/**
 * 模拟后端/站点业务数据（产品、新闻等），单一语言展示，不按界面 locale 切换。
 * UI 层静态文案请用 i18n。约定见 i18n/CONVENTIONS.md
 */

export const IMG_BIKE =
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=960&q=80'
export const IMG_WORKSHOP =
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'

export const companyName = 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.'

/** @deprecated 入参忽略；数据不随 UI 语言变化，请直接使用 `companyName` */
export function getCompanyName(_locale?: string): string {
  return companyName
}

export const footerLead =
  'Founded in 2025 in Baoji High-tech Zone, Shaanxi Tuotaizhe Metal Technology Co, Ltd. is a tech-driven enterprise focusing on non-ferrous metals and alloy materials.'

/** @deprecated 入参忽略；请直接使用 `footerLead` */
export function getFooterLead(_locale?: string): string {
  return footerLead
}

export const hotlineTel = '+8618220735352'
export const hotlineDisplay = '+86 18220735352'

const navProductCategoriesSeed = [
  { id: '15', label: 'Titanium alloy mountain bikes and accessories' },
  { id: '16', label: 'Titanium alloy road bikes and accessories' },
  { id: '17', label: 'Titanium alloy folding bikes and accessories' },
  { id: '18', label: 'Titanium alloy small-wheel bikes and accessories' },
  { id: '19', label: 'Titanium alloy gravel road bikes and accessories' }
] as const

export const navProductCategories = navProductCategoriesSeed.map((c) => ({ ...c }))

/** @deprecated 入参忽略；请直接使用 `navProductCategories` */
export function getNavProductCategories(_locale?: string): { id: string; label: string }[] {
  return navProductCategories
}

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
    id: '15',
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
    id: '16',
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
    id: '17',
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
    id: '18',
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
    id: '19',
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

/** @deprecated 入参忽略；请直接使用 `productCategoriesDetailed` */
export function getProductCategoriesDetailed(_locale?: string): ProductCategoryDetail[] {
  return productCategoriesDetailed
}

export function getProductCategory(id: string, _locale?: string): ProductCategoryDetail | undefined {
  return productCategoriesDetailed.find((c) => c.id === id)
}

/** @deprecated 入参忽略 */
export function getShowcaseProducts(_locale?: string): ShowcaseProduct[] {
  return productCategoriesDetailed.flatMap((c) => c.products)
}

export const showcaseProducts: ShowcaseProduct[] = productCategoriesDetailed.flatMap((c) => c.products)

export const heroSlides: { image: string; title: string }[] = [
  { image: IMG_BIKE, title: productCategoriesDetailed[1]!.products[1]!.title },
  { image: IMG_BIKE, title: productCategoriesDetailed[0]!.products[0]!.title },
  { image: IMG_BIKE, title: productCategoriesDetailed[4]!.products[0]!.title }
]

/** @deprecated 入参忽略；请直接使用 `heroSlides` */
export function getHeroSlides(_locale?: string): { image: string; title: string }[] {
  return heroSlides
}

export const profileParagraphs: string[] = [
  'Founded in 2025 in Baoji High-tech Zone, Shaanxi Tuotaizhe Metal Technology Co., Ltd. is a tech-driven enterprise focusing on non-ferrous metals and alloy materials.',
  'We mainly engage in non-ferrous metal rolling processing, R&D and sales of new metal functional materials. Meanwhile, we are involved in metal products manufacturing, production and sales of titanium alloy bicycles, spare parts, outdoor products, titanium cups and kettles. We also conduct new material technology R&D and import & export trade. Relying on the industrial and location advantages of Baoji "China Titanium Valley", we take technological innovation as the core, provide customers with integrated solutions of metal material processing, product sales and technical services, and strive to achieve dual breakthroughs in market and technology in the metal technology field.'
]

/** @deprecated 入参忽略；请直接使用 `profileParagraphs` */
export function getProfileParagraphs(_locale?: string): string[] {
  return profileParagraphs
}

export const aboutSideImage = IMG_WORKSHOP

export interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
}

export const newsList: NewsItem[] = [
  {
    id: '1',
    title: 'Main indicators of speakers and methods of evaluating speakers',
    excerpt:
      'The parameter of power is actually a basic parameter to measure the performance of a multimedia speaker, but because of the intentional avoidance of the manufacturer, in the description of many products, the power has become a meaningless parameter.',
    date: '2020-07-11',
    image: IMG_WORKSHOP
  },
  {
    id: '2',
    title: 'Drums are a better weapon for musical enlightenment',
    excerpt:
      'A well-qualified development psychologist and a professor at Harvard University in the United States once said: "Among all the intelligences that individuals may have, musical intelligence is the earliest." There are two important functions of early childhood music education.',
    date: '2020-06-28',
    image: IMG_WORKSHOP
  },
  {
    id: '3',
    title: 'Dry goods-how to learn drums',
    excerpt:
      'There are three keys to unlocking the treasure trove of human wisdom: one is a number, one is a letter, and the other is a musical note." Hugo\'s famous saying illustrates the importance of music education.',
    date: '2020-06-28',
    image: IMG_WORKSHOP
  },
  {
    id: '4',
    title: 'How to make a drum sound using a synthesizer',
    excerpt:
      'Using drum kit sound material is a very easy task, and there are many websites on the market like Splice and Sounds.com that can provide a lot of resources.',
    date: '2020-06-28',
    image: IMG_WORKSHOP
  }
]

/** @deprecated 入参忽略；请直接使用 `newsList` */
export function getNewsList(_locale?: string): NewsItem[] {
  return newsList
}

export function useTitaCanonical(path: string) {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const link = base ? [{ rel: 'canonical', href: `${base}${path === '/' ? '/' : path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return { link, og }
}
