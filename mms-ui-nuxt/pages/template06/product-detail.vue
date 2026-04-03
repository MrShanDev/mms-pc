<template>
  <ProductDetail />
</template>

<script setup lang="ts">
import ProductDetail from './_components/ProductDetail.vue'
import { productCategoriesDetailed, useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()
const r = useTemplate06Routes()
const demo = productCategoriesDetailed[0]!.products[0]!

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(r.productDetail)

useHead(() => ({
  title: demo.title,
  meta: [
    {
      name: 'description',
      content: t('productItem.metaDesc', { title: demo.title, company: companyName.value })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
