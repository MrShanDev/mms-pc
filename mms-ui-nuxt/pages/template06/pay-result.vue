<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <h1 class="page-title">{{ t('template06Shop.payResultTitle') }}</h1>

      <div class="card" :class="result">
        <template v-if="result === 'success'">
          <p class="icon ok">✓</p>
          <p class="msg">{{ t('template06Shop.paySuccess') }}</p>
        </template>
        <template v-else-if="result === 'pending'">
          <p class="icon wait">…</p>
          <p class="msg">{{ t('template06Shop.payPending') }}</p>
          <p class="sub">{{ t('template06Shop.payPendingDesc') }}</p>
        </template>
        <template v-else>
          <p class="icon fail">✕</p>
          <p class="msg">{{ t('template06Shop.payFailed') }}</p>
        </template>

        <p v-if="order" class="order-ref">
          {{ t('template06Shop.orderNo') }}：{{ order.orderNo }}
        </p>

        <div class="actions">
          <NuxtLink v-if="order" :to="r.orderDetail(order.id)" class="btn">{{ t('template06Shop.viewOrder') }}</NuxtLink>
          <NuxtLink :to="r.orders" class="btn secondary">{{ t('template06Shop.backToOrders') }}</NuxtLink>
        </div>

        <p class="gateway-note">{{ t('template06Shop.payHint') }}</p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({ layout: 'default', requiresAuth: false })

const { t } = useAppLocale()
const { locale } = useI18n()
const route = useRoute()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const result = computed(() => {
  const q = route.query.result
  if (q === 'success' || q === 'pending' || q === 'failed') return q
  return 'failed'
})

const order = computed(() => {
  const id = route.query.orderId
  if (typeof id !== 'string' || !id) return null
  return shop.orders.find((o) => o.id === id) ?? null
})

useHead(() => ({
  title: t('template06Shop.payResultTitle'),
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

.page-title {
  margin: 0 0 24px;
  font-size: 22px;
  font-weight: 700;
}

.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 40px 24px;
  text-align: center;

  &.success .icon.ok {
    color: #67c23a;
  }
  &.pending .icon.wait {
    color: #e6a23c;
  }
  &.failed .icon.fail {
    color: #f56c6c;
  }
}

.icon {
  font-size: 48px;
  margin: 0 0 16px;
  font-weight: 700;
}

.msg {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
}

.sub {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin: 0 0 16px;
}

.order-ref {
  font-size: 14px;
  color: #666;
  margin: 16px 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  color: #fff !important;
  text-decoration: none;
  font-weight: 600;
  border-radius: 2px;

  &.secondary {
    background: #f5f5f5;
    color: #333 !important;
  }
}

.gateway-note {
  margin-top: 32px;
  font-size: 12px;
  color: #999;
  line-height: 1.6;
}
</style>
