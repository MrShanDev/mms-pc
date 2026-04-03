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
    productCategory: (id: string) => `${base}/product/${id}`,
    /** 固定新闻详情（无动态 id） */
    newsDetail: `${base}/news-detail`,
    /** 固定商品详情（无动态 id） */
    productDetail: `${base}/product-detail`
  }
}
