<template>
  <!-- 对齐 361：site-navbar + container + site-logo + site-menu / nav-link -->
  <header class="site-navbar site-navbar-target" role="banner">
    <div class="container">
      <div class="row align-items-center position-relative">
        <div class="col-3">
          <div class="site-logo">
            <NuxtLink :to="homePath" class="font-weight-bold">
              <img :src="logoSrc" :alt="c.siteTitle" class="img-fluid">
            </NuxtLink>
          </div>
        </div>
        <div class="col-9 text-right d-flex justify-content-end align-items-center flex-wrap">
          <nav class="site-navigation text-right ml-auto" role="navigation" :aria-label="t('demo.common.mainNav')">
            <ul class="site-menu main-menu js-clone-nav ml-auto">
              <li
                v-for="(item, idx) in c.nav"
                :key="idx"
                :class="{ active: isNavActive(item.to) }"
              >
                <NuxtLink :to="item.to ?? '#'" class="nav-link">{{ item.label }}</NuxtLink>
              </li>
              <li>
                <DemoLocaleSwitch class="site-demo-locale" />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'

const c = DEMO_SITE_TEMPLATES.template02
const home = c.home as Record<string, unknown>
const route = useRoute()
const { t } = useAppLocale()

const homePath = '/template02'
const logoSrc = computed(
  () =>
    (home.demoLogoSrc as string) ||
    template01DemoAsset('/upload/image/20211205/1638673578796255.png')
)

function isNavActive(to?: string) {
  if (!to) return false
  const path = route.path.replace(/\/$/, '') || '/'
  const target = to.split('#')[0]?.replace(/\/$/, '') || ''
  if (!target) return false
  if (path === target) return true
  if (target === homePath) return path === homePath
  return path.startsWith(`${target}/`)
}
</script>
