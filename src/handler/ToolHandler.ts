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
      tools: tools.map(skill => {
        // 构建新的描述格式
        const description = `提供描述为\`${skill.metadata.description}\`的技能, 通过该工具可以了解技能详情`;
        
        return {
          name: skill.metadata.name,
          description: description,
          inputSchema: {
            type: 'object',
            properties: {},
            required: []
          }
        };
      })
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

    // 获取绝对路径
    const path = await import('path');
    const absolutePath = path.resolve(skill.path);

    // 构建返回内容
    const responseText = `${skill.rawMetadata}

skill描述文件路径: ${absolutePath}

当需要阅读Skill.md时，请根据上面的skill描述文件路径查阅Skill.md全部内容，并基于Skill.md的指引查看其余文件`;
    
    return {
      content: [
        {
          type: 'text',
          text: responseText
        }
      ]
    };
  }
}
