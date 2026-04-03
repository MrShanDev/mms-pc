<template>
  <SidebarPageLayout v-if="product" :title="categoryLabel || 'Product'" :crumbs="pdCrumbs" sidebar-mode="product">
    <div class="row">
      <div class="col-sm-12 col-md-6 showpic_box">
        <ul class="showpic_flash">
          <li v-for="(src, i) in gallerySlides" :key="i">
            <a href="javascript:void(0)" class="example-image-link">
              <img class="example-image" :src="src" :alt="product.title">
            </a>
          </li>
        </ul>
      </div>
      <div class="col-sm-12 col-md-6 proinfo_box">
        <h1 class="product_h1">{{ product.title }}</h1>
        <ul class="product_info">
          <li v-for="(s, i) in product.specs.slice(0, 4)" :key="i">{{ s.label }}: {{ s.value }}</li>
          <li>
            <NuxtLink :to="inquiryLink" class="btn btn-info page-btn">
              <span class="glyphicon glyphicon-triangle-right" aria-hidden="true" />
              INQUIRY
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="product_con">
      <p v-for="(para, pi) in detailBody" :key="pi">{{ para }}</p>
    </div>
    <div class="point">
      <span class="to_prev col-xs-12 col-sm-6 col-md-6">
        PREVIOUS:
        <NuxtLink
          v-if="adjacent.prev"
          :to="{ path: '/template04/product-detail', query: { slug: adjacent.prev.slug } }"
        >
          {{ adjacent.prev.title }}
        </NuxtLink>
        <span v-else>none</span>
      </span>
      <span class="to_next col-xs-12 col-sm-6 col-md-6">
        NEXT:
        <NuxtLink
          v-if="adjacent.next"
          :to="{ path: '/template04/product-detail', query: { slug: adjacent.next.slug } }"
        >
          {{ adjacent.next.title }}
        </NuxtLink>
        <span v-else>none</span>
      </span>
    </div>
    <template #after>
      <div v-if="relatedProducts.length" class="list_related">
        <h2 class="list_h2">Related Products</h2>
        <div class="product_list related_list">
          <div
            v-for="rp in relatedProducts"
            :key="rp.id"
            class="col-sm-4 col-md-3 col-mm-6 product_img"
          >
            <NuxtLink :to="{ path: '/template04/product-detail', query: { slug: rp.slug } }">
              <img :src="rp.image" class="img-thumbnail" :alt="rp.title">
            </NuxtLink>
            <p class="product_title">
              <NuxtLink
                :to="{ path: '/template04/product-detail', query: { slug: rp.slug } }"
                :title="rp.title"
              >
                {{ rp.title }}
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </template>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import type { E9Crumb } from '@/utils/template04E9'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug, template01RelatedProducts } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template04',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.slug || '').trim()) {
        return navigateTo('/template04/products')
      }
    }
  ]
})

const route = useRoute()
const slug = computed(() => String(route.query.slug || '').trim())
const C = DEMO_SITE_TEMPLATES.template04
const catalog = C.productCatalog!
const product = computed(() => (slug.value ? template01ProductBySlug(C, slug.value) : undefined))

watch(
  () => slug.value,
  (s) => {
    if (s && !template01ProductBySlug(C, s)) {
      throw createError({ statusCode: 404, statusMessage: '未找到该产品' })
    }
  },
  { immediate: true }
)

const categoryLabel = computed(
  () => catalog.categories.find((c) => c.id === product.value?.categoryId)?.label ?? ''
)

const pdCrumbs = computed((): E9Crumb[] => {
  const p = product.value
  if (!p) return []
  const cat = catalog.categories.find((c) => c.id === p.categoryId)
  return [
    { label: catalog.pageTitle, to: '/template04/products' },
    {
      label: cat?.label ?? '',
      to: cat ? { path: '/template04/products', query: { category: cat.slug } } : '/template04/products'
    },
    { label: p.title }
  ]
})

const inquiryLink = computed(() => ({
  path: '/template04/contact',
  query: { product: product.value?.slug ?? '' }
}))

const gallerySlides = computed(() => {
  const p = product.value
  if (!p) return []
  const raw = [...(p.gallery ?? [])]
  if (!raw.includes(p.image)) raw.unshift(p.image)
  return raw.length ? raw : [p.image]
})

const detailBody = computed(() => {
  const p = product.value
  if (!p) return []
  if (p.detailParagraphs?.length) return p.detailParagraphs
  const fromSpec = p.specs.map((s) => `${s.label}：${s.value}`).join('；')
  return [
    p.summary ?? '',
    fromSpec ? `规格概要：${fromSpec}` : '',
    `MOQ：${p.moq}；交期：${p.leadTime}。`
  ].filter(Boolean)
})

const relatedProducts = computed(() =>
  slug.value ? template01RelatedProducts(C, slug.value, 3) : []
)

const adjacent = computed(() => {
  const products = catalog.products
  const i = products.findIndex((p) => p.slug === slug.value)
  if (i < 0) return { prev: undefined as undefined, next: undefined as undefined }
  return {
    prev: i > 0 ? products[i - 1] : undefined,
    next: i < products.length - 1 ? products[i + 1] : undefined
  }
})

const { locale } = useI18n()
useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template04/product-detail?slug=${encodeURIComponent(slug.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: `${product.value?.title ?? 'Product'} — ${C.siteTitle}`,
    meta: [{ name: 'description', content: product.value?.summary ?? C.metaDescription }, ...og],
    link,
    htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
  }
})
</script>
