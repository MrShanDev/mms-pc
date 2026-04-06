<template>
  <main class="tpl03-product-list-page">
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid tpl03-product-list__crumb-wrap">
        <div class="container">
          <nav class="headline tpl03-product-list__crumb" :aria-label="t('demo.common.breadcrumb')">
            <NuxtLink to="/template03" class="ms-channel-path-index">{{ t('nav.home') }}</NuxtLink>
            <span class="tpl03-product-list__crumb-sep" aria-hidden="true">&gt;&gt;</span>
            <span class="ms-channel-path-link">{{ t('demo.common.crumbProductCenter') }}</span>
          </nav>
        </div>
      </div>

      <div class="container-fluid tpl03-product-list__body-wrap">
        <div class="container">
          <section class="c_1530_1 tpl03-product-list">
            <header class="tit_1 tpl03-product-list__header">
              <h3>{{ catalog.pageTitle }}<span /></h3>
              <p v-if="pageLead" class="tpl03-product-list__lead">{{ pageLead }}</p>
            </header>

            <div class="tpl03-product-list__filters" role="toolbar" :aria-label="t('demo.common.categories')">
              <NuxtLink
                :to="{ path: '/template03/products', query: {} }"
                class="tpl03-category-pill"
                :class="{ 'is-active': !activeSlug }"
              >
                {{ t('demo.common.all') }}
              </NuxtLink>
              <NuxtLink
                v-for="cat in catalog.categories"
                :key="cat.id"
                :to="{ path: '/template03/products', query: { category: cat.slug } }"
                class="tpl03-category-pill"
                :class="{ 'is-active': activeSlug === cat.slug }"
              >
                {{ cat.label }}
              </NuxtLink>
            </div>

            <div id="posts" class="row tpl03-product-list__grid">
              <div
                v-for="p in filteredProducts"
                :key="p.id"
                class="item web col-xs-6 col-sm-6 col-md-4 col-lg-4 tpl03-product-list__item"
              >
                <article class="tpl03-product-card">
                  <NuxtLink
                    class="item-wrap tpl03-product-card__media"
                    :to="{ path: '/template03/product-detail', query: { slug: p.slug } }"
                  >
                    <span class="icon-search2 tpl03-product-card__zoom" />
                    <img class="tpl03-product-card__img" :src="p.image" :alt="p.title" loading="lazy">
                  </NuxtLink>
                  <h4 class="tpl03-product-card__title">
                    <NuxtLink :to="{ path: '/template03/product-detail', query: { slug: p.slug } }">
                      {{ p.title }}
                    </NuxtLink>
                  </h4>
                </article>
              </div>
            </div>

            <div
              class="basic-pagination tpl03-product-list__pager text-center"
              role="navigation"
              :aria-label="t('demo.common.paginationDemo')"
            >
              <span class="tpl03-pager__btn is-disabled" aria-hidden="true">&lt;&lt;</span>
              <span class="tpl03-pager__btn is-disabled" aria-hidden="true">&lt;</span>
              <span class="tpl03-pager__info">1 / 1</span>
              <span class="tpl03-pager__btn is-disabled" aria-hidden="true">&gt;</span>
              <span class="tpl03-pager__btn is-disabled" aria-hidden="true">&gt;&gt;</span>
            </div>
          </section>
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

const pageLead = computed(() => {
  const raw = catalog.pageLead
  const s = raw != null ? String(raw).trim() : ''
  return s || ''
})

const filteredProducts = computed(() => {
  const slug = activeSlug.value
  if (!slug) return catalog.products
  const cat = catalog.categories.find((c) => c.slug === slug)
  if (!cat) return catalog.products
  return catalog.products.filter((p) => p.categoryId === cat.id)
})

const { t, locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/products')

useHead(() => ({
  title: `${t('demo.common.crumbProductCenter')} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
