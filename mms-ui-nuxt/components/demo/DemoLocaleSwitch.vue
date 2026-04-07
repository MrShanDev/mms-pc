<template>
  <!-- 全站演示模版共用：与 template06 顶栏语言切换一致（Element Plus + availableLocales） -->
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
.demo-locale-switch {
  min-width: 128px;
  max-width: 100%;
}

.demo-locale-switch :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #ddd inset;
}
</style>
