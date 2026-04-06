<template>
  <main>
    <InnerPageCover
      :title="t('demo.common.contactUs')"
      :lead="bannerLeadLine"
      :background-image="innerBannerSrc"
    />
    <div class="site-section">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-7 text-center mx-auto">
            <span class="subtitle-39293">{{ t('demo.common.contactUsHeading') }}</span>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-8 mb-5">
            <div v-if="productTitle" class="alert alert-secondary small mb-3">
              {{ t('demo.common.productInquiryBanner') }} <strong>{{ productTitle }}</strong>
            </div>
            <form id="form" @submit.prevent="onSubmit">
              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    v-model="form.username"
                    type="text"
                    name="contacts"
                    class="form-control"
                    :placeholder="t('demo.common.namePlaceholder')"
                    autocomplete="name"
                  >
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    v-model="form.mobile"
                    type="text"
                    name="mobile"
                    class="form-control"
                    placeholder="Phone"
                    autocomplete="tel"
                  >
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <input
                    v-model="form.email"
                    type="email"
                    name="email"
                    class="form-control"
                    :placeholder="t('demo.common.emailPlaceholder')"
                    autocomplete="email"
                    required
                  >
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-12">
                  <textarea
                    v-model="form.content"
                    name="content"
                    class="form-control"
                    :placeholder="t('demo.common.placeholderMessageDemo')"
                    cols="30"
                    rows="10"
                  />
                </div>
              </div>
              <div class="form-group row">
                <div class="col-md-6 mr-auto">
                  <input
                    type="submit"
                    class="btn btn-block btn-primary text-white py-3 px-5"
                    :value="t('demo.common.sendMessageSubmit')"
                  >
                </div>
              </div>
            </form>
          </div>
          <div class="col-lg-4 ml-auto">
            <div class="bg-white p-3 p-md-3">
              <h3 class="text-black mb-4">{{ t('demo.common.contactInfoHeading') }}</h3>
              <ul class="list-unstyled footer-link">
                <li class="d-block mb-3">
                  <span class="d-block text-black">{{ t('demo.common.addressLine') }}</span>
                  <span>{{ p.address || '—' }}</span>
                </li>
                <li class="d-block mb-3">
                  <span class="d-block text-black">{{ t('demo.common.telephoneLine') }}</span>
                  <span>{{ phonesLine }}</span>
                </li>
                <li class="d-block mb-3">
                  <span class="d-block text-black">{{ t('demo.common.emailLine') }}</span>
                  <span>{{ p.email }}</span>
                </li>
                <li v-if="qqLine" class="d-block mb-3">
                  <span class="d-block text-black">{{ t('demo.common.qqLabel') }}</span>
                  <span>{{ qqLine }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="p.links?.length" class="site-section pt-0">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <NuxtLink
              v-for="(lk, j) in p.links"
              :key="j"
              :to="lk.href"
              class="mr-3"
            >{{ lk.label }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug, template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'
import InnerPageCover from './_components/InnerPageCover.vue'

definePageMeta({ layout: 'demo-template02', requiresAuth: false })

const { t, locale } = useI18n()

const C = DEMO_SITE_TEMPLATES.template02
const p = C.contactPage
const route = useRoute()

const innerBannerSrc =
  p.bannerImage ?? template01DemoAsset('/upload/image/20230524/1684918832729100.jpg')
const bannerLeadLine = computed(() => {
  const a = p.bannerLead && String(p.bannerLead).trim()
  if (a) return p.bannerLead
  return p.formIntro && String(p.formIntro).trim() ? p.formIntro : ''
})

const phonesLine = computed(() => (p.phones?.length ? p.phones.join(' / ') : '—'))

const qqLine = computed(() => {
  const w = p.wechatLine?.trim()
  if (w) return w
  if (p.phones && p.phones.length > 1) return p.phones[1]
  return ''
})

const productTitle = computed(() => {
  const slug = route.query.product as string | undefined
  if (!slug) return ''
  return template01ProductBySlug(C, slug)?.title ?? slug
})

const form = reactive({
  username: '',
  mobile: '',
  email: '',
  content: ''
})

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning(t('demo.common.fillEmail'))
    return
  }
  ElMessage.success(t('demo.common.demoContactNoSubmit'))
}

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template02/contact')

useHead(() => ({
  title: `${t('demo.common.contactUs')} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: p.formIntro ?? C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
