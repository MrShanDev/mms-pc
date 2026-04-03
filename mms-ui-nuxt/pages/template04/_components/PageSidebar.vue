<template>
  <div class="col-xs-12 col-sm-4 col-md-3">
    <div class="left_nav" id="categories">
      <h2 class="left_h2">Categories</h2>
      <ul class="left_nav_ul" id="firstpane">
        <li v-for="(item, i) in categoryItems" :key="i">
          <NuxtLink class="biglink" :to="item.to">{{ item.label }}</NuxtLink>
          <span class="menu_head">+</span>
          <ul class="left_snav_ul menu_body" />
        </li>
      </ul>
    </div>
    <div class="left_news">
      <h2 class="left_h2">News</h2>
      <ul class="left_news">
        <li v-for="n in newsSide" :key="n.id">
          <NuxtLink :to="{ path: '/template04/news-detail', query: { id: n.id } }" :title="n.title">
            {{ n.title }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="index_contact">
      <h2 class="left_h2">Contact Us</h2>
      <p style="padding-top: 14px">Contact: {{ c.siteTitle }}</p>
      <p>Phone: {{ phonesLine }}</p>
      <p>Tel: {{ phonesLine }}</p>
      <p>
        E-mail:
        <a :href="`mailto:${cp.email}`">{{ cp.email }}</a>
      </p>
      <p>Add: {{ cp.address || '—' }}</p>
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

const c = DEMO_SITE_TEMPLATES.template04
const cp = c.contactPage
const base = '/template04'

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
      { label: 'Help documentation', to: `${base}/download#help` },
      { label: 'File download', to: `${base}/download#files` }
    ]
  }
  return [
    { label: 'About us', to: `${base}/about` },
    { label: 'Contact us', to: `${base}/contact` },
    { label: 'Feedback', to: `${base}/feedback` }
  ]
})

const newsSide = computed(() => c.newsPage.items.slice(0, 5))

const phonesLine = computed(() => (cp.phones?.length ? cp.phones.join(' / ') : '—'))
</script>
