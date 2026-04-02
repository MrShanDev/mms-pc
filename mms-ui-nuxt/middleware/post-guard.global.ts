/**
 * 全局后置守卫：滚动与路由 meta 补充（无埋点/console 模拟逻辑）。
 */
export default defineNuxtRouteMiddleware((to) => {
  if (typeof window === 'undefined') return

  if (to.meta.noScrollBehavior === true) return

  if (to.hash) {
    setTimeout(() => {
      const el = document.querySelector(to.hash)
      el?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })

  if (to.meta.description) {
    useHead({
      meta: [{ name: 'description', content: to.meta.description as string }]
    })
  }

  if (to.meta.keywords) {
    const keywordsContent = Array.isArray(to.meta.keywords)
      ? to.meta.keywords.join(', ')
      : (to.meta.keywords as string)
    useHead({
      meta: [{ name: 'keywords', content: keywordsContent }]
    })
  }

  if (to.meta.robots) {
    useHead({
      meta: [{ name: 'robots', content: to.meta.robots as string }]
    })
  }
})
