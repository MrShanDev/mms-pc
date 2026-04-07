<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink :to="r.product">{{ t('product.breadcrumb') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink v-if="category" :to="r.productCategory(category.id)">{{ category.label }}</NuxtLink>
        <template v-if="category">
          <span class="sep">/</span>
        </template>
        <span class="current">{{ product?.title ?? '—' }}</span>
      </nav>

      <p v-if="!product" class="not-found">{{ t('productDetail.notFound') }}</p>

      <article v-else class="detail">
        <div class="detail-grid">
          <div class="detail-img">
            <img :src="product.image" :alt="product.title" loading="lazy">
          </div>
          <div class="detail-main">
            <h1>{{ product.title }}</h1>
            <p class="series">{{ category?.label }}</p>
            <p class="price-line">
              <span class="price-label">{{ t('template06Shop.priceLabel') }}</span>
              <span class="price-val">{{ t('template06Shop.currency') }}{{ priceYuan }}</span>
            </p>
            <div class="qty-row">
              <span class="qty-label">{{ t('template06Shop.qty') }}</span>
              <el-input-number v-model="qty" :min="1" :max="99" size="default" />
            </div>
            <div class="actions">
              <el-button class="btn-outline-gold" size="large" @click="onAddCart">
                {{ t('template06Shop.addToCart') }}
              </el-button>
              <el-button type="primary" class="btn-gold" size="large" @click="onBuyNow">
                {{ t('template06Shop.buyNow') }}
              </el-button>
            </div>
            <p class="back">
              <NuxtLink :to="category ? r.productCategory(category.id) : r.product">{{ t('productItem.backToSeries') }}</NuxtLink>
            </p>
          </div>
        </div>
      </article>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { demoProductPriceCents } from '@/utils/template06ShopPrice'

const route = useRoute()
const router = useRouter()
const { t } = useAppLocale()
const r = useTemplate06Routes()
const { findBySlug } = useTemplate06ProductLookup()
const shop = useTemplate06ShopStore()
const { productCategoriesDetailed } = useTitaSite()

const slug = computed(() => {
  const q = route.query.slug
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

const resolved = computed(() => {
  if (slug.value) {
    const hit = findBySlug(slug.value)
    if (hit) return hit
  }
  const c0 = productCategoriesDetailed.value[0]
  const p0 = c0?.products[0]
  if (c0 && p0) return { category: c0, product: p0 }
  return null
})

const category = computed(() => resolved.value?.category ?? null)
const product = computed(() => resolved.value?.product ?? null)

const priceCents = computed(() => (product.value ? demoProductPriceCents(product.value.slug) : 0))
const priceYuan = computed(() => (priceCents.value / 100).toFixed(2))

const qty = ref(1)

watch(
  () => product.value?.slug,
  () => {
    qty.value = 1
  }
)

/** 当前选中的商品行（与购物车接口字段一致） */
function getCurrentLinePayload() {
  const p = product.value
  const c = category.value
  if (!p || !c) return null
  return {
    slug: p.slug,
    title: p.title,
    image: p.image,
    priceCents: demoProductPriceCents(p.slug),
    qty: qty.value,
    categoryLabel: c.label
  }
}

function onAddCart() {
  const line = getCurrentLinePayload()
  if (!line) return
  shop.addToCart(line)
  ElMessage.success(t('template06Shop.addToCart'))
}

/** 立即购买：与加入购物车相同的写入，再进结算（不清空购物车，与其它商品一并结算） */
function onBuyNow() {
  const line = getCurrentLinePayload()
  if (!line) return
  shop.addToCart(line)
  router.push(r.checkout)
}
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

.not-found {
  padding: 48px 0;
  color: #888;
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
  margin: 0 0 16px;
  font-size: 14px;
  color: #666;
}

.price-line {
  margin: 0 0 20px;
  font-size: 14px;
  color: #333;

  .price-label {
    margin-right: 8px;
    color: #666;
  }

  .price-val {
    font-size: 22px;
    font-weight: 700;
    color: #c41e3a;
  }
}

.qty-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .qty-label {
    font-size: 14px;
    color: #666;
  }
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;

  .btn-outline-gold {
    border-color: #b8860b;
    color: #8b6914;
    background: #fff;

    &:hover {
      border-color: #a07828;
      color: #5c4a1a;
      background: #fffef8;
    }
  }

  .btn-gold {
    background: linear-gradient(180deg, #d4af37, #b8860b);
    border-color: #b8860b;
    color: #fff;
  }
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
