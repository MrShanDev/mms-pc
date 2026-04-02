<template>
  <header class="mcms-chrome mcms-chrome--shoes">
    <div class="mcms-nav-wrap">
      <div class="mcms-inner">
        <div class="mcms-site-line">
          <span class="mcms-site-title-main">{{ c.siteTitleEn || c.siteTitle }}</span>
          <span v-if="c.siteTitleEn" class="mcms-site-title-sub">{{ c.siteTitle }}</span>
        </div>
        <el-menu
          mode="horizontal"
          class="mcms-menu"
          :ellipsis="false"
          :unique-opened="true"
          @select="onMenuSelect"
        >
          <template v-for="(item, idx) in c.nav" :key="idx">
            <el-sub-menu v-if="item.children?.length" :index="`sub-${idx}`">
              <template #title>{{ item.label }}</template>
              <el-menu-item v-for="(ch, j) in item.children" :key="j" :index="ch.to!">
                {{ ch.label }}
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item v-else :index="item.to!">
              {{ item.label }}
            </el-menu-item>
          </template>
        </el-menu>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.shoes
const { onMenuSelect } = useMcmsElMenuNav()
</script>

<style lang="scss" scoped>
.mcms-chrome {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Segoe UI', system-ui, sans-serif;
}

.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-site-line {
  padding: 12px 0 4px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  align-items: baseline;
  font-size: 13px;
  color: #555;
}

.mcms-site-title-main {
  font-weight: 600;
  color: #222;
}

.mcms-site-title-sub {
  color: #888;
}

.mcms-menu {
  border-bottom: none !important;
  background: transparent !important;
  flex-wrap: wrap;
  height: auto !important;

  :deep(.el-menu--horizontal) {
    flex-wrap: wrap;
  }

  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    font-size: 14px;
    color: #222 !important;
    background: transparent !important;
  }

  :deep(.el-menu-item:hover),
  :deep(.el-sub-menu__title:hover) {
    background: #f7f7f7 !important;
  }
}
</style>
