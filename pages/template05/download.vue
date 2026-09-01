<template>
  <SidebarPageLayout :title="t('demo.common.pageDownload')" :crumbs="[{ label: t('demo.common.pageDownload') }]" sidebar-mode="download" variant="listbox">
    <ul class="list_news">
      <li>
        <a href="javascript:void(0)">{{ t('demo.common.downloadCase2') }}</a>
        <span class="news_time">24-01-15</span>
      </li>
      <li>
        <a href="javascript:void(0)">{{ t('demo.common.downloadCase1') }}</a>
        <span class="news_time">24-01-15</span>
      </li>
    </ul>
    <section id="help" class="contents" style="margin-top: 2rem">
      <h3>{{ t('demo.common.helpDocumentation') }}</h3>
      <p>{{ t('demo.common.downloadHelpBody') }}</p>
    </section>
    <section id="files" class="contents">
      <h3>{{ t('demo.common.fileDownloadSection') }}</h3>
      <p>{{ t('demo.common.downloadFilesIntro') }}</p>
      <ul>
        <li>
          <a href="javascript:void(0)">{{ t('demo.common.downloadFileCatalog') }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{ t('demo.common.downloadFileSpec') }}</a>
        </li>
        <li>
          <a href="javascript:void(0)">{{ t('demo.common.downloadFileAfterSales') }}</a>
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

const { t, locale } = useAppLocale()

const C = DEMO_SITE_TEMPLATES.template05

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/download')

useHead(() => ({
  title: t('downloadPage.metaTitle'),
  meta: [{ name: 'description', content: t('downloadPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
