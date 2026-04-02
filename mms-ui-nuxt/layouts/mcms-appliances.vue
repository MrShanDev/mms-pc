<template>
  <div class="layout-mcms layout-mcms--appliances">
    <McmsAppliancesChrome />
    <slot />
  </div>
</template>

<script setup lang="ts">
useMcmsHashScroll()
</script>

<style>
@import '~/assets/css/mcms-subpage.css';
</style>
