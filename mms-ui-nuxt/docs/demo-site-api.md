# 演示站统一数据与接口约定

MCMS 演示模版 `template01` … `template05` 共用**同一套数据结构**（以 `utils/template01MingsoftMock.ts` 中 `TEMPLATE01_MCMS_CONTENT` 为源）。各模版仅通过 **`/template0X` 路由前缀**区分；上线后由同一 CMS / BFF 按模版 ID 返回同构 JSON。

## 数据入口

| 模块 | 说明 |
|------|------|
| `utils/demoSiteContent.ts` | `SITE_DEMO_CONTENT`、`buildDemoContentForTemplate(id)` |
| `utils/mcmsDemoContent.ts` | `MCMS_DEMO_TEMPLATES`（各 key 均为 `buildDemoContentForTemplate` 结果） |
| `utils/mcmsDemo.ts` | TypeScript 类型 `McmsTemplateContent` |

## 前端封装（mock / 可替换为 HTTP）

文件：`utils/demoSiteApi.ts`

| 函数 | 作用 | 未来 HTTP 映射（示例） |
|------|------|-------------------------|
| `getDemoSiteContentSync(id)` | 同步取当前构建的整站内容 | `GET /api/mcms/site/:templateId` |
| `fetchDemoSiteContent(id)` | 异步整站内容 | 同上 |
| `fetchDemoNewsList(id)` | 新闻列表 | `GET /api/mcms/site/:templateId/news` |
| `fetchDemoNewsById(id, newsId)` | 单篇新闻 | `GET /api/mcms/site/:templateId/news/:newsId` |
| `fetchDemoProductCatalog(id)` | 产品分类 + 列表 | `GET /api/mcms/site/:templateId/products` |
| `fetchDemoProductBySlug(id, slug)` | 产品详情 | `GET /api/mcms/site/:templateId/products/by-slug/:slug` |
| `fetchDemoContactPage(id)` | 联系信息 | `GET /api/mcms/site/:templateId/contact` |

实现上当前为**零延迟内存数据**；对接真实接口时保留函数签名，在内部改为 `$fetch` / `useFetch` 即可。

## 模版与路由

- `templateId`：`template01` | `template02` | `template03` | `template04` | `template05`
- 站内链接、预渲染路径中的前缀与 `id` 一致，例如 `/template02/products`、`/template02/news-detail?id=1`

## 页面组织约定

- 各模版业务壳层放在 **`pages/template0X.vue`**（顶栏 + `<NuxtPage />` + 共用 **`components/demo/DemoSiteFooter.vue`**），子页面放在 **`pages/template0X/**`**，避免在全局 `layouts/` 堆积模版专用代码。
- `template01` … `template05` 的 **MCMS 演示数据** 均由 `buildDemoContentForTemplate` 从 template01 同源生成，仅替换 `/template01` 路由前缀。
- 不同模版仅 **布局与样式** 不同；列表/详情字段与 template01 对齐。

## 类型

以 `McmsTemplateContent` 为准；扩展字段时同步更新 `utils/mcmsDemo.ts` 与本文档。
