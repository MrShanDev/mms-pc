<template>
  <main>
    <div class="site-section">
      <div class="container text-center py-5">
        <p class="display-4 text-muted mb-2">404</p>
        <h1 class="h3 mb-3">{{ t('demo.common.pageNotFound') }}</h1>
        <p class="text-muted mb-4">
          {{ t('demo.common.missingHint') }}
        </p>
        <NuxtLink class="btn btn-primary mr-2" to="/template02">{{ t('demo.common.home') }}</NuxtLink>
        <NuxtLink class="btn btn-outline-primary" to="/template02/products">{{ t('demo.common.crumbProductCenter') }}</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template02
const { locale, t } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/missing')

useHead(() => ({
  title: t('errors.pageNotFoundTitle'),
  meta: [{ name: 'description', content: t('demo.common.missingMetaDesc') }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
