<template>
  <main>
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">Home</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">ABOUT US</span>
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <div class="container">
          <div class="c_1530_11 wow fadeInUp">
            <div class="zbox">
              <div class="img">
                <img :src="a.image" alt="about us" loading="lazy">
              </div>
              <div class="text">
                <h4>{{ a.title }}</h4>
                <div class="p">
                  <p v-for="(para, j) in a.paragraphs" :key="j">{{ para }}</p>
                </div>
                <NuxtLink v-if="a.cta" class="btn btn-primary mt-2" to="/template03/products">{{ a.cta }}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
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
const a = C.aboutPage

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/about')

useHead(() => ({
  title: `ABOUT US — ${C.siteTitle}`,
  meta: [{ name: 'description', content: a.paragraphs[0] ?? C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
