/**
 * 全局后置守卫中间件
 * 页面访问后的处理逻辑，如页面埋点、统计、清理等
 */
export default defineNuxtRouteMiddleware((to, from) => {
    // 记录页面访问日志
    if (typeof window !== 'undefined') {
        console.log('[Post Guard Middleware] 页面访问记录:', {
            from: from.path,
            to: to.path,
            timestamp: new Date().toISOString(),
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Server',
            referrer: typeof document !== 'undefined' ? document.referrer : 'Server'
        })
    }

    // 页面访问统计（模拟）
    if (typeof window !== 'undefined') {
        // 模拟发送页面访问统计
        setTimeout(() => {
            console.log(`[Analytics] Page view recorded for: ${to.path}`)
        }, 100)
    }

    // 滚动位置控制
    if (to.meta.noScrollBehavior !== true) {
        // 可以在这里自定义滚动行为
        if (to.hash && typeof window !== 'undefined') {
            // 如果路由中有hash，滚动到对应元素
            setTimeout(() => {
                const element = document.querySelector(to.hash)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' })
                }
            }, 100)
        } else {
            // 默认滚动到顶部
            if (typeof window !== 'undefined') {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    // 页面性能监控（模拟）
    const startTime = Date.now()

    // 页面加载完成后的回调
    if (typeof window !== 'undefined') {
        const handleLoad = () => {
            const loadTime = Date.now() - startTime
            console.log(`[Performance] Page loaded in ${loadTime}ms: ${to.path}`)
        }

        if (document.readyState === 'complete') {
            handleLoad()
        } else {
            window.addEventListener('load', handleLoad)

            // 清理事件监听器
            setTimeout(() => {
                window.removeEventListener('load', handleLoad)
            }, 5000)
        }
    }

    // 更新页面描述（如果路由元数据中有描述）
    if (to.meta.description) {
        useHead({
            meta: [
                {
                    name: 'description',
                    content: to.meta.description as string
                }
            ]
        })
    }

    // 设置页面关键词
    if (to.meta.keywords) {
        const keywordsContent = Array.isArray(to.meta.keywords)
            ? to.meta.keywords.join(', ')
            : (to.meta.keywords as string)

        useHead({
            meta: [
                {
                    name: 'keywords',
                    content: keywordsContent
                }
            ]
        })
    }

    // 更新页面 robots meta 标签
    if (to.meta.robots) {
        useHead({
            meta: [
                {
                    name: 'robots',
                    content: to.meta.robots as string
                }
            ]
        })
    }

    // 可以在这里添加其他后置处理逻辑
    // 如清理临时数据、更新全局状态等
})