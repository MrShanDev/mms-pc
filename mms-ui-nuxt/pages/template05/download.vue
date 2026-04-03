<template>
  <SidebarPageLayout title="Download" :crumbs="[{ label: 'Download' }]" sidebar-mode="download" variant="listbox">
    <ul class="list_news">
      <li>
        <a href="javascript:void(0)">Download case 2</a>
        <span class="news_time">24-01-15</span>
      </li>
      <li>
        <a href="javascript:void(0)">Download case 1</a>
        <span class="news_time">24-01-15</span>
      </li>
    </ul>
    <section id="help" class="contents" style="margin-top: 2rem">
      <h3>Help documentation</h3>
      <p>{{ helpText }}</p>
    </section>
    <section id="files" class="contents">
      <h3>File download</h3>
      <p>{{ filesText }}</p>
      <ul>
        <li v-for="(row, i) in fileRows" :key="i">
          <a href="javascript:void(0)">{{ row }}</a>
        </li>
      </ul>
    </section>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05

const helpText =
  'Demo placeholder for help documentation. Replace with CMS-driven content.'

const filesText = 'Demo file list (no real downloads):'

const fileRows = ['Product catalog PDF (demo)', 'Specification sheet (demo)', 'After-sales policy (demo)']

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/download')

useHead(() => ({
  title: `Download — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
