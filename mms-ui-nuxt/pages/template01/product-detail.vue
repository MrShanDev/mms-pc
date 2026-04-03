<template>
  <main v-if="product" class="tpl-sub-page tpl-sub-page--product-detail ms-product-detail">
    <!-- 内页顶横幅（对齐演示站 banner-in） -->
    <div class="pd-banner">
      <div class="pd-banner-bg" :style="{ backgroundImage: `url(${bannerSrc})` }" role="img" :aria-label="product.title">
        <div class="pd-banner-overlay">
          <div class="pd-page-inner">
            <h3 class="pd-banner-lead">{{ catalog.pageLead }}</h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 分类 Tab + 面包屑（对齐 case-bg / wrap-sidenav） -->
    <div class="pd-toolbar-bg">
      <div class="pd-page-inner pd-toolbar">
        <nav class="pd-sidenav" :aria-label="t('demo.common.productCategoryNav')">
          <ul>
            <li>
              <NuxtLink class="pd-cat-link" :to="{ path: '/template01/products', query: {} }">
                {{ t('demo.common.all') }}
              </NuxtLink>
            </li>
            <li v-for="cat in catalog.categories" :key="cat.id">
              <NuxtLink
                class="pd-cat-link"
                :class="{ active: cat.id === product.categoryId }"
                :to="{ path: '/template01/products', query: { category: cat.slug } }"
              >
                {{ cat.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
        <nav class="pd-address" :aria-label="t('demo.common.breadcrumb')">
          <NuxtLink to="/template01" class="pd-addr-home" :title="t('demo.common.home')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
            </svg>
          </NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <NuxtLink to="/template01">{{ t('demo.common.home') }}</NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <NuxtLink to="/template01/products">{{ catalog.pageTitle }}</NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <NuxtLink :to="{ path: '/template01/products', query: categoryQuery }">{{ categoryLabel }}</NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <span class="pd-addr-current">{{ product.title }}</span>
        </nav>
      </div>
    </div>

    <div class="pd-page-inner pd-main">
      <div class="product-details-content">
        <div class="p-d-c-introduce">
          <div class="p-d-c-left">
            <div class="slider-for">
              <img :src="heroSrc" :alt="product.title" loading="eager">
            </div>
            <div v-if="gallerySlides.length > 1" class="slider-nav">
              <button
                v-for="(src, i) in gallerySlides"
                :key="i"
                type="button"
                class="slider-nav-item"
                :class="{ active: i === activeIdx }"
                @click="activeIdx = i"
              >
                <img :src="src" alt="" loading="lazy">
              </button>
            </div>
          </div>
          <div class="p-d-c-right">
            <h1 class="p-d-c-right-title">{{ product.title }}</h1>
            <p v-if="product.subtitle" class="p-d-c-right-sub">{{ product.subtitle }}</p>
            <p class="p-d-c-right-intro">{{ product.summary }}</p>
            <div class="p-d-c-right-link">
              <NuxtLink class="btn-contact" :to="inquiryLink">{{ t('demo.common.contactUs') }}</NuxtLink>
              <button type="button" class="btn-msg" @click="scrollToMessage">{{ t('demo.common.message') }}</button>
            </div>
          </div>
        </div>

        <div class="p-d-c-txt-3">
          <h2 class="p-d-c-title-1">{{ t('demo.common.productDetail') }}</h2>
          <div class="p-d-c-p-1">
            <p v-for="(para, pi) in detailBody" :key="pi">{{ para }}</p>
          </div>
        </div>

        <div id="product-detail-message" class="p-d-c-form-wrap">
          <h2 class="p-d-c-title-1">{{ t('demo.common.leaveMessageTitle') }}</h2>
          <form class="p-d-c-form" @submit.prevent="onMessageSubmit">
            <div class="p-d-c-form-row">
              <label class="p-d-c-field">
                <span class="p-d-c-label">{{ t('demo.common.yourName') }}</span>
                <input v-model="msgForm.name" type="text" name="name" autocomplete="name" :placeholder="t('demo.common.namePlaceholder')">
              </label>
              <label class="p-d-c-field">
                <span class="p-d-c-label">{{ t('demo.common.phone') }}</span>
                <input v-model="msgForm.phone" type="tel" name="phone" autocomplete="tel" :placeholder="t('demo.common.phonePlaceholder')">
              </label>
              <label class="p-d-c-field">
                <span class="p-d-c-label">{{ t('demo.common.email') }}</span>
                <input v-model="msgForm.email" type="email" name="email" autocomplete="email" :placeholder="t('demo.common.emailPlaceholder')">
              </label>
            </div>
            <label class="p-d-c-field p-d-c-field-full">
              <span class="p-d-c-label">{{ t('demo.common.messageContent') }}</span>
              <textarea v-model="msgForm.message" name="message" rows="5" :placeholder="messagePlaceholder" />
            </label>
            <button type="submit" class="p-d-c-submit">{{ t('demo.common.submitMessage') }}</button>
          </form>
        </div>

        <section v-if="relatedProducts.length" class="p-d-c-related">
          <h2 class="p-d-c-title-1">{{ t('demo.common.relatedProducts') }}</h2>
          <div class="p-d-c-related-list">
            <ul>
              <li v-for="rp in relatedProducts" :key="rp.id">
                <NuxtLink :to="{ path: '/template01/product-detail', query: { slug: rp.slug } }" class="p-d-c-related-card">
                  <div class="p-d-c-related-list-img">
                    <img :src="rp.image" :alt="rp.title" loading="lazy">
                  </div>
                  <div class="p-d-c-related-list-txt">{{ rp.title }}</div>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug, template01RelatedProducts } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template01',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.slug || '').trim()) {
        return navigateTo('/template01/products')
      }
    }
  ]
})

