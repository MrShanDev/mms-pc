<template>
  <SidebarPageLayout title="Feedback" :crumbs="[{ label: 'Feedback' }]" sidebar-mode="default" variant="plain">
    <div class="contents">
      <p>{{ lead }}</p>
      <form class="e7-feedback-form" @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="fb-name">Name</label>
          <input id="fb-name" v-model="form.name" type="text" class="form-control" autocomplete="name">
        </div>
        <div class="form-group">
          <label for="fb-email">Email <span class="text-danger">*</span></label>
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
          <label for="fb-msg">Message</label>
          <textarea id="fb-msg" v-model="form.content" class="form-control" rows="6" />
        </div>
        <button type="submit" class="btn btn-primary">Send</button>
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

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05

const lead = computed(() => C.contactPage.formIntro?.trim() || 'We value your feedback (demo).')

const form = reactive({ name: '', email: '', content: '' })

function onSubmit() {
  if (!form.email.trim()) {
    ElMessage.warning('Please enter email')
    return
  }
  ElMessage.success('Demo: not sent.')
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/feedback')

useHead(() => ({
  title: `Feedback — ${C.siteTitle}`,
  meta: [{ name: 'description', content: C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.e7-feedback-form .form-group {
  margin-bottom: 1rem;
}

.e7-feedback-form label {
  display: block;
  margin-bottom: 0.25rem;
  font-weight: 600;
}
</style>
