<template>
  <div class="layout-mcms layout-mcms--digital">
    <McmsDigitalChrome />
    <slot />
  </div>
</template>

<script setup lang="ts">
useMcmsHashScroll()
</script>

<style>
@import '~/assets/css/mcms-subpage.css';
</style>
