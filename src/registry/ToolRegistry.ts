import { SkillInfo } from '../types/index.js';

/**
 * 工具注册表
 * 管理所有从 skill 生成的工具
 */
export class ToolRegistry {
  private tools: Map<string, SkillInfo> = new Map();

  /**
   * 注册工具
   */
  public registerTool(skillInfo: SkillInfo): void {
    const toolName = this.generateToolName(skillInfo);
    this.tools.set(toolName, skillInfo);
  }

  /**
   * 获取所有工具
   */
  public getAllTools(): SkillInfo[] {
    return Array.from(this.tools.values());
  }

  /**
   * 根据名称获取工具
   */
  public getTool(name: string): SkillInfo | undefined {
    return this.tools.get(name);
  }

  /**
   * 生成工具名称
   */
  private generateToolName(skillInfo: SkillInfo): string {
    return skillInfo.metadata.name.toLowerCase().replace(/\s+/g, '_');
  }
}
