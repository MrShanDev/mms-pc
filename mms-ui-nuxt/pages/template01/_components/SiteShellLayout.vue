<template>
  <div class="demo-template-scroll-root">
  <div class="layout-template layout-template--template01 ms-layout">
    <header class="ms-header">
      <div class="ms-header-inner ms-w1440">
        <NuxtLink to="/template01" class="ms-logo">
          <img :src="demoLogo" alt="" width="120" height="48" loading="eager">
        </NuxtLink>

        <button
          type="button"
          class="ms-nav-toggle"
          :aria-label="t('demo.common.openMenu')"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>

        <nav class="ms-nav" :class="{ 'ms-nav--open': mobileOpen }">
          <ul class="ms-nav-list">
            <li v-for="(item, idx) in c.nav" :key="idx" :class="{ active: isNavActive(item) }">
              <NuxtLink :to="navTo(item)" @click="mobileOpen = false">{{ item.label }}</NuxtLink>
            </li>
          </ul>
        </nav>

        <div class="ms-header-right-tools">
          <DemoLocaleSwitch />
        </div>
      </div>
    </header>

    <slot />

    <DemoSiteFooter />
  </div>
    <DemoSiteServiceDock template-id="template01" />
  </div>
</template>

<script setup lang="ts">
import type { DemoNavItem } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'
import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'
import DemoSiteFooter from './DemoSiteFooter.vue'

const c = DEMO_SITE_TEMPLATES.template01
const route = useRoute()
const { t } = useAppLocale()

const home = c.home as { demoLogoSrc?: string }
const demoLogo = home.demoLogoSrc ?? template01DemoAsset('/upload/image/20211205/1638673578796255.png')

const mobileOpen = ref(false)

function navTo(item: DemoNavItem): string {
  return item.to ?? '#'
}

function isNavActive(item: DemoNavItem): boolean {
  const raw = item.to || ''
  const path = route.path.replace(/\/$/, '') || '/template01'
  const hash = route.hash || ''

  if (raw.includes('#')) {
    const [p, h] = raw.split('#')
    const base = (p || '/template01').replace(/\/$/, '') || '/template01'
    return path === base && hash === `#${h}`
  }

  const basePath = raw.replace(/\/$/, '').split('#')[0] || '/template01'
  if (basePath === '/template01') {
    return path === '/template01' && !hash
  }
  return path === basePath || path.startsWith(`${basePath}/`)
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)
</script>

<style>
@import '~/assets/css/template-subpage.css';
@import '~/assets/css/template01-theme.css';
</style>

<style lang="scss" scoped>
.ms-header {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: #fff;
  border-top: 4px solid #029c6a;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.06);
  transition: height 0.3s;
}

@media (max-width: 1199px) {
  .ms-header {
    height: 70px;
  }
}

.ms-w1440 {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2%;
  box-sizing: border-box;
}

.ms-header-inner {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.ms-logo {
  float: none;
  display: flex;
  align-items: center;
  height: 48px;
  margin-right: 24px;
  flex-shrink: 0;
}

.ms-logo img {
  display: block;
  max-height: 48px;
  width: auto;
}

@media (max-width: 1199px) {
  .ms-logo {
    margin-top: 0;
  }
}

.ms-header-right-tools {
  position: relative;
  z-index: 1002;
  flex-shrink: 0;
  margin-left: 12px;
}

@media (max-width: 1199px) {
  .ms-header-right-tools {
    margin-left: auto;
  }
}

.ms-nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  width: 40px;
  height: 40px;
  margin-left: 12px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}

.ms-nav-toggle span {
  display: block;
  height: 3px;
  background: #333;
  border-radius: 1px;
}

@media (max-width: 1199px) {
  .ms-nav-toggle {
    display: flex;
  }
}

.ms-nav {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0 12px;
  min-width: 0;
}

@media (min-width: 1200px) {
  .ms-nav {
    justify-content: flex-end;
    padding-right: 16px;
  }
}

@media (max-width: 1199px) {
  .ms-nav {
    display: none;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    background: #fff;
    border-top: 1px solid #eee;
    padding: 12px 0 16px;
    order: 10;
  }
  .ms-nav.ms-nav--open {
    display: flex;
  }
}

.ms-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}

@media (max-width: 1199px) {
  .ms-nav-list {
    flex-direction: column;
    width: 100%;
  }
}

.ms-nav-list li {
  margin: 0;
}

.ms-nav-list a {
  display: inline-block;
  font-family: arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 96px;
  padding: 0 28px;
  color: #666565;
  text-decoration: none;
  transition: background 0.35s, color 0.35s;
}

@media (max-width: 1199px) {
  .ms-nav-list a {
    line-height: 48px;
    width: 100%;
    padding: 0 16px;
  }
}

.ms-nav-list li:hover a,
.ms-nav-list li.active a {
  background: #029c6a;
  color: #fff;
}
</style>
