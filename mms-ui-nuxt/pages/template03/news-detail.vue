<template>
  <main v-if="article" class="tpl03-news-detail">
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">{{ t('demo.common.home') }}</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <NuxtLink to="/template03/news" class="ms-channel-path-link">{{ t('demo.common.crumbNewsCenter') }}</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">{{ article.title }}</span>
          </div>
        </div>
      </div>
      <div class="pd-page-inner pd-main">
        <article class="news-details-1">
          <h1 class="news-details-1-title">{{ article.title }}</h1>
          <div class="news-details-1-time">
            {{ article.date }}
            <span> · {{ t('demo.common.viewsDemo') }}</span>
          </div>
          <div class="news-details-1-txt">
            <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
          </div>
          <div class="news-details-1-link">
            <NuxtLink
              v-if="adjacent.prev"
              :to="{ path: '/template03/news-detail', query: { id: adjacent.prev.id } }"
              :title="adjacent.prev.title"
            >
              {{ t('demo.common.prevArticle') }} {{ adjacent.prev.title }}
            </NuxtLink>
            <span v-else class="news-nav-muted">{{ t('demo.common.prevNone') }}</span>
            <NuxtLink
              v-if="adjacent.next"
              :to="{ path: '/template03/news-detail', query: { id: adjacent.next.id } }"
              :title="adjacent.next.title"
            >
              {{ t('demo.common.nextArticle') }} {{ adjacent.next.title }}
            </NuxtLink>
            <span v-else class="news-nav-muted">{{ t('demo.common.nextNone') }}</span>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerHeroBanner from './_components/InnerHeroBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset, template01NewsAdjacent, template01NewsById } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template03',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.id || '').trim()) {
        return navigateTo('/template03/news')
      }
    }
  ]
})

const { t, locale } = useAppLocale()

const C = DEMO_SITE_TEMPLATES.template03
const route = useRoute()
const newsId = computed(() => String(route.query.id || '').trim())

const article = computed(() => (newsId.value ? template01NewsById(C, newsId.value) : undefined))

watch(
  () => newsId.value,
  (id) => {
    if (id && !template01NewsById(C, id)) {
      throw createError({ statusCode: 404, statusMessage: t('demo.common.newsNotFound') })
    }
  },
  { immediate: true }
)

const bannerSrc = computed(
  () =>
    C.contactPage.bannerImage ??
    template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')
)

const bodyParagraphs = computed(() => {
  const a = article.value
  if (!a) return []
  if (a.bodyParagraphs?.length) return a.bodyParagraphs
  return [a.excerpt]
})

const adjacent = computed(() => template01NewsAdjacent(C, newsId.value))

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template03/news-detail?id=${encodeURIComponent(newsId.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: article.value?.title ?? t('news.metaTitle'),
    meta: [
      {
        name: 'description',
        content: t('newsDetail.metaDesc', {
          title: article.value?.title ?? '',
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
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.pd-main {
  padding-top: 28px;
  padding-bottom: 48px;
}

.news-details-1 {
  width: 100%;
  padding: 30px 0 61px;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.news-details-1-title {
  width: 100%;
  line-height: 1.2;
  padding: 10px 0;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: #333;
}

.news-details-1-time {
  width: 100%;
  line-height: 26px;
  font-size: 14px;
  color: #a5a5a5;
  border-bottom: 1px solid #ebebec;
  padding-bottom: 8px;
}

.news-details-1-time span {
  margin-left: 8px;
}

.news-details-1-txt {
  width: 100%;
  line-height: 1.9;
  padding: 20px 0;
  font-size: 16px;
  color: #666;
}

.news-details-1-txt p {
  margin: 0 0 14px;
}

.news-details-1-link {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 2.8%;
  margin-top: 40px;
  width: 100%;
}

.news-details-1-link a {
  flex: 1 1 45%;
  min-width: 200px;
  height: 60px;
  line-height: 58px;
  padding: 0 23px;
  font-size: 16px;
  border: 1px solid #e5e5e5;
  border-radius: 30px;
  background: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #333;
  text-decoration: none;
  text-align: center;
  box-sizing: border-box;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.news-details-1-link a:hover {
  background: #029c6a;
  border-color: #029c6a;
  color: #fff !important;
}

.news-nav-muted {
  flex: 1 1 45%;
  min-width: 200px;
  height: 60px;
  line-height: 58px;
  padding: 0 23px;
  font-size: 15px;
  border: 1px dashed #ddd;
  border-radius: 30px;
  color: #999;
  text-align: center;
  box-sizing: border-box;
}

@media (max-width: 767px) {
  .news-details-1 {
    padding: 16px 0 28px;
  }

  .news-details-1-title {
    font-size: 22px;
  }
}
</style>
