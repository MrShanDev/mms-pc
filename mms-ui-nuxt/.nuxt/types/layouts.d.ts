import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "empty" | "mcms-apparel" | "mcms-appliances" | "mcms-digital" | "mcms-furniture" | "mcms-shoes"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}