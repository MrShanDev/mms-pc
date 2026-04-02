<template>
  <OffSiteHome />
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import { OFF_SITE_ROUTE_PREFIX } from '@/utils/mcmsDemo'

definePageMeta({
  layout: 'default',
  requiresAuth: false
})

const route = useRoute()
const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(OFF_SITE_ROUTE_PREFIX)

const scrollIfHash = () => {
  const hash = route.hash?.replace(/^#/, '')
  if (!hash || typeof document === 'undefined') return
  requestAnimationFrame(() => {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
  })
}

watch(
  () => route.fullPath,
  () => scrollIfHash(),
  { immediate: true }
)

useHead(() => ({
  title: companyName.value,
  meta: [
    { name: 'description', content: t('meta.homeDesc') },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
