<template>
  <Home />
</template>

<script setup lang="ts">
import Home from './_components/Home.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template02
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02')

useHead(() => ({
  title: C.metaTitle,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
