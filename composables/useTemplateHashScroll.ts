import { watch } from 'vue'

/** 进入带 hash 的路由时滚动到对应 id（各示例模版 layout 可共用）。 */
export function useTemplateHashScroll() {
  const route = useRoute()

  watch(
    () => route.fullPath,
    () => {
      const h = route.hash?.replace(/^#/, '')
      if (!h || typeof document === 'undefined') return
      requestAnimationFrame(() => {
        document.getElementById(h)?.scrollIntoView({ behavior: 'smooth' })
      })
    },
    { immediate: true }
  )
}
