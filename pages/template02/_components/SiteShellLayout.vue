<template>
  <div class="demo-template-scroll-root">
  <div id="home-section" class="site-wrap layout-template layout-template--template02 mstore-layout">
    <SiteHeader />
    <slot />
    <SiteFooter />
  </div>
    <DemoSiteServiceDock template-id="template02" />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'

const MSTORE361_STYLES = [
  'https://361.mstore.demo.mingsoft.net/361/css/css.css',
  'https://361.mstore.demo.mingsoft.net/361/css/style.css',
  'https://361.mstore.demo.mingsoft.net/361/css/bootstrap.min.css',
  'https://361.mstore.demo.mingsoft.net/361/css/style_1.css'
]

useHead({
  link: MSTORE361_STYLES.map((href) => ({ rel: 'stylesheet', href }))
})
</script>

<style>
@import '~/assets/css/template02-mstore.css';
</style>
