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

      <header class="page-head">
        <h1 class="page-title">{{ t('template06Shop.checkoutTitle') }}</h1>
        <p class="page-lead">{{ t('template06Shop.checkoutLead') }}</p>
      </header>

      <div v-if="shop.cart.length === 0" class="empty">
        <p>{{ t('template06Shop.emptyCart') }}</p>
        <NuxtLink :to="r.product" class="empty-link">{{ t('template06Shop.goShopping') }}</NuxtLink>
      </div>

      <div v-else class="checkout-panel">
        <section class="form-block">
          <h2 class="form-block__label">{{ t('template06Shop.receiver') }}</h2>
          <p v-if="!addresses.length" class="hint">{{ t('template06Shop.noAddressHint') }}</p>
          <el-radio-group v-model="addressId" class="addr-group">
            <el-radio v-for="a in addresses" :key="a.id" :label="a.id" class="addr-radio">
              <span class="addr-line">
                <span class="addr-top">
                  <strong>{{ a.name }}</strong>
                  <span class="addr-phone">{{ a.phone }}</span>
                  <span v-if="a.isDefault" class="tag">{{ t('template06Shop.defaultTag') }}</span>
                </span>
                <span class="addr-break">{{ a.region }} {{ a.detail }}</span>
              </span>
            </el-radio>
          </el-radio-group>
          <NuxtLink :to="r.addresses" class="manage-link">{{ t('template06Shop.manageAddresses') }}</NuxtLink>
        </section>

        <section class="form-block">
          <h2 class="form-block__label">{{ t('template06Shop.logistics') }}</h2>
          <el-radio-group v-model="logisticsId" class="logistics-group">
            <el-radio label="express" class="logistics-radio">{{ t('template06Shop.express') }}</el-radio>
            <el-radio label="standard" class="logistics-radio">{{ t('template06Shop.standard') }}</el-radio>
          </el-radio-group>
          <p class="hint hint--freight">{{ t('template06Shop.freeFreightHint') }}</p>
        </section>

        <section class="form-block">
          <h2 class="form-block__label">{{ t('template06Shop.orderSummary') }}</h2>
          <ul class="order-lines">
            <li v-for="line in shop.cart" :key="line.skuId" class="order-line">
              <img :src="line.image" alt="" class="line-thumb" loading="lazy">
              <div class="line-body">
                <div class="line-title">{{ line.title }}</div>
                <div class="line-meta">
                  {{ t('template06Shop.currency') }}{{ (line.priceCents / 100).toFixed(2) }}
                  × {{ line.qty }}
                </div>
              </div>
              <div class="line-total">
                {{ t('template06Shop.currency') }}{{ ((line.priceCents * line.qty) / 100).toFixed(2) }}
              </div>
            </li>
          </ul>

          <div class="totals">
            <div class="totals-row">
              <span>{{ t('template06Shop.goodsAmount') }}</span>
              <span class="totals-num">{{ t('template06Shop.currency') }}{{ (goods / 100).toFixed(2) }}</span>
            </div>
            <div class="totals-row">
              <span>{{ t('template06Shop.freight') }}</span>
              <span class="totals-num">{{ t('template06Shop.currency') }}{{ (freight / 100).toFixed(2) }}</span>
            </div>
            <div class="totals-row totals-row--pay">
              <span>{{ t('template06Shop.payable') }}</span>
              <strong class="pay-num">{{ t('template06Shop.currency') }}{{ (payable / 100).toFixed(2) }}</strong>
            </div>
          </div>

          <div class="submit-wrap">
            <el-button
              type="primary"
              class="submit"
              :loading="submitting"
              :disabled="!addressId"
              @click="submit"
            >
              {{ t('template06Shop.submitOrder') }}
            </el-button>
            <NuxtLink :to="r.cart" class="back-cart">{{ t('template06Shop.backToCart') }}</NuxtLink>
          </div>
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
  margin-bottom: 24px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ebe8e2;
}

