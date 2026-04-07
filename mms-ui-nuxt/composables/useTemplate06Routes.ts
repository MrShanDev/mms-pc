import { MAIN_SITE_ROUTE_PREFIX } from '@/utils/demoSite'

/** template06 主站（`pages/template06/`）导航与链接路径 */
export function useTemplate06Routes() {
  const base = MAIN_SITE_ROUTE_PREFIX
  return {
    base,
    home: base,
    about: `${base}/about`,
    news: `${base}/news`,
    contact: `${base}/contact`,
    product: `${base}/product`,
    login: `${base}/login`,
    register: `${base}/register`,
    forgotPassword: `${base}/forgot-password`,
    /** 产品分类列表（`?id=` 为分类 id） */
    productCategory: (id: string) => ({ path: `${base}/product-category`, query: { id } }) as const,
    /** 固定新闻详情（无动态 id） */
    newsDetail: `${base}/news-detail`,
    /** 商品详情（通过 `?slug=` 指定 SKU） */
    productDetail: `${base}/product-detail`,
    productDetailWithSlug: (slug: string) =>
      ({ path: `${base}/product-detail`, query: { slug } }) as const,
    cart: `${base}/cart`,
    checkout: `${base}/checkout`,
    account: `${base}/account`,
    accountProfile: `${base}/account/profile`,
    /** 账号安全（登录密码、绑定信息等） */
    accountSecurity: `${base}/account/security`,
    /** 认证中心（实名 / 企业等） */
    accountAuth: `${base}/account/auth`,
    orders: `${base}/orders`,
    /** 订单详情（`?id=` 为订单 id） */
    orderDetail: (id: string) => ({ path: `${base}/order-detail`, query: { id } }) as const,
    /** 订单支付（`?id=` 为订单 id） */
    orderPay: (id: string) => ({ path: `${base}/order-pay`, query: { id } }) as const,
    payResult: `${base}/pay-result`,
    addresses: `${base}/addresses`
  }
}