const route = useRoute()
const { t, locale } = useI18n()
const slug = computed(() => String(route.query.slug || '').trim())
const C = DEMO_SITE_TEMPLATES.template01
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
const categoryQuery = computed(() => {
  const p = product.value
  if (!p) return {}
  const cat = catalog.categories.find((c) => c.id === p.categoryId)
  return cat ? { category: cat.slug } : {}
})

const inquiryLink = computed(() => ({
  path: '/template01/contact',
  query: { product: product.value?.slug ?? '' }
}))

const bannerSrc = computed(() => C.home.bannerSlides[0]?.image ?? product.value?.image ?? '')

const gallerySlides = computed(() => {
  const p = product.value
  if (!p) return []
  const raw = [...(p.gallery ?? [])]
  if (!raw.includes(p.image)) raw.unshift(p.image)
  return raw.length ? raw : [p.image]
})

const activeIdx = ref(0)
const heroSrc = computed(() => gallerySlides.value[activeIdx.value] ?? product.value?.image ?? '')

watch(
  () => slug.value,
  () => {
    activeIdx.value = 0
  }
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

const relatedProducts = computed(() =>
  slug.value ? template01RelatedProducts(C, slug.value, 3) : []
)

const messagePlaceholder = computed(() =>
  t('demo.common.msgInquiryPlaceholder', { title: product.value?.title ?? '' })
)

const msgForm = reactive({
  name: '',
  phone: '',
  email: '',
  message: ''
})

function scrollToMessage() {
  document.getElementById('product-detail-message')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function onMessageSubmit() {
  if (!msgForm.email.trim()) {
    ElMessage.warning(t('demo.common.fillEmail'))
    return
  }
  ElMessage.success(t('demo.common.demoFormNoSubmit'))
}

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template01/product-detail?slug=${encodeURIComponent(slug.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: `${product.value?.title ?? t('demo.common.productDetail')} — ${C.siteTitle}`,
    meta: [{ name: 'description', content: product.value?.summary ?? C.metaDescription }, ...og],
    link,
    htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
  }
})
</script>

<style scoped>
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.pd-banner {
  width: 100%;
}

.pd-banner-bg {
  min-height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

@media (min-width: 900px) {
  .pd-banner-bg {
    min-height: 280px;
  }
}

.pd-banner-overlay {
  min-height: inherit;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.15) 55%, transparent 100%);
}

.pd-banner-lead {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  max-width: 720px;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .pd-banner-lead {
    font-size: 22px;
    color: #029c6a;
    text-shadow: none;
    background: rgba(255, 255, 255, 0.92);
    padding: 16px 22px;
    border-radius: 2px;
  }
}

.pd-toolbar-bg {
  background: #f8f8f8;
  border-bottom: 1px solid #ececec;
}

.pd-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding-top: 14px;
  padding-bottom: 14px;
}

.pd-sidenav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 10px;
}

.pd-cat-link {
  display: inline-block;
  padding: 8px 18px;
  font-size: 14px;
  color: #333;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.pd-cat-link:hover {
  border-color: #029c6a;
  color: #029c6a;
}

.pd-cat-link.active {
  background: #029c6a;
  border-color: #029c6a;
  color: #fff !important;
}

.pd-address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 4px;
  font-size: 14px;
  color: #adadad;
}

.pd-address a {
  color: #adadad;
  text-decoration: none;
  transition: color 0.15s;
}

.pd-address a:hover {
  color: #029c6a;
}

.pd-addr-home {
  display: inline-flex;
  color: #adadad;
  margin-right: 2px;
}

.pd-addr-home:hover {
  color: #029c6a;
}

.pd-addr-sep {
  margin: 0 2px;
  color: #c8c8c8;
  user-select: none;
}

