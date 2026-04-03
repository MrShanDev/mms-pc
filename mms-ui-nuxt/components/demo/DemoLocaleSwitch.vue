<template>
  <!-- 演示模版：中英文切换（select 下拉），与 mock/接口数据无关 -->
  <div class="demo-locale-switch">
    <select
      class="demo-locale-select"
      :aria-label="t('demo.locale.groupAria')"
      :value="demoLocale"
      @change="onChange"
    >
      <option value="en">{{ t('demo.locale.enLabel') }}</option>
      <option value="zh">{{ t('demo.locale.zhLabel') }}</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { SiteLocaleCode } from '@/i18n/available-locales'

const { locale, setLocale } = useAppLocale()
const { t } = useI18n()

/** 仅提供 en/zh；其它语言访问演示站时按 en 显示在下拉中 */
const demoLocale = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value
  if (v === 'zh' || v === 'en') setLocale(v as SiteLocaleCode)
}
</script>

<style scoped>
.demo-locale-switch {
  display: inline-flex;
  align-items: center;
}

.demo-locale-select {
  min-width: 128px;
  max-width: 100%;
  padding: 6px 28px 6px 10px;
  font: inherit;
  font-size: 14px;
  line-height: 1.35;
  color: #333;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
  appearance: auto;
  background-image: linear-gradient(180deg, #fff, #fafafa);
}

.demo-locale-select:hover {
  border-color: #029c6a;
}

.demo-locale-select:focus {
  outline: none;
  border-color: #029c6a;
  box-shadow: 0 0 0 2px rgba(2, 156, 106, 0.2);
}
</style>
