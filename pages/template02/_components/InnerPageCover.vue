<template>
  <!-- 对齐 361 内页顶区：ftco-blocks-cover-1 > site-section-cover overlay（无 h700） -->
  <div class="ftco-blocks-cover-1">
    <div class="site-section-cover overlay" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-7">
            <h1 class="mb-3 text-primary">{{ title }}</h1>
            <p v-if="lead">{{ lead }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  /** 与演示站横幅辅助文案一致 */
  lead?: string
  backgroundImage: string
}>()
</script>
