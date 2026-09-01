<template>
  <el-config-provider :locale="elementLocale">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Language } from 'element-plus/es/locale'
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ja from 'element-plus/es/locale/lang/ja'
import ko from 'element-plus/es/locale/lang/ko'
import fr from 'element-plus/es/locale/lang/fr'
import de from 'element-plus/es/locale/lang/de'
import es from 'element-plus/es/locale/lang/es'
import ru from 'element-plus/es/locale/lang/ru'
import ptBr from 'element-plus/es/locale/lang/pt-br'
import it from 'element-plus/es/locale/lang/it'
import arEg from 'element-plus/es/locale/lang/ar-eg'

const { locale } = useAppLocale()
const { theme } = useAppTheme()

useHead(() => ({
  htmlAttrs: {
    'data-app-theme': theme.value
  }
}))

const elementLocaleMap: Record<string, Language> = {
  en,
  zh: zhCn,
  ja,
  ko,
  fr,
  de,
  es,
  ru,
  pt: ptBr,
  it,
  ar: arEg
}

const elementLocale = computed<Language>(() => elementLocaleMap[locale.value] ?? en)
</script>
