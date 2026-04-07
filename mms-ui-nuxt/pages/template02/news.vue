<template>
  <!-- 对齐 361 Blog 列表：内顶区 + post-entry-1 三列 + 分页 -->
  <main>
    <InnerPageCover
      :title="C.newsPage.title"
      :lead="bannerLead"
      :background-image="innerBannerSrc"
    />
    <div class="site-section">
      <div class="container">
        <div class="pro-category mb-4 mt-0 text-center">
          <NuxtLink
            :to="{ path: '/template02/news', query: {} }"
            class="category"
            :class="{ active: !activeCategory }"
          >
            {{ t('demo.common.all') }}
          </NuxtLink>
          <NuxtLink
            v-for="tab in NEWS_TABS"
            :key="tab.query"
            :to="{ path: '/template02/news', query: { category: tab.query } }"
            class="category"
            :class="{ active: activeCategory === tab.query }"
          >
            {{ tab.label }}
          </NuxtLink>
        </div>
        <div class="row">
          <div
            v-for="n in filteredItems"
            :key="n.id"
            class="col-lg-4 col-md-6 mb-4"
          >
            <div class="post-entry-1 h-100">
              <NuxtLink :to="{ path: '/template02/news-detail', query: { id: n.id } }">
                <img :src="n.image" :alt="t('demo.common.imageAltGeneric')" class="img-fluid" loading="lazy">
              </NuxtLink>
              <div class="post-entry-1-contents">
                <h2>
                  <NuxtLink :to="{ path: '/template02/news-detail', query: { id: n.id } }">
                    {{ n.title }}
                  </NuxtLink>
                </h2>
                <span class="meta d-inline-block mb-3">{{ n.date }}</span>
                <p>{{ n.excerpt }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="basic-pagination text-center mt-2 mb-0" role="navigation" :aria-label="t('demo.common.paginationDemo')">
          <a href="javascript:;">&lt;&lt;</a>
          <a href="javascript:;">&lt;</a>
          <a>1/1</a>
          <a href="javascript:;">&gt;</a>
          <a href="javascript:;">&gt;&gt;</a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageCover from './_components/InnerPageCover.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const { t, locale } = useAppLocale()

const NEWS_TABS = computed(() => [
  { category: 'company' as const, label: t('demo.common.newsTabCompany'), query: 'company' },
  { category: 'industry' as const, label: t('demo.common.newsTabIndustry'), query: 'industry' }
])

const C = DEMO_SITE_TEMPLATES.template02
const route = useRoute()

const innerBannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')
const bannerLead = C.contactPage.bannerLead ?? C.productCatalog?.pageLead ?? ''

const activeCategory = computed(() => {
  const q = route.query.category as string | undefined
  if (!q) return ''
  return NEWS_TABS.value.some((tab) => tab.query === q) ? q : ''
})

const filteredItems = computed(() => {
  const items = C.newsPage.items
  const cat = activeCategory.value
  if (!cat) return items
  const key = NEWS_TABS.value.find((tab) => tab.query === cat)?.category
  if (!key) return items
  return items.filter((i) => i.category === key)
})

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/news')

useHead(() => ({
  title: t('news.metaTitle'),
  meta: [{ name: 'description', content: t('news.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
