<template>
  <SiteShellLayout>
    <slot />
  </SiteShellLayout>
</template>

<script setup lang="ts">
import SiteShellLayout from '~/pages/template05/_components/SiteShellLayout.vue'

useTemplateHashScroll()
</script>
