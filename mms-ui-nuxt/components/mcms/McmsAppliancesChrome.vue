<template>
  <header class="mcms-chrome mcms-chrome--appliances">
    <div class="mcms-navbar mcms-navbar--bootstrap">
      <div class="mcms-inner mcms-navbar-row">
        <button
          type="button"
          class="mcms-toggle"
          aria-label="Toggle navigation"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>
        <div class="mcms-site-title">{{ c.siteTitle }}</div>
      </div>
    </div>
    <div class="mcms-nav-wrap">
      <div class="mcms-inner">
        <el-menu
          mode="horizontal"
          class="mcms-menu"
          :class="{ 'mcms-menu--open': mobileOpen }"
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { MCMS_DEMO_TEMPLATES } from '@/utils/mcmsDemoContent'

const c = MCMS_DEMO_TEMPLATES.appliances
const { onMenuSelect } = useMcmsElMenuNav()
const route = useRoute()
const mobileOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)
</script>

<style lang="scss" scoped>
.mcms-chrome {
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
  font-family: 'Microsoft YaHei', 'Segoe UI', system-ui, sans-serif;
}

.mcms-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.mcms-navbar--bootstrap {
  background: #2c2c2c;
  color: #fff;

  .mcms-navbar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 0;
  }

  .mcms-site-title {
    font-size: 15px;
    font-weight: 600;
  }
}

.mcms-toggle {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 40px;
  height: 32px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  span {
    display: block;
    height: 2px;
    background: #fff;
    border-radius: 1px;
  }
}

.mcms-nav-wrap {
  background: #f8f8f8;
}

.mcms-menu {
  border-bottom: none !important;
  background: transparent !important;
  flex-wrap: wrap;
  height: auto !important;

  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    font-size: 14px;
    color: #222 !important;
    background: transparent !important;
  }

  :deep(.el-menu-item:hover),
  :deep(.el-sub-menu__title:hover) {
    background: #f0f0f0 !important;
  }
}

.mcms-menu--open {
  display: flex !important;
}

@media (max-width: 900px) {
  .mcms-menu:not(.mcms-menu--open) {
    :deep(.el-menu-item),
    :deep(.el-sub-menu) {
      display: none;
    }
  }
}
</style>
