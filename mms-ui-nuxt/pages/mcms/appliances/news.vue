<template>
  <main class="mcms-sub-page mcms-sub-page--news">
    <div class="mcms-inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <NuxtLink to="/mcms/appliances">Home</NuxtLink>
        <span class="sep">/</span>
        <span>{{ C.newsPage.title }}</span>
      </nav>
      <h1 class="page-title">{{ C.newsPage.title }}</h1>
      <div class="news-list">
        <article v-for="n in C.newsPage.items" :key="n.id" class="news-card">
          <div class="thumb">
            <img :src="n.image" :alt="n.title" loading="lazy">
          </div>
          <div>
            <h2>{{ n.title }}</h2>
            <time :datetime="n.date">{{ n.date }}</time>
            <p class="excerpt">{{ n.excerpt }}</p>
          </div>
        </article>
      </div>
      <footer class="sub-ft">
        <p>{{ C.footerCopyright }}</p>
      </footer>
    </div>
  </main>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'mcms-appliances', requiresAuth: false })

const C = MCMS_DEMO_TEMPLATES.appliances
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/mcms/appliances/news')

useHead(() => ({
  title: `${C.newsPage.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
