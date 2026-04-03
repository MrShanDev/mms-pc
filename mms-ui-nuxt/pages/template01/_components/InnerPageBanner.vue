<template>
  <div class="ms-inner-top">
    <div class="pd-banner">
      <div class="pd-banner-bg" :style="{ backgroundImage: `url(${bannerSrc})` }" role="img" :aria-label="bannerAlt">
        <div class="pd-banner-overlay">
          <div class="pd-page-inner">
            <h3 class="pd-banner-lead">{{ bannerLead }}</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="pd-toolbar-bg">
      <div class="pd-page-inner pd-toolbar ms-toolbar-row">
        <div class="wrap-sidenav ms-wrap-sidenav">
          <div class="sidenav category">
            <ul class="ms-sidenav-ul">
              <slot name="sidenav" />
            </ul>
          </div>
          <nav class="address pd-address" :aria-label="t('demo.common.breadcrumb')">
            <NuxtLink :to="homePath" class="pd-addr-home" :title="t('demo.common.home')">
              <img :src="iconHome" alt="" width="18" height="18" loading="lazy">
            </NuxtLink>
            <template v-for="(item, i) in crumbs" :key="i">
              <span class="pd-addr-sep">&gt;&gt;</span>
              <NuxtLink v-if="item.to" :to="item.to" class="ms-channel-path-link">{{ item.label }}</NuxtLink>
              <span v-else class="pd-addr-current">{{ item.label }}</span>
            </template>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { template01DemoAsset } from '@/utils/template01MingsoftMock'

export type MsCrumbItem = { label: string; to?: string }

defineProps<{
  homePath: string
  bannerSrc: string
  bannerLead: string
  bannerAlt?: string
  crumbs: MsCrumbItem[]
}>()

const iconHome = template01DemoAsset('/193/images/home.png')
const { t } = useI18n()
</script>

<style scoped>
.pd-page-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
  box-sizing: border-box;
}

.pd-banner-bg {
  min-height: 220px;
  background-size: cover;
  background-position: center;
  position: relative;
}

@media (min-width: 900px) {
  .pd-banner-bg {
    min-height: 280px;
  }
}

.pd-banner-overlay {
  min-height: inherit;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.32) 0%, rgba(0, 0, 0, 0.12) 50%, transparent 100%);
}

.pd-banner-lead {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
  max-width: 720px;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .pd-banner-lead {
    font-size: 22px;
    color: #029c6a;
    text-shadow: none;
    background: rgba(255, 255, 255, 0.92);
    padding: 16px 22px;
    border-radius: 2px;
  }
}

.pd-toolbar-bg {
  background: #f8f8f8;
  border-bottom: 1px solid #ececec;
}

.pd-toolbar {
  padding-top: 14px;
  padding-bottom: 14px;
}

.ms-toolbar-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px 20px;
}

.ms-wrap-sidenav {
  position: relative;
  flex: 1;
  min-width: 0;
}

.ms-sidenav-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
}

.ms-sidenav-ul :deep(li) {
  display: inline-block;
  vertical-align: top;
  margin: 0;
  padding: 0;
  font-size: 16px;
}

.ms-sidenav-ul :deep(a) {
  font-family: 'Microsoft YaHei', 'AvantGrade ITC', sans-serif;
  display: block;
  height: 54px;
  line-height: 54px;
  padding: 0 26px;
  font-size: 16px;
  color: #333;
  background: #fff;
  border: 1px solid #e2e2e2;
  text-decoration: none;
  margin-right: 8px;
  margin-bottom: 6px;
  box-sizing: border-box;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}

@media (max-width: 991px) {
  .ms-sidenav-ul :deep(a) {
    height: 48px;
    line-height: 48px;
    padding: 0 18px;
    font-size: 15px;
  }
}

.ms-sidenav-ul :deep(li.active a),
.ms-sidenav-ul :deep(li:hover a) {
  background: #029c6a;
  border-color: #029c6a;
  color: #fff !important;
}

.pd-address {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px 4px;
  font-size: 14px;
  color: #adadad;
  line-height: 54px;
  flex-shrink: 0;
}

.pd-address a {
  color: #adadad;
  text-decoration: none;
  transition: color 0.15s;
  margin: 0 4px;
}

.pd-address a:hover {
  color: #029c6a;
}

.pd-addr-home {
  display: inline-flex;
  line-height: 0;
  margin-right: 2px;
}

.pd-addr-sep {
  margin: 0 2px;
  color: #c8c8c8;
  user-select: none;
}

.pd-addr-current {
  color: #666;
}

@media (max-width: 1279px) {
  .pd-address {
    width: 100%;
    margin-top: 8px;
  }
}
</style>
