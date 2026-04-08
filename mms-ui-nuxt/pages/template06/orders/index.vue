<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.ordersTitle') }}</span>
    </nav>

    <div class="page-head">
      <h1 class="page-title">{{ t('template06Shop.ordersTitle') }}</h1>
      <div class="filter-bar filter-bar--theme">
        <el-radio-group v-model="filter" size="small" class="filter-group" @change="onFilter">
          <el-radio-button label="all">{{ t('template06Shop.filterAll') }}</el-radio-button>
          <el-radio-button label="pending_payment">{{ t('template06Shop.status_pending_payment') }}</el-radio-button>
          <el-radio-button label="pending_shipment">{{ t('template06Shop.status_pending_shipment') }}</el-radio-button>
          <el-radio-button label="shipped">{{ t('template06Shop.status_shipped') }}</el-radio-button>
          <el-radio-button label="completed">{{ t('template06Shop.status_completed') }}</el-radio-button>
          <el-radio-button label="cancelled">{{ t('template06Shop.status_cancelled') }}</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty-wrap">
      <p class="empty-icon" aria-hidden="true" />
      <p class="empty-text">{{ t('template06Shop.noOrders') }}</p>
      <NuxtLink :to="r.product" class="empty-cta">{{ t('template06Shop.goShopping') }}</NuxtLink>
    </div>

    <ul v-else class="list">
      <li v-for="o in filtered" :key="o.id" class="order-card">
        <header class="order-card__head">
          <div class="order-card__meta">
            <span class="order-no">
              <span class="order-no__label">{{ t('template06Shop.orderNo') }}</span>
              <span class="order-no__val">{{ o.orderNo }}</span>
            </span>
            <span class="order-time">
              <span class="order-time__label">{{ t('template06Shop.orderPlacedAt') }}</span>
              <time :datetime="isoTime(o.createdAt)" class="order-time__val">{{ formatOrderDate(o.createdAt) }}</time>
            </span>
          </div>
          <span class="status-pill" :class="o.status">{{ statusText(o.status) }}</span>
        </header>

        <div class="order-card__body">
          <div v-if="o.lines.length" class="goods-block">
            <div
              v-for="(line, idx) in o.lines.slice(0, 3)"
              :key="idx"
              class="goods-row"
            >
              <NuxtLink
                :to="r.productDetailWithSlug(line.slug)"
                class="thumb-wrap"
                tabindex="-1"
              >
                <img :src="line.image" alt="" class="thumb" loading="lazy" width="72" height="54">
              </NuxtLink>
              <div class="goods-main">
                <NuxtLink :to="r.productDetailWithSlug(line.slug)" class="goods-title">{{ line.title }}</NuxtLink>
                <span class="goods-qty">×{{ line.qty }}</span>
              </div>
            </div>
            <p v-if="o.lines.length > 3" class="goods-more">
              {{ t('template06Shop.orderMoreItems', { n: o.lines.length - 3 }) }}
            </p>
          </div>
          <p v-else class="goods-empty">—</p>

          <div class="order-card__side">
            <div class="pay-line">
              <span class="pay-line__label">{{ t('template06Shop.payable') }}</span>
              <span class="pay-line__num">{{ t('template06Shop.currency') }}{{ (o.payableAmountCents / 100).toFixed(2) }}</span>
            </div>
            <div class="btn-row">
              <NuxtLink :to="r.orderDetail(o.id)" class="btn ghost">{{ t('template06Shop.orderDetail') }}</NuxtLink>
              <NuxtLink
                v-if="o.status === 'pending_payment'"
                :to="r.orderPay(o.id)"
                class="btn primary"
              >
                {{ t('template06Shop.pendingPayment') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { OrderStatus } from '@/types/template06-shop'
import { fetchOrdersMock } from '@/api/template06/shop'
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const filter = ref<string>('all')

function statusText(s: OrderStatus) {
  const map: Record<OrderStatus, string> = {
    pending_payment: t('template06Shop.status_pending_payment'),
    pending_shipment: t('template06Shop.status_pending_shipment'),
    shipped: t('template06Shop.status_shipped'),
    completed: t('template06Shop.status_completed'),
    cancelled: t('template06Shop.status_cancelled')
  }
  return map[s]
}

function formatOrderDate(ms: number) {
  const d = new Date(ms)
  return d.toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function isoTime(ms: number) {
  return new Date(ms).toISOString()
}

const filtered = computed(() => {
  const list = shop.orders
  if (filter.value === 'all') return list
  return list.filter((o) => o.status === filter.value)
})

function syncFromQuery() {
  const q = route.query.status
  if (typeof q === 'string' && q) {
    filter.value = q
  }
}

function onFilter() {
  router.replace({ path: r.orders, query: filter.value === 'all' ? {} : { status: filter.value } })
}

onMounted(async () => {
  await fetchOrdersMock()
  syncFromQuery()
})

watch(
  () => route.query.status,
  () => syncFromQuery()
)

useHead(() => ({
  title: t('template06Shop.ordersTitle'),
  htmlAttrs: { lang: locale.value }
}))
</script>

<style lang="scss" scoped>
.breadcrumb {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
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

.page-head {
  margin-bottom: 20px;
}

.page-title {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 700;
  color: #1a1a1a;
}

.filter-bar {
  padding: 12px 14px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 2px;
  }
}

.filter-group {
  display: inline-flex;
  flex-wrap: nowrap;
  white-space: nowrap;
}

/**
 * EP 在 `.el-radio-button` 上写死了 `--el-radio-button-checked-*: var(--el-color-primary)`，
 * 父级设变量不会生效，须写在每个 `.el-radio-button` 上；必要时再直接改选中态 inner。
 */
.filter-bar--theme {
  :deep(.el-radio-button) {
    --el-radio-button-checked-bg-color: #b8860b;
    --el-radio-button-checked-border-color: #b8860b;
    --el-radio-button-checked-text-color: #ffffff;
  }

  :deep(.el-radio-button.is-active .el-radio-button__original-radio:not(:disabled) + .el-radio-button__inner) {
    background-color: #b8860b !important;
    border-color: #b8860b !important;
    color: #fff !important;
    box-shadow: -1px 0 0 0 #b8860b !important;
  }

  :deep(.el-radio-button:first-child.is-active .el-radio-button__original-radio:not(:disabled) + .el-radio-button__inner) {
    box-shadow: none !important;
  }

  :deep(.el-radio-button:not(.is-active) .el-radio-button__inner:hover) {
    color: #b8860b;
  }
}

.empty-wrap {
  text-align: center;
  padding: 48px 24px;
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.empty-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto 16px;
  border-radius: 50%;
  background: linear-gradient(145deg, #f5f5f5, #ebebeb);
  position: relative;
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ccc;
    border-radius: 2px;
  }
  &::before {
    width: 28px;
    height: 3px;
  }
  &::after {
    width: 3px;
    height: 28px;
  }
}

.empty-text {
  margin: 0 0 16px;
  font-size: 15px;
  color: #888;
}

.empty-cta {
  display: inline-block;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  text-decoration: none;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-radius: 6px;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.92;
  }
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.order-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  }
}

.order-card__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
  border-bottom: 1px solid #f0f0f0;
}

