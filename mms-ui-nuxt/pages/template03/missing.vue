<template>
  <main>
    <div id="main" class="pz_main">
      <div class="container text-center py-5">
        <p class="display-4 text-muted">404</p>
        <h1 class="h4 mb-3">{{ t('demo.common.pageNotFound') }}</h1>
        <NuxtLink class="btn btn-primary" to="/template03">{{ t('demo.common.home') }}</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03
const { locale, t } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/missing')

useHead(() => ({
  title: `${t('demo.common.pageNotFound')} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: t('demo.common.missingMetaDesc') }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
