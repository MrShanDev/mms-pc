<template>
  <div class="col-xs-12 col-sm-4 col-md-3">
    <div class="left_nav" id="categories">
      <h2 class="left_h2">{{ t('demo.common.sidebarCategories') }}</h2>
      <ul class="left_nav_ul" id="firstpane">
        <li v-for="(item, i) in categoryItems" :key="i">
          <NuxtLink class="biglink" :to="item.to">{{ item.label }}</NuxtLink>
          <span class="menu_head">+</span>
          <ul class="left_snav_ul menu_body" />
        </li>
      </ul>
    </div>
    <div class="left_new">
      <h2 class="left_h2">{{ t('demo.common.sidebarNews') }}</h2>
      <ul class="left_news">
        <li v-for="n in newsSide" :key="n.id">
          <NuxtLink :to="{ path: '/template05/news-detail', query: { id: n.id } }" :title="n.title">
            {{ n.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="index_contact">
      <h2 class="left_h2">{{ t('demo.common.sidebarContactHeading') }}</h2>
      <p style="padding-top: 20px">{{ t('demo.common.contactPersonPrefix') }} {{ c.siteTitle }}</p>
      <p>{{ t('demo.common.phonePrefix') }} {{ phonesLine }}</p>
      <p>{{ t('demo.common.telPrefix') }} {{ phonesLine }}</p>
      <p>
        {{ t('demo.common.emailPrefix') }}
        <a :href="`mailto:${cp.email}`">{{ cp.email }}</a>
      </p>
      <p>{{ t('demo.common.addressPrefix') }} {{ cp.address || '—' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const props = withDefaults(
  defineProps<{
    sidebarMode?: 'default' | 'product' | 'news' | 'download'
  }>(),
  { sidebarMode: 'default' }
)

const { t } = useAppLocale()

const c = DEMO_SITE_TEMPLATES.template05
const cp = c.contactPage
const base = '/template05'

const categoryItems = computed(() => {
  if (props.sidebarMode === 'product') {
    const cats = c.productCatalog?.categories ?? []
    return cats.map((cat) => ({
      label: cat.label,
      to: { path: `${base}/products`, query: { category: cat.slug } }
    }))
  }
  if (props.sidebarMode === 'download') {
    return [
      { label: t('demo.common.helpDocumentation'), to: `${base}/download#help` },
      { label: t('demo.common.fileDownloadSection'), to: `${base}/download#files` }
    ]
  }
  return [
    { label: t('demo.common.aboutUsNav'), to: `${base}/about` },
    { label: t('demo.common.contactUs'), to: `${base}/contact` },
    { label: t('demo.common.feedbackNav'), to: `${base}/feedback` }
  ]
})

const newsSide = computed(() => c.newsPage.items.slice(0, 5))

const phonesLine = computed(() => (cp.phones?.length ? cp.phones.join(' / ') : '—'))
</script>
