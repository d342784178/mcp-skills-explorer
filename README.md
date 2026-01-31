# MCP Skills Explorer

[![npm version](https://img.shields.io/npm/v/mcp-skills-explorer.svg)](https://www.npmjs.com/package/mcp-skills-explorer)
[![npm downloads](https://img.shields.io/npm/dm/mcp-skills-explorer.svg)](https://www.npmjs.com/package/mcp-skills-explorer)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-orange.svg)](https://modelcontextprotocol.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

一个强大的 MCP 服务器，能够自动读取 `claude-skills` 文件夹中的 `skill.md` 文件并生成 MCP 工具，让你轻松扩展 Claude 的能力。

**📦 npm 包**: https://www.npmjs.com/package/mcp-skills-explorer

## ✨ 特性

- 🚀 **自动化** - 自动扫描和注册 skills，无需手动配置
- 📝 **简单易用** - 使用 Markdown 格式定义 skills
- 🔧 **完全兼容** - 完整实现 MCP 协议规范
- 🌍 **多语言支持** - 完美支持中文和其他语言
- ⚡ **高性能** - 快速启动和响应
- 🎯 **模块化** - 清晰的代码结构，易于扩展

## 📦 安装方式

### 方式 1: 使用 npx（推荐）

无需安装，直接运行：

```bash
npx mcp-skills-explorer
```

### 方式 2: 全局安装

```bash
npm install -g mcp-skills-explorer
mcp-skills-explorer
```

### 方式 3: 从源码安装

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

### 3. 在 MCP 客户端中配置

编辑 MCP 配置文件：
- **Claude Desktop (Windows)**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Claude Desktop (Mac)**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Kiro**: `.kiro/settings/mcp.json`

#### 方式 A: 使用 npx（推荐，无需安装）

从 npm 中央仓库直接运行：

```json
{
  "mcpServers": {
    "skills-explorer": {
      "command": "npx",
      "args": ["-y", "mcp-skills-explorer"],
      "env": {
        "SKILLS_DIR": "C:/path/to/your/claude-skills"
      }
    }
  }
}
```

**优点**：
- ✅ 无需手动安装
- ✅ 自动使用最新版本
- ✅ 跨平台兼容

#### 方式 B: 使用全局安装的 npm 包

先全局安装：
```bash
npm install -g mcp-skills-explorer
```

然后配置：
```json
{
  "mcpServers": {
    "skills-explorer": {
      "command": "mcp-skills-explorer",
      "env": {
        "SKILLS_DIR": "C:/path/to/your/claude-skills"
      }
    }
  }
}
```

**优点**：
- ✅ 启动速度快
- ✅ 版本固定，稳定可控

#### 方式 C: 使用本地开发版本

从源码构建后使用：

```json
{
  "mcpServers": {
    "skills-explorer": {
      "command": "node",
      "args": ["C:/path/to/mcp-skills-explorer/dist/index.js"],
      "env": {
        "SKILLS_DIR": "C:/path/to/your/claude-skills"
      }
    }
  }
}
```

**优点**：
- ✅ 适合开发和调试
- ✅ 可以自定义修改代码

**配置完成后**，重启 Claude Desktop 或在 Kiro 中重新连接 MCP 服务器即可使用！

## 📚 文档

- **打包发布**: [package/](./package/) - 完整的 npm 发布指南
- **变更日志**: [CHANGELOG.md](./CHANGELOG.md) - 版本更新记录

## 🏗️ 项目结构

```
mcp-skills-explorer/
├── src/                          # 源代码
│   ├── config/                   # 配置管理
│   ├── handler/                  # 请求处理
│   ├── parser/                   # 元数据解析
│   ├── registry/                 # 工具注册
│   ├── scanner/                  # Skill 扫描
│   ├── server/                   # MCP 服务器
│   ├── types/                    # 类型定义
│   └── index.ts                  # 入口文件
├── dist/                         # 编译输出（发布到 npm）
├── test/                         # 测试和示例
│   └── claude-skills/            # 示例 skills
├── package/                      # 打包发布相关
│   ├── GUIDE.md                  # 完整发布指南
│   ├── publish.sh                # 发布脚本
│   └── README.md                 # 文件夹说明
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
├── .npmignore                    # npm 发布忽略文件
├── CHANGELOG.md                  # 变更日志
└── README.md                     # 项目说明
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

### 构建

```bash
npm run build
```

### 打包发布

查看 [package/](./package/) 文件夹获取完整的打包发布指南：

- **发布指南**: [package/GUIDE.md](./package/GUIDE.md) - 完整的发布流程和常见问题
- **发布脚本**: [package/publish.sh](./package/publish.sh) - 一键发布脚本

#### 快速发布

```bash
# Windows Git Bash / Linux / Mac
bash package/publish.sh
```

#### 更新版本

```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch
npm publish

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor
npm publish

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
npm publish
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
- npm 发布: ✅

## 🚀 性能

- 启动时间: < 1 秒
- Skills 扫描: < 100ms
- 工具列表响应: < 50ms
- 工具调用响应: < 100ms

## 🔗 相关链接

- **npm 包**: https://www.npmjs.com/package/mcp-skills-explorer
- **MCP 协议**: https://modelcontextprotocol.io/
- **Claude Desktop**: https://claude.ai/

## 🤝 贡献

欢迎贡献代码、报告问题或提出建议！

## 📄 许可证

MIT License

## 🙏 致谢

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude Desktop](https://claude.ai/)
- [npm 社区](https://www.npmjs.com/)

---

**Made with ❤️ for the Claude community**

如果觉得有用，欢迎 ⭐ Star 支持！
