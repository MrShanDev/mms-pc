<template>
  <SidebarPageLayout v-if="product" :title="categoryLabel || t('demo.common.productTitleFallback')" :crumbs="pdCrumbs" sidebar-mode="product">
    <div class="row tpl05-pd-top">
      <div class="col-sm-12 col-md-6 showpic_box tpl05-pd-gallery">
        <figure class="tpl05-pd-figure">
          <div class="tpl05-pd-main">
            <img
              class="example-image tpl05-pd-main-img"
              :src="activeGallerySrc"
              :alt="product.title"
              loading="eager"
              decoding="async"
            >
          </div>
          <figcaption class="sr-only">
            {{ t('demo.common.productDetail') }} — {{ product.title }}
          </figcaption>
        </figure>
        <div
          v-if="gallerySlides.length > 1"
          class="tpl05-pd-thumbs"
          role="tablist"
          :aria-label="t('demo.common.productDetail')"
        >
          <button
            v-for="(src, i) in gallerySlides"
            :key="i"
            type="button"
            class="tpl05-pd-thumb"
            :class="{ 'is-active': i === activeGalleryIdx }"
            role="tab"
            :aria-selected="i === activeGalleryIdx"
            @click="activeGalleryIdx = i"
          >
            <img :src="src" alt="" loading="lazy">
          </button>
        </div>
      </div>
      <div class="col-sm-12 col-md-6 proinfo_box tpl05-pd-info">
        <h1 class="product_h1">{{ product.title }}</h1>
        <p v-if="product.subtitle" class="tpl05-pd-subtitle">{{ product.subtitle }}</p>
        <div v-if="product.summary" class="tpl05-pd-lead-wrap">
          <span class="tpl05-pd-lead-kicker">{{ t('demo.common.productOverview') }}</span>
          <p class="tpl05-pd-lead">{{ product.summary }}</p>
        </div>

        <h3 class="tpl05-pd-section-title">{{ t('demo.common.productSpecs') }}</h3>
        <dl class="tpl05-pd-specs">
          <div v-for="(s, i) in product.specs" :key="i" class="tpl05-pd-spec-row">
            <dt>{{ s.label }}</dt>
            <dd>{{ s.value }}</dd>
          </div>
        </dl>

        <p class="tpl05-pd-meta">{{ t('demo.common.moqLead', { moq: product.moq, lead: product.leadTime }) }}</p>

        <NuxtLink :to="inquiryLink" class="btn btn-info page-btn tpl05-pd-cta">
          <span class="tpl05-pd-cta-ico" aria-hidden="true">›</span>
          {{ t('demo.common.inquiryCta') }}
        </NuxtLink>
      </div>
    </div>

    <div class="product_con tpl05-pd-body">
      <h3 class="left_h2 tpl05-pd-body-title">{{ t('demo.common.productDetail') }}</h3>
      <p v-for="(para, pi) in detailBody" :key="pi">{{ para }}</p>
    </div>

    <section v-if="mediaEntriesResolved.length" class="tpl05-pd-media">
      <article
        v-for="(block, bi) in mediaEntriesResolved"
        :key="bi"
        class="tpl05-pd-media-block contents"
      >
        <h3 class="left_h2">{{ block.title }}</h3>
        <p v-if="block.description">{{ block.description }}</p>
        <div v-if="block.images?.length" class="row tpl05-pd-media-grid">
          <div
            v-for="(img, ii) in block.images"
            :key="ii"
            class="col-xs-12 col-sm-6 col-md-4 tpl05-pd-media-cell"
          >
            <img class="img-responsive img-thumbnail tpl05-pd-media-img" :src="img" :alt="block.title" loading="lazy">
          </div>
        </div>
        <NuxtLink
          v-if="block.cta"
          :to="block.cta.href"
          class="btn btn-default tpl05-pd-media-cta"
        >
          {{ block.cta.label }}
        </NuxtLink>
      </article>
    </section>

    <div class="point tpl05-pd-nav">
      <span class="to_prev col-xs-12 col-sm-6 col-md-6">
        {{ t('demo.common.pdPrevLabel') }}
        <NuxtLink
          v-if="adjacent.prev"
          :to="{ path: '/template05/product-detail', query: { slug: adjacent.prev.slug } }"
        >
          {{ adjacent.prev.title }}
        </NuxtLink>
        <span v-else>{{ t('demo.common.noneShort') }}</span>
      </span>
      <span class="to_next col-xs-12 col-sm-6 col-md-6">
        {{ t('demo.common.pdNextLabel') }}
        <NuxtLink
          v-if="adjacent.next"
          :to="{ path: '/template05/product-detail', query: { slug: adjacent.next.slug } }"
        >
          {{ adjacent.next.title }}
        </NuxtLink>
        <span v-else>{{ t('demo.common.noneShort') }}</span>
      </span>
    </div>
    <template #after>
      <div v-if="relatedProducts.length" class="list_related tpl05-pd-related">
        <h2 class="left_h2">{{ t('demo.common.relatedProducts') }}</h2>
        <div class="product_list related_list row">
          <div
            v-for="rp in relatedProducts"
            :key="rp.id"
            class="col-sm-4 col-md-3 col-mm-6 product_img"
          >
            <NuxtLink :to="{ path: '/template05/product-detail', query: { slug: rp.slug } }">
              <img :src="rp.image" class="img-thumbnail" :alt="rp.title" loading="lazy">
            </NuxtLink>
            <p class="product_title">
              <NuxtLink
                :to="{ path: '/template05/product-detail', query: { slug: rp.slug } }"
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
import type { E7Crumb } from '@/utils/template05E7'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug, template01RelatedProducts } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template05',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.slug || '').trim()) {
        return navigateTo('/template05/products')
      }
    }
  ]
})

