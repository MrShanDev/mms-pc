<template>
  <!-- 对齐 e7 首页：flash → group-img(3) → Product → box_contact → News → link_box -->
  <div class="container">
    <div class="flash">
      <el-carousel height="360px" arrow="hover" :interval="5000">
        <el-carousel-item v-for="(s, i) in slides" :key="i">
          <a href="javascript:void(0)">
            <img :src="s.image" :alt="t('demo.common.carouselBannerAlt', { n: i + 1 })" width="100%">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="row group-img">
      <div
        v-for="(p, i) in groupTopThree"
        :key="i"
        class="col-sm-4 col-md-4 adv_img"
        data-move-y="170px"
      >
        <div style="overflow: hidden">
          <NuxtLink :to="{ path: '/template05/product-detail', query: { slug: p.slug } }">
            <img :src="p.image" :alt="p.title">
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>

  <div class="main">
    <div class="container product_box">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="index_product">
            <h2 class="title_h2" data-move-y="-100px">{{ productTitle }}</h2>
            <div class="product_list">
              <div
                v-for="p in productGrid"
                :key="p.slug"
                class="col-sm-4 col-md-3 col-mm-6 product_img"
                data-move-y="190px"
              >
                <NuxtLink :to="{ path: '/template05/product-detail', query: { slug: p.slug } }">
                  <img :src="p.image" class="img-thumbnail" :alt="p.title">
                </NuxtLink>
                <p class="product_title">
                  <NuxtLink
                    :to="{ path: '/template05/product-detail', query: { slug: p.slug } }"
                    :title="p.title"
                  >
                    {{ p.title }}
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box_contact">
      <div class="container">
        <div class="foot_logo" data-move-y="-100px">
          <img :src="footLogoSrc" :alt="t('demo.common.footLogoAlt')">
        </div>
        <div class="col-sm-4 col-md-4 contact_btn" data-move-y="160px">
          <span class="glyphicon glyphicon-map-marker" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homeAddressTitle') }}</h4>
          <p>{{ cp.address || '—' }}</p>
        </div>
        <div class="col-sm-4 col-md-4 contact_btn" data-move-y="160px">
          <span class="glyphicon glyphicon-phone" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homePhonesTitle') }}</h4>
          <p>{{ phonesLine }}</p>
        </div>
        <div class="col-sm-4 col-md-4 contact_btn" data-move-y="160px">
          <span class="glyphicon glyphicon-envelope" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homeEmailTitle') }}</h4>
          <p>
            <a href="javascript:void(0)">{{ cp.email }}</a>
          </p>
        </div>
      </div>
    </div>

    <div class="container news_index">
      <div class="row">
        <h2 class="title_h2" data-move-y="-100px">{{ newsTitle }}</h2>
        <div v-for="n in newsThree" :key="n.id" class="col-sm-4 col-md-4">
          <div class="news_box" data-move-y="160px">
            <h4>
              <NuxtLink :to="{ path: '/template05/news-detail', query: { id: n.id } }" :title="n.title">
                {{ n.title }}
              </NuxtLink>
            </h4>
            <span class="glyphicon glyphicon-calendar" aria-hidden="true" />
            <time>{{ formatNewsDate(n.date) }}</time>
            <p>{{ excerptShort(n.excerpt) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="link_box">
    <span class="link_title">
      {{ t('demo.common.homeLinkTitle') }}
      <button
        type="button"
        id="link_btn"
        class="glyphicon glyphicon-plus"
        aria-hidden="true"
        :aria-label="t('demo.common.toggleLinksAria')"
        @click="linkOpen = !linkOpen"
      />
    </span>
    <span class="link_list" :class="{ 'link_list--open': linkOpen }">
      <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">{{ t('demo.common.baiduName') }}</a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const { t } = useAppLocale()

const c = DEMO_SITE_TEMPLATES.template05
const home = c.home as Record<string, unknown>
const cp = c.contactPage

const productTitle = computed(() => String(home.productKicker ?? t('demo.common.productTitleFallback')))
const newsTitle = computed(() => String(home.newsKicker ?? t('demo.common.blogTitleFallback')))

const footLogoSrc = computed(
  () =>
    (home.e7FootLogoSrc as string) ||
    'https://e7.mstore.demo.mingsoft.net/e7/img/53007d5b00000.png'
)

const slides = computed(() => {
  const raw = (home.bannerSlides as { image: string }[] | undefined) || []
  const a = c.aboutPage
  return raw.length ? raw : [{ image: a.image }]
})

const productGrid = computed(() => (c.productCatalog?.products ?? []).slice(0, 8))

const groupTopThree = computed(() => {
  const prods = c.productCatalog?.products ?? []
  const out: { slug: string; image: string; title: string }[] = []
  let i = 0
  while (out.length < 3 && prods.length) {
    const p = prods[i % prods.length]
    if (p) out.push({ slug: p.slug, image: p.image, title: p.title })
    i++
    if (i > 20) break
  }
  return out
})

const newsThree = computed(() => c.newsPage.items.slice(0, 3))

const phonesLine = computed(() => (cp.phones?.length ? cp.phones.join(' / ') : '—'))

const linkOpen = ref(true)

function formatNewsDate(date: string) {
  const p = date.split(/[-/]/)
  if (p.length >= 3) return `${p[0]}-${p[1]}-${p[2]}`
  return date
}

function excerptShort(text: string, max = 160) {
  const one = text.replace(/\s+/g, ' ').trim()
  return one.length <= max ? one : `${one.slice(0, max)}...`
}
</script>

<style scoped>
.flash .el-carousel {
  width: 100%;
}

.link_list:not(.link_list--open) {
  display: inline;
}
</style>
