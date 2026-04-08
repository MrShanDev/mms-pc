/**
 * template06 商城演示价与运费：无真实计价接口时用确定性伪随机单价（分）及满额免邮规则。
 */
import type { LogisticsId } from '@/types/template06-shop'

/** 演示单价（分），由 slug 稳定派生 */
export function demoProductPriceCents(slug: string): number {
  let h = 2166136261
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return 9900 + (Math.abs(h) % 200000)
}

/** 满 1000 元免运费；否则按物流方式计费（演示） */
export function calcFreightCents(goodsAmountCents: number, logisticsId: LogisticsId): number {
  if (goodsAmountCents >= 100000) return 0
  return logisticsId === 'express' ? 1500 : 800
}
