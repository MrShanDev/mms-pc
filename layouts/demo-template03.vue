<template>
  <SiteShellLayout>
    <slot />
  </SiteShellLayout>
</template>

<script setup lang="ts">
import SiteShellLayout from '~/pages/template03/_components/SiteShellLayout.vue'

useTemplateHashScroll()
</script>
