<template>
  <main class="tita-sub">
    <div class="inner width_1400_auto">
      <nav class="breadcrumb" :aria-label="t('common.breadcrumbNav')">
        <NuxtLink :to="r.home">{{ t('common.breadcrumbHome') }}</NuxtLink>
        <span class="sep">/</span>
        <NuxtLink :to="r.cart">{{ t('template06Shop.cartTitle') }}</NuxtLink>
        <span class="sep">/</span>
        <span>{{ t('template06Shop.checkoutTitle') }}</span>
      </nav>

      <h1 class="page-title">{{ t('template06Shop.checkoutTitle') }}</h1>

      <div v-if="shop.cart.length === 0" class="empty">
        <p>{{ t('template06Shop.emptyCart') }}</p>
        <NuxtLink :to="r.product">{{ t('template06Shop.goShopping') }}</NuxtLink>
      </div>

      <div v-else class="grid">
        <section class="card">
          <h2>{{ t('template06Shop.receiver') }}</h2>
          <p v-if="!addresses.length" class="hint">{{ t('template06Shop.noAddressHint') }}</p>
          <el-radio-group v-model="addressId" class="addr-group">
            <el-radio v-for="a in addresses" :key="a.id" :label="a.id" class="addr-radio">
              <span class="addr-line">
                <strong>{{ a.name }}</strong> {{ a.phone }} · {{ a.region }} {{ a.detail }}
                <span v-if="a.isDefault" class="tag">{{ t('template06Shop.defaultTag') }}</span>
              </span>
            </el-radio>
          </el-radio-group>
          <NuxtLink :to="r.addresses" class="manage">{{ t('template06Shop.manageAddresses') }}</NuxtLink>
        </section>

        <section class="card">
          <h2>{{ t('template06Shop.logistics') }}</h2>
          <el-radio-group v-model="logisticsId">
            <el-radio label="express">{{ t('template06Shop.express') }}</el-radio>
            <el-radio label="standard">{{ t('template06Shop.standard') }}</el-radio>
          </el-radio-group>
          <p class="hint">{{ t('template06Shop.freeFreightHint') }}</p>
        </section>

        <section class="card">
          <h2>{{ t('template06Shop.cartTitle') }}</h2>
          <ul class="lines">
            <li v-for="line in shop.cart" :key="line.skuId">
              <span>{{ line.title }} × {{ line.qty }}</span>
              <span>{{ t('template06Shop.currency') }}{{ ((line.priceCents * line.qty) / 100).toFixed(2) }}</span>
            </li>
          </ul>
          <div class="totals">
            <p>
              <span>{{ t('template06Shop.goodsAmount') }}</span>
              <span>{{ t('template06Shop.currency') }}{{ (goods / 100).toFixed(2) }}</span>
            </p>
            <p>
              <span>{{ t('template06Shop.freight') }}</span>
              <span>{{ t('template06Shop.currency') }}{{ (freight / 100).toFixed(2) }}</span>
            </p>
            <p class="pay">
              <span>{{ t('template06Shop.payable') }}</span>
              <strong>{{ t('template06Shop.currency') }}{{ (payable / 100).toFixed(2) }}</strong>
            </p>
          </div>
          <el-button
            type="primary"
            class="submit"
            :loading="submitting"
            :disabled="!addressId"
            @click="submit"
          >
            {{ t('template06Shop.submitOrder') }}
          </el-button>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { DemoAddress, LogisticsId } from '@/types/template06-shop'
import { calcFreightCents } from '@/utils/template06ShopPrice'
import { createOrderMock, fetchAddressesMock } from '@/api/template06/shop'

definePageMeta({ layout: 'default', requiresAuth: true })

const { t } = useAppLocale()
const { locale } = useI18n()
const router = useRouter()
const r = useTemplate06Routes()
const shop = useTemplate06ShopStore()

const addresses = ref<DemoAddress[]>([])
const addressId = ref('')
const logisticsId = ref<LogisticsId>('express')
const submitting = ref(false)

const goods = computed(() => shop.cartGoodsAmountCents)
const freight = computed(() => calcFreightCents(goods.value, logisticsId.value))
const payable = computed(() => goods.value + freight.value)

async function loadAddr() {
  shop.ensureSeedData()
  const { data } = await fetchAddressesMock()
  addresses.value = data
  const def = data.find((a) => a.isDefault) ?? data[0]
  if (def && !addressId.value) addressId.value = def.id
}

onMounted(() => {
  loadAddr()
})

watch(
  () => shop.defaultAddress,
  (d) => {
    if (d && !addressId.value) addressId.value = d.id
  },
  { immediate: true }
)

async function submit() {
  if (!addressId.value) {
    ElMessage.warning(t('template06Shop.noAddressHint'))
    return
  }
  submitting.value = true
  try {
    const { data, ok } = await createOrderMock({
      addressId: addressId.value,
      logisticsId: logisticsId.value
    })
    if (!ok || !data) {
      ElMessage.error(t('template06Shop.emptyCart'))
      return
    }
    ElMessage.success(t('template06Shop.orderSuccess'))
    router.push(r.orderPay(data.id))
  } finally {
    submitting.value = false
  }
}

useHead(() => ({
  title: t('template06Shop.checkoutTitle'),
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
  a {
    color: #b8860b;
  }
}

.grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: #fff;
  border: 1px solid #e8e8e8;
  padding: 24px;

  h2 {
    margin: 0 0 16px;
    font-size: 16px;
    font-weight: 700;
  }
}

.hint {
  font-size: 13px;
  color: #888;
  margin: 0 0 12px;
}

.addr-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.addr-radio {
  width: 100%;
  margin-right: 0;
  height: auto;
  align-items: flex-start;
  white-space: normal;

  :deep(.el-radio__label) {
    white-space: normal;
    line-height: 1.5;
  }
}

.addr-line {
  font-size: 14px;
  .tag {
    margin-left: 8px;
    font-size: 12px;
    color: #b8860b;
  }
}

.manage {
  display: inline-block;
  margin-top: 12px;
  font-size: 14px;
  color: #b8860b;
}

.lines {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  font-size: 14px;

  li {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #f0f0f0;
  }
}

.totals {
  p {
    display: flex;
    justify-content: space-between;
    margin: 8px 0;
    font-size: 14px;
  }

  .pay {
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid #eee;
    strong {
      font-size: 20px;
      color: #c41e3a;
    }
  }
}

.submit {
  margin-top: 20px;
  width: 100%;
  max-width: 280px;
  background: linear-gradient(180deg, #d4af37, #b8860b);
  border-color: #b8860b;
}
</style>
