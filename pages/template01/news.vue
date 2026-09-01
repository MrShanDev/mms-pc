<template>
  <main class="ms-sub-news">
    <InnerPageBanner
      home-path="/template01"
      :banner-src="bannerSrc"
      :banner-title="t('demo.common.crumbNewsCenter')"
      :banner-lead="bannerLead"
      :banner-alt="t('demo.common.crumbNewsCenter')"
      :crumbs="crumbs"
    >
      <template #sidenav>
        <li
          v-for="tab in newsTabs"
          :key="tab.query"
          :class="{ active: activeCategory === tab.query }"
        >
          <NuxtLink :to="{ path: '/template01/news', query: { category: tab.query } }">
            {{ tab.label }}
          </NuxtLink>
        </li>
      </template>
    </InnerPageBanner>

    <div class="pd-page-inner">
      <div class="news-list-1">
        <ul>
          <li v-for="n in filteredItems" :key="n.id">
            <div class="case-img-1">
              <NuxtLink :to="{ path: '/template01/news-detail', query: { id: n.id } }">
                <img :src="n.image" :alt="n.title" loading="lazy">
              </NuxtLink>
            </div>
            <div class="case-txt">
              <div class="case-txt-title">
                <NuxtLink :to="{ path: '/template01/news-detail', query: { id: n.id } }">
                  {{ n.title }}
                </NuxtLink>
              </div>
              <div class="case-txt-time">{{ n.date }}</div>
              <div class="case-txt-p">{{ n.excerpt }}</div>
            </div>
          </li>
        </ul>
        <div class="case-btn page" role="navigation" :aria-label="t('demo.common.paginationDemo')">
          <span class="page-item page-link is-disabled">&lt;</span>
          <span class="page-info">1 / 1</span>
          <span class="page-item page-link is-disabled">&gt;</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageBanner from './_components/InnerPageBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { TEMPLATE01_NEWS_TABS, template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template01', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template01
const route = useRoute()
const { t, locale } = useAppLocale()

const newsTabs = computed(() =>
  TEMPLATE01_NEWS_TABS.map((tab) => ({
    ...tab,
    label:
      tab.category === 'company'
        ? t('demo.common.newsTabCompany')
        : tab.category === 'industry'
          ? t('demo.common.newsTabIndustry')
          : tab.category === 'faq'
            ? t('demo.common.newsTabFaq')
            : tab.label
  }))
)

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/cms/category/1688608258562.jpg')
const bannerLead = computed(() => t('demo.common.innerNewsListBannerLead'))

const crumbs = computed(() => [
  { label: t('demo.common.home'), to: '/template01' },
  { label: t('demo.common.crumbNewsCenter'), to: '/template01/news' }
])

const activeCategory = computed(() => {
  const q = route.query.category as string | undefined
  if (!q) return ''
  return TEMPLATE01_NEWS_TABS.some((row) => row.query === q) ? q : ''
})

const filteredItems = computed(() => {
  const items = C.newsPage.items
  const cat = activeCategory.value
  if (!cat) return items
  const key = TEMPLATE01_NEWS_TABS.find((row) => row.query === cat)?.category
  if (!key) return items
  return items.filter((i) => i.category === key)
})

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template01/news')

useHead(() => ({
  title: t('news.metaTitle'),
  meta: [{ name: 'description', content: t('news.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.news-list-1 {
  float: left;
  width: 100%;
  padding-bottom: 32px;
}

.news-list-1::after {
  content: '';
  display: table;
  clear: both;
}

.news-list-1 ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  width: 100%;
}

.news-list-1 ul li {
  width: 31.1%;
  margin-right: 3.35%;
  margin-top: 28px;
  padding: 9px 1% 32px;
  border: 1px solid #e5e5e5;
  box-sizing: border-box;
  transition: background 0.25s, border-color 0.25s;
}

.news-list-1 ul li:nth-child(3n) {
  margin-right: 0;
}

.news-list-1 ul li:hover {
  background: #029c6a;
  border-color: #029c6a;
}

.case-img-1 {
  width: 100%;
  overflow: hidden;
}

.case-img-1 img {
  width: 100%;
  display: block;
  transition: transform 0.35s ease;
}

.news-list-1 ul li:hover .case-img-1 img {
  transform: scale(1.08);
}

.case-txt {
  padding-top: 8px;
}

.case-txt-title {
  font-size: 16px;
  line-height: 26px;
  height: 26px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.case-txt-title a {
  color: #333;
  text-decoration: none;
}

.case-txt-time {
  font-size: 14px;
  line-height: 24px;
  color: #bcbbbb;
  margin-top: 4px;
}

.case-txt-p {
  margin-top: 6px;
  font-size: 14px;
  line-height: 1.65;
  color: #666;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
}

.news-list-1 ul li:hover .case-txt-title a,
.news-list-1 ul li:hover .case-txt-time,
.news-list-1 ul li:hover .case-txt-p {
  color: #fff;
}

.case-btn.page {
  float: left;
  width: 100%;
  margin-top: 36px;
  text-align: center;
  font-size: 15px;
  color: #666;
}

.case-btn .page-item {
  display: inline-block;
  min-width: 40px;
  padding: 8px 14px;
  margin: 0 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-decoration: none;
  color: #333;
}

.case-btn .page-item.is-disabled {
  opacity: 0.45;
  cursor: default;
}

.page-info {
  display: inline-block;
  padding: 8px 12px;
}
</style>
