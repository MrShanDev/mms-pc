import { defineStore } from 'pinia'
import type {
  CartLine,
  DemoAddress,
  DemoOrder,
  LogisticsId,
  OrderLineSnapshot
} from '@/types/template06-shop'
import { calcFreightCents } from '@/utils/template06ShopPrice'

function genId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

const SEED_ADDRESSES: DemoAddress[] = [
  {
    id: 'addr-seed-1',
    name: '张三',
    phone: '13800138000',
    region: '陕西省 宝鸡市 高新技术产业开发区',
    detail: '高新大道 88 号',
    isDefault: true
  },
  {
    id: 'addr-seed-2',
    name: '李四',
    phone: '13900139000',
    region: '陕西省 西安市 雁塔区',
    detail: '科技路 168 号',
    isDefault: false
  }
]

export const useTemplate06ShopStore = defineStore('template06Shop', {
  state: () => ({
    cart: [] as CartLine[],
    addresses: [] as DemoAddress[],
    orders: [] as DemoOrder[]
  }),

  getters: {
    cartItemCount: (s) => s.cart.reduce((n, x) => n + x.qty, 0),
    cartGoodsAmountCents: (s) =>
      s.cart.reduce((sum, x) => sum + x.priceCents * x.qty, 0),
    defaultAddress: (s) => s.addresses.find((a) => a.isDefault) ?? s.addresses[0] ?? null
  },

  actions: {
    ensureSeedData() {
      if (this.addresses.length === 0) {
        this.addresses = SEED_ADDRESSES.map((a) => ({ ...a }))
      }
    },

    addToCart(payload: Omit<CartLine, 'skuId'> & { skuId?: string }) {
      const skuId = payload.skuId ?? payload.slug
      const idx = this.cart.findIndex((c) => c.skuId === skuId)
      if (idx >= 0) {
        this.cart[idx]!.qty += payload.qty
      } else {
        this.cart.push({ ...payload, skuId })
      }
    },

    setCartQty(skuId: string, qty: number) {
      const i = this.cart.findIndex((c) => c.skuId === skuId)
      if (i < 0) return
      if (qty <= 0) {
        this.cart.splice(i, 1)
      } else {
        this.cart[i]!.qty = qty
      }
    },

    removeCartLine(skuId: string) {
      this.cart = this.cart.filter((c) => c.skuId !== skuId)
    },

    clearCart() {
      this.cart = []
    },

    addAddress(input: Omit<DemoAddress, 'id' | 'isDefault'> & { isDefault?: boolean }) {
      const id = genId('addr')
      const isDefault = input.isDefault === true
      if (isDefault) {
        this.addresses.forEach((a) => {
          a.isDefault = false
        })
      }
      this.addresses.push({
        id,
        name: input.name,
        phone: input.phone,
        region: input.region,
        detail: input.detail,
        isDefault: isDefault || this.addresses.length === 0
      })
      return id
    },

    updateAddress(id: string, patch: Partial<Omit<DemoAddress, 'id'>>) {
      const i = this.addresses.findIndex((a) => a.id === id)
      if (i < 0) return false
      const cur = this.addresses[i]!
      if (patch.isDefault === true) {
        this.addresses.forEach((a) => {
          a.isDefault = false
        })
      }
      Object.assign(cur, patch)
      return true
    },

    deleteAddress(id: string) {
      const wasDefault = this.addresses.find((a) => a.id === id)?.isDefault
      this.addresses = this.addresses.filter((a) => a.id !== id)
      if (wasDefault && this.addresses.length > 0) {
        this.addresses[0]!.isDefault = true
      }
    },

    setDefaultAddress(id: string) {
      this.addresses.forEach((a) => {
        a.isDefault = a.id === id
      })
    },

    createOrder(opts: { addressId: string; logisticsId: LogisticsId }): DemoOrder | null {
      if (this.cart.length === 0) return null
      const addr = this.addresses.find((a) => a.id === opts.addressId)
      if (!addr) return null

      const lines: OrderLineSnapshot[] = this.cart.map((c) => ({
        slug: c.slug,
        title: c.title,
        image: c.image,
        priceCents: c.priceCents,
        qty: c.qty,
        categoryLabel: c.categoryLabel
      }))

      const goodsAmountCents = lines.reduce((s, l) => s + l.priceCents * l.qty, 0)
      const freightCents = calcFreightCents(goodsAmountCents, opts.logisticsId)
      const payableAmountCents = goodsAmountCents + freightCents

      const order: DemoOrder = {
        id: genId('ord'),
        orderNo: `T6${Date.now()}`,
        status: 'pending_payment',
        createdAt: Date.now(),
        payExpireAtMs: Date.now() + 30 * 60 * 1000,
        paidAtMs: null,
        logisticsId: opts.logisticsId,
        freightCents,
        goodsAmountCents,
        payableAmountCents,
        addressSnapshot: {
          id: addr.id,
          name: addr.name,
          phone: addr.phone,
          region: addr.region,
          detail: addr.detail
        },
        lines,
        awaitingPaymentConfirm: false
      }
      this.orders.unshift(order)
      this.clearCart()
      return order
    },

    cancelOrder(orderId: string): boolean {
      const o = this.orders.find((x) => x.id === orderId)
      if (!o || o.status !== 'pending_payment') return false
      o.status = 'cancelled'
      o.payExpireAtMs = null
      return true
    },

    /** 再来一单：写入购物车 */
    reorderFrom(orderId: string) {
      const o = this.orders.find((x) => x.id === orderId)
      if (!o) return
      for (const l of o.lines) {
        this.addToCart({
          slug: l.slug,
          title: l.title,
          image: l.image,
          priceCents: l.priceCents,
          qty: l.qty,
          categoryLabel: l.categoryLabel
        })
      }
    },

    markPaymentSuccess(orderId: string, channel: 'wechat' | 'alipay') {
      const o = this.orders.find((x) => x.id === orderId)
      if (!o || o.status !== 'pending_payment') return false
      o.status = 'pending_shipment'
      o.paidAtMs = Date.now()
      o.payExpireAtMs = null
      o.payChannel = channel
      o.awaitingPaymentConfirm = false
      return true
    },

    markPaymentPendingConfirm(orderId: string) {
      const o = this.orders.find((x) => x.id === orderId)
      if (!o || o.status !== 'pending_payment') return false
      o.awaitingPaymentConfirm = true
      return true
    },

    /** 演示：模拟支付结果（成功 / 失败 / 待确认） */
    simulateGatewayPayment(
      orderId: string,
      channel: 'wechat' | 'alipay'
    ): 'success' | 'failed' | 'pending' {
      const o = this.orders.find((x) => x.id === orderId)
      if (!o || o.status !== 'pending_payment') return 'failed'
      const r = Math.random()
      if (r < 0.65) {
        this.markPaymentSuccess(orderId, channel)
        return 'success'
      }
      if (r < 0.82) {
        o.awaitingPaymentConfirm = true
        return 'pending'
      }
      return 'failed'
    }
  },

  persist: {
    key: 'template06-shop',
    paths: ['cart', 'addresses', 'orders']
  }
})
