<template>
  <main>
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">Home</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">NEWS</span>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="container">
          <div class="c_1530_3">
            <div class="tit_1">
              <h3>{{ C.newsPage.title }}<span /></h3>
            </div>
            <div class="bd">
              <div>
                <div v-if="feature" class="c_750">
                  <NuxtLink :to="{ path: '/template03/news-detail', query: { id: feature.id } }">
                    <h4>{{ feature.date }}</h4>
                    <div class="title elli">{{ feature.title }}</div>
                    <div class="p">{{ feature.excerpt }}</div>
                  </NuxtLink>
                  <div class="img">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: feature.id } }">
                      <img :src="feature.image" width="100%" :alt="feature.title">
                    </NuxtLink>
                  </div>
                  <div class="detail">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: feature.id } }">
                      more<img src="https://392.mstore.demo.mingsoft.net/392/picture/index16.png" alt="">
                    </NuxtLink>
                  </div>
                </div>
                <ul>
                  <li v-for="n in rest" :key="n.id">
                    <NuxtLink :to="{ path: '/template03/news-detail', query: { id: n.id } }">
                      <div class="title elli">{{ n.title }}</div>
                      <div class="p">{{ n.excerpt }}</div>
                      <div class="time" v-html="formatTime(n.date)" />
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerHeroBanner from './_components/InnerHeroBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const feature = computed(() => C.newsPage.items[0])
const rest = computed(() => C.newsPage.items.slice(1))

function formatTime(date: string) {
  const parts = date.split(/[-/]/)
  if (parts.length >= 3) return `${parts[1]}<br />${parts[2]},${parts[0]}`
  return date
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/news')

useHead(() => ({
  title: `${C.newsPage.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
