<template>
  <div class="route-root-stub" aria-hidden="true" />
</template>

<script setup lang="ts">
/**
 * `/` 无独立内容：由 `middleware/demo-site-home-redirect.global.ts` 重定向至 `/template06` 或 `/{id}`。
 * 保留本文件以便 Nuxt 注册根路由。
 */
definePageMeta({ layout: false, requiresAuth: false })
</script>

<style scoped>
.route-root-stub {
  display: none;
}
</style>
