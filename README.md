# 部署说明

## 构建与部署

使用 `npm run build` 命令进行构建，生成的文件位于 `.output/public` 目录。

## 配置切换

在部署前，修改 `api/config.ts` 顶部的地址常量即可：

- **本地**：`LOCAL_APP_URL`
- **开发**：`DEV_APP_URL`
- **生产**：`PROD_APP_URL`（含 /prod-api 路径）、`PROD_WS_URL`（WebSocket）

## 部署步骤

1. 修改 `api/config.ts` 中的 API 配置
2. 运行 `npm run build`
3. 将 `.output/public` 目录内容上传到服务器
4. 配置API 接口的代理规则
