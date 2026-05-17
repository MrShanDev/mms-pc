# mms-unxt（Nuxt PC/站点脚手架）

[English](README.en.md) | 简体中文

本目录用于承载 **Nuxt 3** 的 PC 端/站点脚手架与演示模板。当前主要项目位于：`mms-unxt/mms-ui-nuxt/`。

---

## 项目组成

| 路径 | 说明 |
|---|---|
| `mms-ui-nuxt/` | Nuxt 3 应用：多套站点模板（template01~06）、i18n、多主题、登录态与示例接口层等 |

---

## 快速开始（mms-ui-nuxt）

```bash
cd mms-unxt/mms-ui-nuxt
pnpm install   # 或 npm / yarn，建议团队统一一种
pnpm dev       # dev 环境
```

### 多环境启动

该项目通过环境变量 `NUXT_PUBLIC_APP_ENV` 切换：

```bash
# 本地
pnpm local

# 开发/测试
pnpm dev

# 生产配置（仍是 nuxt dev，但读取 prod 环境配置）
pnpm prod
```

### 构建与预览

```bash
pnpm build
pnpm preview
```

---

## 目录提示（mms-ui-nuxt）

常用目录：

- `pages/`：页面与模板路由（`template01~06`）
- `layouts/`：不同模板布局
- `i18n/`：多语言资源与约定（含 `CONVENTIONS.md`）
- `stores/`：Pinia store（含登录态）
- `utils/` / `api/`：请求封装与示例 API
- `docs/`：项目内部说明文档（登录态、SEO 等）
