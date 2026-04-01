<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink to="/">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink to="/product">{{ t('product.breadcrumb') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ category.label }}</span>
      </nav>
      <h1 class="page-title">{{ category.label }}</h1>
      <p class="page-lead">{{ category.intro }}</p>
      <div class="product-grid">
        <article v-for="(p, i) in category.products" :key="i" class="product-card">
          <div class="product-img-wrap">
            <img :src="p.image" :alt="p.title" loading="lazy">
          </div>
          <h2 class="product-title">{{ p.title }}</h2>
        </article>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTitaCanonical } from '@/utils/titaSiteContent'
import { getLocaleDir, getLocaleLanguage } from '@/i18n/available-locales'

definePageMeta({ layout: 'default', requiresAuth: false })

const route = useRoute()
const rawId = String(route.params.id)

if (!new Set(['15', '16', '17', '18', '19']).has(rawId)) {
  throw createError({ statusCode: 404, statusMessage: 'Product category not found' })
}

const { t } = useAppLocale()
const { locale } = useI18n()
const { categoryById, companyName } = useTitaSite()
const category = computed(() => categoryById(rawId)!)

const path = computed(() => `/product/${rawId}`)
const { link: canonicalLink, og: canonicalOg } = useTitaCanonical(path.value)

useHead(() => ({
  title: category.value.label,
  meta: [
    {
      name: 'description',
      content: t('productDetail.metaDesc', {
        category: category.value.label,
        company: companyName.value
      })
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
  background: #fff;
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
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
}

.page-lead {
  margin: 0 0 32px;
  max-width: 900px;
  line-height: 1.7;
  color: #444;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
}

.product-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08);
  }
}

.product-img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #eee;
  margin-bottom: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}

.product-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.5;
  color: #222;
}
</style>
