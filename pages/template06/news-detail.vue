<template>
  <NewsDetail />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import NewsDetail from './_components/NewsDetail.vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, newsList } = useTitaSite()
const r = useTemplate06Routes()
const demo = computed(() => newsList.value[0]!)

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(r.newsDetail)

useHead(() => ({
  title: demo.value.title,
  meta: [
    {
      name: 'description',
      content: t('newsDetail.metaDesc', { title: demo.value.title, company: companyName.value })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
