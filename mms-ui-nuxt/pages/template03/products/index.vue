<template>
  <main>
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">Home</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">PRODUCTS</span>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="container">
          <div class="c_1530_1">
            <div class="tit_1">
              <h3>{{ catalog.pageTitle }}<span /></h3>
            </div>
            <div class="pro-category mb-4 text-center">
              <NuxtLink :to="{ path: '/template03/products', query: {} }" class="category">All</NuxtLink>
              <NuxtLink
                v-for="cat in catalog.categories"
                :key="cat.id"
                :to="{ path: '/template03/products', query: { category: cat.slug } }"
                class="category"
              >
                {{ cat.label }}
              </NuxtLink>
            </div>
            <div id="posts" class="row no-gutter">
              <div
                v-for="p in filteredProducts"
                :key="p.id"
                class="item web col-6 col-sm-6 col-md-4 col-lg-4 mb-4"
              >
                <NuxtLink class="item-wrap" :to="{ path: '/template03/product-detail', query: { slug: p.slug } }">
                  <span class="icon-search2" />
                  <img class="img-fluid" :src="p.image" :alt="p.title" loading="lazy">
                </NuxtLink>
                <p class="text-center small mt-2">{{ p.title }}</p>
              </div>
            </div>
            <div class="basic-pagination text-center mt-2 mb-4">
              <a href="javascript:;">&lt;&lt;</a>
              <a href="javascript:;">&lt;</a>
              <a>1/1</a>
              <a href="javascript:;">&gt;</a>
              <a href="javascript:;">&gt;&gt;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerHeroBanner from '../_components/InnerHeroBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03
const catalog = C.productCatalog!
const route = useRoute()

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const activeSlug = computed(() => (route.query.category as string | undefined) || null)

const filteredProducts = computed(() => {
  const slug = activeSlug.value
  if (!slug) return catalog.products
  const cat = catalog.categories.find((c) => c.slug === slug)
  if (!cat) return catalog.products
  return catalog.products.filter((p) => p.categoryId === cat.id)
})

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/products')

useHead(() => ({
  title: `${catalog.pageTitle} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
