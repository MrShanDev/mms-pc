<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink :to="r.orders">{{ t('template06Shop.ordersTitle') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('template06Shop.orderPay') }}</span>
      </nav>

      <div v-if="!order" class="empty">{{ t('errors.notFoundMessage') }}</div>

      <template v-else-if="order.status !== 'pending_payment'">
        <p class="hint">{{ t('template06Shop.payHint') }}</p>
        <NuxtLink :to="r.orderDetail(order.id)" class="link">{{ t('template06Shop.viewOrder') }}</NuxtLink>
      </template>

      <template v-else>
        <h1 class="page-title">{{ t('template06Shop.orderPay') }}</h1>
        <p class="order-no">{{ t('template06Shop.orderNo') }}：{{ order.orderNo }}</p>

        <div v-if="expired" class="expired-box">
          <p>{{ t('template06Shop.payExpired') }}</p>
          <NuxtLink :to="r.orderDetail(order.id)">{{ t('template06Shop.viewOrder') }}</NuxtLink>
        </div>

        <section v-else class="card">
          <p class="amt">
            {{ t('template06Shop.payable') }}
            <strong>{{ t('template06Shop.currency') }}{{ (order.payableAmountCents / 100).toFixed(2) }}</strong>
          </p>
          <p v-if="order.awaitingPaymentConfirm" class="warn">{{ t('template06Shop.payPending') }}</p>
          <p class="countdown">{{ t('template06Shop.payCountdown') }}：{{ countdownText }}</p>
          <p class="hint">{{ t('template06Shop.payHint') }}</p>

          <div class="btns">
            <el-button
              type="success"
              size="large"
              :loading="paying === 'wechat'"
              @click="onPay('wechat')"
            >
              {{ t('template06Shop.wechatPay') }}
            </el-button>
            <el-button
              type="primary"
              size="large"
              :loading="paying === 'alipay'"
              @click="onPay('alipay')"
            >
              {{ t('template06Shop.alipayPay') }}
            </el-button>
          </div>
        </section>
      </template>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { payOrderMock } from '@/api/template06/shop'

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
  if (!o?.payExpireAtMs) return true
  return Date.now() > o.payExpireAtMs
})

const countdownText = ref('—')
const paying = ref<'wechat' | 'alipay' | null>(null)
let timer: ReturnType<typeof setInterval> | null = null

function tick() {
  const o = order.value
  if (!o?.payExpireAtMs) {
    countdownText.value = '—'
    return
  }
  const left = Math.max(0, o.payExpireAtMs - Date.now())
  if (left <= 0) {
    countdownText.value = '00:00'
    return
  }
  const m = Math.floor(left / 60000)
  const s = Math.floor((left % 60000) / 1000)
  countdownText.value = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

onMounted(() => {
  tick()
  timer = setInterval(tick, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

async function onPay(channel: 'wechat' | 'alipay') {
  const o = order.value
  if (!o || expired.value) return
  paying.value = channel
  try {
    const { data } = await payOrderMock(o.id, channel)
    const result = data.result
    router.replace({
      path: r.payResult,
      query: {
        orderId: o.id,
        result,
        channel
      }
    })
  } finally {
    paying.value = null
  }
}

useHead(() => ({
  title: t('template06Shop.orderPay'),
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
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 700;
}

.order-no {
  margin: 0 0 24px;
  font-size: 14px;
  color: #666;
}

.empty,
.hint {
  color: #888;
}

.link {
  color: #b8860b;
}

.expired-box {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 24px;
  a {
    color: #b8860b;
  }
}

.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 28px;
  max-width: 480px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);

  .amt {
    font-size: 16px;
    margin: 0 0 12px;
    strong {
      font-size: 28px;
      color: #c41e3a;
      margin-left: 8px;
    }
  }

  .warn {
    color: #e6a23c;
    font-size: 14px;
  }

  .countdown {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin: 12px 0;
  }

  .hint {
    font-size: 13px;
    line-height: 1.6;
    margin-bottom: 24px;
  }
}

.btns {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
