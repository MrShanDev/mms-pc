<template>
  <SidebarPageLayout v-if="article" :title="sectionTitle" :crumbs="detailCrumbs" sidebar-mode="news">
    <div class="contents">
      <h1>{{ article.title }}</h1>
      <p v-for="(para, i) in bodyParagraphs" :key="i">{{ para }}</p>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01NewsById } from '@/utils/template01MingsoftMock'
import { TEMPLATE04_E9_NEWS_TABS, type E9Crumb } from '@/utils/template04E9'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({
  layout: 'demo-template04',
  requiresAuth: false,
  middleware: [
    (to) => {
      if (!String(to.query.id || '').trim()) {
        return navigateTo('/template04/news')
      }
    }
  ]
})

const C = DEMO_SITE_TEMPLATES.template04
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
  const t = TEMPLATE04_E9_NEWS_TABS.find((x) => x.category === a.category)
  return t?.label ?? C.newsPage.title
})

const detailCrumbs = computed((): E9Crumb[] => {
  const a = article.value
  if (!a) return []
  const tab = TEMPLATE04_E9_NEWS_TABS.find((x) => x.category === a.category)
  const subQ = tab?.query
  return [
    { label: C.newsPage.title, to: '/template04/news' },
    {
      label: tab?.label ?? C.newsPage.title,
      to: subQ ? { path: '/template04/news', query: { category: subQ } } : '/template04/news'
    },
    { label: a.title }
  ]
})

const bodyParagraphs = computed(() => {
  const a = article.value
  if (!a) return []
  if (a.bodyParagraphs?.length) return a.bodyParagraphs
  return [a.excerpt]
})

const { locale } = useI18n()

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = `/template04/news-detail?id=${encodeURIComponent(newsId.value)}`
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
