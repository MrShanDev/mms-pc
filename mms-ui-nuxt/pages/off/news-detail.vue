<template>
  <OffSiteNewsDetail />
</template>

<script setup lang="ts">
import { newsList, useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()
const r = useOffSiteRoutes()
const demo = newsList[0]!

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(r.newsDetail)

useHead(() => ({
  title: demo.title,
  meta: [
    {
      name: 'description',
      content: t('newsDetail.metaDesc', { title: demo.title, company: companyName.value })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
