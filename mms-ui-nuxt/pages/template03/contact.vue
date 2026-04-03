<template>
  <main class="tpl03-form-page">
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">Home</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">CONTACT</span>
          </div>
        </div>
      </div>
      <div class="container-fluid tpl03-form-page__body">
        <div class="container">
          <div class="tit_1">
            <h3>{{ p.title }}<span /></h3>
          </div>
          <p v-if="formIntro" class="tpl03-form-page__lead text-muted">{{ formIntro }}</p>
          <div class="row">
            <div class="col-lg-5 mb-4 mb-lg-0">
              <div class="tpl03-contact-card">
                <p v-if="productTitle" class="mb-3 pb-3 border-bottom small">
                  <strong class="text-dark">Inquiry:</strong>
                  {{ productTitle }}
                </p>
                <div class="tpl03-contact-card__item">
                  <div class="ico">
                    <img :src="icoAddr" alt="" width="40" height="40">
                  </div>
                  <div>
                    <h6>Address</h6>
                    <p class="body">{{ p.address || '—' }}</p>
                  </div>
                </div>
                <div class="tpl03-contact-card__item">
                  <div class="ico">
                    <img :src="icoHotline" alt="" width="40" height="40">
                  </div>
                  <div>
                    <h6>Hotline</h6>
                    <p v-for="(ph, i) in p.phones || []" :key="i" class="body mb-1">{{ ph }}</p>
                    <p v-if="!(p.phones?.length)" class="body">—</p>
                  </div>
                </div>
                <div class="tpl03-contact-card__item">
                  <div class="ico">
                    <img :src="icoEmail" alt="" width="40" height="40">
                  </div>
                  <div>
                    <h6>Email</h6>
                    <p class="body mb-0">
                      <a :href="`mailto:${p.email}`">{{ p.email }}</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7">
              <form class="tpl03-form-page__form" @submit.prevent="onSubmit">
                <div class="form-group">
                  <label for="tpl03-ct-name">Name</label>
                  <input
                    id="tpl03-ct-name"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    autocomplete="name"
                    placeholder="Your name"
                  >
                </div>
                <div class="form-group">
                  <label for="tpl03-ct-email">Email <span class="text-danger">*</span></label>
                  <input
                    id="tpl03-ct-email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    required
                    autocomplete="email"
                    placeholder="name@example.com"
                  >
                </div>
                <div class="form-group tpl03-form-group--last">
                  <label for="tpl03-ct-content">Message</label>
                  <textarea
                    id="tpl03-ct-content"
                    v-model="form.content"
                    class="form-control"
                    rows="7"
                    placeholder="Your message (demo only)"
                  />
                </div>
                <div class="tpl03-form-actions">
                  <button type="submit" class="btn btn-primary tpl03-form-submit">Send</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import InnerHeroBanner from './_components/InnerHeroBanner.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug, template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const base392 = 'https://392.mstore.demo.mingsoft.net'
const icoHotline = `${base392}/392/picture/footer35935350.png`
const icoEmail = `${base392}/392/picture/footer44543051.png`
const icoAddr = `${base392}/392/picture/footer59981066.png`

const C = DEMO_SITE_TEMPLATES.template03
const p = C.contactPage
const route = useRoute()

const bannerSrc =
  p.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const formIntro = computed(() => p.formIntro?.trim() || '')

const productTitle = computed(() => {
  const slug = route.query.product as string | undefined
  if (!slug) return ''
  return template01ProductBySlug(C, slug)?.title ?? slug
})

const form = reactive({ name: '', email: '', content: '' })

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning('Please enter email')
    return
  }
  ElMessage.success('Demo: not sent.')
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/contact')

useHead(() => ({
  title: `${p.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: formIntro.value || C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
