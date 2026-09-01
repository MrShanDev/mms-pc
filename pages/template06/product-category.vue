<template>
  <ProductCategory v-if="category" :category="category" />
  <main v-else class="tita-sub">
    <div class="inner width_1400_auto">
      <p class="not-found">{{ t('productDetail.notFound') }}</p>
      <NuxtLink :to="r.product">{{ t('productItem.backToSeries') }}</NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import ProductCategory from './_components/ProductCategory.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

definePageMeta({ layout: 'default', requiresAuth: false })

const route = useRoute()
const r = useTemplate06Routes()

const rawId = computed(() => {
  const q = route.query.id
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

const validCategoryIds = new Set(
  DEMO_SITE_TEMPLATES.template06.productCatalog?.categories.map((c) => c.id) ?? []
)

const { t } = useAppLocale()
const { locale } = useI18n()
const { categoryById, companyName } = useTitaSite()

const category = computed(() => {
  if (!rawId.value || !validCategoryIds.has(rawId.value)) return undefined
  return categoryById(rawId.value)
})

const canonicalPath = computed(
  () =>
    `${MAIN_SITE_ROUTE_PREFIX}/product-category${rawId.value ? `?id=${encodeURIComponent(rawId.value)}` : ''}`
)

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(canonicalPath)

useHead(() => ({
  title: category.value?.label ?? t('product.metaTitle'),
  meta: [
    {
      name: 'description',
      content: category.value
        ? t('productDetail.metaDesc', {
            category: category.value.label,
            company: companyName.value
          })
        : t('product.metaDesc', { company: companyName.value })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 40vh;
  padding: 48px 0;
  background: #fafafa;
  font-family: 'Segoe UI', system-ui, -apple-system, Roboto, 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.not-found {
  margin: 0 0 16px;
  color: #888;
}

a {
  color: #b8860b;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
