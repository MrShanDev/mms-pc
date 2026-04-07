<template>
  <main class="ms-sub-about">
    <InnerPageBanner
      home-path="/template01"
      :banner-src="bannerSrc"
      :banner-lead="bannerLead"
      :banner-alt="a.title"
      :crumbs="crumbs"
    >
      <template #sidenav />
    </InnerPageBanner>

    <div class="pd-page-inner">
      <div class="about">
        <div class="about-1">
          <div class="about-1-left">
            <div class="about-1-left-title">{{ a.kicker }}</div>
            <div class="about-1-left-txt">
              <p v-for="(para, j) in a.paragraphs" :key="j">{{ para }}</p>
            </div>
            <NuxtLink v-if="a.cta" class="about-cta" to="/template01/products">{{ a.cta }}</NuxtLink>
          </div>
          <div class="about-1-right">
            <img :src="a.image" :alt="a.title" loading="lazy">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import InnerPageBanner from './_components/InnerPageBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template01', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template01
const a = C.aboutPage

const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/cms/category/1688608258562.jpg')
const bannerLead = C.contactPage.bannerLead ?? C.productCatalog?.pageLead ?? ''

const { t, locale } = useAppLocale()

const crumbs = computed(() => [
  { label: t('demo.common.home'), to: '/template01' },
  { label: t('demo.common.aboutUsNav'), to: '/template01/about' }
])

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template01/about')

useHead(() => ({
  title: t('about.metaTitle'),
  meta: [
    { name: 'description', content: t('about.metaDesc', { company: C.siteTitle }) },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.about {
  width: 100%;
}

.about-1 {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 3%;
  padding: 48px 0 56px;
  box-sizing: border-box;
}

.about-1-left {
  flex: 1 1 320px;
  max-width: 100%;
  font-family: 'Microsoft YaHei', sans-serif;
}

.about-1-left-title {
  width: 100%;
  line-height: 1.2;
  font-size: clamp(26px, 3.5vw, 36px);
  font-weight: 700;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.about-1-left-txt {
  margin-top: 12px;
  line-height: 2;
  font-size: 16px;
  color: #666;
}

.about-1-left-txt p {
  margin: 0 0 16px;
}

.about-1-right {
  flex: 1 1 280px;
  min-width: 260px;
}

.about-1-right img {
  width: 100%;
  height: auto;
  display: block;
  vertical-align: top;
}

.about-cta {
  display: inline-block;
  margin-top: 8px;
  color: #029c6a;
  font-weight: 600;
  text-decoration: none;
  font-size: 15px;
}

.about-cta:hover {
  text-decoration: underline;
}

@media (max-width: 767px) {
  .about-1 {
    padding: 32px 0 40px;
  }
}
</style>
