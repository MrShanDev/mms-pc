<div align="center">
   <br/>
   <a href="https://mmsadmin.cn">
     <img width="150" src="https://mmsadmin.cn/logo.png" alt="MMS logo">
   </a>
   <h1>模块化管理系统</h1>
   <p>MMS · Modular Management System</p>
   <p><strong>mms-pc · PC 门户 / 官网（Nuxt 3）</strong></p>
   <p><a href="https://mmsadmin.cn/">📘 在线文档 · mmsadmin.cn</a> · <a href="https://gitee.com/MrShanDev/mms-pc">Gitee</a> · <a href="https://github.com/MrShanDev/mms-pc">GitHub</a></p>
   <br/>
</div>

[English](README.en.md) | 简体中文

`mms-pc` 是 **MMS 的 PC 端网页 / 门户**，基于 **Nuxt 3** 开发，服务端渲染带来良好的 **SEO** 表现。内置 **6 套站点模板**（`pages/template01~06`）、**i18n 多语言**（`i18n/`）、**多主题**（`themes/`：classic / modern）与示例 API 层（`api/`），面向门户与官网场景。

- 仓库：<https://gitee.com/MrShanDev/mms-pc>（公开）
- 后端对接：`mms/mms-admin` 等开放接口，API 地址集中在 `api/config.ts`

---

## 技术栈

- Nuxt 3 + Vue 3 + TypeScript
- Pinia / Vue Router
- `@nuxtjs/i18n` 多语言

## 环境要求

- Node.js 18+

---

## 快速开始

```bash
npm install

# 本地开发（按环境选择其一）
npm run local   # 本地环境
npm run dev     # 开发环境
npm run prod    # 生产配置联调
```

## 脚本说明

| 命令 | 说明 |
|------|------|
| `npm run local` / `dev` / `prod` | 以对应环境变量启动 `nuxt dev` |
| `npm run build` | 生产构建（`nuxt generate`），产物在 `.output/public` |
| `npm run generate` | 静态站点生成 |
| `npm run preview` | 本地预览构建结果 |

---

## 构建与部署

使用 `npm run build` 命令进行构建，生成的文件位于 `.output/public` 目录。

### 配置切换

在部署前，修改 `api/config.ts` 顶部的地址常量即可：

- **本地**：`LOCAL_APP_URL`
- **开发**：`DEV_APP_URL`
- **生产**：`PROD_APP_URL`（含 /prod-api 路径）、`PROD_WS_URL`（WebSocket）

### 部署步骤

1. 修改 `api/config.ts` 中的 API 配置
2. 运行 `npm run build`
3. 将 `.output/public` 目录内容上传到服务器
4. 配置 API 接口的代理规则

---

## License

MIT；详见 [LICENSE](LICENSE) 文件。
