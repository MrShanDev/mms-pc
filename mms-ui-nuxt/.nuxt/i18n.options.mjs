
// @ts-nocheck


export const localeCodes =  [
  "en",
  "zh",
  "ja",
  "ko",
  "fr",
  "de",
  "es",
  "ru",
  "pt",
  "it",
  "ar"
]

export const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_d8071198",
      load: () => import("#nuxt-i18n/d8071198" /* webpackChunkName: "locale_en_46json_d8071198" */),
      cache: true
    }
  ],
  zh: [
    {
      key: "locale_zh_46json_b4579193",
      load: () => import("#nuxt-i18n/b4579193" /* webpackChunkName: "locale_zh_46json_b4579193" */),
      cache: true
    }
  ],
  ja: [
    {
      key: "locale_ja_46json_e54f6c74",
      load: () => import("#nuxt-i18n/e54f6c74" /* webpackChunkName: "locale_ja_46json_e54f6c74" */),
      cache: true
    }
  ],
  ko: [
    {
      key: "locale_ko_46json_e0a984d4",
      load: () => import("#nuxt-i18n/e0a984d4" /* webpackChunkName: "locale_ko_46json_e0a984d4" */),
      cache: true
    }
  ],
  fr: [
    {
      key: "locale_fr_46json_209c2a82",
      load: () => import("#nuxt-i18n/209c2a82" /* webpackChunkName: "locale_fr_46json_209c2a82" */),
      cache: true
    }
  ],
  de: [
    {
      key: "locale_de_46json_096ce17f",
      load: () => import("#nuxt-i18n/096ce17f" /* webpackChunkName: "locale_de_46json_096ce17f" */),
      cache: true
    }
  ],
  es: [
    {
      key: "locale_es_46json_d428bf1f",
      load: () => import("#nuxt-i18n/d428bf1f" /* webpackChunkName: "locale_es_46json_d428bf1f" */),
      cache: true
    }
  ],
  ru: [
    {
      key: "locale_ru_46json_b434bbee",
      load: () => import("#nuxt-i18n/b434bbee" /* webpackChunkName: "locale_ru_46json_b434bbee" */),
      cache: true
    }
  ],
  pt: [
    {
      key: "locale_pt_46json_c3001bec",
      load: () => import("#nuxt-i18n/c3001bec" /* webpackChunkName: "locale_pt_46json_c3001bec" */),
      cache: true
    }
  ],
  it: [
    {
      key: "locale_it_46json_c4e895bb",
      load: () => import("#nuxt-i18n/c4e895bb" /* webpackChunkName: "locale_it_46json_c4e895bb" */),
      cache: true
    }
  ],
  ar: [
    {
      key: "locale_ar_46json_106b66f6",
      load: () => import("#nuxt-i18n/106b66f6" /* webpackChunkName: "locale_ar_46json_106b66f6" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = [
  () => import("#nuxt-i18n/c95b3974" /* webpackChunkName: "config_i18n_46config_46ts_c95b3974" */)
]

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: false
  },
  compilation: {
    strictMessage: false,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "en",
      language: "en-US",
      name: "English",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "zh",
      language: "zh-CN",
      name: "简体中文",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/zh.json",
          cache: undefined
        }
      ]
    },
    {
      code: "ja",
      language: "ja-JP",
      name: "日本語",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ja.json",
          cache: undefined
        }
      ]
    },
    {
      code: "ko",
      language: "ko-KR",
      name: "한국어",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ko.json",
          cache: undefined
        }
      ]
    },
    {
      code: "fr",
      language: "fr-FR",
      name: "Français",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/fr.json",
          cache: undefined
        }
      ]
    },
    {
      code: "de",
      language: "de-DE",
      name: "Deutsch",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/de.json",
          cache: undefined
        }
      ]
    },
    {
      code: "es",
      language: "es-ES",
      name: "Español",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/es.json",
          cache: undefined
        }
      ]
    },
    {
      code: "ru",
      language: "ru-RU",
      name: "Русский",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ru.json",
          cache: undefined
        }
      ]
    },
    {
      code: "pt",
      language: "pt-BR",
      name: "Português",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/pt.json",
          cache: undefined
        }
      ]
    },
    {
      code: "it",
      language: "it-IT",
      name: "Italiano",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/it.json",
          cache: undefined
        }
      ]
    },
    {
      code: "ar",
      language: "ar",
      name: "العربية",
      dir: "rtl",
      files: [
        {
          path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ar.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "no_prefix",
  lazy: true,
  langDir: "locales",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "app-locale",
    cookieSecure: false,
    fallbackLocale: "en",
    redirectOn: false,
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: []
}

export const normalizedLocales = [
  {
    code: "en",
    language: "en-US",
    name: "English",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "zh",
    language: "zh-CN",
    name: "简体中文",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/zh.json",
        cache: undefined
      }
    ]
  },
  {
    code: "ja",
    language: "ja-JP",
    name: "日本語",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ja.json",
        cache: undefined
      }
    ]
  },
  {
    code: "ko",
    language: "ko-KR",
    name: "한국어",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ko.json",
        cache: undefined
      }
    ]
  },
  {
    code: "fr",
    language: "fr-FR",
    name: "Français",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/fr.json",
        cache: undefined
      }
    ]
  },
  {
    code: "de",
    language: "de-DE",
    name: "Deutsch",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/de.json",
        cache: undefined
      }
    ]
  },
  {
    code: "es",
    language: "es-ES",
    name: "Español",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/es.json",
        cache: undefined
      }
    ]
  },
  {
    code: "ru",
    language: "ru-RU",
    name: "Русский",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ru.json",
        cache: undefined
      }
    ]
  },
  {
    code: "pt",
    language: "pt-BR",
    name: "Português",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/pt.json",
        cache: undefined
      }
    ]
  },
  {
    code: "it",
    language: "it-IT",
    name: "Italiano",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/it.json",
        cache: undefined
      }
    ]
  },
  {
    code: "ar",
    language: "ar",
    name: "العربية",
    dir: "rtl",
    files: [
      {
        path: "D:/UGit/mms-unxt/mms-ui-nuxt/i18n/locales/ar.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../i18n/locales/en.json", async mod => {
    localeLoaders["en"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en")
  })

  import.meta.hot.accept("../i18n/locales/zh.json", async mod => {
    localeLoaders["zh"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("zh")
  })

  import.meta.hot.accept("../i18n/locales/ja.json", async mod => {
    localeLoaders["ja"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("ja")
  })

  import.meta.hot.accept("../i18n/locales/ko.json", async mod => {
    localeLoaders["ko"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("ko")
  })

  import.meta.hot.accept("../i18n/locales/fr.json", async mod => {
    localeLoaders["fr"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("fr")
  })

  import.meta.hot.accept("../i18n/locales/de.json", async mod => {
    localeLoaders["de"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("de")
  })

  import.meta.hot.accept("../i18n/locales/es.json", async mod => {
    localeLoaders["es"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("es")
  })

  import.meta.hot.accept("../i18n/locales/ru.json", async mod => {
    localeLoaders["ru"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("ru")
  })

  import.meta.hot.accept("../i18n/locales/pt.json", async mod => {
    localeLoaders["pt"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("pt")
  })

  import.meta.hot.accept("../i18n/locales/it.json", async mod => {
    localeLoaders["it"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("it")
  })

  import.meta.hot.accept("../i18n/locales/ar.json", async mod => {
    localeLoaders["ar"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("ar")
  })

  import.meta.hot.accept("../i18n/i18n.config.ts", async mod => {
    const [oldData, newData] = await Promise.all([loadCfg(vueI18nConfigs[0]), loadCfg(() => Promise.resolve(mod))]);
    vueI18nConfigs[0] = () => Promise.resolve(mod)
    if(deepEqual(oldData, newData, ['messages', 'numberFormats', 'datetimeFormats'])) {
      return await useNuxtApp()._nuxtI18nDev.resetI18nProperties()
    }
    import.meta.hot.send('i18n:options-complex-invalidation', {})
  })

}
/** client-end **/