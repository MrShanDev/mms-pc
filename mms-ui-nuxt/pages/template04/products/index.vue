<template>
  <SidebarPageLayout :title="pageListTitle" :crumbs="productCrumbs" sidebar-mode="product">
    <div class="product_list product_list2">
      <div
        v-for="p in filteredProducts"
        :key="p.id"
        class="col-sm-4 col-md-3 col-mm-6 product_img"
      >
        <NuxtLink :to="{ path: '/template04/product-detail', query: { slug: p.slug } }">
          <img :src="p.image" class="img-thumbnail" :alt="p.title" loading="lazy">
        </NuxtLink>
        <p class="product_title">
          <NuxtLink
            :to="{ path: '/template04/product-detail', query: { slug: p.slug } }"
            :title="p.title"
          >
            {{ p.title }}
          </NuxtLink>
        </p>
      </div>
    </div>
    <div class="page">
      <div class="case-btn page" role="navigation" :aria-label="t('demo.common.paginationDemo')">
        <span class="page-item page-link is-disabled">&lt;</span>
        <span class="page-info">1 / 1</span>
        <span class="page-item page-link is-disabled">&gt;</span>
      </div>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from '../_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template04', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template04
const catalog = C.productCatalog!
const route = useRoute()
const { t, locale } = useAppLocale()

const pageListTitle = computed(() => t('demo.common.crumbProductCenter'))
const productCrumbs = computed(() => [{ label: t('demo.common.crumbProductCenter') }])

const activeSlug = computed(() => (route.query.category as string | undefined) || null)

const filteredProducts = computed(() => {
  const slug = activeSlug.value
  if (!slug) return catalog.products
  const cat = catalog.categories.find((c) => c.slug === slug)
  if (!cat) return catalog.products
  return catalog.products.filter((p) => p.categoryId === cat.id)
})

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template04/products')

useHead(() => ({
  title: t('product.metaTitle'),
  meta: [{ name: 'description', content: t('product.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
