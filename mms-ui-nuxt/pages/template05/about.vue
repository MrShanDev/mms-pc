<template>
  <SidebarPageLayout variant="plain" :title="a.kicker" :crumbs="[{ label: a.kicker }]" sidebar-mode="default">
    <div class="contents">
      <p v-for="(para, j) in a.paragraphs" :key="j">{{ para }}</p>
      <p>
        <img :src="a.image" class="img-responsive" :alt="a.title" loading="lazy">
      </p>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05
const a = C.aboutPage

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/about')

useHead(() => ({
  title: `${a.kicker} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: a.paragraphs[0] ?? C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