.order-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 16px 24px;
  font-size: 13px;
  color: #666;
}

.order-no {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.order-no__label {
  color: #999;
}

.order-no__val {
  font-weight: 600;
  color: #1a1a1a;
  word-break: break-all;
}

.order-time {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.order-time__label {
  color: #999;
}

.order-time__val {
  color: #333;
}

.status-pill {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 4px;
  flex-shrink: 0;

  &.pending_payment {
    color: #c41e3a;
    background: #fff0f0;
  }
  &.pending_shipment {
    color: #b8860b;
    background: #faf8f3;
  }
  &.shipped {
    color: #2d6a4f;
    background: #e8f5e9;
  }
  &.completed {
    color: #666;
    background: #f0f0f0;
  }
  &.cancelled {
    color: #888;
    background: #f5f5f5;
  }
}

.order-card__body {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: stretch;
  padding: 16px;
}

.goods-block {
  min-width: 0;
}

.goods-row {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px dashed #f0f0f0;

  &:last-of-type {
    border-bottom: none;
  }
}

.thumb-wrap {
  flex-shrink: 0;
  display: block;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #eee;
  line-height: 0;
}

.thumb {
  width: 72px;
  height: 54px;
  object-fit: cover;
  display: block;
}

.goods-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.goods-title {
  font-size: 14px;
  line-height: 1.45;
  color: #222;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  &:hover {
    color: #b8860b;
  }
}

.goods-qty {
  font-size: 13px;
  color: #999;
}

.goods-more {
  margin: 8px 0 0;
  font-size: 12px;
  color: #999;
}

.goods-empty {
  margin: 0;
  padding: 12px 0;
  font-size: 14px;
  color: #bbb;
}

.order-card__side {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 14px;
  padding-left: 12px;
  border-left: 1px solid #f0f0f0;
  min-width: 160px;
}

.pay-line {
  text-align: right;
}

.pay-line__label {
  display: block;
  font-size: 12px;
  color: #999;
  margin-bottom: 4px;
}

.pay-line__num {
  font-size: 18px;
  font-weight: 700;
  color: #c41e3a;
}

.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.15s, color 0.15s, border-color 0.15s;
  white-space: nowrap;

  &.ghost {
    color: #b8860b;
    border: 1px solid #e0d4b8;
    background: #fff;

    &:hover {
      background: #faf8f3;
      border-color: #b8860b;
    }
  }

  &.primary {
    color: #fff;
    background: linear-gradient(180deg, #d4af37, #b8860b);
    border: 1px solid #b8860b;

    &:hover {
      opacity: 0.95;
    }
  }
}
</style>
