#!/bin/bash
# MCP Skills Explorer 发布脚本
# 适用于 Linux/Mac/Windows Git Bash

set -e

echo "🚀 MCP Skills Explorer 发布流程"
echo ""

# 检查 npm 登录
echo "📝 检查 npm 登录状态..."
if ! npm whoami > /dev/null 2>&1; then
    echo "❌ 未登录 npm，请先运行: npm login"
    exit 1
fi
echo "✅ 已登录为: $(npm whoami)"
echo ""

# 构建项目
echo "🔨 构建项目..."
npm run build
echo "✅ 构建成功"
echo ""

# 打包预览
echo "📦 创建测试包..."
npm pack
PACKAGE_FILE=$(ls mcp-skills-explorer-*.tgz 2>/dev/null | head -n 1)
if [ -z "$PACKAGE_FILE" ]; then
    echo "❌ 打包失败"
    exit 1
fi
echo "✅ 创建包: $PACKAGE_FILE"
echo ""

# 显示包内容
echo "📋 包内容预览:"
tar -tzf "$PACKAGE_FILE" | head -n 15
echo "... (共 $(tar -tzf "$PACKAGE_FILE" | wc -l) 个文件)"
echo ""

# 确认发布
read -p "❓ 确认发布到 npm? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ 取消发布"
    rm "$PACKAGE_FILE"
    exit 0
fi

# 发布
echo "🚀 发布到 npm..."
npm publish
if [ $? -ne 0 ]; then
    echo "❌ 发布失败"
    rm "$PACKAGE_FILE"
    exit 1
fi
echo "✅ 发布成功！"
echo ""

# 清理
rm "$PACKAGE_FILE"

# 验证
echo "🔍 验证发布..."
sleep 3
npm view mcp-skills-explorer version
echo ""

echo "🎉 发布完成！"
echo ""
echo "用户可以通过以下方式使用:"
echo "  npx mcp-skills-explorer"
echo "  npm install -g mcp-skills-explorer"
echo ""
echo "查看包信息: npm view mcp-skills-explorer"
echo "npm 链接: https://www.npmjs.com/package/mcp-skills-explorer"
echo ""
