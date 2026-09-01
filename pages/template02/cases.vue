<template>
  <main>
    <InnerPageCover
      :title="page.title"
      :lead="page.intro || ''"
      :background-image="bannerSrc"
    />
    <div class="site-section">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <article v-for="(item, i) in page.items" :key="i" class="mb-5 pb-4 border-bottom">
              <div class="row">
                <div v-if="item.image" class="col-md-4 mb-3 mb-md-0">
                  <img :src="item.image" :alt="item.title" class="img-fluid" loading="lazy">
                </div>
                <div :class="item.image ? 'col-md-8' : 'col-12'">
                  <p v-if="item.client" class="text-primary small font-weight-bold mb-2">{{ item.client }}</p>
                  <h2 class="h4">{{ item.title }}</h2>
                  <p class="text-muted">{{ item.excerpt }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageCover from './_components/InnerPageCover.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template02
const page = C.casesPage!

const bannerSrc = template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')

const { t, locale } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/cases')

useHead(() => ({
  title: t('casesPage.metaTitle'),
  meta: [{ name: 'description', content: t('casesPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
