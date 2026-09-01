<template>
  <main class="tpl-sub-page tpl-sub-page--missing">
    <div class="tpl-inner missing-inner">
      <p class="code">404</p>
      <h1 class="page-title">{{ t('demo.common.pageNotFound') }}</h1>
      <p class="hint">{{ t('demo.common.missingHint') }}</p>
      <div class="actions">
        <NuxtLink class="btn" to="/template04">{{ t('demo.common.home') }}</NuxtLink>
        <NuxtLink class="btn btn-ghost" to="/template04/products">{{ t('demo.common.crumbProductCenter') }}</NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template04', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template04
const { locale, t } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template04/missing')

useHead(() => ({
  title: t('errors.pageNotFoundTitle'),
  meta: [{ name: 'description', content: t('demo.common.missingMetaDesc') }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.missing-inner {
  text-align: center;
  padding-top: 48px;
  padding-bottom: 56px;
}

.code {
  font-size: 64px;
  font-weight: 700;
  color: #ddd;
  margin: 0;
  line-height: 1;
}

.missing-inner .page-title {
  margin: 16px 0 12px;
}

.hint {
  max-width: 520px;
  margin: 0 auto 28px;
  font-size: 14px;
  line-height: 1.75;
  color: #666;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

.btn {
  display: inline-flex;
  padding: 10px 22px;
  background: linear-gradient(180deg, #03c996 0%, #029c6a 100%);
  color: #fff !important;
  text-decoration: none;
  border-radius: 2px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #027a52;
  box-shadow: 0 2px 8px rgba(2, 156, 106, 0.35);
}

.btn-ghost {
  background: #fff;
  color: #029c6a !important;
  border: 1px solid #029c6a;
  box-shadow: none;
}
</style>
