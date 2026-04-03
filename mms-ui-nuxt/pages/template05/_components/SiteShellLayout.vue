<template>
  <div class="layout-template layout-template--template05 e7-layout">
    <SiteHeader ref="headerRef" />
    <slot />
    <FooterDockNav @open-menu="onFooterMenu" />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import FooterDockNav from './FooterDockNav.vue'

const headerRef = ref<InstanceType<typeof SiteHeader> | null>(null)

function onFooterMenu() {
  headerRef.value?.openMobileMenu?.()
}

const E7_CSS = [
  'https://e7.mstore.demo.mingsoft.net/e7/css/bootstrap.css',
  'https://e7.mstore.demo.mingsoft.net/e7/css/bxslider.css',
  'https://e7.mstore.demo.mingsoft.net/e7/css/style.css',
  'https://e7.mstore.demo.mingsoft.net/e7/css/navbar.css'
]

useHead({
  link: E7_CSS.map((href) => ({ rel: 'stylesheet', href }))
})
</script>

<style>
@import '~/assets/css/template-subpage.css';
@import '~/assets/css/template05-e7.css';
</style>
