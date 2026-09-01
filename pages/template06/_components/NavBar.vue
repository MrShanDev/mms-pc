<template>
  <div class="tita-nav">
    <div class="nav-inner width_1400_auto">
      <el-menu
        :key="menuKey"
        :default-active="activeKey"
        class="main-menu"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
      >
        <template v-for="(entry, idx) in navDto.entries" :key="`${idx}-${entry.kind}`">
          <el-sub-menu v-if="entry.kind === 'product'" :index="entry.submenuIndex">
            <template #title>
              <span class="menu-title">{{ entry.label }}</span>
            </template>
            <el-menu-item v-for="child in entry.children" :key="child.index" :index="child.index">
              {{ child.label }}
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item v-else :index="entry.index">
            {{ entry.label }}
          </el-menu-item>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { locale } = useAppLocale()
const { theme } = useAppTheme()
const { navDto } = useTemplate06Navigation()
const r = useTemplate06Routes()

/** el-menu default-active 仅在挂载时生效，用 key 强制在路由或语言变化时刷新选中态 */
const menuKey = ref(0)

const activeKey = computed(() => {
  const path = route.path
  const { home, about, news, contact, product, newsDetail, productDetail, cart } = r
  if (path === home || path === `${home}/`) return home
  if (path === about) return about
  if (path === news || path === newsDetail || path.startsWith(`${news}/`)) return news
  if (path === contact) return contact
  if (path === product || path === productDetail || path === cart) return product
  if (path === `${home}/product-category`) {
    const qid = route.query.id
    if (typeof qid === 'string' && qid) return `pc-${qid}`
  }
  return home
})

watch(
  () => route.fullPath,
  () => {
    menuKey.value += 1
  }
)

watch(locale, () => {
  menuKey.value += 1
})

watch(theme, () => {
  menuKey.value += 1
})

const handleSelect = (index: string) => {
  const { home, about, news, contact, product } = r
  if (index === home || index === about || index === news || index === contact || index === product) {
    router.push(index)
    return
  }
  if (index.startsWith('pc-')) {
    router.push(r.productCategory(index.slice(3)))
  }
}
</script>

<style lang="scss" scoped>
.tita-nav {
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #ddd;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.main-menu {
  height: 52px;
  border-bottom: none !important;
  justify-content: flex-start;
  background: transparent !important;

  :deep(.el-sub-menu__title),
  :deep(.el-menu-item) {
    font-size: 15px;
    color: #222 !important;
    border-bottom: 2px solid transparent !important;
    background: transparent !important;
  }

  :deep(.el-sub-menu__title:hover),
  :deep(.el-menu-item:hover) {
    color: #000 !important;
    background: #f9f9f9 !important;
  }

  :deep(.el-menu-item.is-active) {
    color: #b8860b !important;
    border-bottom-color: #b8860b !important;
  }

  :deep(.el-sub-menu.is-active .el-sub-menu__title) {
    border-bottom-color: transparent !important;
  }

  :deep(.el-menu--horizontal > .el-menu-item) {
    margin-right: 8px;
  }
}

.menu-title {
  font-size: 15px;
}
</style>
