import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "default" | "demo-template01" | "demo-template02" | "demo-template03" | "demo-template04" | "demo-template05"
declare module 'nuxt/app' {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}