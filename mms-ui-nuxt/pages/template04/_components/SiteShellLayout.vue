<template>
  <div class="layout-template layout-template--template04 e9-layout">
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

const E9_CSS = [
  'https://e9.mstore.demo.mingsoft.net/e9/css/39f41967f842404abb45cc39e1c3b3fc.css',
  'https://e9.mstore.demo.mingsoft.net/e9/css/bootstrap.css',
  'https://e9.mstore.demo.mingsoft.net/e9/css/bxslider.css',
  'https://e9.mstore.demo.mingsoft.net/e9/css/style.css'
]

useHead({
  link: E9_CSS.map((href) => ({ rel: 'stylesheet', href }))
})
</script>

<style>
@import '~/assets/css/template-subpage.css';
@import '~/assets/css/template04-e9.css';
</style>
