<template>
  <main class="ms-contact-page">
    <div class="pd-banner">
      <div
        class="pd-banner-bg"
        :style="{ backgroundImage: `url(${contactBannerImg})` }"
        role="img"
        :aria-label="t('nav.contact')"
      >
        <div class="pd-banner-overlay">
          <div class="pd-page-inner">
            <h3 class="pd-banner-lead">{{ contactBannerLead }}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="pd-toolbar-bg">
      <div class="pd-page-inner pd-toolbar pd-toolbar--contact">
        <nav class="pd-sidenav pd-sidenav--empty" aria-hidden="true">
          <ul />
        </nav>
        <nav class="pd-address" :aria-label="t('demo.common.breadcrumb')">
          <NuxtLink to="/template01" class="pd-addr-home" :title="t('demo.common.home')">
            <img :src="iconHome" alt="" width="18" height="18" loading="lazy">
          </NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <NuxtLink to="/template01">{{ t('demo.common.home') }}</NuxtLink>
          <span class="pd-addr-sep">&gt;&gt;</span>
          <span class="pd-addr-current">{{ t('nav.contact') }}</span>
        </nav>
      </div>
    </div>

    <div class="pd-page-inner">
      <div v-if="productTitle" class="product-context">
        {{ t('demo.common.inquiryRelated') }}<strong>{{ productTitle }}</strong>
      </div>

      <div class="contact-1">
        <div class="contact-1-left">
          <div class="contact-1-left-ico">
            <img :src="iconPhone" alt="" loading="lazy">
          </div>
          <div class="contact-1-left-txt">{{ mainPhone }}</div>
        </div>
        <div class="contact-1-left">
          <div class="contact-1-left-ico">
            <img :src="iconMail" alt="" loading="lazy">
          </div>
          <div class="contact-1-left-txt">
            <a :href="`mailto:${p.email}`">{{ p.email }}</a>
          </div>
        </div>
        <div class="contact-1-left">
          <div class="contact-1-left-ico">
            <img :src="iconAddr" alt="" loading="lazy">
          </div>
          <div class="contact-1-left-txt">{{ p.address || '—' }}</div>
        </div>
        <div class="contact-1-left">
          <div class="contact-1-left-ico">
            <img :src="iconMobile" alt="" loading="lazy">
          </div>
          <div class="contact-1-left-txt">{{ mobilePhone }}</div>
        </div>
        <div class="contact-1-left">
          <div class="contact-1-left-ico">
            <img :src="iconWechat" alt="" loading="lazy">
          </div>
          <div class="contact-1-left-txt contact-1-left-txt--qr">
            <img v-if="p.wechatQrImage" :src="p.wechatQrImage" :alt="t('demo.common.wechatQrAlt')" class="wechat-qr">
            <span v-else-if="p.wechatLine" class="wechat-line">{{ p.wechatLine }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-bg-1" id="message">
      <div class="pd-page-inner">
        <div class="p-d-c-form contact-form">
          <h2 class="contact-title-1">{{ t('demo.common.leaveMessageTitle') }}</h2>
          <div class="contact-form-1">
            <form class="ms-contact-form" @submit.prevent="onSubmit" @reset.prevent="onReset">
              <input
                v-model="form.username"
                type="text"
                name="contacts"
                :placeholder="t('demo.common.namePh')"
                class="p-d-c-form-1-input-1"
                autocomplete="name"
              >
              <input
                v-model="form.mobile"
                type="text"
                name="mobile"
                :placeholder="t('demo.common.phonePh')"
                class="p-d-c-form-1-input-1"
                autocomplete="tel"
              >
              <input
                v-model="form.email"
                type="text"
                name="email"
                :placeholder="t('demo.common.emailPh')"
                class="p-d-c-form-1-input-1 mr-0"
                autocomplete="email"
              >
              <textarea
                v-model="form.content"
                name="content"
                class="p-d-c-form-1-input-2"
                :placeholder="t('demo.common.contentPh')"
                rows="5"
              />
              <button type="submit" class="p-d-c-form-1-input-3">{{ t('demo.common.send') }}</button>
              <button type="button" class="p-d-c-form-1-input-3 bg-323232" @click="onReset">{{ t('demo.common.reset') }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="p.links?.length" class="pd-page-inner contact-extra-links">
      <NuxtLink v-for="(lk, j) in p.links" :key="j" :to="lk.href">{{ lk.label }}</NuxtLink>
    </div>

  </main>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset, template01ProductBySlug } from '@/utils/template01MingsoftMock'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'demo-template01', requiresAuth: false })

