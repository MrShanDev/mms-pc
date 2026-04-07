<template>
  <main>
    <InnerPageCover
      :title="t('demo.common.aboutUsNav')"
      :lead="leadText"
      :background-image="innerBannerSrc"
    />
    <div class="site-section bg-white about-me">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 mb-5 mb-md-0">
            <img :src="a.image" alt="Image" class="img-fluid" loading="lazy">
          </div>
          <div class="col-md-5 ml-auto text-black">
            <h3 class="text-black mb-5">{{ a.title }}</h3>
            <div id="maximg" class="text-black">
              <p v-for="(para, j) in a.paragraphs" :key="j">{{ para }}</p>
            </div>
            <NuxtLink v-if="a.cta" class="btn btn-primary mt-3" to="/template02/products">{{ a.cta }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import InnerPageCover from './_components/InnerPageCover.vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template02
const a = C.aboutPage

const leadText = computed(() => (a.lead && String(a.lead).trim() ? a.lead : ''))

const innerBannerSrc = computed(
  () =>
    C.contactPage.bannerImage ??
    template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')
)

const { t, locale } = useAppLocale()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/about')

useHead(() => ({
  title: t('about.metaTitle'),
  meta: [{ name: 'description', content: t('about.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
