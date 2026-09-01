import { nextTick } from 'vue'
import { DEMO_DESIGN_WIDTH_PX } from '~/utils/demoViewport'

/**
 * 窄视口下对 `.demo-template-scroll-root` 设置 CSS zoom，使整页等比缩小以适配视口，
 * 避免横向滚动；宽视口（≥ 设计宽度）时移除 zoom。
 */
export default defineNuxtPlugin((nuxtApp) => {
    if (!import.meta.client) return

    const apply = () => {
        const vw = window.visualViewport?.width ?? window.innerWidth
        const raw = vw / DEMO_DESIGN_WIDTH_PX
        const scale = raw >= 1 ? 1 : Math.max(raw, 0.05)

        const roots = document.querySelectorAll<HTMLElement>('.demo-template-scroll-root')
        roots.forEach((el) => {
            if (scale < 1) {
                el.style.zoom = String(scale)
            } else {
                el.style.removeProperty('zoom')
            }
        })
    }

    const schedule = () => requestAnimationFrame(apply)

    window.addEventListener('resize', schedule)
    window.visualViewport?.addEventListener('resize', schedule)
    window.addEventListener('orientationchange', () => setTimeout(schedule, 150))

    nuxtApp.hook('page:finish', () => {
        nextTick(apply)
    })

    schedule()
})
