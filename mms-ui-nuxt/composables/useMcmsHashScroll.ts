import { watch } from 'vue'

/** 进入带 hash 的路由时滚动到对应 id（各 MCMS 独立 layout 可共用此行为）。 */
export function useMcmsHashScroll() {
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
