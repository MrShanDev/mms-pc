import type { ProductCategoryDetail, ShowcaseProduct } from '@/utils/titaSiteContent'

export function useTemplate06ProductLookup() {
  const { productCategoriesDetailed } = useTitaSite()

  function findBySlug(slug: string | undefined | null): {
    category: ProductCategoryDetail
    product: ShowcaseProduct
  } | null {
    if (!slug) return null
    for (const cat of productCategoriesDetailed.value) {
      const product = cat.products.find((p) => p.slug === slug)
      if (product) return { category: cat, product }
    }
    return null
  }

  return { findBySlug }
}
