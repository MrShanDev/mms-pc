<template>
  <!-- 对齐 e9 内页：path_bg + 主栏 float:right + list_box + 左侧栏 -->
  <main class="e9-inner-page">
    <div class="container">
      <div class="row">
        <div class="path_bg">
          <span class="glyphicon glyphicon-home" aria-hidden="true" />
          &nbsp;&nbsp;
          <NuxtLink to="/template04">{{ t('demo.common.home') }}</NuxtLink>
          <template v-for="(bc, i) in crumbs" :key="i">
            <NuxtLink v-if="bc.to" :to="bc.to">&gt; {{ bc.label }}</NuxtLink>
            <span v-else>&gt; {{ bc.label }}</span>
          </template>
        </div>

        <div class="col-xs-12 col-sm-8 col-md-9 e9-main-float">
          <div class="list_box">
            <h2 class="list_h2">{{ title }}</h2>
            <slot />
          </div>
          <slot name="after" />
        </div>

        <PageSidebar :sidebar-mode="sidebarMode" />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { E9Crumb } from '@/utils/template04E9'
import PageSidebar from './PageSidebar.vue'

const { t } = useI18n()

defineProps<{
  title: string
  crumbs: E9Crumb[]
  sidebarMode?: 'default' | 'product' | 'news' | 'download'
}>()
</script>
