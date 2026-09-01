<template>
  <SiteShellLayout>
    <slot />
  </SiteShellLayout>
</template>

<script setup lang="ts">
import SiteShellLayout from '~/pages/template01/_components/SiteShellLayout.vue'

useTemplateHashScroll()
</script>
