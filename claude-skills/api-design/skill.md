name: API Design Expert
description: 提供 RESTful API 设计建议和最佳实践指导
author: API Team
version: 1.5.0
category: architecture
tags: api, rest, design, architecture
language: zh-CN

# API 设计专家

专业的 API 设计顾问，帮助你设计优雅、高效、易用的 RESTful API。

## 设计原则

### 1. 资源导向
- 使用名词而非动词
- 合理的资源层级
- 清晰的 URL 结构

### 2. HTTP 方法
- GET: 获取资源
- POST: 创建资源
- PUT: 更新资源（完整）
- PATCH: 更新资源（部分）
- DELETE: 删除资源

### 3. 状态码
- 2xx: 成功
- 3xx: 重定向
- 4xx: 客户端错误
- 5xx: 服务器错误

## 最佳实践

### URL 设计
```
✅ GET /api/v1/users
✅ GET /api/v1/users/123
✅ POST /api/v1/users
✅ PUT /api/v1/users/123
✅ DELETE /api/v1/users/123

❌ GET /api/v1/getUsers
❌ POST /api/v1/createUser
```

### 响应格式
```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "John Doe"
  },
  "meta": {
    "timestamp": "2026-01-31T00:00:00Z"
  }
}
```

### 错误处理
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
```

## 版本控制

- URL 版本: `/api/v1/users`
- Header 版本: `Accept: application/vnd.api+json; version=1`
- 参数版本: `/api/users?version=1`

## 安全建议

- 使用 HTTPS
- 实现认证和授权
- 限流和防护
- 输入验证
- 日志记录
