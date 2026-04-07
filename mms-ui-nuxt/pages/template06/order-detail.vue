<template>
  <AccountCenterShell>
    <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
      <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.account">{{ t('template06Shop.accountHome') }}</NuxtLink>
      <span class="sep">/</span>
      <NuxtLink :to="r.orders">{{ t('template06Shop.ordersTitle') }}</NuxtLink>
      <span class="sep">/</span>
      <span>{{ t('template06Shop.orderDetail') }}</span>
    </nav>

      <div v-if="!order" class="empty">{{ t('errors.notFoundMessage') }}</div>

      <template v-else>
        <div class="head">
          <h1 class="page-title">{{ t('template06Shop.orderNo') }}：{{ order.orderNo }}</h1>
          <span class="st" :class="order.status">{{ statusText(order.status) }}</span>
        </div>

        <section v-if="order.status === 'pending_payment'" class="pay-box">
          <p>{{ t('template06Shop.pendingPayment') }}</p>
          <p class="amt">
            {{ t('template06Shop.payable') }} {{ t('template06Shop.currency') }}{{ (order.payableAmountCents / 100).toFixed(2) }}
          </p>
          <NuxtLink v-if="!expired" :to="r.orderPay(order.id)" class="btn-pay">{{ t('template06Shop.orderPay') }}</NuxtLink>
          <p v-else class="exp">{{ t('template06Shop.payExpired') }}</p>
        </section>

        <section class="card">
          <h2>{{ t('template06Shop.receiver') }}</h2>
          <p>
            {{ order.addressSnapshot.name }} {{ order.addressSnapshot.phone }} · {{ order.addressSnapshot.region }}
            {{ order.addressSnapshot.detail }}
          </p>
        </section>

        <section class="card">
          <h2>{{ t('template06Shop.logistics') }}</h2>
          <p>{{ logisticsLabel(order.logisticsId) }}</p>
        </section>

        <section class="card">
          <h2>{{ t('template06Shop.cartTitle') }}</h2>
          <table class="tbl">
            <tbody>
              <tr v-for="(line, i) in order.lines" :key="i">
                <td>
                  <img :src="line.image" alt="" class="thumb" loading="lazy">
                  {{ line.title }}
                </td>
                <td>× {{ line.qty }}</td>
                <td>{{ t('template06Shop.currency') }}{{ ((line.priceCents * line.qty) / 100).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
          <div class="totals">
            <p>
              <span>{{ t('template06Shop.goodsAmount') }}</span>
              <span>{{ t('template06Shop.currency') }}{{ (order.goodsAmountCents / 100).toFixed(2) }}</span>
            </p>
            <p>
              <span>{{ t('template06Shop.freight') }}</span>
              <span>{{ t('template06Shop.currency') }}{{ (order.freightCents / 100).toFixed(2) }}</span>
            </p>
            <p class="pay">
              <span>{{ t('template06Shop.payable') }}</span>
              <strong>{{ t('template06Shop.currency') }}{{ (order.payableAmountCents / 100).toFixed(2) }}</strong>
            </p>
          </div>
        </section>

        <div class="foot-actions">
          <el-button v-if="order.status === 'pending_payment'" @click="onCancel">{{ t('template06Shop.cancelOrder') }}</el-button>
          <el-button type="primary" class="gold" @click="onReorder">{{ t('template06Shop.reorder') }}</el-button>
        </div>
      </template>
  </AccountCenterShell>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import AccountCenterShell from '@/pages/template06/_components/AccountCenterShell.vue'
import type { LogisticsId, OrderStatus } from '@/types/template06-shop'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const id = computed(() => {
  const q = route.query.id
  return typeof q === 'string' && q.trim() ? q.trim() : ''
})

const order = computed(() => (id.value ? shop.orders.find((o) => o.id === id.value) : undefined))

const expired = computed(() => {
  const o = order.value
  if (!o?.payExpireAtMs) return false
  return Date.now() > o.payExpireAtMs
})

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

function logisticsLabel(l: LogisticsId) {
  return l === 'express' ? t('template06Shop.express') : t('template06Shop.standard')
}

async function onCancel() {
  if (!order.value) return
  try {
    await ElMessageBox.confirm(t('template06Shop.cancelOrderConfirm'), t('header.logoutConfirmTitle'), {
      type: 'warning'
    })
  } catch {
    return
  }
  if (shop.cancelOrder(order.value.id)) {
    ElMessage.success(t('template06Shop.status_cancelled'))
  }
}

function onReorder() {
  if (!order.value) return
  shop.reorderFrom(order.value.id)
  ElMessage.success(t('template06Shop.addToCart'))
  router.push(r.cart)
}

useHead(() => ({
  title: t('template06Shop.orderDetail'),
  htmlAttrs: { lang: locale.value }
}))
</script>

<style lang="scss" scoped>
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

.head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.page-title {
  margin: 0;
  font-size: 22px;
  font-weight: 700;
}

.st {
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 2px;
  background: #f5f5f5;
  &.pending_payment {
    color: #c41e3a;
    background: #fff0f0;
  }
}

.empty {
  padding: 48px;
  color: #888;
}

.pay-box {
  background: #fff8f0;
  border: 1px solid #f0e0c8;
  padding: 20px;
  margin-bottom: 20px;
  .amt {
    font-size: 18px;
    font-weight: 700;
    color: #c41e3a;
  }
  .btn-pay {
    display: inline-block;
    margin-top: 12px;
    padding: 10px 24px;
    background: linear-gradient(180deg, #d4af37, #b8860b);
    color: #fff !important;
    text-decoration: none;
    font-weight: 600;
  }
  .exp {
    color: #999;
    margin-top: 8px;
  }
}

.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  h2 {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: #444;
  }
}

.tbl {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  td {
    padding: 10px 8px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
  }

  .thumb {
    width: 48px;
    height: 36px;
    object-fit: cover;
    margin-right: 8px;
    vertical-align: middle;
  }
}

.totals {
  margin-top: 16px;
  p {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    font-size: 14px;
  }
  .pay strong {
    font-size: 18px;
    color: #c41e3a;
  }
}

.foot-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;

  .gold {
    background: linear-gradient(180deg, #d4af37, #b8860b);
    border-color: #b8860b;
    color: #fff;
  }
}
</style>
