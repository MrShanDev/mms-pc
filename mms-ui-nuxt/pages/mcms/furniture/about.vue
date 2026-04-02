<template>
  <main class="mcms-sub-page mcms-sub-page--about">
    <div class="mcms-inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <NuxtLink to="/mcms/furniture">首页</NuxtLink>
        <span class="sep">/</span>
        <span>{{ C.aboutPage.kicker }}</span>
      </nav>
      <p class="kicker">{{ C.aboutPage.kicker }}</p>
      <div class="about-grid">
        <div>
          <h1>{{ C.aboutPage.title }}</h1>
          <p class="lead">{{ C.aboutPage.lead }}</p>
          <p v-for="(para, j) in C.aboutPage.paragraphs" :key="j">{{ para }}</p>
          <p v-if="C.aboutPage.cta" class="cta">{{ C.aboutPage.cta }}</p>
        </div>
        <div class="about-side">
          <img :src="C.aboutPage.image" :alt="C.aboutPage.title" loading="lazy">
        </div>
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

definePageMeta({ layout: 'mcms-furniture', requiresAuth: false })

const C = MCMS_DEMO_TEMPLATES.furniture
const a = C.aboutPage
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/mcms/furniture/about')

useHead(() => ({
  title: `${a.kicker} — ${C.siteTitle}`,
  meta: [
    { name: 'description', content: a.paragraphs[0] ?? C.metaDescription },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
