<template>
  <!-- 对齐 https://e7.mstore.demo.mingsoft.net/ 顶部：Logo+搜索 + navbar-static-top + CATEGORIES -->
  <header>
    <div class="container">
      <div class="row e7-top-row">
        <div class="col-xs-12 col-sm-9 col-md-9">
          <div class="e7-logo-locale">
            <NuxtLink to="/template05">
              <img :src="logoSrc" class="logo" :alt="c.siteTitle">
            </NuxtLink>
            <DemoLocaleSwitch />
          </div>
        </div>
        <div id="topsearch" class="col-xs-12 col-sm-3 col-md-3">
          <form id="e7-search-form" @submit.prevent="onSearchSubmit">
            <div class="input-group search_group">
              <input
                v-model="searchQ"
                type="text"
                name="content_title"
                class="form-control input-sm"
                :placeholder="t('demo.common.productSearch')"
                autocomplete="off"
              >
              <span class="input-group-btn">
                <button
                  id="submit_search"
                  type="submit"
                  class="e7-search-submit"
                  :title="t('demo.common.productSearch')"
                  :aria-label="t('demo.common.productSearch')"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                  </svg>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="container">
      <nav id="top_nav" class="navbar navbar-default navbar-static-top">
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
            <a class="navbar-brand" href="#" @click.prevent>{{ t('demo.common.categories') }}</a>
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
                    :id="`e7-menudown-${idx}`"
                    href="#"
                    class="dropdown-toggle e7-dropdown-toggle app_menudown"
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
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { DemoNavItem } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const c = DEMO_SITE_TEMPLATES.template05
const route = useRoute()
const { t } = useI18n()

const logoSrc = computed(
  () =>
    (c.home as { demoLogoSrc?: string }).demoLogoSrc ||
    'https://e7.mstore.demo.mingsoft.net/upload/appLogo/1704855689017.png'
)

const mobileOpen = ref(false)
const openDrop = ref<number | null>(null)
const searchQ = ref('')

function closeMobile() {
  mobileOpen.value = false
  openDrop.value = null
}

function toggleDrop(idx: number) {
  openDrop.value = openDrop.value === idx ? null : idx
}

function navTargetBase(to?: string) {
  if (!to) return '/template05'
  return to.split('#')[0].split('?')[0].replace(/\/$/, '') || '/template05'
}

function isActiveForItem(item: DemoNavItem): boolean {
  const path = route.path.replace(/\/$/, '') || '/'
  const base = navTargetBase(item.to)
  if (item.children?.length) {
    return item.children.some((ch) => {
      const b = navTargetBase(ch.to)
      if (b === '/template05') return path === '/template05'
      return path === b || path.startsWith(`${b}/`)
    })
  }
  if (base === '/template05') return path === '/template05'
  return path === base || path.startsWith(`${base}/`)
}

function navLinkClass(item: DemoNavItem) {
  return isActiveForItem(item) ? 'cur' : ''
}

function onSearchSubmit() {
  navigateTo({ path: '/template05/products', query: searchQ.value.trim() ? { q: searchQ.value.trim() } : {} })
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
.e7-logo-locale {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.logo {
  max-height: 48px;
  width: auto;
}

@media (min-width: 768px) {
  #navbar.collapse {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
}

.e7-dropdown-toggle {
  display: inline-block;
  padding: 9px 6px !important;
  line-height: 1;
  text-decoration: none;
}

/* 搜索按钮：不依赖 Glyphicons 字体 */
.e7-search-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 8px 12px;
  margin: 0;
  border: none;
  border-radius: 0;
  background-color: #1260aa;
  color: #fff;
  cursor: pointer;
  line-height: 1;
}

.e7-search-submit:hover,
.e7-search-submit:focus {
  background-color: #00c6ff;
  color: #fff;
  outline: none;
}
</style>
