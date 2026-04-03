<template>
  <SidebarPageLayout variant="plain" :title="p.title" :crumbs="[{ label: p.title }]" sidebar-mode="default">
    <div class="contents">
      <p v-if="productTitle" style="text-align: center">
        Inquiry: <strong>{{ productTitle }}</strong>
      </p>
      <p style="text-align: center">Address: {{ p.address || '—' }}</p>
      <p style="text-align: center">Telephone: {{ phonesLine }}</p>
      <p style="text-align: center">
        E-mail: <a :href="`mailto:${p.email}`">{{ p.email }}</a>
      </p>
    </div>
    <template #after>
      <div class="contact-form-wrap" id="message">
        <h2 class="left_h2" style="margin-top: 1.5rem">Message</h2>
        <div class="contact-form-1">
          <form class="ms-contact-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
            <input
              v-model="form.username"
              type="text"
              name="contacts"
              placeholder="Name:"
              class="p-d-c-form-1-input-1"
              autocomplete="name"
            >
            <input
              v-model="form.mobile"
              type="text"
              name="mobile"
              placeholder="Phone:"
              class="p-d-c-form-1-input-1"
              autocomplete="tel"
            >
            <input
              v-model="form.email"
              type="text"
              name="email"
              placeholder="Email:"
              class="p-d-c-form-1-input-1 mr-0"
              autocomplete="email"
            >
            <textarea
              v-model="form.content"
              name="content"
              class="p-d-c-form-1-input-2"
              placeholder="Message:"
              rows="5"
            />
            <button type="submit" class="p-d-c-form-1-input-3">Send</button>
            <button type="button" class="p-d-c-form-1-input-3 bg-323232" @click="onReset">Reset</button>
          </form>
        </div>
      </div>
    </template>
  </SidebarPageLayout>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import SidebarPageLayout from './_components/SidebarPageLayout.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01ProductBySlug } from '@/utils/template01MingsoftMock'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template05', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template05
const p = C.contactPage
const route = useRoute()

const phonesLine = computed(() => (p.phones?.length ? p.phones.join(' / ') : '—'))

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
    ElMessage.warning('Please enter email')
    return
  }
  ElMessage.success('Demo: form not submitted.')
}

function onReset() {
  form.username = ''
  form.mobile = ''
  form.email = ''
  form.content = ''
}

const { locale } = useI18n()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/template05/contact')

useHead(() => ({
  title: `${p.title} — ${C.siteTitle}`,
  meta: [{ name: 'description', content: p.formIntro ?? C.metaDescription }, ...canonicalOg],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style scoped>
.contact-form-1 {
  max-width: 100%;
}

.ms-contact-form {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.p-d-c-form-1-input-1 {
  flex: 1 1 200px;
  padding: 10px 12px;
  border: 1px solid #ddd;
}

.p-d-c-form-1-input-2 {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  margin-top: 8px;
}

.p-d-c-form-1-input-3 {
  padding: 10px 24px;
  margin-top: 8px;
  background: #029c6a;
  color: #fff;
  border: none;
  cursor: pointer;
}

.bg-323232 {
  background: #323232 !important;
}
</style>
