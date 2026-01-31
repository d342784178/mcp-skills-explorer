import { ToolRegistry } from '../registry/ToolRegistry.js';

/**
 * 工具处理器
 * 处理工具调用请求
 */
export class ToolHandler {
  constructor(private toolRegistry: ToolRegistry) {}

  /**
   * 处理工具列表请求
   */
  public async handleListTools(): Promise<any> {
    const tools = this.toolRegistry.getAllTools();
    
    return {
      tools: tools.map(skill => ({
        name: skill.metadata.name,
        description: skill.metadata.description,
        inputSchema: {
          type: 'object',
          properties: {},
          required: []
        }
      }))
    };
  }

  /**
   * 处理工具调用请求
   */
  public async handleCallTool(name: string, arguments_: any): Promise<any> {
    const skill = this.toolRegistry.getTool(name);
    
    if (!skill) {
      throw new Error(`工具不存在: ${name}`);
    }

    // 读取并返回 skill 内容
    const fs = await import('fs/promises');
    const content = await fs.readFile(skill.path, 'utf-8');
    
    return {
      content: [
        {
          type: 'text',
          text: content
        }
      ]
    };
  }
}
