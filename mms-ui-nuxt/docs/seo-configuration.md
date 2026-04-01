# SEO 和 robots.txt 配置说明

## 概述

本文档介绍了项目中的 SEO 配置和 robots.txt 文件的管理方式。

## robots.txt 配置

### 文件位置

- **源文件**: `public/robots.txt`
- **访问路径**: `https://yourdomain.com/robots.txt`

### 当前配置说明

```txt
User-agent: *
Allow: /

# 阻止访问敏感路径
Disallow: /admin/
Disallow: /login/
Disallow: /register/
Disallow: /member/profile/
Disallow: /member/account/
Disallow: /member/assets/
Disallow: /member/buyer/
Disallow: /member/seller/

# 阻止访问API相关路径
Disallow: /api/
Disallow: /auth/
Disallow: /login-api/
Disallow: /member-api/
Disallow: /base-api/

# 阻止访问内部页面
Disallow: /unauthorized/

# 允许访问主要业务页面
Allow: /game/
Allow: /buy/
Allow: /sell/
Allow: /news/

# 指定站点地图
Sitemap: /sitemap.xml

# 指定爬虫访问频率（可选）
Crawl-delay: 5
```

### 配置说明

1. **User-agent: \*** - 适用于所有搜索引擎爬虫
2. **Allow: /** - 允许爬虫访问所有内容（除非另有禁止）
3. **敏感路径** - 阻止访问用户个人资料、管理后台等敏感区域
4. **API路径** - 阻止访问API端点，避免被索引
5. **业务页面** - 明确允许访问核心业务页面
6. **Sitemap** - 指定站点地图位置
7. **Crawl-delay** - 限制爬虫访问频率，避免过度请求

## Nuxt 配置

在 `nuxt.config.ts` 中添加了以下配置：

```typescript
// 在 app.head.meta 中添加
{ name: 'robots', content: 'index, follow' }

// 在 routeRules 中配置预渲染
'/robots.txt': {
    prerender: true
}

// 在 nitro.routeRules 中设置头部
'/robots.txt': {
    headers: {
        'Content-Type': 'text/plain'
    }
}
```

## 部署说明

1. `public/robots.txt` 文件会随着构建过程自动部署
2. 在生产环境中可通过 `https://yourdomain.com/robots.txt` 访问
3. 修改后需要重新部署才能生效

## 维护指南

- 需要阻止新路径被索引时，编辑 `public/robots.txt` 文件
- 业务页面路径发生变化时，及时更新 Allow 规则
- 定期检查搜索引擎抓取情况，调整配置

## 注意事项

- robots.txt 是公开文件，所有爬虫都可以读取
- 它只能指导合规的爬虫，不能真正阻止访问
- 搜索引擎可能需要一段时间才能识别更改
- 敏感信息不应仅依赖 robots.txt 来保护