.pd-addr-current {
  color: #666;
  max-width: 280px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (max-width: 1279px) {
  .pd-address {
    display: none;
  }
}

.pd-main {
  padding-top: 28px;
  padding-bottom: 48px;
}

.product-details-content {
  width: 100%;
}

.p-d-c-introduce {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 36px;
  margin-bottom: 36px;
}

.p-d-c-left {
  flex: 1 1 320px;
  display: flex;
  flex-direction: row;
  gap: 0;
  min-width: 0;
  border: 1px solid #eaeaea;
  background: #fafafa;
}

.slider-for {
  flex: 1;
  min-width: 0;
  aspect-ratio: 1;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider-for img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slider-nav {
  flex: 0 0 100px;
  width: 100px;
  max-height: 100%;
  background: #f5f5f5;
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow-y: auto;
  box-sizing: border-box;
}

.slider-nav-item {
  border: 3px solid transparent;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background: none;
  line-height: 0;
  border-radius: 2px;
}

.slider-nav-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  vertical-align: top;
}

.slider-nav-item.active {
  border-color: #029c6a;
}

.p-d-c-right {
  flex: 1 1 280px;
  min-width: 0;
  padding-top: 8px;
}

.p-d-c-right-title {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 34px);
  font-weight: 700;
  color: #333;
  line-height: 1.25;
}

.p-d-c-right-sub {
  margin: 0 0 14px;
  font-size: 14px;
  color: #888;
}

.p-d-c-right-intro {
  margin: 0 0 22px;
  font-size: 16px;
  line-height: 1.75;
  color: #666;
}

.p-d-c-right-link {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px 0 0;
}

.btn-contact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 12px 24px;
  background: #029c6a;
  color: #fff !important;
  font-size: 15px;
  text-decoration: none;
  border-radius: 2px;
  border: none;
  transition: filter 0.15s;
}

.btn-contact:hover {
  filter: brightness(0.95);
}

.btn-msg {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 12px 24px;
  background: #323232;
  color: #fff;
  font-size: 15px;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-msg:hover {
  background: #454545;
}

.p-d-c-txt-3,
.p-d-c-form-wrap,
.p-d-c-related {
  margin-bottom: 32px;
}

.p-d-c-title-1 {
  margin: 0 0 0;
  padding: 12px 18px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  background: #e7e8ea;
}

.p-d-c-p-1 {
  padding: 20px 18px 8px;
  border: 1px solid #eaeaea;
  border-top: none;
  background: #fff;
}

.p-d-c-p-1 p {
  margin: 0 0 14px;
  font-size: 15px;
  line-height: 1.85;
  color: #555;
}

.p-d-c-form {
  padding: 22px 18px 24px;
  border: 1px solid #eaeaea;
  border-top: none;
  background: #fff;
}

.p-d-c-form-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px 18px;
  margin-bottom: 16px;
}

@media (max-width: 900px) {
  .p-d-c-form-row {
    grid-template-columns: 1fr;
  }

  .p-d-c-left {
    flex-direction: column;
  }

  .slider-nav {
    flex-direction: row;
    flex: none;
    width: 100%;
    max-height: none;
    overflow-x: auto;
    padding: 10px;
  }

  .slider-nav-item {
    flex: 0 0 72px;
  }
}

.p-d-c-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.p-d-c-field-full {
  grid-column: 1 / -1;
  margin-bottom: 16px;
}

.p-d-c-label {
  font-size: 14px;
  color: #555;
}

.p-d-c-field input,
.p-d-c-field textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #d8d8d8;
  border-radius: 2px;
  font-family: inherit;
}

.p-d-c-field textarea {
  resize: vertical;
  min-height: 120px;
}

.p-d-c-submit {
  padding: 11px 36px;
  font-size: 15px;
  color: #fff;
  background: #029c6a;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  transition: filter 0.15s;
}

.p-d-c-submit:hover {
  filter: brightness(0.95);
}

.p-d-c-related-list ul {
  list-style: none;
  margin: 0;
  padding: 16px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 24px 2%;
}

.p-d-c-related-list ul li {
  width: 32%;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .p-d-c-related-list ul li {
    width: 48%;
  }
}

@media (max-width: 480px) {
  .p-d-c-related-list ul li {
    width: 100%;
  }
}

.p-d-c-related-card {
  display: block;
  text-decoration: none;
  color: inherit;
}

.p-d-c-related-list-img {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background: #f3f3f3;
  border: 1px solid #eee;
}

.p-d-c-related-list-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.35s ease;
}

.p-d-c-related-card:hover .p-d-c-related-list-img img {
  transform: scale(1.08);
}

.p-d-c-related-list-txt {
  margin-top: 14px;
  font-size: 15px;
  color: #666;
  text-align: center;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.p-d-c-related-card:hover .p-d-c-related-list-txt {
  color: #029c6a;
}
</style>
