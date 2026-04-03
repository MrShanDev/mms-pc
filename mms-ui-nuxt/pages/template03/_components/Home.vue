<template>
  <!-- 对齐 392 首页：pz_banner + #main 内 PRODUCTS / NEWS / ABOUT US -->
  <div>
    <div class="pz_banner">
      <div class="slide_banner">
        <el-carousel height="680px" arrow="hover" :interval="5000">
          <el-carousel-item v-for="(s, i) in slides" :key="i">
            <a href="javascript:void(0)">
              <img :src="s.image" width="100%" class="hidden-xs hidden-sm" alt="">
            </a>
            <a href="javascript:void(0)">
              <img :src="s.image" width="100%" class="visible-xs visible-sm" alt="">
            </a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="dian" />
      <div class="banner_ico">
        <a href="#main"><img :src="bannerIco" alt=""></a>
      </div>
    </div>

    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="c_1530_1">
            <div class="tit_1">
              <h3>{{ home.productKicker }}<span /></h3>
            </div>
            <div class="row">
              <div class="slide_pic_1">
                <el-carousel height="420px" indicator-position="outside" arrow="hover" :interval="0">
                  <el-carousel-item v-for="(p, i) in productShow" :key="p.id">
                    <div>
                      <li class="li_hp">
                        <div class="zbox">
                          <NuxtLink :to="{ path: '/template03/product-detail', query: { slug: p.slug } }">
                            <div class="img">
                              <img :src="p.image" alt="">
                            </div>
                            <div class="text">
                              <div class="name elli">{{ p.title }}</div>
                              <div class="p">{{ p.summary }}</div>
                            </div>
                          </NuxtLink>
                        </div>
                      </li>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </div>
            <div class="arr">
              <div class="zuo" />
              <NuxtLink to="/template03/products" class="more" title="PRODUCTS" />
              <div class="you" />
            </div>
          </div>
        </div>
      </div>

      <div class="container-fluid">
        <div class="container">
          <div class="c_1530_3">
            <div class="tit_1">
              <h3>{{ home.newsKicker }}<span /></h3>
            </div>
            <div class="bd">
              <div>
                <div v-if="newsFeature" class="c_750">
                  <NuxtLink :to="{ path: '/template03/news-detail', query: { id: newsFeature.id } }">
                    <h4>{{ newsFeature.date }}</h4>
                    <div class="title elli">{{ newsFeature.title }}</div>
                    <div class="p">{{ newsFeature.excerpt }}</div>
                  </NuxtLink>
                  <div class="img">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: newsFeature.id } }">
                      <img :src="newsFeature.image" width="100%" :alt="newsFeature.title">
                    </NuxtLink>
                  </div>
                  <div class="detail">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: newsFeature.id } }">
                      more<img :src="index16" alt="">
                    </NuxtLink>
                  </div>
                </div>
                <ul>
                  <li v-for="n in newsRest" :key="n.id">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: n.id } }">
                      <div class="title elli">{{ n.title }}</div>
                      <div class="p">{{ n.excerpt }}</div>
                      <div class="time" v-html="formatNewsTime(n.date)" />
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="container-fluid zbg2"
        :style="{
          background: `url(${zbgAbout}) no-repeat center bottom #f8f8f8`
        }"
      >
        <div class="container">
          <div class="c_1530_4">
            <div class="tit_1">
              <h3>ABOUT US</h3>
            </div>
            <div class="c_1530_4_down">
              <div class="dt">
                <img :src="index19" alt="">
              </div>
              <div class="text">
                <NuxtLink to="/template03/about">
                  <h4>{{ a.title }}</h4>
                  <div class="p">{{ a.lead }}</div>
                  <div class="ico">
                    <img :src="index21" alt="">
                  </div>
                </NuxtLink>
                <div class="img">
                  <NuxtLink to="/template03/about">
                    <img :src="a.image" :alt="a.title">
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const base392 = 'https://392.mstore.demo.mingsoft.net'
const bannerIco = `${base392}/392/picture/banner_ico.png`
const index16 = `${base392}/392/picture/index16.png`
const index19 = `${base392}/392/picture/index19.png`
const index21 = `${base392}/392/picture/index21.png`
const zbgAbout = `${base392}/392/images/index182937000.jpg`

const c = DEMO_SITE_TEMPLATES.template03
const home = c.home as Record<string, any>
const a = c.aboutPage

const slides = computed(() => {
  const raw = (home.bannerSlides as { image: string }[] | undefined) || [{ image: a.image }]
  return raw.length ? raw : [{ image: a.image }]
})

const productShow = computed(() => (c.productCatalog?.products ?? []).slice(0, 5))

const newsFeature = computed(() => c.newsPage.items[0])
const newsRest = computed(() => c.newsPage.items.slice(1, 4))

function formatNewsTime(date: string) {
  const parts = date.split(/[-/]/)
  if (parts.length >= 3) {
    return `${parts[1]}<br />${parts[2]},${parts[0]}`
  }
  return date
}
</script>

<style scoped>
/* 轮播加高后铺满裁切，避免上下留白 */
.slide_banner :deep(.el-carousel__item) {
  overflow: hidden;
}

.slide_banner :deep(.el-carousel__item img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.slide_banner :deep(.el-carousel__item a) {
  display: block;
  height: 100%;
}

@media (max-width: 767px) {
  .slide_banner :deep(.el-carousel.el-carousel--horizontal) {
    height: 420px !important;
  }

  .slide_pic_1 :deep(.el-carousel.el-carousel--horizontal) {
    height: 360px !important;
  }
}

/* PRODUCTS 区块轮播略加高，单卡内容垂直更舒展 */
.slide_pic_1 :deep(.el-carousel__item) {
  overflow: hidden;
}

.slide_pic_1 :deep(.li_hp .zbox) {
  min-height: 360px;
}
</style>
