# 演示站（template01～template06）统一数据与接口说明

## 1. 各套模版是否共用同一套数据？

**是。** 逻辑如下：

| 文件 | 作用 |
|------|------|
| `utils/template01MingsoftMock.ts` | 定义源数据 `TEMPLATE01_DEMO_SITE_CONTENT`（结构与字段与 B2B 演示站对齐） |
| `utils/demoSiteContent.ts` | `SITE_DEMO_CONTENT` 与 `buildDemoContentForTemplate(id)`：在源数据上做深拷贝，并把站内路径前缀 `/template01` 重写为 `/template0X`，同时设置 `id` |
| `utils/demoSiteTemplates.ts` | `DEMO_SITE_TEMPLATES`：`template01`～`template06` 各一份，**除 `id` 与 URL 前缀外结构一致** |
| `utils/demoSite.ts` | TypeScript 类型：`DemoTemplateContent`、`DemoNavItem`、`DemoNewsItem` 等 |

页面中统一使用：

```ts
import { DEMO_SITE_TEMPLATES } from '@/utils/demoSiteTemplates'
const C = DEMO_SITE_TEMPLATES.template02 // 或 template01 … template06
```

异步/可替换的访问入口见 **`api/demoSite.ts`**（当前为内存实现，无独立 HTTP 路由）。

### template06（主站）

- **路由前缀**：`/template06`（见 `utils/demoSite.ts` 中 `MAIN_SITE_ROUTE_PREFIX`），页面在 `pages/template06/`。
- **数据**：与其它模版一样，取 **`DEMO_SITE_TEMPLATES.template06`**，由 `buildDemoContentForTemplate('template06')` 生成，与 template01 同源、站内链接已重写为 `/template06/...`。
- **消费方式**：主站业务通过 **`composables/useTitaSite.ts`** 读取上述聚合数据，并由 **`utils/template06ViewModel.ts`** 转成首页轮播、产品分类、新闻列表等展示结构；备案链接等少量非 CMS 字段仍放在 **`utils/titaSiteContent.ts`**。
- **`api/demoSite.ts`**：`DemoSiteTemplateId` 含 `template06` 时，`getDemoSiteContentSync('template06')` 等与五套子站用法相同。

---

## 2. 静态文案与中英文切换（与接口字段划分）

**原则：以本文档 §4 `DemoTemplateContent` 及下方接口表为准——文档里有的字段才算「接口/CMS 数据」，从 `DEMO_SITE_TEMPLATES`（或未来 HTTP 接口）原样展示，不走 `t()`。文档未列出的界面文案（表单标签、区块小标题、无障碍说明、按钮「提交」、上一篇/下一篇提示等）视为前端静态 UI，用 `useAppLocale()` / `t('demo.common.*')` 或 `common.*` / `nav.*` 等做中英文切换。**

| 来源 | 示例 | 切换语言 |
|------|------|----------|
| 接口字段（见 §4） | `nav[].label`、`aboutPage.*`、`newsPage.title` / `items`、`productCatalog`、`contactPage.title` 等 | 不随 i18n；将来由后端按语言返回或扩展多语言字段 |
| 非接口 UI | 产品详情页「规格参数」「留言」、面包屑 aria、`placeholder`、校验提示 | `t(...)` |

语言资源：`i18n/locales/zh.json`、`en.json` 等。`html` 的 `lang` / `dir` 见 `getLocaleLanguage` / `getLocaleDir`。

---

## 3. 前端模块 API（`api/demoSite.ts`）

当前均为 **TypeScript 函数**，构建时与运行时直接读 `DEMO_SITE_TEMPLATES`，**无 `server/api` HTTP 端点**。对接真实后端时，可保持同名函数，在内部改为 `$fetch` / `useFetch`。

| 函数 | 参数 | 返回 | 说明 |
|------|------|------|------|
| `getDemoSiteContentSync` | `id: DemoSiteTemplateId` | `DemoTemplateContent` | 同步整站内容 |
| `fetchDemoSiteContent` | 同上 | `Promise<DemoTemplateContent>` | 异步整站（预留延迟，当前为 0ms） |
| `fetchDemoNewsList` | `id` | `Promise<{ title: string; items: DemoNewsItem[] }>` | 新闻列表（含列表页标题） |
| `fetchDemoNewsById` | `id`, `newsId: string` | `Promise<DemoNewsItem \| undefined>` | 单篇新闻 |
| `fetchDemoProductCatalog` | `id` | `Promise<DemoProductCatalog \| null>` | 产品分类 + 全部商品；无目录时为 `null` |
| `fetchDemoProductBySlug` | `id`, `slug: string` | `Promise<DemoProductDetail \| undefined>` | 按 slug 查产品 |
| `fetchDemoContactPage` | `id` | `Promise<DemoTemplateContent['contactPage']>` | 联系页数据 |

### 未来 HTTP 映射（示例）

| 函数 | 建议方法 / 路径 |
|------|-----------------|
| `fetchDemoSiteContent` | `GET /api/site/:templateId` |
| `fetchDemoNewsList` | `GET /api/site/:templateId/news` |
| `fetchDemoNewsById` | `GET /api/site/:templateId/news/:newsId` |
| `fetchDemoProductCatalog` | `GET /api/site/:templateId/products` |
| `fetchDemoProductBySlug` | `GET /api/site/:templateId/products/by-slug/:slug` |
| `fetchDemoContactPage` | `GET /api/site/:templateId/contact` |

---

## 4. 核心类型（`utils/demoSite.ts`）

以下为 `DemoTemplateContent` 的要点（完整定义见源码）：

- **标识**：`id: 'template01' \| … \| 'template06'`
- **站点元信息**：`referenceUrl`, `siteTitle`, `siteTitleEn?`, `metaTitle`, `metaDescription`, `footerCopyright`, `techSupport?`
- **导航**：`nav: DemoNavItem[]`（`label`, `to?`, `hash?`, `children?`）
- **首页**：`home: Record<string, unknown>`（各模版可解不同形状）
- **关于**：`aboutPage`（`kicker`, `title`, `lead`, `paragraphs`, `image`, `cta?`, `trustBlocks?`）
- **新闻**：`newsPage: { title, items: DemoNewsItem[] }`
- **联系**：`contactPage`（标题、邮箱、电话、地址、表单说明、横幅图等）
- **产品**：`productCatalog?`（`pageTitle`, `categories`, `products` 等）
- **可选**：`privacyPage?`, `faqPage?`, `casesPage?`

---

## 5. 模版 ID 与运行配置

- 合法演示模版 ID：`template01` … `template06`（见 `DEMO_SITE_TEMPLATE_IDS`；其中 **`template06` 为钛业主站**，路由 `pages/template06/`，与其余模版共用 `DEMO_SITE_TEMPLATES` 中同构数据）。
- `nuxt.config` 中 `runtimeConfig.public.demoSiteTemplate`（或环境变量 `NUXT_PUBLIC_DEMO_SITE_TEMPLATE`）用于选择默认演示模版。

---

## 6. 页面与数据引用约定

- 各模版业务页位于 `pages/template0X/**`；子目录 `_components` 不参与路由（由 `nuxt.config` `pages:extend` 剔除）。
- 站内链接在演示数据中为 **`/template0X/...`**，与 `buildDemoContentForTemplate` 的前缀重写一致。
