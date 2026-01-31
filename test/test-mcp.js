/**
 * MCP 服务器测试脚本
 * 测试服务器的工具列表和调用功能
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';

// 启动 MCP 服务器
const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let responseBuffer = '';

// 读取服务器输出
const rl = createInterface({
  input: server.stdout,
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log('服务器输出:', line);
  responseBuffer += line + '\n';
  
  try {
    const response = JSON.parse(line);
    console.log('解析的响应:', JSON.stringify(response, null, 2));
  } catch (e) {
    // 不是 JSON，可能是日志
  }
});

server.stderr.on('data', (data) => {
  console.error('服务器错误输出:', data.toString());
});

// 等待服务器启动
setTimeout(() => {
  console.log('\n=== 测试 1: 请求工具列表 ===\n');
  
  const listToolsRequest = {
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list',
    params: {}
  };
  
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
  
  // 等待响应后测试工具调用
  setTimeout(() => {
    console.log('\n=== 测试 2: 调用工具 ===\n');
    
    const callToolRequest = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'example_skill',
        arguments: {}
      }
    };
    
    server.stdin.write(JSON.stringify(callToolRequest) + '\n');
    
    // 等待响应后关闭
    setTimeout(() => {
      console.log('\n=== 测试完成 ===\n');
      server.kill();
      process.exit(0);
    }, 2000);
  }, 2000);
}, 1000);

// 处理进程退出
server.on('close', (code) => {
  console.log(`服务器进程退出，代码: ${code}`);
});

process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});
