<template>
  <main class="mcms-sub-page mcms-sub-page--contact">
    <div class="mcms-inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <NuxtLink to="/mcms/furniture">首页</NuxtLink>
        <span class="sep">/</span>
        <span>{{ C.contactPage.title }}</span>
      </nav>
      <h1 class="page-title">{{ C.contactPage.title }}</h1>
      <div class="contact-panel">
        <p v-if="C.contactPage.extra" class="extra">{{ C.contactPage.extra }}</p>
        <p>
          <a :href="`mailto:${C.contactPage.email}`">{{ C.contactPage.email }}</a>
        </p>
        <p v-for="(ph, i) in C.contactPage.phones" :key="i">{{ ph }}</p>
        <p v-if="C.contactPage.address">{{ C.contactPage.address }}</p>
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
const p = C.contactPage
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/mcms/furniture/contact')

useHead(() => ({
  title: `${p.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
