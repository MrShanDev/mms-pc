export type OrderStatus =
  | 'pending_payment'
  | 'pending_shipment'
  | 'shipped'
  | 'completed'
  | 'cancelled'

export type LogisticsId = 'express' | 'standard'

export interface CartLine {
  skuId: string
  slug: string
  title: string
  image: string
  priceCents: number
  qty: number
  categoryLabel: string
}

export interface DemoAddress {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  isDefault: boolean
}

export interface OrderLineSnapshot {
  slug: string
  title: string
  image: string
  priceCents: number
  qty: number
  categoryLabel: string
}

export interface DemoOrder {
  id: string
  orderNo: string
  status: OrderStatus
  createdAt: number
  payExpireAtMs: number | null
  paidAtMs: number | null
  logisticsId: LogisticsId
  freightCents: number
  goodsAmountCents: number
  payableAmountCents: number
  addressSnapshot: Omit<DemoAddress, 'isDefault'>
  lines: OrderLineSnapshot[]
  /** 网关待确认时仍为待支付，但展示「待确认」 */
  awaitingPaymentConfirm?: boolean
  payChannel?: 'wechat' | 'alipay'
}
