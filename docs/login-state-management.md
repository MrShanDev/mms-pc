# 登录状态管理机制

## 概述

本文档描述了项目中实现的登录状态管理机制，旨在解决用户登录后刷新页面丢失登录状态的问题。

## 核心组件

### 1. 用户 Store ([stores/user.ts](file:///Volumes/SXPCWLKJ/MyWork/sxpcwlkj/game/nuxt/stores/user.ts))

- 负责管理用户认证信息和登录状态
- 自动从 localStorage 恢复用户数据
- 提供用户登录/登出相关方法

### 2. 认证中间件 ([middleware/auth.global.ts](file:///Volumes/SXPCWLKJ/MyWork/sxpcwlkj/game/nuxt/middleware/auth.global.ts))

- 全局路由守卫，检查用户认证状态
- 自动执行 token 登录验证
- 控制需要认证的路由访问权限

### 3. 认证初始化插件 ([plugins/auth-init.client.ts](file:///Volumes/SXPCWLKJ/MyWork/sxpcwlkj/game/nuxt/plugins/auth-init.client.ts))

- 客户端启动时自动恢复登录状态
- 通过 token 自动登录验证

## 关键改进

### 1. API 响应码处理

- **问题**：API 返回 `{code: 200, status: true, msg: '操作成功'}` 实际上是成功响应，但以前被误判为失败
- **解决方案**：更新了成功判断逻辑
  - `code === 0` 通常表示成功
  - `code === 200 && status === true` 也表示成功

### 2. 错误处理策略

- **问题**：在 `tokenLogin` 调用失败时，不加区分地清除 token
- **解决方案**：只有在确认是认证错误时才清除 token
  - `code === 401`、`code === 4001`、`code === 200 && status === false` 等情况才清除 token
  - 网络错误等临时问题不立即清除 token

### 3. 纯客户端渲染配置

- **配置**：`nuxt.config.ts` 中设置 `ssr: false`
- **目的**：避免服务端渲染导致的初始化问题

### 4. 状态初始化逻辑

- **改进**：优化了 Store 初始化逻辑，确保在客户端环境下总是尝试从 localStorage 恢复数据
- **条件**：只有当 token 和用户信息都存在时才设置 `isLoggedIn: true`

## 工作流程

1. 用户登录成功后，用户信息和 token 存储到 localStorage
2. 页面刷新时，Store 从 localStorage 恢复基础数据
3. 认证初始化插件在客户端启动时尝试使用 token 恢复完整登录状态
4. 认证中间件在路由切换时验证用户权限
5. 用户登出时，清除所有认证信息

## 注意事项

- 生产环境中不包含调试日志
- 所有认证相关操作都有适当的错误处理
- token 有效期验证通过服务端接口完成
- 用户状态在多个组件间保持同步