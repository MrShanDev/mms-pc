<template>
  <main class="ms-home">
    <section class="ms-banner">
      <el-carousel
        class="ms-banner-carousel"
        :height="bannerCarouselHeight"
        indicator-position="outside"
        :interval="4000"
      >
        <el-carousel-item v-for="(s, i) in bannerSlides" :key="i">
          <img class="ms-banner-img" :src="s.image" alt="" loading="lazy" />
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="ms-wrap-service">
      <div class="ms-w1440">
        <header class="ms-index-title">
          <div class="ms-index-title-h1">{{ home.about.title }}</div>
          <div class="ms-index-title-h2">{{ home.about.lead }}</div>
        </header>

        <div class="ms-about-panel">
          <div class="ms-top-img-row">
            <NuxtLink to="/template01/contact" class="ms-top-img">
              <img :src="home.sideImgContact" alt="" loading="lazy" />
              <span class="ms-pos-txt">{{ home.contactBanner.label }}</span>
            </NuxtLink>
            <NuxtLink to="/template01/about" class="ms-top-img">
              <img :src="home.sideImgAbout" alt="" loading="lazy" />
              <span class="ms-pos-txt">{{ home.aboutMini.label }}</span>
            </NuxtLink>
          </div>
          <div class="ms-bottom-txt">
            <p class="ms-bottom-body">{{ home.about.body }}</p>
            <div class="ms-bottom-cta">
              <NuxtLink to="/template01/about" class="ms-pill-btn">{{ home.about.cta }}</NuxtLink>
            </div>
          </div>
        </div>

        <header class="ms-index-title">
          <div class="ms-index-title-h1">{{ home.productKicker }}</div>
          <div class="ms-index-title-h2">{{ home.productLead }}</div>
        </header>

        <div id="products" class="ms-advantages">
          <NuxtLink
            v-for="(p, i) in home.productTiles"
            :key="i"
            :to="{ path: '/template01/product-detail', query: { slug: p.slug } }"
            class="ms-adv-li"
          >
            <img class="ms-adv-img" :src="p.image" :alt="p.title" loading="lazy" />
            <span class="ms-adv-overlay" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="ms-news-section">
      <div class="ms-w1440">
        <header class="ms-index-title">
          <div class="ms-index-title-h1">{{ home.newsKicker }}</div>
          <div class="ms-index-title-h2">{{ home.newsLead }}</div>
        </header>
        <ul class="ms-news-list">
          <li v-for="n in newsCards" :key="n.id" class="ms-news-li">
            <div class="ms-news-title">
              <NuxtLink :to="{ path: '/template01/news-detail', query: { id: n.id } }">{{ n.title }}</NuxtLink>
            </div>
            <div class="ms-news-time">{{ n.date }}</div>
            <div class="ms-news-img">
              <NuxtLink :to="{ path: '/template01/news-detail', query: { id: n.id } }">
                <img :src="n.image" :alt="n.title" loading="lazy" />
              </NuxtLink>
            </div>
            <div class="ms-news-txt">{{ n.excerpt }}</div>
          </li>
        </ul>
      </div>
    </section>

    <section class="ms-connected">
      <div class="ms-w1440 ms-connected-row">
        <p class="ms-connected-line">
          <span class="ms-connected-span">{{ home.contactKicker }}</span>
          <NuxtLink to="/template01/contact" class="ms-connected-a">{{ home.contactOnline }}</NuxtLink>
        </p>
      </div>
    </section>

  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const c = DEMO_SITE_TEMPLATES.template01

type Home = {
  demoLogoSrc?: string
  bannerSlides: { image: string }[]
  sideImgContact: string
  sideImgAbout: string
  about: { title: string; lead: string; body: string; cta: string }
  contactBanner: { label: string }
  aboutMini: { label: string }
  productKicker: string
  productLead: string
  productTiles: { title: string; image: string; slug: string }[]
  newsKicker: string
  newsLead: string
  contactKicker: string
  contactOnline: string
}

const home = c.home as unknown as Home
const bannerSlides = home.bannerSlides?.length ? home.bannerSlides : [{ image: c.aboutPage.image }]

/** 顶栏 100px / 小屏 70px；轮播高度不超过 BANNER_MAX_PX，避免占满一屏 */
const BANNER_MAX_PX = 500
const bannerCarouselHeight = ref(`${BANNER_MAX_PX}px`)

function syncBannerHeight() {
  if (typeof window === 'undefined') return
  const header = window.matchMedia('(max-width: 1199px)').matches ? 70 : 100
  const full = window.innerHeight - header
  const h = Math.max(320, Math.min(BANNER_MAX_PX, full))
  bannerCarouselHeight.value = `${h}px`
}

onMounted(() => {
  syncBannerHeight()
  window.addEventListener('resize', syncBannerHeight)
})

onUnmounted(() => {
  if (typeof window !== 'undefined') window.removeEventListener('resize', syncBannerHeight)
})

const newsCards = computed(() =>
  c.newsPage.items.slice(0, 3).map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    image: item.image,
    excerpt: item.excerpt
  }))
)
</script>

<style lang="scss" scoped>
.ms-w1440 {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2%;
  box-sizing: border-box;
}

