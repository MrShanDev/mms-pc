<template>
  <OffSiteProductCategory :category="category" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import { OFF_SITE_ROUTE_PREFIX } from '@/utils/mcmsDemo'

definePageMeta({ layout: 'default', requiresAuth: false })

const route = useRoute()
const rawId = String(route.params.id)

if (!new Set(['15', '16', '17', '18', '19']).has(rawId)) {
  throw createError({ statusCode: 404, statusMessage: 'Product category not found' })
}

const { t } = useAppLocale()
const { locale } = useI18n()
const { categoryById, companyName } = useTitaSite()
const category = computed(() => categoryById(rawId)!)

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(
  `${OFF_SITE_ROUTE_PREFIX}/product/${rawId}`
)

useHead(() => ({
  title: category.value.label,
  meta: [
    {
      name: 'description',
      content: t('productDetail.metaDesc', {
        category: category.value.label,
        company: companyName.value
      })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
