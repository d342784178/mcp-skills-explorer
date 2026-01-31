#!/usr/bin/env node

import { MCPServer } from './server/MCPServer.js';

/**
 * 主函数
 * 启动 Claude Skill MCP Server
 */
async function main() {
  try {
    // 创建服务器实例
    const server = new MCPServer();
    
    // 启动服务器
    await server.start();
  } catch (error) {
    // 处理启动错误
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

// 处理未捕获的异常
process.on('uncaughtException', (error) => {
  console.error('未捕获的异常:', error);
  process.exit(1);
});

// 处理未处理的 Promise 拒绝
process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});

// 启动服务
main();
