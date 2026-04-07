<template>
  <main class="tpl-sub-page tpl-sub-page--cases">
    <div class="tpl-inner">
      <nav class="crumb" :aria-label="t('demo.common.breadcrumb')">
        <NuxtLink to="/template01">{{ t('demo.common.home') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ page.title }}</span>
      </nav>
      <h1 class="page-title">{{ page.title }}</h1>
      <p v-if="page.intro" class="intro">{{ page.intro }}</p>
      <div class="case-grid">
        <article v-for="(item, i) in page.items" :key="i" class="case-card">
          <div v-if="item.image" class="thumb">
            <img :src="item.image" :alt="item.title" loading="lazy">
          </div>
          <div class="body">
            <p v-if="item.client" class="client">{{ item.client }}</p>
            <h2>{{ item.title }}</h2>
            <p class="excerpt">{{ item.excerpt }}</p>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template01', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template01
const page = C.casesPage!

const { locale, t } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template01/cases')

useHead(() => ({
  title: t('casesPage.metaTitle'),
  meta: [{ name: 'description', content: t('casesPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.intro {
  color: #666;
  font-size: 14px;
  line-height: 1.7;
  margin: -12px 0 24px;
}

.case-grid {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.case-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

@media (max-width: 640px) {
  .case-card {
    grid-template-columns: 1fr;
  }
}

.thumb {
  background: #f3f3f3;
  min-height: 140px;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 140px;
}

.body {
  padding: 18px 20px 20px 0;
}

@media (max-width: 640px) {
  .body {
    padding: 0 16px 16px;
  }
}

.client {
  font-size: 12px;
  font-weight: 600;
  color: #029c6a;
  margin: 0 0 6px;
}

.case-card h2 {
  font-size: 17px;
  margin: 0 0 10px;
  line-height: 1.35;
}

.excerpt {
  margin: 0;
  font-size: 14px;
  line-height: 1.7;
  color: #555;
}
</style>
