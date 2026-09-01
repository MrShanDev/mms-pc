<template>
  <!-- 对齐 361 Products 列表：内顶区 + pro-category + 宫格 + 分页 -->
  <main>
    <InnerPageCover
      :title="t('demo.common.crumbProductCenter')"
      :lead="bannerLead"
      :background-image="innerBannerSrc"
    />
    <div class="site-section">
      <div class="container">
        <div class="pro-category mb-4 mt-0">
          <NuxtLink :to="{ path: '/template02/products', query: {} }" class="category" :class="{ active: !activeSlug }">
            {{ t('demo.common.all') }}
          </NuxtLink>
          <NuxtLink
            v-for="cat in catalog.categories"
            :key="cat.id"
            :to="{ path: '/template02/products', query: { category: cat.slug } }"
            class="category"
            :class="{ active: activeSlug === cat.slug }"
          >
            {{ cat.label }}
          </NuxtLink>
        </div>
        <div id="posts" class="row no-gutter">
          <div
            v-for="p in filteredProducts"
            :key="p.id"
            class="item web col-6 col-sm-6 col-md-6 col-lg-4 col-xl-4 mb-4"
          >
            <NuxtLink
              class="item-wrap"
              :title="p.title"
              :to="{ path: '/template02/product-detail', query: { slug: p.slug } }"
            >
              <span class="icon-search2" />
              <img class="img-fluid" :src="p.image" :alt="p.title" loading="lazy">
            </NuxtLink>
          </div>
        </div>
        <div class="basic-pagination text-center mt-2 mb-0" role="navigation" :aria-label="t('demo.common.paginationDemo')">
          <a href="javascript:;">&lt;&lt;</a>
          <a href="javascript:;">&lt;</a>
          <a>1/1</a>
          <a href="javascript:;">&gt;</a>
          <a href="javascript:;">&gt;&gt;</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageCover from '../_components/InnerPageCover.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template02
const catalog = C.productCatalog!

const innerBannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')
const bannerLead = computed(() => t('demo.common.innerProductListBannerLead'))

const route = useRoute()
const activeSlug = computed(() => (route.query.category as string | undefined) || null)

const filteredProducts = computed(() => {
  const slug = activeSlug.value
  if (!slug) return catalog.products
  const cat = catalog.categories.find((c) => c.slug === slug)
  if (!cat) return catalog.products
  return catalog.products.filter((p) => p.categoryId === cat.id)
})

const { t, locale } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/products')

useHead(() => ({
  title: t('product.metaTitle'),
  meta: [{ name: 'description', content: t('product.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
