<template>
  <SidebarPageLayout :title="t('demo.common.pageDownload')" :crumbs="[{ label: t('demo.common.pageDownload') }]" sidebar-mode="download">
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
      <h3>{{ t('demo.common.helpDocumentation') }}</h3>
      <p>{{ helpText }}</p>
    </section>
    <section id="files" class="contents">
      <h3>{{ t('demo.common.fileDownloadSection') }}</h3>
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

definePageMeta({ layout: 'demo-template04', requiresAuth: false })

const { t, locale } = useAppLocale()

const C = DEMO_SITE_TEMPLATES.template04

const helpText =
  'Demo placeholder for help documentation. Replace with CMS-driven content.'

const filesText = 'Demo file list (no real downloads):'

const fileRows = ['Product catalog PDF (demo)', 'Specification sheet (demo)', 'After-sales policy (demo)']

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template04/download')

useHead(() => ({
  title: t('downloadPage.metaTitle'),
  meta: [{ name: 'description', content: t('downloadPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
