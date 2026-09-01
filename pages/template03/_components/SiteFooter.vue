<template>
  <!-- 对齐 392 页脚 pz_down / footer_body -->
  <div class="pz_down">
    <div class="container-fluid footer_body">
      <div class="container">
        <ul>
          <li>
            <div class="ico">
              <img :src="icoHotline" alt="Hotline">
            </div>
            <h6>Hotline:</h6>
            <h4 v-for="(ph, i) in c.contactPage.phones" :key="i">{{ ph }}</h4>
          </li>
          <li class="l1">
            <div class="ico">
              <img :src="icoEmail" alt="Email">
            </div>
            <h6>Email:</h6>
            <h5>{{ c.contactPage.email }}</h5>
          </li>
          <li>
            <div class="ico">
              <img :src="icoAddr" alt="Address">
            </div>
            <h6>Address:</h6>
            <h5 style="padding-right: 20px">{{ c.contactPage.address || '—' }}</h5>
          </li>
          <li class="l2">
            <div class="ico">
              <img :src="icoFollow" alt="Follow us">
            </div>
            <h6>Follow us:</h6>
            <div v-if="c.contactPage.wechatQrImage" class="btn">
              <p><img :src="c.contactPage.wechatQrImage" alt="Wechat" width="120"></p>
            </div>
            <p v-else class="small text-muted">{{ c.contactPage.wechatLine || ' ' }}</p>
          </li>
        </ul>
        <div v-if="c.contactPage.links?.length" class="text-center py-3">
          <span class="text-muted small">Links:</span>
          <a
            v-for="(l, i) in c.contactPage.links"
            :key="i"
            :href="l.href"
            target="_blank"
            rel="noopener"
            class="mx-1"
          >{{ l.label }}</a>
          <span v-if="c.contactPage.extra" class="text-muted small">{{ c.contactPage.extra }}</span>
        </div>
        <div class="text-center py-3 border-top">
          <p class="mb-1">{{ c.footerCopyright }}</p>
          <p v-if="c.techSupport" class="small text-muted mb-0">{{ c.techSupport }}</p>
          <p class="small text-muted mt-2 mb-0">Powered by</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const c = DEMO_SITE_TEMPLATES.template03

const base = 'https://392.mstore.demo.mingsoft.net'
const icoHotline = `${base}/392/picture/footer35935350.png`
const icoEmail = `${base}/392/picture/footer44543051.png`
const icoAddr = `${base}/392/picture/footer59981066.png`
const icoFollow = `${base}/392/picture/footer6.png`
</script>
