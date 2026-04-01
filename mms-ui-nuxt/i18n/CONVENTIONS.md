# 文案与多语言约定

## 原则

1. **页面静态 UI**（导航词、按钮、表单标签、区块标题、`useHead` 里依赖的模板文案等）放在 `i18n/locales/*.json`，通过 `useI18n()` / `t('...')` 按当前界面语言切换。
2. **模拟数据与接口数据**（产品名、简介、新闻标题与摘要、接口返回的富文本等）**不走 i18n**：按数据源原样展示，不做 `t()` 或按 UI 语言切换。当前仓库里这类数据集中在 `utils/titaSiteContent.ts`（英文占位，模拟后端字段）。
3. 接入真实 API 后：在页面/composable 中请求数据并绑定到模板；**不要**把接口字符串再塞进 locale 文件，除非产品明确要做「内容多语言」（那时应由后端按语言返回或单独 CMS）。

## 目录速查

| 用途           | 位置 |
|----------------|------|
| UI 文案        | `i18n/locales/`、`scripts/packs/`（生成脚本） |
| 可选语言列表   | `i18n/available-locales.ts` |
| Mock / 站点业务占位 | `utils/titaSiteContent.ts` |
| 网站模版（视觉主题） | `themes/available-themes.ts`、`composables/useAppTheme.ts`、Cookie `app-theme`、`assets/css/app-themes.css` |

## 模版切换

与语言独立：顶栏第二组下拉为「模版」，选项在 `APP_THEMES` 中配置，样式通过 `html[data-app-theme="…"]` 覆盖。新增模版：在 `available-themes.ts` 增加 id、在 `app-themes.css` 写对应规则、并为各语言补充 `header.theme*` 文案（或依赖英文 fallback）。
