<template>
  <News />
</template>

<script setup lang="ts">
import News from './_components/News.vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(`${MAIN_SITE_ROUTE_PREFIX}/news`)

useHead(() => ({
  title: t('news.metaTitle'),
  meta: [
    { name: 'description', content: t('news.metaDesc', { company: companyName.value }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
