<template>
  <main>
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">{{ t('nav.home') }}</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <NuxtLink to="/template03/about" class="ms-channel-path-link">{{ t('demo.common.aboutUsNav') }}</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">{{ t('demo.common.crumbFactory') }}</span>
          </div>
        </div>
      </div>
      <div class="container py-4">
        <div class="tit_1">
          <h3>{{ page.title }}<span /></h3>
        </div>
        <p v-if="page.intro" class="text-muted mb-4">{{ page.intro }}</p>
        <article v-for="(item, i) in page.items" :key="i" class="mb-5 pb-4 border-bottom">
          <div class="row">
            <div v-if="item.image" class="col-md-4">
              <img :src="item.image" :alt="item.title" class="img-fluid" loading="lazy">
            </div>
            <div :class="item.image ? 'col-md-8' : 'col-12'">
              <p v-if="item.client" class="text-primary small font-weight-bold">{{ item.client }}</p>
              <h4>{{ item.title }}</h4>
              <p>{{ item.excerpt }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerHeroBanner from './_components/InnerHeroBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03
const page = C.casesPage!

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const { t, locale } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/cases')

useHead(() => ({
  title: t('casesPage.metaTitle'),
  meta: [{ name: 'description', content: t('casesPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