const route = useRoute()
const { t, locale } = useAppLocale()
const slug = computed(() => String(route.query.slug || '').trim())
const C = DEMO_SITE_TEMPLATES.template05
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

const pdCrumbs = computed((): E7Crumb[] => {
  const p = product.value
  if (!p) return []
  const cat = catalog.categories.find((c) => c.id === p.categoryId)
  return [
    { label: catalog.pageTitle, to: '/template05/products' },
    {
      label: cat?.label ?? '',
      to: cat ? { path: '/template05/products', query: { category: cat.slug } } : '/template05/products'
    },
    { label: p.title }
  ]
})

const inquiryLink = computed(() => ({
  path: '/template05/contact',
  query: { product: product.value?.slug ?? '' }
}))

const gallerySlides = computed(() => {
  const p = product.value
  if (!p) return []
  const raw = [...(p.gallery ?? [])]
  if (!raw.includes(p.image)) raw.unshift(p.image)
  return raw.length ? raw : [p.image]
})

const activeGalleryIdx = ref(0)
const activeGallerySrc = computed(() => gallerySlides.value[activeGalleryIdx.value] ?? '')

watch(
  () => slug.value,
  () => {
    activeGalleryIdx.value = 0
  }
)

watch(
  gallerySlides,
  () => {
    activeGalleryIdx.value = 0
  },
  { deep: true }
)

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

/** 演示数据里 CTA 可能指向 template01，统一为当前 template05 路由 */
function normalizeDemoPath(href: string) {
  return href.replace(/^\/template0[1-4](?=\/|$)/, '/template05')
}

const mediaEntriesResolved = computed(() => {
  const list = product.value?.mediaEntries
  if (!list?.length) return []
  return list.map((e) => ({
    ...e,
    cta: e.cta ? { ...e.cta, href: normalizeDemoPath(e.cta.href) } : undefined
  }))
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
  const path = `/template05/product-detail?slug=${encodeURIComponent(slug.value)}`
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

<style scoped>
.tpl05-pd-top {
  margin-bottom: 0;
}

.tpl05-pd-gallery {
  margin-bottom: 1.25rem;
}

@media (min-width: 992px) {
  .tpl05-pd-gallery {
    margin-bottom: 0;
  }
}

.tpl05-pd-figure {
  margin: 0 0 12px;
}

.tpl05-pd-main {
  background: #fafafa;
  border-radius: 4px;
  border: 1px solid #eee;
  overflow: hidden;
  text-align: center;
}

.tpl05-pd-main-img {
  display: block;
  width: 100%;
  max-height: 420px;
  object-fit: contain;
  margin: 0 auto;
}

.tpl05-pd-thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
}

.tpl05-pd-thumb {
  flex: 0 0 auto;
  width: 72px;
  height: 72px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.tpl05-pd-thumb:hover,
.tpl05-pd-thumb:focus {
  border-color: #90caf9;
  outline: none;
}

.tpl05-pd-thumb.is-active {
  border-color: #1260aa;
  box-shadow: 0 0 0 1px rgba(18, 96, 170, 0.25);
}

.tpl05-pd-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.tpl05-pd-subtitle {
  color: #666;
  font-size: 15px;
  line-height: 1.5;
  margin: 8px 0 12px;
}

.tpl05-pd-lead-wrap {
  margin: 0 0 16px;
}

.tpl05-pd-lead-kicker {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  margin-bottom: 6px;
}

.tpl05-pd-lead {
  color: #444;
  line-height: 1.65;
  margin: 0;
  padding: 12px 14px;
  background: #f9fafb;
  border-left: 3px solid #90caf9;
  border-radius: 0 4px 4px 0;
}

.tpl05-pd-section-title {
  margin: 0 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.tpl05-pd-specs {
  margin: 0 0 14px;
  padding: 0;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  overflow: hidden;
  font-size: 14px;
}

.tpl05-pd-spec-row {
  display: grid;
  grid-template-columns: minmax(88px, 32%) 1fr;
  gap: 0 12px;
  margin: 0;
  padding: 10px 12px;
  border-bottom: 1px solid #eee;
}

.tpl05-pd-spec-row:last-child {
  border-bottom: none;
}

.tpl05-pd-spec-row:nth-child(even) {
  background: #fafafa;
}

.tpl05-pd-specs dt {
  margin: 0;
  font-weight: 600;
  color: #555;
}

.tpl05-pd-specs dd {
  margin: 0;
  color: #333;
  word-break: break-word;
}

.tpl05-pd-meta {
  margin: 0 0 14px;
  font-size: 13px;
  color: #666;
  line-height: 1.55;
}

.tpl05-pd-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tpl05-pd-cta-ico {
  font-size: 18px;
  font-weight: 700;
  line-height: 1;
  margin-top: -1px;
}

.tpl05-pd-body-title {
  margin-top: 0;
}

.tpl05-pd-body {
  margin-top: 8px;
}

.tpl05-pd-media {
  margin-top: 8px;
}

.tpl05-pd-media-block {
  margin-bottom: 24px;
}

.tpl05-pd-media-block:last-child {
  margin-bottom: 0;
}

.tpl05-pd-media-grid {
  margin-top: 12px;
  margin-left: -8px;
  margin-right: -8px;
}

.tpl05-pd-media-cell {
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 12px;
}

.tpl05-pd-media-img {
  width: 100%;
  margin: 0 auto;
}

.tpl05-pd-media-cta {
  margin-top: 12px;
}

.tpl05-pd-nav {
  padding-top: 8px;
}

.tpl05-pd-related .related_list {
  margin-left: -8px;
  margin-right: -8px;
}
</style>
