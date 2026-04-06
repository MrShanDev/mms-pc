<template>
  <main v-if="article" class="tpl-sub-page tpl-sub-page--news ms-news-detail">
    <InnerPageCover
      :title="C.newsPage.title"
      :lead="bannerLead"
      :background-image="bannerSrc"
    />
    <div class="site-section">
      <div class="container">
        <div class="pro-category mb-4 mt-0 text-center">
          <NuxtLink
            v-for="tab in newsTabs"
            :key="tab.query"
            class="category"
            :class="{ active: article.category === tab.category }"
            :to="{ path: '/template02/news', query: { category: tab.query } }"
          >
            {{ tab.label }}
          </NuxtLink>
        </div>
        <nav class="small text-muted mb-3" :aria-label="t('demo.common.breadcrumb')">
          <NuxtLink to="/template02">{{ t('demo.common.home') }}</NuxtLink>
          /
          <NuxtLink to="/template02/news">{{ C.newsPage.title }}</NuxtLink>
          /
          <span>{{ article.title }}</span>
        </nav>

      <article class="news-details-1">
        <h1 class="news-details-1-title">{{ article.title }}</h1>
        <div class="news-details-1-time">
          {{ t('demo.common.datePublished') }} {{ article.date }}
          <span> · {{ t('demo.common.views') }} {{ t('demo.common.viewsDemo') }}</span>
        </div>
        <div class="news-details-1-txt">
          <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
        </div>
        <div class="news-details-1-link">
          <NuxtLink
            v-if="adjacent.prev"
            :to="{ path: '/template02/news-detail', query: { id: adjacent.prev.id } }"
            :title="adjacent.prev.title"
          >
            {{ t('demo.common.prevArticle') }} {{ adjacent.prev.title }}
          </NuxtLink>
          <span v-else class="news-nav-muted">{{ t('demo.common.prevNone') }}</span>
          <NuxtLink
            v-if="adjacent.next"
            :to="{ path: '/template02/news-detail', query: { id: adjacent.next.id } }"
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
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import InnerPageCover from './_components/InnerPageCover.vue'
import { template01DemoAsset, template01NewsAdjacent, template01NewsById } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template02',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.id || '').trim()) {
        return navigateTo('/template02/news')
      }
    }
  ]
})

const { t, locale } = useI18n()

const newsTabs = computed(() => [
  { category: 'company' as const, label: t('demo.common.newsTabCompany'), query: 'company' },
  { category: 'industry' as const, label: t('demo.common.newsTabIndustry'), query: 'industry' }
])

const C = DEMO_SITE_TEMPLATES.template02
const route = useRoute()
const newsId = computed(() => String(route.query.id || '').trim())

const article = computed(() => (newsId.value ? template01NewsById(C, newsId.value) : undefined))

watch(
  () => newsId.value,
  (id) => {
    if (id && !template01NewsById(C, id)) {
      throw createError({ statusCode: 404, statusMessage: t('demo.common.articleNotFound') })
    }
  },
  { immediate: true }
)

const bannerSrc = template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')
const bannerLead = computed(() => C.productCatalog?.pageLead ?? '')
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
  const path = `/template02/news-detail?id=${encodeURIComponent(newsId.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: `${article.value?.title ?? t('demo.common.blogTitleFallback')} — ${C.siteTitle}`,
    meta: [{ name: 'description', content: article.value?.excerpt ?? C.metaDescription }, ...og],
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
  max-width: 260px;
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
  margin-left: 36px;
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

  .news-details-1-time span {
    display: inline-block;
    margin-left: 12px;
    float: right;
  }
}
</style>
