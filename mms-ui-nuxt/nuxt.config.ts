// API 配置统一由 api/config.ts 提供（单一数据源）
import { apiConfig, currentEnv } from './api/config'
import { availableLocales } from './i18n/available-locales'
import { TEMPLATE01_NEWS_PRERENDER_PATHS, TEMPLATE01_PRODUCT_PRERENDER_PATHS } from './utils/template01MingsoftMock'

export default defineNuxtConfig({
    imports: {
        /** 与 composables、utils 并列扫描，演示站接口见 `api/demoSite.ts` */
        dirs: ['api']
    },
    hooks: {
        listen() {
            if (process.env.NODE_ENV === 'development') {
                // eslint-disable-next-line no-console
                console.log('\n  📦 mms-ui-nuxt\n  🌐 环境:', currentEnv, '\n  🔗 API:', apiConfig.appApiUrl, '\n')
            }
        },
        // 局部组件目录 pages/.../_components 不应注册为路由
        'pages:extend'(pages) {
            const strip = (routes: typeof pages) => {
                for (let i = routes.length - 1; i >= 0; i--) {
                    const r = routes[i] as { path?: string; file?: string; children?: typeof pages }
                    const file = r.file ?? ''
                    if (file.includes('_components') || r.path?.includes('_components')) {
                        routes.splice(i, 1)
                        continue
                    }
                    if (r.children?.length) strip(r.children)
                }
            }
            strip(pages)
        },
    },
    vite: {
        esbuild: {
            drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
        },
        define: {
            // 构建时需为 production，否则会注入 @vite/client 并错误解析 entry 路径
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            'process.env.NUXT_PUBLIC_APP_ENV': JSON.stringify(process.env.NUXT_PUBLIC_APP_ENV ?? ''),
        },
    },
    // 开发工具配置（生产构建时禁用，避免注入 @vite/client 导致 404）
    devtools: { enabled: process.env.NODE_ENV === 'development' },
    // 兼容性日期配置
    compatibilityDate: '2025-11-13',
    // 开发服务器配置
    devServer: {
        host: '0.0.0.0',  // 允許外部访问，如需仅本地访问可改为 '127.0.0.1'
        port: 5000,
    },
    modules: [
        '@pinia/nuxt',
        '@pinia-plugin-persistedstate/nuxt',
        '@element-plus/nuxt',
        '@nuxtjs/i18n'
    ],

    i18n: {
        locales: [...availableLocales],
        defaultLocale: 'en',
        lazy: true,
        langDir: 'locales',
        strategy: 'no_prefix',
        bundle: {
            optimizeTranslationDirective: false
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'app-locale',
            fallbackLocale: 'en',
            redirectOn: false
        },
        compilation: {
            strictMessage: false
        },
        vueI18n: 'i18n.config.ts'
    },
    // 构建和性能优化配置
    build: {
        transpile: ['@vue/shared'],
        analyze: false,  // 设为 true 可分析打包内容
    },
    css: [
        '~/assets/css/reset.css',
        '~/assets/css/common.css',
        '~/assets/css/iconfont.css',
        '~/assets/css/sxpcwlkj.css',
        '~/assets/css/app-themes.css'
    ],
    app: {
        head: {
            titleTemplate: (title: string) =>
                title && !title.includes('Shaanxi Tuotaizhe') ? `${title} | Shaanxi Tuotaizhe` : title || 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.',
            title: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Titanium alloy bicycles and metal materials — Shaanxi Tuotaizhe Metal Technology Co., Ltd.' },
                { name: 'robots', content: 'index, follow' },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Tita Life' },
                { property: 'og:title', content: 'Shaanxi Tuotaizhe Metal Technology Co., Ltd.' },
                { property: 'og:description', content: 'Titanium alloy bicycles, Baoji High-tech Zone.' },
                { property: 'og:locale', content: 'en_US' }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
                { rel: 'sitemap', type: 'application/xml', href: '/sitemap.xml' }
            ]
        }
    },
    // SSR 和渲染配置
    ssr: false,  // 纯客户端渲染，禁用服务端渲染
    // 安全头配置
    nitro: {
        // CSP (内容安全策略) 配置
        experimental: {
            wasm: false,
        },
        prerender: {
            routes: [
                '/template01/products',
                '/template01/product-detail',
                '/template01/news-detail',
                '/template01/cases',
                '/template01/missing',
                ...TEMPLATE01_PRODUCT_PRERENDER_PATHS,
                ...TEMPLATE01_NEWS_PRERENDER_PATHS
            ]
        },
        routeRules: {
            '/**': {
                headers: {
                    'X-Frame-Options': 'SAMEORIGIN',
                    'X-Content-Type-Options': 'nosniff',
                    'Referrer-Policy': 'origin-when-cross-origin',
                }
            },
            // 配置 robots.txt 的处理规则
            '/robots.txt': {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }
        }
    },

    // 路由配置
    routeRules: {
        // 示例：为特定路由配置缓存和渲染模式
        // '/api/**': { cors: true, cache: { maxAge: 60 } },

        // 配置 robots.txt 预渲染
        '/robots.txt': {
            prerender: true
        }
    },

    // 应用配置（appApiUrl/wsUrl 可由 NUXT_PUBLIC_APP_API_URL/NUXT_PUBLIC_APP_WS_URL 运行时覆盖）
    runtimeConfig: {
        public: {
            /** 示例站模版：仅 `template01` … `template06`；优先 `NUXT_PUBLIC_DEMO_SITE_TEMPLATE`，兼容旧变量 `NUXT_PUBLIC_MCMS_DEMO_TEMPLATE`；非法值按 `utils/demoSite.ts` 默认回退 */
            demoSiteTemplate:
                (process.env.NUXT_PUBLIC_DEMO_SITE_TEMPLATE ||
                    process.env.NUXT_PUBLIC_MCMS_DEMO_TEMPLATE ||
                    'template02') as string,
            site: {
                name: 'Shaanxi Tuotaizhe',
                description: 'Metal technology and titanium alloy bicycles.',
                url: ''
            },
            appApiUrl: apiConfig.appApiUrl,
            chatApiUrl: apiConfig.chatApiUrl,
            wsUrl: apiConfig.wsUrl,
            appEnv: currentEnv
        }
    }
})
