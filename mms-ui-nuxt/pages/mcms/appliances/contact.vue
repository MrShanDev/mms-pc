<template>
  <main class="mcms-sub-page mcms-sub-page--contact">
    <div class="mcms-inner">
      <nav class="crumb" aria-label="Breadcrumb">
        <NuxtLink to="/mcms/appliances">Home</NuxtLink>
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
        <p v-if="C.contactPage.links?.length" class="links">
          <a
            v-for="(l, i) in C.contactPage.links"
            :key="i"
            :href="l.href"
            target="_blank"
            rel="noopener"
          >
            {{ l.label }}
          </a>
        </p>
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
const p = C.contactPage
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/mcms/appliances/contact')

useHead(() => ({
  title: `${p.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
