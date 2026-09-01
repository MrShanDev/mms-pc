<template>
  <header>
    <div class="container">
      <div class="row e7-top-row">
        <div class="col-xs-12 col-sm-7 col-md-7">
          <div class="e7-logo-locale">
            <NuxtLink to="/template05">
              <img :src="logoSrc" class="logo" :alt="c.siteTitle">
            </NuxtLink>
          </div>
        </div>
        <div id="topsearch" class="col-xs-12 col-sm-5 col-md-5">
          <div class="e7-topsearch-row">
            <form id="e7-search-form" class="e7-topsearch-form" @submit.prevent="onSearchSubmit">
              <div class="input-group search_group">
                <input
                  v-model="searchQ"
                  type="text"
                  name="content_title"
                  class="form-control e7-search-input"
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
            <div class="e7-topsearch-locale">
              <DemoLocaleSwitch class="lang-select" />
            </div>
          </div>
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
import DemoLocaleSwitch from '@/components/demo/DemoLocaleSwitch.vue'
import type { DemoNavItem } from '@/utils/demoSite'
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'

const c = DEMO_SITE_TEMPLATES.template05
const route = useRoute()
const { t } = useAppLocale()

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
/* 顶栏第一行：与 Logo 列等高时搜索区垂直居中（避免 float 列顶对齐） */
.e7-top-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.e7-top-row > [class*='col-'] {
  float: none !important;
}

#topsearch {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1 1 0;
  min-width: 0;
}

/* 搜索框与语言切换同一行：垂直居中对齐，不拉伸占满整列高度 */
.e7-topsearch-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  flex-wrap: nowrap;
  padding: 4px 0 2px;
}

.e7-topsearch-form {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  align-items: center;
}

.e7-topsearch-form :deep(.input-group) {
  width: 100%;
}

.e7-topsearch-form :deep(.search_group) {
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.e7-search-input {
  min-height: 38px;
  font-size: 14px;
  border-color: #ccc;
}

.e7-topsearch-locale {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

/* 勿把 .el-select 设成 display:flex，会覆盖 EP 的 inline-block，导致选中项（placeholder）布局塌陷只显示箭头 */
.e7-topsearch-locale :deep(.demo-locale-switch) {
  flex: 0 0 auto;
  width: 128px;
  min-width: 128px;
  max-width: none;
  vertical-align: middle;
}

.e7-topsearch-locale :deep(.demo-locale-switch .el-select__wrapper) {
  min-height: 38px;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
}

/* EP 单选展示文案用 .el-select__placeholder 且 z-index:-1，在部分 stacking 下会被画在底色下方；顶栏强制拉回可见 */
.e7-topsearch-locale :deep(.demo-locale-switch .el-select__placeholder) {
  z-index: 1;
}

.e7-topsearch-locale :deep(.demo-locale-switch .el-select__suffix) {
  z-index: 2;
}

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

#navbar.collapse {
  display: block !important;
  height: auto !important;
  overflow: visible !important;
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
  min-width: 42px;
  min-height: 38px;
  height: 38px;
  padding: 0 12px;
  margin: 0;
  border: none;
  border-radius: 0;
  background: linear-gradient(180deg, #1a6fc4 0%, #1260aa 100%);
  color: #fff;
  cursor: pointer;
  line-height: 1;
  transition: background 0.15s ease;
}

.e7-search-submit:hover,
.e7-search-submit:focus {
  background-color: #00c6ff;
  color: #fff;
  outline: none;
}
</style>