.ms-home {
  width: 100%;
  overflow-x: hidden;
  font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  font-size: 14px;
  color: #333;
  background: #fff;
}

.ms-banner {
  width: 100%;
}

.ms-banner-carousel {
  width: 100%;
}

.ms-banner-carousel :deep(.el-carousel__container) {
  min-height: 320px;
}

.ms-banner-img {
  width: 100%;
  height: 100%;
  min-height: 320px;
  object-fit: cover;
  display: block;
}

.ms-wrap-service {
  float: left;
  width: 100%;
}

.ms-index-title {
  width: 100%;
  padding: 60px 0 30px;
  text-align: center;
  box-sizing: border-box;
}

.ms-index-title-h1 {
  width: 100%;
  line-height: 1.2;
  font-size: 32px;
  font-weight: bold;
  font-family: 'Arial Black', 'Microsoft YaHei', arial, sans-serif;
  color: #111;
}

.ms-index-title-h2 {
  width: 100%;
  padding: 8px 10% 0;
  line-height: 1.6;
  font-size: 14px;
  color: #666;
  box-sizing: border-box;
}

.ms-about-panel {
  width: 100%;
  margin-bottom: 10px;
  background: #f5f5f5;
  box-sizing: border-box;
}

.ms-top-img-row {
  display: flex;
  width: 100%;
}

.ms-top-img {
  position: relative;
  width: 50%;
  overflow: hidden;
  display: block;
}

.ms-top-img img {
  width: 100%;
  display: block;
  vertical-align: top;
  transition: transform 0.35s ease;
}

.ms-top-img:hover img {
  transform: scale(1.1);
}

.ms-pos-txt {
  position: absolute;
  bottom: 26px;
  left: 25px;
  font-size: 22px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

.ms-bottom-txt {
  padding: 12px 5% 28px;
  text-align: center;
}

.ms-bottom-body {
  margin: 16px 0 0;
  line-height: 1.75;
  font-size: 14px;
  color: #666;
}

.ms-bottom-cta {
  margin-top: 20px;
}

.ms-pill-btn {
  display: inline-block;
  min-width: 160px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff !important;
  background: #029c6a;
  border-radius: 20px;
  text-decoration: none;
  padding: 0 20px;
  box-sizing: border-box;
}

.ms-pill-btn:hover {
  opacity: 0.88;
}

.ms-advantages {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding: 0 4px 54px;
  box-sizing: border-box;
  justify-content: flex-start;
}

.ms-adv-li {
  position: relative;
  width: 22.5%;
  margin-left: 2%;
  margin-bottom: 28px;
  border-radius: 50%;
  overflow: hidden;
  aspect-ratio: 1;
  flex-shrink: 0;
}

.ms-adv-li:nth-child(4n + 1) {
  margin-left: 0;
}

@media (max-width: 991px) {
  .ms-adv-li {
    width: 48%;
    margin-left: 2%;
  }
  .ms-adv-li:nth-child(2n + 1) {
    margin-left: 0;
  }
}

.ms-adv-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border: 8px solid #fff;
  border-radius: 50%;
  box-sizing: border-box;
}

.ms-adv-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(2, 156, 106, 0.35);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  margin: 8px;
}

.ms-adv-li:hover .ms-adv-overlay {
  opacity: 1;
}

.ms-news-section {
  float: left;
  width: 100%;
  background: #f8f8f8;
  padding-bottom: 40px;
}

.ms-news-list {
  list-style: none;
  margin: 0;
  padding: 0 0 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 2.15%;
}

.ms-news-li {
  width: 31.9%;
  background: #fff;
  padding: 23px 20px 19px;
    box-sizing: border-box;
}

@media (max-width: 991px) {
  .ms-news-li {
    width: 100%;
    margin-bottom: 16px;
  }
}

.ms-news-title {
  min-height: 52px;
  line-height: 1.3;
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.ms-news-title a {
  color: inherit;
  text-decoration: none;
}

.ms-news-title a:hover {
  color: #029c6a;
}

.ms-news-time {
  font-size: 14px;
  color: #bcbbbb;
  line-height: 24px;
  margin-top: 6px;
}

.ms-news-img {
  margin-top: 8px;
  overflow: hidden;
}

.ms-news-img img {
  width: 100%;
  display: block;
  transition: transform 0.3s;
}

.ms-news-li:hover .ms-news-img img {
  transform: scale(1.08);
}

.ms-news-txt {
  margin-top: 10px;
  line-height: 1.6;
  font-size: 14px;
  color: #666;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.ms-connected {
  float: left;
  width: 100%;
  background: #029c6a;
  padding: 20px 0;
}

.ms-connected-row {
  display: flex;
  align-items: center;
}

.ms-connected-line {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px 19px;
  line-height: 40px;
}

.ms-connected-span {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.02em;
}

.ms-connected-a {
  display: inline-block;
  width: 138px;
  height: 40px;
  line-height: 38px;
  border: 1px solid #fff;
  font-size: 16px;
  color: #fff !important;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
}

.ms-connected-a:hover {
  background: rgba(255, 255, 255, 0.15);
}

:deep(.el-carousel__indicators--outside) {
  margin-top: 12px;
}

:deep(.el-carousel__indicator.is-active .el-carousel__button) {
  background-color: #029c6a;
}
</style>
