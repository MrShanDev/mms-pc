<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink :to="r.product">{{ t('product.breadcrumb') }}</NuxtLink>
        <span class="sep">/</span>
        <span class="current">{{ product.title }}</span>
      </nav>
      <article class="detail">
        <div class="detail-grid">
          <div class="detail-img">
            <img :src="product.image" :alt="product.title" loading="lazy">
          </div>
          <div class="detail-main">
            <h1>{{ product.title }}</h1>
            <p class="series">{{ category.label }}</p>
            <p class="back">
              <NuxtLink :to="r.product">{{ t('productItem.backToSeries') }}</NuxtLink>
            </p>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { productCategoriesDetailed } from '@/utils/titaSiteContent'

const category = productCategoriesDetailed[0]!
const product = category.products[0]!

const { t } = useAppLocale()
const r = useTemplate06Routes()
</script>

<style lang="scss" scoped>
.tita-sub {
  min-height: 70vh;
  padding: 32px 0 56px;
  background: #fafafa;
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
  .current {
    color: #333;
    max-width: min(100%, 480px);
    display: inline-block;
    vertical-align: bottom;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 40px;
  align-items: start;
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 32px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.detail-img {
  background: #eee;
  img {
    width: 100%;
    display: block;
    object-fit: cover;
    aspect-ratio: 4/3;
  }
}

.detail-main {
  h1 {
    margin: 0 0 12px;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    color: #111;
  }
}

.series {
  margin: 0 0 24px;
  font-size: 14px;
  color: #666;
}

.back a {
  color: #b8860b;
  text-decoration: none;
  font-size: 14px;
  &:hover {
    text-decoration: underline;
  }
}
</style>
