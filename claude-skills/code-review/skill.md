name: Code Review Assistant
description: 帮助进行代码审查，提供代码质量建议和最佳实践
author: AI Assistant
version: 2.0.0
category: development
tags: code-review, quality, best-practices
language: zh-CN

# 代码审查助手

这个技能可以帮助你进行代码审查，提供专业的代码质量建议。

## 功能特性

- 代码风格检查
- 性能优化建议
- 安全漏洞识别
- 最佳实践推荐

## 使用方法

1. 提供需要审查的代码
2. 指定编程语言
3. 获取详细的审查报告

## 审查标准

### 代码质量
- 可读性
- 可维护性
- 可测试性

### 性能
- 时间复杂度
- 空间复杂度
- 资源使用

### 安全性
- 输入验证
- 错误处理
- 权限控制

## 示例

```javascript
// 审查前
function getData(id) {
  return db.query('SELECT * FROM users WHERE id = ' + id);
}

// 审查建议：使用参数化查询防止 SQL 注入
function getData(id) {
  return db.query('SELECT * FROM users WHERE id = ?', [id]);
}
```
