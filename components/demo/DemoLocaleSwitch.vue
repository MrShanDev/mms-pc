<template>
  <!-- 全站演示模版共用：与 template06 顶栏一致 — el-select、availableLocales、aria-label=header.langSelect；外层可加 class="lang-select" -->
  <el-select
    :model-value="locale"
    class="demo-locale-switch"
    :size="props.size"
    :aria-label="t('header.langSelect')"
    @update:model-value="onLangChange"
  >
    <el-option
      v-for="l in availableLocales"
      :key="l.code"
      :label="l.name"
      :value="l.code"
    />
  </el-select>
</template>

<script setup lang="ts">
import { availableLocales } from '@/i18n/available-locales'
import type { SiteLocaleCode } from '@/i18n/available-locales'

const props = withDefaults(
  defineProps<{
    /** 与 Element Plus el-select size 一致 */
    size?: 'large' | 'default' | 'small'
  }>(),
  { size: 'small' }
)

const { locale, setLocale, t } = useAppLocale()

function onLangChange(code: string) {
  setLocale(code as SiteLocaleCode)
}
</script>

<style scoped>
/* 保持 EP 默认 inline-block；勿在外层用 flex 覆盖本类，否则会破坏内部选中项布局 */
.demo-locale-switch {
  min-width: 128px;
}

.demo-locale-switch :deep(.el-select__wrapper) {
  box-shadow: 0 0 0 1px #ddd inset;
}

/* 避免占位/选中项 z-index:-1 落在 wrapper 底色之下导致「只见箭头不见字」 */
.demo-locale-switch :deep(.el-select__placeholder) {
  z-index: 1;
}

.demo-locale-switch :deep(.el-select__suffix) {
  z-index: 2;
}
</style>
