/**
 * 测试多个 Skills 的 MCP 服务器
 */

import { spawn } from 'child_process';
import { createInterface } from 'readline';

const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

const rl = createInterface({
  input: server.stdout,
  crlfDelay: Infinity
});

let testStep = 0;

rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    
    if (response.id === 1) {
      console.log('\n✅ 工具列表测试通过\n');
      console.log('发现的工具数量:', response.result.tools.length);
      console.log('\n工具列表:');
      response.result.tools.forEach((tool, index) => {
        console.log(`\n${index + 1}. ${tool.name}`);
        console.log(`   描述: ${tool.description}`);
      });
      
      // 测试调用第一个工具
      if (response.result.tools.length > 0) {
        setTimeout(() => {
          console.log('\n\n=== 测试调用第一个工具 ===\n');
          const firstTool = response.result.tools[0];
          const callRequest = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: {
              name: firstTool.name,
              arguments: {}
            }
          };
          server.stdin.write(JSON.stringify(callRequest) + '\n');
        }, 1000);
      }
    } else if (response.id === 2) {
      console.log('\n✅ 工具调用测试通过\n');
      console.log('返回内容长度:', response.result.content[0].text.length, '字符');
      console.log('\n内容预览:');
      console.log(response.result.content[0].text.substring(0, 200) + '...\n');
      
      setTimeout(() => {
        console.log('\n=== 所有测试完成 ===\n');
        server.kill();
        process.exit(0);
      }, 1000);
    }
  } catch (e) {
    // 非 JSON 输出
  }
});

server.stderr.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('已启动')) {
    console.log('✅ 服务器启动成功\n');
    
    setTimeout(() => {
      console.log('=== 测试工具列表 ===\n');
      const listRequest = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {}
      };
      server.stdin.write(JSON.stringify(listRequest) + '\n');
    }, 500);
  }
});

server.on('close', (code) => {
  console.log(`\n服务器已关闭 (退出码: ${code})\n`);
});

process.on('SIGINT', () => {
  server.kill();
  process.exit(0);
});
