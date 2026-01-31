# MCP Skills Explorer

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-orange.svg)](https://modelcontextprotocol.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个强大的 MCP 服务器，能够自动读取 `claude-skills` 文件夹中的 `skill.md` 文件并生成 MCP 工具，让你轻松扩展 Claude 的能力。

## ✨ 特性

- 🚀 **自动化** - 自动扫描和注册 skills，无需手动配置
- 📝 **简单易用** - 使用 Markdown 格式定义 skills
- 🔧 **完全兼容** - 完整实现 MCP 协议规范
- 🌍 **多语言支持** - 完美支持中文和其他语言
- ⚡ **高性能** - 快速启动和响应
- 🎯 **模块化** - 清晰的代码结构，易于扩展

## 📦 快速开始

### 安装

```bash
# 克隆项目
git clone <your-repo-url>
cd mcp-skills-explorer

# 安装依赖
npm install

# 构建项目
npm run build

# 启动服务器
npm start
```

### 验证安装

```bash
# 运行测试
node test-multiple-skills.js
```

你应该看到类似输出：
```
✅ 服务器启动成功
✅ 工具列表测试通过
发现的工具数量: 3
```

## 🎯 使用方法

### 1. 创建你的第一个 Skill

在 `claude-skills` 目录下创建新文件夹：

```bash
mkdir claude-skills/my-first-skill
```

创建 `skill.md` 文件：

```markdown
name: My First Skill
description: 这是我的第一个技能
author: Your Name
version: 1.0.0
category: example
tags: demo, tutorial
language: zh-CN

# 我的第一个技能

这里是技能的详细说明...

## 功能

- 功能 1
- 功能 2

## 使用示例

提供使用示例...
```

### 2. 启动服务器

```bash
npm start
```

服务器会自动识别新的 skill 并注册为 MCP 工具。

### 3. 在 Claude Desktop 中使用

编辑 Claude Desktop 配置文件：

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "mcp-skills-explorer": {
      "command": "node",
      "args": ["C:/path/to/project/dist/index.js"]
    }
  }
}
```

重启 Claude Desktop，你的 skills 就可以使用了！

## 📚 文档

- [使用指南](./USAGE_GUIDE.md) - 详细的使用说明
- [测试报告](./FINAL_TEST_SUMMARY.md) - 完整的测试结果
- [MCP 协议测试](./MCP_TEST_REPORT.md) - MCP 协议兼容性测试

## 🏗️ 项目结构

```
mcp-skills-explorer/
├── src/                          # 源代码
│   ├── config/                   # 配置管理
│   │   └── ConfigManager.ts
│   ├── handler/                  # 请求处理
│   │   └── ToolHandler.ts
│   ├── parser/                   # 元数据解析
│   │   └── MetadataParser.ts
│   ├── registry/                 # 工具注册
│   │   └── ToolRegistry.ts
│   ├── scanner/                  # Skill 扫描
│   │   └── SkillScanner.ts
│   ├── server/                   # MCP 服务器
│   │   └── MCPServer.ts
│   ├── types/                    # 类型定义
│   │   └── index.ts
│   └── index.ts                  # 入口文件
├── claude-skills/                # Skills 目录
│   ├── example-skill/            # 示例 skill
│   ├── code-review/              # 代码审查助手
│   └── api-design/               # API 设计专家
├── dist/                         # 编译输出
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 示例 Skills

项目包含 3 个示例 skills：

### 1. Example Skill
基础示例，展示 skill 的基本结构。

### 2. Code Review Assistant
帮助进行代码审查，提供代码质量建议和最佳实践。

### 3. API Design Expert
提供 RESTful API 设计建议和最佳实践指导。

## 🔧 开发

### 开发模式

```bash
npm run dev
```

### 运行测试

```bash
# 测试单个 skill
node test-mcp.js

# 测试多个 skills
node test-multiple-skills.js
```

### 构建

```bash
npm run build
```

## 📋 Skill 文件格式

### 元数据字段

| 字段 | 必填 | 说明 |
|------|------|------|
| name | ✅ | 技能名称 |
| description | ✅ | 技能描述 |
| author | ❌ | 作者信息 |
| version | ❌ | 版本号 |
| category | ❌ | 分类 |
| tags | ❌ | 标签（逗号分隔） |
| language | ❌ | 语言代码 |

### 完整示例

```markdown
name: Code Generator
description: 自动生成代码模板
author: Dev Team
version: 1.0.0
category: development
tags: code, generator, template
language: zh-CN

# 代码生成器

自动生成常用的代码模板和样板代码。

## 支持的模板

### React 组件
\```jsx
import React from 'react';

export const MyComponent = () => {
  return <div>Hello World</div>;
};
\```

## 使用方法

1. 选择模板类型
2. 提供参数
3. 获取生成的代码
```

## 🧪 测试结果

✅ **所有测试通过**

- 依赖安装: ✅
- TypeScript 编译: ✅
- 服务器启动: ✅
- Skills 识别: ✅ (3/3)
- MCP 协议: ✅
- 工具列表: ✅
- 工具调用: ✅

详细测试报告请查看 [FINAL_TEST_SUMMARY.md](./FINAL_TEST_SUMMARY.md)

## 🚀 性能

- 启动时间: < 1 秒
- Skills 扫描: < 100ms
- 工具列表响应: < 50ms
- 工具调用响应: < 100ms

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📄 许可证

MIT License

## 🙏 致谢

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/)

---

**Made with ❤️ for the Claude community**
