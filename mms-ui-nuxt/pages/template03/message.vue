<template>
  <main class="tpl03-form-page">
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">Home</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">MESSAGE</span>
          </div>
        </div>
      </div>
      <div class="container-fluid tpl03-form-page__body">
        <div class="container">
          <div class="tit_1">
            <h3>MESSAGE<span /></h3>
          </div>
          <p v-if="lead" class="tpl03-form-page__lead text-muted">{{ lead }}</p>
          <div class="row justify-content-center">
            <div class="col-lg-9 col-xl-7">
              <form class="tpl03-form-page__form" @submit.prevent="onSubmit">
                <div class="form-group">
                  <label for="tpl03-msg-name">Name</label>
                  <input
                    id="tpl03-msg-name"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    autocomplete="name"
                    placeholder="Your name"
                  >
                </div>
                <div class="form-group">
                  <label for="tpl03-msg-email">Email <span class="text-danger">*</span></label>
                  <input
                    id="tpl03-msg-email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    required
                    autocomplete="email"
                    placeholder="name@example.com"
                  >
                </div>
                <div class="form-group tpl03-form-group--last">
                  <label for="tpl03-msg-content">Message</label>
                  <textarea
                    id="tpl03-msg-content"
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
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template03', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template03
const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const lead = computed(() => C.contactPage.formIntro?.trim() || '')

const form = reactive({ name: '', email: '', content: '' })

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning('Please enter email')
    return
  }
  ElMessage.success('Demo: message not sent to server.')
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/message')

useHead(() => ({
  title: `MESSAGE — ${C.siteTitle}`,
  meta: [{ name: 'description', content: lead.value || C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
