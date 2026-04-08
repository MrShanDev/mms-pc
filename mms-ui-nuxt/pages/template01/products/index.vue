<template>
  <main class="ms-sub-products">
    <InnerPageBanner
      home-path="/template01"
      :banner-src="bannerSrc"
      :banner-lead="bannerLead"
      :banner-alt="catalog.pageTitle"
      :crumbs="crumbs"
    >
      <template #sidenav>
        <li :class="{ active: !activeSlug }">
          <NuxtLink :to="{ path: '/template01/products', query: {} }">{{ t('demo.common.all') }}</NuxtLink>
        </li>
        <li
          v-for="cat in catalog.categories"
          :key="cat.id"
          :class="{ active: activeSlug === cat.slug }"
        >
          <NuxtLink :to="{ path: '/template01/products', query: { category: cat.slug } }">
            {{ cat.label }}
          </NuxtLink>
        </li>
      </template>
    </InnerPageBanner>

    <div class="pd-page-inner">
      <div class="case-list-1 product-list-1">
        <ul>
          <li v-for="p in filteredProducts" :key="p.id">
            <div class="case-img-1">
              <img :src="p.image" :alt="p.title" loading="lazy">
              <NuxtLink
                class="case-position"
                :to="{ path: '/template01/product-detail', query: { slug: p.slug } }"
                :aria-label="t('demo.common.viewProductAria', { title: p.title })"
              />
            </div>
            <div class="case-txt-1">
              <NuxtLink
                class="case-txt-link"
                :to="{ path: '/template01/product-detail', query: { slug: p.slug } }"
              >
                {{ p.title }}
              </NuxtLink>
            </div>
          </li>
        </ul>
        <div class="case-btn page" role="navigation" :aria-label="t('demo.common.paginationDemo')">
          <span class="page-item page-link is-disabled">&lt;</span>
          <span class="page-info">1 / 1</span>
          <span class="page-item page-link is-disabled">&gt;</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageBanner from '../_components/InnerPageBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template01', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template01
const catalog = C.productCatalog!

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/cms/category/1688608258562.jpg')
const bannerLead = catalog.pageLead ?? C.contactPage.bannerLead ?? ''

const route = useRoute()
const { t, locale } = useAppLocale()

const crumbs = computed(() => [
  { label: t('demo.common.home'), to: '/template01' },
  { label: t('demo.common.crumbProductCenter'), to: '/template01/products' }
])

const activeSlug = computed(() => (route.query.category as string | undefined) || null)

const filteredProducts = computed(() => {
  const slug = activeSlug.value
  if (!slug) return catalog.products
  const cat = catalog.categories.find((c) => c.slug === slug)
  if (!cat) return catalog.products
  return catalog.products.filter((p) => p.categoryId === cat.id)
})

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template01/products')

useHead(() => ({
  title: t('product.metaTitle'),
  meta: [{ name: 'description', content: t('product.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.case-list-1 {
  float: left;
  width: 100%;
  padding-bottom: 48px;
}

.case-list-1::after {
  content: '';
  display: table;
  clear: both;
}

.case-list-1 ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
}

.case-list-1 ul li {
  width: 31.9%;
  margin-right: 2.15%;
  margin-top: 18px;
  font-family: 'Microsoft YaHei', sans-serif;
}

.case-list-1 ul li:nth-child(3n) {
  margin-right: 0;
}

.case-img-1 {
  position: relative;
  width: 100%;
  overflow: hidden;
  float: left;
}

.case-img-1 img {
  width: 100%;
  display: block;
  vertical-align: top;
  transition: transform 0.35s ease;
}

.case-list-1 ul li:hover .case-img-1 img {
  transform: scale(1.08);
}

.case-position {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: url('https://193.mstore.demo.mingsoft.net/193/images/bg-1.png') center / contain
    no-repeat;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.case-list-1 ul li:hover .case-position {
  opacity: 1;
}

.case-txt-1 {
  float: left;
  width: 100%;
  min-height: 58px;
  line-height: 1.35;
  padding: 14px 8px;
  text-align: center;
  font-size: 16px;
  color: #666;
  box-sizing: border-box;
  transition: color 0.25s, background 0.25s;
}

.case-txt-link {
  color: inherit;
  text-decoration: none;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.case-list-1.product-list-1 ul li:hover .case-txt-1 {
  background: transparent;
  color: #029c6a;
}

.case-btn.page {
  float: left;
  width: 100%;
  margin-top: 36px;
  text-align: center;
  font-size: 15px;
  color: #666;
}

.case-btn .page-item {
  display: inline-block;
  min-width: 40px;
  padding: 8px 14px;
  margin: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.case-btn .page-item.is-disabled {
  opacity: 0.45;
  cursor: default;
}

.page-info {
  display: inline-block;
  padding: 8px 12px;
}
</style>