const C = DEMO_SITE_TEMPLATES.template01
const p = C.contactPage
const route = useRoute()
const { t, locale } = useI18n()

const contactBannerImg = p.bannerImage ?? template01DemoAsset('/upload/cms/category/1688608258562.jpg')
const contactBannerLead = p.bannerLead ?? C.productCatalog?.pageLead ?? ''

const iconHome = template01DemoAsset('/193/images/home.png')
const iconPhone = template01DemoAsset('/193/images/ico-1.png')
const iconMail = template01DemoAsset('/193/images/ico-2.png')
const iconAddr = template01DemoAsset('/193/images/ico-3.png')
const iconMobile = template01DemoAsset('/193/images/ico-4.png')
const iconWechat = template01DemoAsset('/193/images/ico-5.png')

const mainPhone = p.phones[0] ?? '—'
const mobilePhone = p.phones[1] ?? p.phones[0] ?? '—'

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

function onReset() {
  form.username = ''
  form.mobile = ''
  form.email = ''
  form.content = ''
}

useHead(() => {
  const config = useRuntimeConfig()
  const base = (config.public?.site?.url as string)?.replace(/\/$/, '') || ''
  const path = '/template01/contact'
  const link = base ? [{ rel: 'canonical', href: `${base}${path}` }] : []
  const og = base ? [{ property: 'og:url', content: `${base}${path}` }] : []
  return {
    title: `${p.title} — ${C.siteTitle}`,
    meta: [{ name: 'description', content: p.formIntro ?? C.metaDescription }, ...og],
    link,
    htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
  }
})
</script>

<style scoped>
.ms-contact-page {
  width: 100%;
  overflow-x: hidden;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
  color: #333;
  background: #fff;
}

.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.pd-banner-bg {
  min-height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

@media (min-width: 900px) {
  .pd-banner-bg {
    min-height: 280px;
  }
}

.pd-banner-overlay {
  min-height: inherit;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.12) 50%, transparent 100%);
}

.pd-banner-lead {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  max-width: 720px;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .pd-banner-lead {
    font-size: 22px;
    color: #029c6a;
    text-shadow: none;
    background: rgba(255, 255, 255, 0.92);
    padding: 16px 22px;
    border-radius: 2px;
  }
}

.pd-toolbar-bg {
  background: #f8f8f8;
  border-bottom: 1px solid #ececec;
}

.pd-toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px 24px;
  padding-top: 14px;
  padding-bottom: 14px;
}

.pd-toolbar--contact {
  justify-content: flex-end;
}

.pd-sidenav--empty ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.pd-address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 4px;
  font-size: 14px;
  color: #adadad;
}

.pd-address a {
  color: #adadad;
  text-decoration: none;
}

.pd-address a:hover {
  color: #029c6a;
}

.pd-addr-home {
  display: inline-flex;
  line-height: 0;
}

.pd-addr-sep {
  margin: 0 2px;
  color: #c8c8c8;
  user-select: none;
}

.pd-addr-current {
  color: #666;
}

@media (max-width: 1279px) {
  .pd-toolbar--contact {
    justify-content: flex-start;
  }
}

.product-context {
  font-size: 14px;
  margin: 20px 0 8px;
  padding: 12px 16px;
  background: #f8fdfb;
  border: 1px solid rgba(2, 156, 106, 0.25);
  border-radius: 4px;
}

.contact-1 {
  float: left;
  width: 100%;
  padding: 36px 0 10px;
  box-sizing: border-box;
}