.page-title {
  margin: 0 0 6px;
  font-size: 26px;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.page-lead {
  margin: 0;
  font-size: 14px;
  color: #6b6560;
  line-height: 1.55;
  max-width: 52ch;
}

.empty {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  padding: 48px 24px;
  text-align: center;
  .empty-link {
    display: inline-block;
    margin-top: 16px;
    padding: 10px 24px;
    border-radius: 6px;
    background: linear-gradient(180deg, #d4af37, #b8860b);
    color: #fff;
    text-decoration: none;
    font-size: 14px;
    font-weight: 600;
    &:hover {
      filter: brightness(1.05);
    }
  }
}

.checkout-panel {
  background: #fff;
  border: 1px solid #e5e0d6;
  border-radius: 12px;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.9) inset,
    0 8px 28px rgba(45, 35, 20, 0.07);
  padding: 28px 24px 32px;

  @media (min-width: 640px) {
    padding: 32px 36px 36px;
  }
}

.form-block {
  & + & {
    margin-top: 28px;
    padding-top: 28px;
    border-top: 1px solid #efeae2;
  }
}

.form-block__label {
  margin: 0 0 16px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #7a6f5f;
}

.hint {
  font-size: 13px;
  color: #7a756c;
  margin: 0 0 14px;
  line-height: 1.55;

  &--freight {
    margin: 12px 0 0;
    padding: 10px 12px;
    background: rgba(255, 255, 255, 0.55);
    border-radius: 8px;
    border: 1px solid rgba(212, 175, 55, 0.18);
    color: #6a6459;
  }
}

.addr-group {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
}

.addr-radio {
  width: 100%;
  margin-right: 0;
  height: auto;
  align-items: flex-start;
  margin-bottom: 0;
  padding: 14px 16px 14px 12px;
  border: 1px solid #e8e4dc;
  border-radius: 10px;
  background: #fdfcfa;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;

  &:hover {
    border-color: #d4c4a8;
    background: #fff;
  }

  &.is-checked {
    border-color: #b8962e;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(184, 150, 46, 0.35);
  }

  :deep(.el-radio__input.is-checked .el-radio__inner) {
    border-color: #a67c00;
    background: #c9a227;
  }

  :deep(.el-radio__label) {
    white-space: normal;
    line-height: 1.5;
    padding-left: 10px;
    width: 100%;
  }
}

.addr-line {
  display: block;
  font-size: 14px;
  line-height: 1.5;
  color: #2c2c2c;

  .addr-top {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px 12px;
  }

  .addr-phone {
    color: #5c5c5c;
    font-size: 13px;
  }

  .addr-break {
    display: block;
    margin-top: 8px;
    color: #666;
    font-size: 13px;
    line-height: 1.5;
  }

  .tag {
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: #7a5f12;
    background: linear-gradient(180deg, #fff6d8, #f5e8bc);
    border-radius: 4px;
    border: 1px solid rgba(184, 150, 46, 0.35);
  }
}

.manage-link {
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #9a7b28;
  text-decoration: none;
  &:hover {
    color: #7a5f12;
    text-decoration: underline;
  }
}

.logistics-group {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
}

.logistics-radio {
  margin-right: 0;
  height: auto;
  padding: 14px 16px;
  border: 1px solid #e8e4dc;
  border-radius: 10px;
  background: #fdfcfa;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;

  &:hover {
    border-color: #d4c4a8;
    background: #fff;
  }

  &.is-checked {
    border-color: #b8962e;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(184, 150, 46, 0.35);
  }

  :deep(.el-radio__input.is-checked .el-radio__inner) {
    border-color: #a67c00;
    background: #c9a227;
  }

  :deep(.el-radio__label) {
    padding-left: 10px;
    font-size: 14px;
  }
}

.order-lines {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  border-radius: 10px;
  background: #faf8f4;
  border: 1px solid #ebe6dc;
}

.order-line {
  display: grid;
  grid-template-columns: 64px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
}

.line-thumb {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 8px;
  background: #e8e4dc;
  flex-shrink: 0;
}

.line-body {
  min-width: 0;
}

.line-title {
  font-size: 13px;
  font-weight: 600;
  color: #222;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-meta {
  margin-top: 6px;
  font-size: 12px;
  color: #7a756c;
}

.line-total {
  font-size: 14px;
  font-weight: 700;
  color: #2a2a2a;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.totals {
  margin-top: 0;
  padding: 16px 14px;
  border-radius: 10px;
  background: #f7f5f0;
  border: 1px solid #e8e4dc;
}

.totals-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin: 0 0 10px;
  font-size: 14px;
  color: #4a4540;

  &:last-child {
    margin-bottom: 0;
  }

  &--pay {
    margin-top: 12px;
    padding-top: 14px;
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    font-size: 15px;
    color: #333;
  }
}

.totals-num {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: #2c2c2c;
}

.pay-num {
  font-size: 24px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: #b01f2f;
  letter-spacing: -0.02em;
}

.submit-wrap {
  margin-top: 20px;
  max-width: 420px;

  @media (min-width: 480px) {
    margin-left: auto;
    margin-right: auto;
  }
}

.submit {
  width: 100%;
  height: 46px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.02em;
  border-radius: 10px;
  background: linear-gradient(180deg, #dbb84a, #a67c00);
  border: none;
  box-shadow: 0 4px 14px rgba(166, 124, 0, 0.35);

  &:hover:not(:disabled) {
    filter: brightness(1.05);
    box-shadow: 0 6px 18px rgba(166, 124, 0, 0.4);
  }

  &:disabled {
    opacity: 0.55;
    box-shadow: none;
  }
}

.back-cart {
  display: block;
  margin-top: 12px;
  padding-bottom: 2px;
  text-align: center;
  font-size: 13px;
  color: #7a756c;
  text-decoration: none;

  &:hover {
    color: #8b6914;
  }
}
</style>
