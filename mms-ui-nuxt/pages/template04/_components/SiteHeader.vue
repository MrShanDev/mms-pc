<template>
  <!-- 对齐 https://e9.mstore.demo.mingsoft.net/ 顶部导航：navbar-fixed-top + dropdown -->
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle collapsed"
          :aria-label="t('demo.common.toggleNav')"
          data-toggle="collapse"
          data-target="#navbar"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="sr-only">{{ t('demo.common.toggleNav') }}</span>
          <span class="icon-bar" />
          <span class="icon-bar" />
          <span class="icon-bar" />
        </button>
        <NuxtLink to="/template04" class="navbar-brand-logo">
          <img :src="logoSrc" class="logo" :alt="c.siteTitle">
        </NuxtLink>
      </div>
      <div id="navbar" class="navbar-collapse" :class="{ collapse: !mobileOpen, in: mobileOpen }">
        <ul class="nav navbar-nav">
          <li
            v-for="(item, idx) in c.nav"
            :key="idx"
            :class="{ dropdown: !!item.children?.length, open: openDrop === idx }"
          >
            <template v-if="item.children?.length">
              <NuxtLink :to="item.to || '#'" :class="navLinkClass(item)">{{ item.label }}</NuxtLink>
              <a
                href="#"
                class="dropdown-toggle e9-dropdown-toggle"
                role="button"
                aria-expanded="false"
                :title="t('demo.common.submenu')"
                @click.prevent="toggleDrop(idx)"
              >
                <span class="sr-only">{{ t('demo.common.submenu') }}</span>
              </a>
              <ul class="dropdown-menu nav_small" role="menu">
                <li v-for="(ch, j) in item.children" :key="j">
                  <NuxtLink :to="ch.to || '#'" @click="closeMobile">{{ ch.label }}</NuxtLink>
                </li>
              </ul>
            </template>
            <template v-else>
              <NuxtLink :to="item.to || '#'" :class="navLinkClass(item)">{{ item.label }}</NuxtLink>
            </template>
          </li>
          <li class="e9-demo-locale-bar">
            <DemoLocaleSwitch />
          </li>
        </ul>
      
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'
import type { DemoNavItem } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
const c = DEMO_SITE_TEMPLATES.template04
const route = useRoute()
const { t } = useAppLocale()

const logoSrc = computed(
  () =>
    (c.home as { demoLogoSrc?: string }).demoLogoSrc ||
    'https://e9.mstore.demo.mingsoft.net/upload/appLogo/1704769151895.png'
)

const mobileOpen = ref(false)
const openDrop = ref<number | null>(null)

function closeMobile() {
  mobileOpen.value = false
  openDrop.value = null
}

function toggleDrop(idx: number) {
  openDrop.value = openDrop.value === idx ? null : idx
}

function navTargetBase(to?: string) {
  if (!to) return '/template04'
  return to.split('#')[0].split('?')[0].replace(/\/$/, '') || '/template04'
}

function isActiveForItem(item: DemoNavItem): boolean {
  const path = route.path.replace(/\/$/, '') || '/'
  const base = navTargetBase(item.to)
  if (item.children?.length) {
    return item.children.some((ch) => {
      const b = navTargetBase(ch.to)
      if (b === '/template04') return path === '/template04'
      return path === b || path.startsWith(`${b}/`)
    })
  }
  if (base === '/template04') return path === '/template04'
  return path === base || path.startsWith(`${base}/`)
}

function navLinkClass(item: DemoNavItem) {
  return isActiveForItem(item) ? 'cur' : ''
}

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
    openDrop.value = null
  }
)

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768) mobileOpen.value = false
    })
  }
})

function openMobileMenu() {
  mobileOpen.value = true
}

defineExpose({ openMobileMenu })
</script>

<style scoped>
.navbar-brand-logo {
  float: left;
  padding: 10px 15px;
}

.logo {
  max-height: 40px;
  width: auto;
  display: block;
}

@media (min-width: 768px) {
  #navbar.collapse {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
}

/* 无三角图标，仅保留可点击区域（移动端展开子菜单） */
.e9-dropdown-toggle {
  padding: 9px 6px !important;
  line-height: 1;
  min-width: 28px;
  text-decoration: none;
}

.e9-demo-locale-bar {
  text-align: right;
  padding: 20px 0 0;
}
</style>
