<template>
  <!-- 392 内页顶图：pz_banner + 单图 + banner_tab（加高 + cover 裁切） -->
  <div class="pz_banner ms392-inner-banner">
    <div class="ms392-inner-banner__pic hidden-xs hidden-sm">
      <img :src="src" alt="">
    </div>
    <div class="ms392-inner-banner__pic visible-xs visible-sm">
      <img :src="src" alt="">
    </div>
    <div class="banner_tab">
      <img :src="bannerTab" alt="">
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  src: string
}>()

const bannerTab = 'https://392.mstore.demo.mingsoft.net/392/picture/banner_tab.jpg'
</script>
