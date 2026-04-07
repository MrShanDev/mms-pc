import { computed } from 'vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import {
  buildHeroSlidesFromDemo,
  buildNewsListFromDemo,
  buildProductCategoriesDetailedFromDemo,
  buildShowcaseProductsFromDemo,
  getCategoryByIdFromDemo,
  phoneToTelHref
} from '@/utils/template06ViewModel'
import { icpRecordHref, icpRecordText } from '@/utils/titaSiteContent'

/** 主站（demoSiteTemplate=template06）数据：与 template01～05 共用 `DEMO_SITE_TEMPLATES` 中 `template06` 条目 */
export function useTitaSite() {
  const C = computed(() => DEMO_SITE_TEMPLATES.template06)

  const companyName = computed(() => C.value.siteTitle)
  const footerLead = computed(() => C.value.metaDescription)
  const profileParagraphs = computed(() => C.value.aboutPage.paragraphs)
  const aboutSideImage = computed(() => C.value.aboutPage.image)
  const contactAddress = computed(() => C.value.contactPage.address?.trim() || '')

  const productCategoriesDetailed = computed(() => buildProductCategoriesDetailedFromDemo(C.value))
  const heroSlides = computed(() => buildHeroSlidesFromDemo(C.value))
  const showcaseProducts = computed(() => buildShowcaseProductsFromDemo(C.value))
  const newsList = computed(() => buildNewsListFromDemo(C.value))

  const customerEmail = computed(() => C.value.contactPage.email)
  const hotlineDisplay = computed(() => C.value.contactPage.phones[0] ?? '')
  const hotlineTel = computed(() => phoneToTelHref(hotlineDisplay.value))

  return {
    companyName,
    footerLead,
    productCategoriesDetailed,
    heroSlides,
    profileParagraphs,
    newsList,
    showcaseProducts,
    aboutSideImage,
    contactAddress,
    hotlineTel,
    hotlineDisplay,
    customerEmail,
    icpRecordHref: computed(() => icpRecordHref),
    icpRecordText: computed(() => icpRecordText),
    categoryById: (id: string) => getCategoryByIdFromDemo(DEMO_SITE_TEMPLATES.template06, id)
  }
}
