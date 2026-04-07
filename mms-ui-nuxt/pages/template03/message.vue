<template>
  <main class="tpl03-form-page">
    <InnerHeroBanner :src="bannerSrc" />
    <div id="main" class="pz_main">
      <div class="container-fluid">
        <div class="container">
          <div class="headline">
            <NuxtLink to="/template03" class="ms-channel-path-index">{{ t('demo.common.home') }}</NuxtLink>
            &nbsp;&gt;&gt;&nbsp;
            <span class="ms-channel-path-link">{{ t('demo.common.messageBoardTitle') }}</span>
          </div>
        </div>
      </div>
      <div class="container-fluid tpl03-form-page__body">
        <div class="container">
          <div class="tit_1">
            <h3>{{ t('demo.common.messageBoardTitle') }}<span /></h3>
          </div>
          <p v-if="lead" class="tpl03-form-page__lead text-muted">{{ lead }}</p>
          <div class="row justify-content-center">
            <div class="col-lg-9 col-xl-7">
              <form class="tpl03-form-page__form" @submit.prevent="onSubmit">
                <div class="form-group">
                  <label for="tpl03-msg-name">{{ t('demo.common.feedbackNameLabel') }}</label>
                  <input
                    id="tpl03-msg-name"
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    autocomplete="name"
                    :placeholder="t('demo.common.namePlaceholder')"
                  >
                </div>
                <div class="form-group">
                  <label for="tpl03-msg-email">{{ t('demo.common.email') }} <span class="text-danger">*</span></label>
                  <input
                    id="tpl03-msg-email"
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    required
                    autocomplete="email"
                    :placeholder="t('demo.common.emailPlaceholder')"
                  >
                </div>
                <div class="form-group tpl03-form-group--last">
                  <label for="tpl03-msg-content">{{ t('demo.common.feedbackMessageLabel') }}</label>
                  <textarea
                    id="tpl03-msg-content"
                    v-model="form.content"
                    class="form-control"
                    rows="7"
                    :placeholder="t('demo.common.placeholderMessageDemo')"
                  />
                </div>
                <div class="tpl03-form-actions">
                  <button type="submit" class="btn btn-primary tpl03-form-submit">{{ t('demo.common.sendButton') }}</button>
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

const { t, locale } = useAppLocale()

const C = DEMO_SITE_TEMPLATES.template03
const bannerSrc =
  C.contactPage.bannerImage ?? template01DemoAsset('/upload/image/20230703/1688374377849050.jpg')

const lead = computed(() => C.contactPage.formIntro?.trim() || '')

const form = reactive({ name: '', email: '', content: '' })

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning(t('demo.common.fillEmail'))
    return
  }
  ElMessage.success(t('demo.common.demoFormNoSubmit'))
}

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template03/message')

useHead(() => ({
  title: t('siteMessage.metaTitle'),
  meta: [{ name: 'description', content: t('siteMessage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>
