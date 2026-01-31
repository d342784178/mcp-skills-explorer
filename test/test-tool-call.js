/**
 * 测试工具调用返回内容
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

rl.on('line', (line) => {
  try {
    const response = JSON.parse(line);
    
    if (response.id === 1) {
      console.log('✅ 工具列表获取成功\n');
      const firstTool = response.result.tools[0];
      console.log('第一个工具:', firstTool.name);
      console.log('描述:', firstTool.description);
      
      // 调用工具
      setTimeout(() => {
        console.log('\n=== 调用工具 ===\n');
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
      }, 500);
    } else if (response.id === 2) {
      console.log('✅ 工具调用成功\n');
      console.log('返回内容:\n');
      console.log(response.result.content[0].text);
      console.log('\n=== 测试完成 ===\n');
      
      setTimeout(() => {
        server.kill();
        process.exit(0);
      }, 500);
    }
  } catch (e) {
    // 非 JSON
  }
});

server.stderr.on('data', (data) => {
  const msg = data.toString();
  if (msg.includes('已启动')) {
    console.log('✅ 服务器启动\n');
    
    setTimeout(() => {
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

server.on('close', () => {
  process.exit(0);
});
