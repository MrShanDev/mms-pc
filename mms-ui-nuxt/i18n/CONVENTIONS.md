# 文案与多语言约定

## 原则

1. **哪些走接口、哪些走 i18n** 以 **`docs/demo-site-api.md`** 为准：`DemoTemplateContent` 及该文档描述的字段 = 演示接口数据，从 `DEMO_SITE_TEMPLATES` / `api/demoSite.ts` 绑定，**不用 `t()`**。文档未列出的界面壳层（表单标签、详情页固定小标题、aria、分页提示等）= **静态 UI**，用 `useAppLocale()` / `t(...)` 做中英文切换。
2. **键名习惯**：与 template06 对齐时优先根级 `header`、`common`、`nav`、`about`、`news`、`contact`、`product`、`template06Shop`；演示站补充键可用 `demo.common.*`。
3. **语言切换组件**：`components/demo/DemoLocaleSwitch.vue`（`aria-label` → `header.langSelect`），可与主站一样加 `class="lang-select"`。
4. 接入真实 API 后：接口字符串不进 locale；若要做内容多语言，由后端或 CMS 按语言返回。

## 目录速查

| 用途           | 位置 |
|----------------|------|
| UI 文案        | `i18n/locales/`、`scripts/packs/`（生成脚本） |
| 可选语言列表   | `i18n/available-locales.ts` |
| Mock / 站点业务占位 | `utils/titaSiteContent.ts` |
| 网站模版（视觉主题） | `themes/available-themes.ts`、`composables/useAppTheme.ts`、Cookie `app-theme`、`assets/css/app-themes.css` |

## 模版切换

与语言独立：顶栏第二组下拉为「模版」，选项在 `APP_THEMES` 中配置，样式通过 `html[data-app-theme="…"]` 覆盖。新增模版：在 `available-themes.ts` 增加 id、在 `app-themes.css` 写对应规则、并为各语言补充 `header.theme*` 文案（或依赖英文 fallback）。
