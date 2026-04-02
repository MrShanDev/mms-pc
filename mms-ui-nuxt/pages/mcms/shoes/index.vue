<template>
  <McmsHomeShoes />
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'mcms-shoes', requiresAuth: false })

const C = MCMS_DEMO_TEMPLATES.shoes
const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/mcms/shoes')

useHead(() => ({
  title: C.metaTitle,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
