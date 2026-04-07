<template>
  <SidebarPageLayout :title="t('demo.common.feedbackPageTitle')" :crumbs="[{ label: t('demo.common.feedbackPageTitle') }]" sidebar-mode="default">
    <div class="contents">
      <p>{{ lead }}</p>
      <form class="e9-feedback-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="fb-name">{{ t('demo.common.feedbackNameLabel') }}</label>
          <input id="fb-name" v-model="form.name" type="text" class="form-control" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="fb-email">{{ t('demo.common.email') }} <span class="text-danger">*</span></label>
          <input
            id="fb-email"
            v-model="form.email"
            type="email"
            class="form-control"
            required
            autocomplete="email"
          >
        </div>
        <div class="form-group">
          <label for="fb-msg">{{ t('demo.common.feedbackMessageLabel') }}</label>
          <textarea id="fb-msg" v-model="form.content" class="form-control" rows="6" />
        </div>
        <button type="submit" class="btn btn-primary">{{ t('demo.common.sendButton') }}</button>
      </form>
    </div>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template04', requiresAuth: false })

const { t, locale } = useAppLocale()

const C = DEMO_SITE_TEMPLATES.template04

const lead = computed(() => C.contactPage.formIntro?.trim() || t('demo.common.feedbackLeadDefault'))

const form = reactive({ name: '', email: '', content: '' })

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning(t('demo.common.fillEmail'))
    return
  }
  ElMessage.success(t('demo.common.demoFormNoSubmit'))
}

const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template04/feedback')

useHead(() => ({
  title: t('feedbackPage.metaTitle'),
  meta: [{ name: 'description', content: t('feedbackPage.metaDesc', { company: C.siteTitle }) }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.e9-feedback-form .form-group {
  margin-bottom: 1rem;
}

.e9-feedback-form label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}
</style>
