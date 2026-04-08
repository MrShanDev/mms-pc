<template>
  <SidebarPageLayout v-if="product" :title="categoryLabel || t('demo.common.productTitleFallback')" :crumbs="pdCrumbs" sidebar-mode="product">
    <div class="e9-pd">
      <div class="row e9-pd-hero">
        <div class="col-xs-12 col-md-6 e9-pd-gallery">
          <div class="e9-pd-gallery__main">
            <div class="e9-pd-gallery__frame">
              <img
                class="img-responsive e9-pd-gallery__img"
                :src="heroSrc"
                :alt="product.title"
                loading="eager"
              >
            </div>
          </div>
          <ul v-if="gallerySlides.length > 1" class="e9-pd-gallery__thumbs list-unstyled">
            <li
              v-for="(src, i) in gallerySlides"
              :key="i"
              :class="{ active: i === galleryActive }"
            >
              <button
                type="button"
                class="e9-pd-gallery__thumb"
                :aria-label="t('demo.common.carouselBannerAlt', { n: i + 1 })"
                :aria-current="i === galleryActive ? 'true' : undefined"
                @click="galleryActive = i"
              >
                <img class="img-responsive" :src="src" alt="">
              </button>
            </li>
          </ul>
        </div>

        <div class="col-xs-12 col-md-6 e9-pd-meta">
          <h1 class="product_h1 e9-pd-title">{{ product.title }}</h1>
          <p v-if="product.subtitle" class="e9-pd-subtitle">{{ product.subtitle }}</p>

          <dl v-if="specRows.length" class="e9-pd-specs">
            <template v-for="(s, i) in specRows" :key="i">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.value }}</dd>
            </template>
          </dl>

          <div class="e9-pd-actions">
            <NuxtLink :to="inquiryLink" class="btn btn-info btn-lg page-btn e9-pd-inquiry">
              <span class="glyphicon glyphicon-triangle-right" aria-hidden="true" />
              {{ t('demo.common.inquiryCta') }}
            </NuxtLink>
          </div>
        </div>
      </div>

      <section class="e9-pd-body product_con">
        <h3 class="e9-pd-body__title">{{ t('demo.common.productDetail') }}</h3>
        <p v-for="(para, pi) in detailBody" :key="pi">{{ para }}</p>
      </section>

      <nav class="e9-pd-adj point" :aria-label="t('demo.common.pdAdjacentNav')">
        <div class="row clearfix">
          <div class="e9-pd-adj__item e9-pd-adj__prev col-xs-12 col-sm-6">
            <span class="e9-pd-adj__label">{{ t('demo.common.pdPrevLabel') }}</span>
            <NuxtLink
              v-if="adjacent.prev"
              class="e9-pd-adj__link"
              :to="{ path: '/template04/product-detail', query: { slug: adjacent.prev.slug } }"
            >
              {{ adjacent.prev.title }}
            </NuxtLink>
            <span v-else class="e9-pd-adj__none">{{ t('demo.common.noneShort') }}</span>
          </div>
          <div class="e9-pd-adj__item e9-pd-adj__next col-xs-12 col-sm-6">
            <span class="e9-pd-adj__label">{{ t('demo.common.pdNextLabel') }}</span>
            <NuxtLink
              v-if="adjacent.next"
              class="e9-pd-adj__link"
              :to="{ path: '/template04/product-detail', query: { slug: adjacent.next.slug } }"
            >
              {{ adjacent.next.title }}
            </NuxtLink>
            <span v-else class="e9-pd-adj__none">{{ t('demo.common.noneShort') }}</span>
          </div>
        </div>
      </nav>
    </div>

    <template #after>
      <div v-if="relatedProducts.length" class="list_related e9-pd-related">
        <h2 class="list_h2">{{ t('demo.common.relatedProducts') }}</h2>
        <div class="product_list related_list row clearfix">
          <div
            v-for="rp in relatedProducts"
            :key="rp.id"
            class="col-xs-6 col-sm-4 col-md-4 col-mm-6 product_img"
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
const { t, locale } = useAppLocale()
const slug = computed(() => String(route.query.slug || '').trim())
const C = DEMO_SITE_TEMPLATES.template04
const catalog = C.productCatalog!
const product = computed(() => (slug.value ? template01ProductBySlug(C, slug.value) : undefined))

watch(
  () => slug.value,
  (s) => {
    if (s && !template01ProductBySlug(C, s)) {
      throw createError({ statusCode: 404, statusMessage: t('demo.common.productNotFound') })
    }
  },
  { immediate: true }
)

const categoryLabel = computed(
  () => catalog.categories.find((c) => c.id === product.value?.categoryId)?.label ?? ''
)

const specRows = computed(() => product.value?.specs?.slice(0, 5) ?? [])

const pdCrumbs = computed((): E9Crumb[] => {
  const p = product.value
  if (!p) return []
  const cat = catalog.categories.find((c) => c.id === p.categoryId)
  return [
    { label: t('demo.common.crumbProductCenter'), to: '/template04/products' },
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

const galleryActive = ref(0)

const heroSrc = computed(() => gallerySlides.value[galleryActive.value] ?? '')

watch(
  () => product.value?.slug,
  () => {
    galleryActive.value = 0
  }
)

watch(gallerySlides, (slides) => {
  if (galleryActive.value >= slides.length) galleryActive.value = 0
})

const detailBody = computed(() => {
  const p = product.value
  if (!p) return []
  if (p.detailParagraphs?.length) return p.detailParagraphs
  const fromSpec = p.specs.map((s) => `${s.label}：${s.value}`).join('；')
  return [
    p.summary ?? '',
    fromSpec ? `${t('demo.common.specSummary')}${fromSpec}` : '',
    t('demo.common.moqLead', { moq: p.moq, lead: p.leadTime })
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

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template04/product-detail?slug=${encodeURIComponent(slug.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: product.value?.title ?? t('product.metaTitle'),
    meta: [
      {
        name: 'description',
        content: t('productItem.metaDesc', {
          title: product.value?.title ?? '',
          company: C.siteTitle
        })
      },
      ...og
    ],
    link,
    htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
  }
})
</script>
