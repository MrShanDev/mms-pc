<template>
  <footer class="ms-footer foot-bg-1">
    <div class="foot-bg-border">
      <div class="ms-w1440">
        <div class="foot-contect">
          <div class="font-ico-txt foot-ico-email">
            <a :href="`mailto:${c.contactPage.email}`">{{ c.contactPage.email }}</a>
          </div>
          <div v-for="(ph, i) in c.contactPage.phones" :key="i" class="font-ico-txt foot-ico-phone">
            {{ ph }}
          </div>
        </div>
      </div>
    </div>
    <div class="ms-w1440 foot-copy-wrap">
      <div class="foot-copy">
        <div class="foot-copy-left">{{ c.footerCopyright }}</div>
        <div v-if="c.techSupport" class="foot-copy-right">{{ c.techSupport }}</div>
      </div>
      <div class="foot-extra-links">
        <NuxtLink :to="productsPath">{{ t('demo.common.productsFooterLink') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { DemoSiteTemplateId } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const route = useRoute()
const { t } = useAppLocale()

const templateId = computed<DemoSiteTemplateId>(() => {
  const seg = route.path.split('/').filter(Boolean)[0]
  if (seg?.match(/^template0[1-5]$/)) return seg as DemoSiteTemplateId
  return 'template01'
})

const c = computed(() => DEMO_SITE_TEMPLATES[templateId.value])

const productsPath = computed(() => `/${templateId.value}/products`)
</script>

<style lang="scss" scoped>
.ms-w1440 {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2%;
  box-sizing: border-box;
}

.foot-bg-1 {
  float: left;
  width: 100%;
  background: #232323;
  color: #a6a5a5;
}

.foot-bg-border {
  float: left;
  width: 100%;
  border-top: 1px solid #3f3f3f;
  border-bottom: 1px solid #3f3f3f;
}

.foot-contect {
  float: left;
  width: 100%;
  padding: 35px 0;
  display: flex;
  flex-wrap: wrap;
  gap: 16px 24px;
}

.font-ico-txt {
  font-size: 16px;
  color: #a6a5a5;
}

.font-ico-txt a {
  color: #a6a5a5;
  text-decoration: none;
}

.font-ico-txt a:hover {
  color: #029c6a;
}

.foot-copy-wrap {
  padding-bottom: 8px;
}

.foot-copy {
  float: left;
  width: 100%;
  font-size: 14px;
  color: #e5e5e5;
  padding: 24px 0 12px;
  line-height: 24px;
}

.foot-copy-left {
  float: left;
}

.foot-copy-right {
  float: right;
  color: #aaa;
}

.foot-extra-links {
  clear: both;
  padding-bottom: 28px;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px 20px;
}

.foot-extra-links a {
  color: #a6a5a5;
  text-decoration: none;
}

.foot-extra-links a:hover {
  color: #029c6a;
}
</style>
