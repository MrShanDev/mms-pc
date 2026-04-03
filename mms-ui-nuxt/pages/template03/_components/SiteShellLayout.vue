<template>
  <div class="layout-template layout-template--template03 ms392-layout">
    <SiteHeader />
    <div v-if="!is392Home" class="h_155" />
    <div class="ms392-slot">
      <slot />
    </div>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'

const route = useRoute()
const is392Home = computed(() => {
  const p = route.path.replace(/\/$/, '') || '/'
  return p === '/template03'
})

const CSS392 = [
  'https://392.mstore.demo.mingsoft.net/392/css/bootstrap.css',
  'https://392.mstore.demo.mingsoft.net/392/css/animate.css',
  'https://392.mstore.demo.mingsoft.net/392/css/slick.css',
  'https://392.mstore.demo.mingsoft.net/392/css/slick-theme.css',
  'https://392.mstore.demo.mingsoft.net/392/css/style.css'
]

useHead({
  link: CSS392.map((href) => ({ rel: 'stylesheet', href }))
})
</script>

<style>
@import '~/assets/css/template03-mstore.css';
</style>
