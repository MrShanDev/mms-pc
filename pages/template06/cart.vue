<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('template06Shop.cartTitle') }}</span>
      </nav>

      <h1 class="page-title">{{ t('template06Shop.cartTitle') }}</h1>

      <div v-if="shop.cart.length === 0" class="empty">
        <p>{{ t('template06Shop.emptyCart') }}</p>
        <NuxtLink :to="r.product" class="btn-link">{{ t('template06Shop.goShopping') }}</NuxtLink>
      </div>

      <div v-else class="cart-wrap">
        <table class="cart-table">
          <thead>
            <tr>
              <th>{{ t('product.breadcrumb') }}</th>
              <th>{{ t('template06Shop.priceLabel') }}</th>
              <th>{{ t('template06Shop.qty') }}</th>
              <th>{{ t('template06Shop.subtotal') }}</th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr v-for="line in shop.cart" :key="line.skuId">
              <td class="cell-info">
                <img :src="line.image" alt="" class="thumb" loading="lazy">
                <div>
                  <div class="tit">{{ line.title }}</div>
                  <div class="sub">{{ line.categoryLabel }}</div>
                </div>
              </td>
              <td>{{ t('template06Shop.currency') }}{{ (line.priceCents / 100).toFixed(2) }}</td>
              <td>
                <el-input-number
                  :model-value="line.qty"
                  :min="1"
                  :max="99"
                  size="small"
                  @update:model-value="(v: number | undefined) => onQty(line.skuId, v ?? 1)"
                />
              </td>
              <td>{{ t('template06Shop.currency') }}{{ ((line.priceCents * line.qty) / 100).toFixed(2) }}</td>
              <td>
                <el-button link type="danger" @click="shop.removeCartLine(line.skuId)">
                  {{ t('template06Shop.remove') }}
                </el-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="summary">
          <p>
            <span>{{ t('template06Shop.subtotal') }}</span>
            <strong>{{ t('template06Shop.currency') }}{{ (goods / 100).toFixed(2) }}</strong>
          </p>
          <NuxtLink :to="r.checkout" class="checkout-btn">{{ t('template06Shop.toCheckout') }}</NuxtLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const goods = computed(() => shop.cartGoodsAmountCents)

function onQty(skuId: string, v: number) {
  shop.setCartQty(skuId, v)
}

useHead(() => ({
  title: t('template06Shop.cartTitle'),
  htmlAttrs: { lang: locale.value }
}))
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
}

.page-title {
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
}

.empty {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 48px;
  text-align: center;
  color: #666;

  .btn-link {
    display: inline-block;
    margin-top: 16px;
    color: #b8860b;
    font-weight: 600;
  }
}

.cart-wrap {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 24px;
}

.cart-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    padding: 12px 8px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  th {
    color: #666;
    font-weight: 600;
  }
}

.cell-info {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;

  .thumb {
    width: 72px;
    height: 54px;
    object-fit: cover;
    background: #eee;
  }

  .tit {
    font-weight: 600;
    color: #111;
  }

  .sub {
    font-size: 12px;
    color: #888;
    margin-top: 4px;
  }
}

.summary {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 24px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  p {
    margin: 0;
    font-size: 16px;
    strong {
      margin-left: 8px;
      color: #c41e3a;
      font-size: 20px;
    }
  }
}

.checkout-btn {
  display: inline-block;
  padding: 12px 32px;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  color: #fff !important;
  text-decoration: none;
  font-weight: 600;
  border-radius: 2px;
}
</style>
