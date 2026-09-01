import { useTemplate06ShopStore } from '@/stores/template06Shop'
import type { DemoAddress, DemoOrder, LogisticsId } from '@/types/template06-shop'

function delay(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}

/** 模拟：拉取收货地址 */
export async function fetchAddressesMock() {
  await delay(260)
  const s = useTemplate06ShopStore()
  s.ensureSeedData()
  return { data: [...s.addresses] as DemoAddress[] }
}

/** 模拟：保存地址 */
export async function saveAddressMock(payload: Omit<DemoAddress, 'id'> & { id?: string }) {
  await delay(320)
  const s = useTemplate06ShopStore()
  s.ensureSeedData()
  if (payload.id) {
    s.updateAddress(payload.id, {
      name: payload.name,
      phone: payload.phone,
      region: payload.region,
      detail: payload.detail,
      isDefault: payload.isDefault
    })
    return { data: { id: payload.id } }
  }
  const id = s.addAddress({
    name: payload.name,
    phone: payload.phone,
    region: payload.region,
    detail: payload.detail,
    isDefault: payload.isDefault
  })
  return { data: { id } }
}

/** 模拟：删除地址 */
export async function deleteAddressMock(id: string) {
  await delay(240)
  useTemplate06ShopStore().deleteAddress(id)
  return { data: true }
}

/** 模拟：下单 */
export async function createOrderMock(body: { addressId: string; logisticsId: LogisticsId }) {
  await delay(400)
  const order = useTemplate06ShopStore().createOrder(body)
  if (!order) return { data: null as DemoOrder | null, ok: false }
  return { data: order, ok: true }
}

/** 模拟：订单列表 */
export async function fetchOrdersMock() {
  await delay(280)
  return { data: [...useTemplate06ShopStore().orders] as DemoOrder[] }
}

/** 模拟：发起支付（网关） */
export async function payOrderMock(orderId: string, channel: 'wechat' | 'alipay') {
  await delay(500)
  const result = useTemplate06ShopStore().simulateGatewayPayment(orderId, channel)
  return { data: { result } }
}