.contact-1::after {
  content: '';
  display: table;
  clear: both;
}

.contact-1-left {
  float: left;
  width: 19.2%;
  margin-right: 1%;
  min-height: 200px;
  padding: 41px 0 10px;
  background: #f5f5f5;
  text-align: center;
  box-sizing: border-box;
}

.contact-1-left:last-child {
  margin-right: 0;
}

.contact-1-left-ico {
  height: 37px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-1-left-ico img {
  max-height: 37px;
  width: auto;
  transition: transform 0.8s ease-out;
}

.contact-1-left:hover .contact-1-left-ico img {
  transform: rotateY(360deg);
}

.contact-1-left-txt {
  margin-top: 10px;
  padding: 0 4%;
  font-size: 16px;
  line-height: 1.5;
  color: #666;
  word-break: break-word;
}

.contact-1-left-txt a {
  color: #029c6a;
  text-decoration: none;
}

.contact-1-left-txt--qr {
  min-height: 40px;
}

.wechat-line {
  display: inline-block;
  max-width: 100%;
  font-size: 14px;
  line-height: 1.5;
  color: #555;
  text-align: center;
}

.wechat-qr {
  width: 108px;
  height: 108px;
  object-fit: contain;
}

@media (max-width: 991px) {
  .contact-1 {
    padding-top: 12px;
  }

  .contact-1-left {
    width: 49%;
    margin-right: 2%;
    margin-bottom: 12px;
  }

  .contact-1-left:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 520px) {
  .contact-1-left {
    width: 100%;
    margin-right: 0;
  }
}

.contact-bg-1 {
  float: left;
  width: 100%;
  margin-top: 24px;
  padding-bottom: 56px;
  background: url('https://193.mstore.demo.mingsoft.net/193/images/bottom-bg-1.jpg') center / cover no-repeat;
  box-sizing: border-box;
}

.contact-form {
  padding-top: 0;
}

.contact-title-1 {
  margin: 0;
  padding: 55px 0 0;
  width: 100%;
  text-align: center;
  font-size: clamp(26px, 4vw, 36px);
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.contact-form-1 {
  margin-top: 36px;
  padding: 32px 9.9% 48px;
  border: none;
  box-sizing: border-box;
}

.ms-contact-form::after {
  content: '';
  display: table;
  clear: both;
}

.p-d-c-form-1-input-1 {
  float: left;
  width: 31.6%;
  height: 58px;
  margin-right: 2.6%;
  margin-bottom: 0;
  padding: 0 13px;
  font-size: 18px;
  border: 1px solid #e7e8ea;
  box-sizing: border-box;
  font-family: inherit;
}

.p-d-c-form-1-input-1.mr-0 {
  margin-right: 0;
}

.p-d-c-form-1-input-2 {
  float: left;
  width: 100%;
  min-height: 148px;
  margin-top: 20px;
  padding: 10px 13px;
  font-size: 18px;
  line-height: 1.5;
  border: 1px solid #e7e8ea;
  box-sizing: border-box;
  font-family: inherit;
  resize: vertical;
}

.p-d-c-form-1-input-3 {
  float: left;
  width: 187px;
  height: 58px;
  margin-top: 20px;
  margin-right: 24px;
  background: #029c6a;
  font-size: 18px;
  color: #fff;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  font-family: inherit;
}

.p-d-c-form-1-input-3:hover {
  opacity: 0.92;
}

.p-d-c-form-1-input-3.bg-323232 {
  background: #323232;
}

@media (max-width: 900px) {
  .contact-form-1 {
    padding: 28px 4% 40px;
  }

  .p-d-c-form-1-input-1 {
    width: 100%;
    margin-right: 0;
    margin-bottom: 12px;
  }

  .p-d-c-form-1-input-3 {
    width: 46%;
    margin-right: 4%;
  }
}

.contact-extra-links {
  padding: 20px 16px 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.contact-extra-links a {
  color: #029c6a;
  text-decoration: none;
}

.contact-extra-links a:hover {
  text-decoration: underline;
}
</style>
