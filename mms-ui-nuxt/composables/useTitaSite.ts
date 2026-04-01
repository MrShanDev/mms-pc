import { computed } from 'vue'
import {
  aboutSideImage,
  companyName,
  footerLead,
  getProductCategory,
  heroSlides,
  hotlineDisplay,
  hotlineTel,
  navProductCategories,
  newsList,
  productCategoriesDetailed,
  profileParagraphs,
  showcaseProducts
} from '@/utils/titaSiteContent'

/** 站点 mock 数据与展示字段；不随界面语言变化，见 i18n/CONVENTIONS.md */
export function useTitaSite() {
  return {
    companyName: computed(() => companyName),
    footerLead: computed(() => footerLead),
    navProductCategories: computed(() => navProductCategories),
    productCategoriesDetailed: computed(() => productCategoriesDetailed),
    heroSlides: computed(() => heroSlides),
    profileParagraphs: computed(() => profileParagraphs),
    newsList: computed(() => newsList),
    showcaseProducts: computed(() => showcaseProducts),
    aboutSideImage,
    hotlineTel,
    hotlineDisplay,
    categoryById: (id: string) => getProductCategory(id)
  }
}
