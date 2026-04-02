<template>
  <OffSiteContact />
</template>

<script setup lang="ts">
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import { OFF_SITE_ROUTE_PREFIX } from '@/utils/mcmsDemo'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(`${OFF_SITE_ROUTE_PREFIX}/contact`)

useHead(() => ({
  title: t('contact.metaTitle'),
  meta: [
    { name: 'description', content: t('contact.metaDesc', { company: companyName.value }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
