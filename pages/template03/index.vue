<template>
  <Home />
</template>

<script setup lang="ts">
import Home from './_components/Home.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03
const { t, locale } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03')

useHead(() => ({
  title: C.siteTitle,
  meta: [{ name: 'description', content: t('meta.homeDesc') }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
