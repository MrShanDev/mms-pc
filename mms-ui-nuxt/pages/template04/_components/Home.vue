<template>
  <!-- 对齐 e9 首页：flash / Product / News / Case / Contact us / link_box -->
  <main class="e9-home">
    <div class="flash">
      <el-carousel height="420px" arrow="hover" :interval="5000">
        <el-carousel-item v-for="(s, i) in slides" :key="i">
          <a href="javascript:void(0)">
            <img :src="s.image" :alt="t('demo.common.carouselBannerAlt', { n: i + 1 })" width="100%">
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="product_index">
            <div class="product_head">
              <h2>{{ productTitle }}</h2>
              <span />
            </div>
            <div class="product_list">
              <div
                v-for="p in productGrid"
                :key="p.slug"
                class="col-sm-4 col-md-3 col-mm-6 product_img"
              >
                <NuxtLink :to="{ path: '/template04/product-detail', query: { slug: p.slug } }">
                  <img :src="p.image" class="img-thumbnail" :alt="p.title">
                </NuxtLink>
                <p class="product_title">
                  <NuxtLink :to="{ path: '/template04/product-detail', query: { slug: p.slug } }" :title="p.title">
                    {{ p.title }}
                  </NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="news_bg">
      <div class="container">
        <div class="news_index">
          <div class="row">
            <div class="news_head">
              <h2>{{ newsTitle }}</h2>
              <i />
            </div>
            <div v-for="n in newsThree" :key="n.id" class="col-sm-4 col-md-4">
              <div class="news_box">
                <h4>
                  <NuxtLink :to="{ path: '/template04/news-detail', query: { id: n.id } }" :title="n.title">
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
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-12">
          <div class="product_index">
            <div class="cases_head">
              <h2>{{ caseTitle }}</h2>
              <span />
            </div>
            <div class="product_list">
              <div
                v-for="(item, i) in caseTiles"
                :key="i"
                class="col-sm-4 col-md-4 col-mm-6 product_img"
              >
                <NuxtLink to="/template04/cases">
                  <img :src="item.image" class="img-thumbnail" :alt="item.title">
                </NuxtLink>
                <p class="product_title">
                  <NuxtLink to="/template04/cases" :title="item.title">{{ item.title }}</NuxtLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="box_contact">
      <div class="container">
        <div class="contact_head">
          <h2>{{ contactTitle }}</h2>
          <i />
        </div>
        <div class="col-sm-4 col-md-4 contact_img">
          <span class="glyphicon glyphicon-map-marker" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homeAddressTitle') }}</h4>
          <p>{{ cp.address || '—' }}</p>
        </div>
        <div class="col-sm-4 col-md-4 contact_img">
          <span class="glyphicon glyphicon-phone" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homePhonesTitle') }}</h4>
          <p>{{ phonesLine }}</p>
        </div>
        <div class="col-sm-4 col-md-4 contact_img">
          <span class="glyphicon glyphicon-envelope" style="font-size: 40px" aria-hidden="true" />
          <h4>{{ t('demo.common.homeEmailTitle') }}</h4>
          <p><a :href="`mailto:${cp.email}`">{{ cp.email }}</a></p>
        </div>
      </div>
    </div>

    <div class="link_box">
      <div class="container">
        <span class="link_title">{{ t('demo.common.homeLinkTitle') }}</span>
        <span class="link_list">
          <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">{{ t('demo.common.baiduName') }}</a>
        </span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const { t } = useI18n()

const c = DEMO_SITE_TEMPLATES.template04
const home = c.home as Record<string, unknown>
const cp = c.contactPage

const productTitle = computed(() => String(home.productKicker ?? t('demo.common.productTitleFallback')))
const newsTitle = computed(() => String(home.newsKicker ?? t('demo.common.blogTitleFallback')))
const caseTitle = computed(() => String(home.caseKicker ?? t('demo.common.caseHeading')))
const contactTitle = computed(() => String(home.contactKicker ?? t('demo.common.contactUs')))

const slides = computed(() => {
  const raw = (home.bannerSlides as { image: string }[] | undefined) || []
  const a = c.aboutPage
  const list = raw.length ? raw : [{ image: a.image }]
  return list
})

const productGrid = computed(() => (c.productCatalog?.products ?? []).slice(0, 8))

const newsThree = computed(() => c.newsPage.items.slice(0, 3))

const caseTiles = computed(() => {
  const raw = [...(c.casesPage?.items ?? [])]
  const pt = (home.productTiles as { title: string; image: string }[]) || []
  let i = 0
  while (raw.length < 3 && pt.length) {
    const p = pt[i % pt.length]
    if (p) {
      raw.push({
        title: p.title,
        image: p.image,
        excerpt: '',
        client: ''
      })
    }
    i++
    if (i > 20) break
  }
  return raw.slice(0, 3)
})

const phonesLine = computed(() => (cp.phones?.length ? cp.phones.join(' / ') : '—'))

function formatNewsDate(date: string) {
  const p = date.split(/[-/]/)
  if (p.length >= 3) {
    const y = p[0].slice(-2)
    return `${y}-${p[1]}-${p[2]}`
  }
  return date
}

function excerptShort(text: string, max = 160) {
  const one = text.replace(/\s+/g, ' ').trim()
  return one.length <= max ? one : `${one.slice(0, max)}...`
}
</script>
