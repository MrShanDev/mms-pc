<template>
  <!-- 对齐 361 site-footer：col-lg-3 微信 + col-lg-8 Quick Links / Newsletter -->
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <h2 class="footer-heading mb-3">{{ t('demo.common.footerWechatHeading') }}</h2>
          <p v-if="c.contactPage.wechatQrImage">
            <img :src="c.contactPage.wechatQrImage" :alt="t('demo.common.wechatAltShort')" width="180" height="180">
          </p>
          <p v-else class="mb-2">{{ c.contactPage.wechatLine || ' ' }}</p>
        </div>
        <div class="col-lg-8 ml-auto">
          <div class="row">
            <div class="col-lg-6 ml-auto">
              <h2 class="footer-heading mb-4">{{ t('demo.common.quickLinksTitle') }}</h2>
              <ul class="list-unstyled">
                <li v-for="(item, i) in c.nav" :key="i">
                  <NuxtLink :to="item.to ?? '#'">{{ item.label }}</NuxtLink>
                </li>
              </ul>
            </div>
            <div class="col-lg-6">
              <h2 class="footer-heading mb-4">{{ t('demo.common.newsletterTitle') }}</h2>
              <form class="d-flex subscribe" @submit.prevent>
                <input
                  type="email"
                  name="email"
                  class="form-control mr-3"
                  :placeholder="t('demo.common.emailPlaceholder')"
                  disabled
                  :aria-label="t('demo.common.email')"
                >
                <input type="button" :value="t('demo.common.sendButton')" class="btn btn-primary" disabled>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-5 mt-5 text-center">
        <div class="col-md-12">
          <div class="border-top pt-5">
            <p>{{ c.footerCopyright }}</p>
            <p v-if="c.techSupport">{{ c.techSupport }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const { t } = useAppLocale()

const c = DEMO_SITE_TEMPLATES.template02
</script>
