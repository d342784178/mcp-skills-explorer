# GitHub 上传指南

## 方法 1: 使用 GitHub CLI (推荐)

如果你安装了 GitHub CLI (`gh`)：

```bash
# 登录 GitHub
gh auth login

# 创建仓库并推送
gh repo create mcp-skills-explorer --public --source=. --remote=origin --push
```

## 方法 2: 手动创建仓库

### 步骤 1: 在 GitHub 创建新仓库

1. 访问 https://github.com/new
2. 仓库名称: `mcp-skills-explorer`
3. 描述: `MCP server that converts skill.md files into Claude Desktop tools`
4. 选择 Public
5. **不要**勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

### 步骤 2: 推送代码

复制 GitHub 显示的仓库 URL，然后执行：

```bash
# 添加远程仓库 (替换 YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/mcp-skills-explorer.git

# 推送代码
git branch -M main
git push -u origin main
```

## 方法 3: 使用 SSH

如果你配置了 SSH 密钥：

```bash
# 添加远程仓库 (替换 YOUR_USERNAME)
git remote add origin git@github.com:YOUR_USERNAME/mcp-skills-explorer.git

# 推送代码
git branch -M main
git push -u origin main
```

## 验证上传

上传成功后，访问你的仓库页面：
```
https://github.com/YOUR_USERNAME/mcp-skills-explorer
```

你应该能看到：
- ✅ 所有源代码文件
- ✅ README.md 显示在首页
- ✅ 3 个示例 skills
- ✅ 测试脚本

## 后续步骤

### 添加 Topics (标签)

在仓库页面点击 "Add topics"，添加：
- `mcp`
- `claude`
- `claude-desktop`
- `model-context-protocol`
- `typescript`
- `skills`

### 创建 Release

```bash
# 创建标签
git tag -a v1.0.0 -m "Release v1.0.0"

# 推送标签
git push origin v1.0.0
```

然后在 GitHub 上创建 Release：
1. 进入仓库的 "Releases" 页面
2. 点击 "Create a new release"
3. 选择标签 v1.0.0
4. 填写 Release notes
5. 发布

## 常见问题

### Q: 推送时要求输入用户名和密码？

A: GitHub 已不支持密码认证，需要使用 Personal Access Token：
1. 访问 https://github.com/settings/tokens
2. 生成新 token (classic)
3. 勾选 `repo` 权限
4. 使用 token 作为密码

### Q: 如何更新远程仓库？

```bash
git add .
git commit -m "your message"
git push
```

### Q: 如何查看远程仓库地址？

```bash
git remote -v
```
