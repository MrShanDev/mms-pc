<template>
  <div class="layout-default demo-template-scroll-root">
    <Header />
    <NavBar />
    <slot />
    <!-- 当前仅 template06 主站使用本 layout，站点页脚统一由演示数据驱动 -->
    <TitaSiteFooter />
    <DemoSiteServiceDock template-id="template06" />
  </div>
</template>

<script setup lang="ts">
import Header from '~/pages/template06/_components/Header.vue'
import NavBar from '~/pages/template06/_components/NavBar.vue'
import TitaSiteFooter from '~/pages/template06/_components/TitaSiteFooter.vue'
</script>

<style>

</style>