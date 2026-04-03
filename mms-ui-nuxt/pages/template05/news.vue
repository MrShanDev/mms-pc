<template>
  <SidebarPageLayout :title="pageTitle" :crumbs="crumbs" sidebar-mode="news" variant="listbox">
    <ul class="list_news">
      <li v-for="n in filteredItems" :key="n.id">
        <NuxtLink
          :to="{ path: '/template05/news-detail', query: { id: n.id } }"
          :title="n.title"
        >
          {{ n.title }}
        </NuxtLink>
        <span class="news_time">{{ formatNewsDate(n.date) }}</span>
      </li>
    </ul>
    <div class="page">
      <div class="case-btn page" role="navigation" aria-label="Pagination demo">
        <span class="page-item page-link is-disabled">&lt;</span>
        <span class="page-info">1 / 1</span>
        <span class="page-item page-link is-disabled">&gt;</span>
      </div>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import type { E7Crumb } from '@/utils/template05E7'
import { TEMPLATE05_E7_NEWS_TABS } from '@/utils/template05E7'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05
const route = useRoute()

const activeCategory = computed(() => {
  const q = route.query.category as string | undefined
  if (!q) return ''
  return TEMPLATE05_E7_NEWS_TABS.some((t) => t.query === q) ? q : ''
})

const filteredItems = computed(() => {
  const items = C.newsPage.items
  const cat = activeCategory.value
  if (!cat || cat === 'faq') return items
  if (cat === 'company' || cat === 'industry') {
    return items.filter((i) => i.category === cat)
  }
  return items
})

const pageTitle = computed(() => {
  const q = activeCategory.value
  if (q === 'company') return 'Company dynamics'
  if (q === 'industry') return 'Industry news'
  if (q === 'faq') return 'Product FAQ'
  return C.newsPage.title
})

const crumbs = computed((): E7Crumb[] => {
  const q = activeCategory.value
  if (!q) return [{ label: C.newsPage.title }]
  const sub = TEMPLATE05_E7_NEWS_TABS.find((t) => t.query === q)?.label ?? C.newsPage.title
  return [
    { label: C.newsPage.title, to: '/template05/news' },
    { label: sub }
  ]
})

function formatNewsDate(date: string) {
  const p = date.split(/[-/]/)
  if (p.length >= 3) {
    const y = p[0].slice(-2)
    return `${y}-${p[1]}-${p[2]}`
  }
  return date
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/news')

useHead(() => ({
  title: `${pageTitle.value} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
