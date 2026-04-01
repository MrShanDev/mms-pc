<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('product.breadcrumb') }}</span>
      </nav>
      <h1 class="page-title">{{ t('product.title') }}</h1>
      <p class="page-lead">
        {{ t('product.lead') }}
      </p>
      <div class="category-cards">
        <NuxtLink
          v-for="c in productCategoriesDetailed"
          :key="c.id"
          :to="`/product/${c.id}`"
          class="category-card"
        >
          <h2>{{ c.label }}</h2>
          <p>{{ c.intro }}</p>
          <span class="more">{{ t('product.viewSeries') }}</span>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const { companyName, productCategoriesDetailed } = useTitaSite()
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical('/product')

useHead(() => ({
  title: t('product.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('product.metaDesc', { company: companyName.value })
    },
    ...canonicalOg
  ],
  link: canonicalLink,
  htmlAttrs: { lang: getLocaleLanguage(locale.value), dir: getLocaleDir(locale.value) }
}))
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 70vh;
  padding: 32px 0 56px;
  background: #f5f5f5;
  color: #222;
  font-family: 'Segoe UI', system-ui, -apple-system, Roboto, 'Microsoft YaHei', sans-serif;
}

.width_1400_auto {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 24px;

  a {
    color: #b8860b;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  .sep {
    margin: 0 8px;
    color: #ccc;
  }
}

.page-title {
  margin: 0 0 12px;
  font-size: 22px;
  letter-spacing: 0.06em;
}

.page-lead {
  margin: 0 0 32px;
  max-width: 720px;
  line-height: 1.6;
  color: #444;
}

.category-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.category-card {
  display: block;
  padding: 24px;
  background: #fff;
  border: 1px solid #e8e8e8;
  text-decoration: none;
  color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  h2 {
    margin: 0 0 12px;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: #111;
  }

  p {
    margin: 0 0 16px;
    font-size: 14px;
    line-height: 1.65;
    color: #666;
  }

  .more {
    font-size: 13px;
    color: #b8860b;
  }
}
</style>
