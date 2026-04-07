<template>
  <ProductDetail />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductDetail from './_components/ProductDetail.vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const route = useRoute()
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, productCategoriesDetailed } = useTitaSite()
const { findBySlug } = useTemplate06ProductLookup()
const r = useTemplate06Routes()

const slug = computed(() => {
  const q = route.query.slug
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

const demo = computed(() => {
  if (slug.value) {
    const hit = findBySlug(slug.value)
    if (hit) return hit.product
  }
  return productCategoriesDetailed.value[0]?.products[0]
})

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(r.productDetail)

useHead(() => ({
  title: demo.value?.title ?? t('product.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('productItem.metaDesc', {
        title: demo.value?.title ?? '',
        company: companyName.value
      })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
