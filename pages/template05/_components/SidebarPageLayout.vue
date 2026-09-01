<template>
  <!-- 对齐 e7 内页：path_bg（首页）+ 主栏 float:right + list_box / left_h2 -->
  <main class="e7-inner-page">
    <div class="main">
      <div class="container">
        <div class="row">
          <div class="path_bg">
            <NuxtLink to="/template05">{{ t('demo.common.home') }}</NuxtLink>
            <template v-for="(bc, i) in crumbs" :key="i">
              <NuxtLink v-if="bc.to" :to="bc.to">> {{ bc.label }}</NuxtLink>
              <span v-else>> {{ bc.label }}</span>
            </template>
          </div>

          <div class="col-xs-12 col-sm-8 col-md-9 e7-main-float">
            <template v-if="variant === 'raw'">
              <slot />
            </template>
            <template v-else-if="variant === 'plain'">
              <h2 class="left_h2">{{ title }}</h2>
              <slot />
              <slot name="after" />
            </template>
            <template v-else>
              <div class="list_box">
                <h2 class="left_h2">{{ title }}</h2>
                <slot />
              </div>
              <slot name="after" />
            </template>
          </div>

          <PageSidebar :sidebar-mode="sidebarMode" />
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import type { E7Crumb } from '@/utils/template05E7'
import PageSidebar from './PageSidebar.vue'

const { t } = useAppLocale()

withDefaults(
  defineProps<{
    title?: string
    crumbs: E7Crumb[]
    sidebarMode?: 'default' | 'product' | 'news' | 'download'
    /** listbox：带 list_box；plain：无 list_box（About/Contact）；raw：仅插槽（新闻详情等） */
    variant?: 'listbox' | 'plain' | 'raw'
  }>(),
  { sidebarMode: 'default', variant: 'listbox' }
)
</script>
