<template>
  <!-- 对齐 361 首页：首屏 h700 + Products + Brand(黑底) + Blog -->
  <main>
    <HomeHeroCarousel :slides="slides" />

    <section id="products" class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-7 text-center mx-auto">
            <h2 class="serif">{{ home.productKicker }}</h2>
            <div class="pro-category">
              <NuxtLink
                v-for="cat in productCategories"
                :key="cat.slug"
                :to="{ path: '/template02/products', query: { category: cat.slug } }"
                class="category"
              >
                {{ cat.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div id="posts" class="row no-gutter">
          <div
            v-for="(p, i) in home.productTiles"
            :key="i"
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
      </div>
    </section>

    <section id="brand" class="site-section bg-black about-me">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-5 mb-md-0">
            <img :src="a.image" :alt="a.title" class="img-fluid">
          </div>
          <div class="col-md-5 ml-auto">
            <h3 class="text-white mb-5">{{ a.kicker }}</h3>
            <p class="text-white">{{ a.lead }}</p>
            <p v-for="(para, j) in a.paragraphs" :key="j" class="text-white">{{ para }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="blog" class="site-section bg-white">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-7 text-center mx-auto">
            <h2 class="serif">{{ home.newsKicker }}</h2>
          </div>
        </div>
        <div class="row">
          <div
            v-for="b in blogItems"
            :key="b.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="post-entry-1 h-100">
              <NuxtLink :to="{ path: '/template02/news-detail', query: { id: b.id } }">
                <img :src="b.image" alt="Image" class="img-fluid" loading="lazy">
              </NuxtLink>
              <div class="post-entry-1-contents">
                <h2>
                  <NuxtLink :to="{ path: '/template02/news-detail', query: { id: b.id } }">
                    {{ b.title }}
                  </NuxtLink>
                </h2>
                <span class="meta d-inline-block mb-3">{{ b.date }}</span>
                <p>{{ b.excerpt }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import HomeHeroCarousel from './HomeHeroCarousel.vue'

const { t } = useAppLocale()

const c = DEMO_SITE_TEMPLATES.template02
const home = c.home as Record<string, any>
const a = c.aboutPage

const slides = computed(() =>
  (home.bannerSlides || [{ image: c.aboutPage.image }]).map(
    (s: { image: string }, i: number) => ({
      title: t('demo.common.slideTitle', { n: i + 1 }),
      image: s.image,
      more: t('demo.common.moreButton'),
      lead: i === 0 ? String(home.productLead ?? '').trim() : ''
    })
  )
)

const productCategories = computed(() => c.productCatalog?.categories ?? [])

const blogItems = computed(() => c.newsPage.items.slice(0, 6))
</script>
