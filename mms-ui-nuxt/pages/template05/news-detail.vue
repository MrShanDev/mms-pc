<template>
  <SidebarPageLayout v-if="article" variant="raw" :crumbs="pathCrumbs" sidebar-mode="news">
    <div class="list_text">
      <h2 class="left_h2">{{ sectionTitle }}</h2>
      <div class="contents">
        <h1>{{ article.title }}</h1>
        <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
      </div>
      <div class="point">
        <span class="to_prev col-xs-12 col-sm-6 col-md-6">
          PREVIOUS:
          <NuxtLink
            v-if="adjacent.prev"
            :to="{ path: '/template05/news-detail', query: { id: adjacent.prev.id } }"
          >
            {{ adjacent.prev.title }}
          </NuxtLink>
          <a v-else href="javascript:void(0)">none</a>
        </span>
        <span class="to_next col-xs-12 col-sm-6 col-md-6">
          NEXT:
          <NuxtLink
            v-if="adjacent.next"
            :to="{ path: '/template05/news-detail', query: { id: adjacent.next.id } }"
          >
            {{ adjacent.next.title }}
          </NuxtLink>
          <a v-else href="javascript:void(0)">none</a>
        </span>
      </div>
    </div>
    <div class="lists_related">
      <h2 class="left_h2">Related News</h2>
      <ul class="list_news related_news">
        <li v-for="n in relatedNews" :key="n.id">
          <NuxtLink :to="{ path: '/template05/news-detail', query: { id: n.id } }" :title="n.title">
            {{ n.title }}
          </NuxtLink>
          <span class="news_time">{{ formatNewsDate(n.date) }}</span>
        </li>
      </ul>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import type { E7Crumb } from '@/utils/template05E7'
import { TEMPLATE05_E7_NEWS_TABS } from '@/utils/template05E7'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01NewsAdjacent, template01NewsById } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template05',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.id || '').trim()) {
        return navigateTo('/template05/news')
      }
    }
  ]
})

const C = DEMO_SITE_TEMPLATES.template05
const route = useRoute()
const newsId = computed(() => String(route.query.id || '').trim())

const article = computed(() => (newsId.value ? template01NewsById(C, newsId.value) : undefined))

watch(
  () => newsId.value,
  (id) => {
    if (id && !template01NewsById(C, id)) {
      throw createError({ statusCode: 404, statusMessage: '未找到该新闻' })
    }
  },
  { immediate: true }
)

const sectionTitle = computed(() => {
  const a = article.value
  if (!a?.category) return C.newsPage.title
  const t = TEMPLATE05_E7_NEWS_TABS.find((x) => x.category === a.category)
  return t?.label ?? C.newsPage.title
})

const pathCrumbs = computed((): E7Crumb[] => {
  const a = article.value
  if (!a) return []
  const tab = TEMPLATE05_E7_NEWS_TABS.find((x) => x.category === a.category)
  const subQ = tab?.query
  return [
    { label: C.newsPage.title, to: '/template05/news' },
    {
      label: tab?.label ?? C.newsPage.title,
      to: subQ ? { path: '/template05/news', query: { category: subQ } } : '/template05/news'
    }
  ]
})

const bodyParagraphs = computed(() => {
  const a = article.value
  if (!a) return []
  if (a.bodyParagraphs?.length) return a.bodyParagraphs
  return [a.excerpt]
})

const adjacent = computed(() => template01NewsAdjacent(C, newsId.value))

const relatedNews = computed(() =>
  C.newsPage.items.filter((n) => n.id !== newsId.value).slice(0, 5)
)

function formatNewsDate(date: string) {
  const p = date.split(/[-/]/)
  if (p.length >= 3) {
    const y = p[0].slice(-2)
    return `${y}-${p[1]}-${p[2]}`
  }
  return date
}

const { locale } = useI18n()

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template05/news-detail?id=${encodeURIComponent(newsId.value)}`
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: `${article.value?.title ?? 'News'} — ${C.siteTitle}`,
    meta: [{ name: 'description', content: article.value?.excerpt ?? C.metaDescription }, ...og],
    link,
    htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
  }
})
</script>
