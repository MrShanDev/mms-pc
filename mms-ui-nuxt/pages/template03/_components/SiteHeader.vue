<template>
  <div id="top" class="pz_top">
    <div class="top container-fluid" id="header">
      <div class="container">
        <div class="pz-topbar-wrap">
          <div class="logo">
            <NuxtLink to="/template03">
              <img :src="logoSrc" :alt="c.siteTitle">
            </NuxtLink>
          </div>
          <div>
            <DemoLocaleSwitch />
          </div>
        </div>
        <div class="menu">
          <ul>
            <li
              v-for="(item, idx) in c.nav"
              :key="idx"
              class="nli"
              :class="{ on: isActive(item) }"
            >
              <span>
                <NuxtLink v-if="item.to" :to="item.to">{{ item.label }}</NuxtLink>
              </span>
              <ul v-if="item.children?.length" class="sub">
                <li v-for="(ch, j) in item.children" :key="j" class="l2">
                  <NuxtLink v-if="ch.to" class="l2_a" :to="ch.to">{{ ch.label }}</NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="menuph" id="menuph">
          <div class="point">
            <span class="navbtn" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'
import type { DemoNavItem } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
import { template01DemoAsset } from '@/utils/template01MingsoftMock'

const c = DEMO_SITE_TEMPLATES.template03
const home = c.home as Record<string, unknown>
const route = useRoute()

const logoSrc = computed(
  () =>
    (home.demoLogoSrc as string) ||
    template01DemoAsset('/upload/image/20211205/1638673578796255.png')
)

function pathNorm(p: string) {
  return p.replace(/\/$/, '') || '/'
}

function isActive(item: DemoNavItem): boolean {
  const cur = pathNorm(route.path)
  const self = item.to ? pathNorm(item.to.split('#')[0]!) : ''
  if (item.children?.length) {
    if (item.to && (cur === self || cur.startsWith(`${self}/`))) return true
    return item.children.some((ch) => {
      if (!ch.to) return false
      const t = pathNorm(ch.to.split('#')[0]!)
      return cur === t || cur.startsWith(`${t}/`)
    })
  }
  if (!item.to) return false
  if (cur === self) return true
  if (self === '/template03') return false
  return cur.startsWith(`${self}/`)
}
</script>

<style scoped>
.pz-topbar-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}
</style>
