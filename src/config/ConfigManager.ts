/**
 * 配置管理器
 * 管理服务器配置
 */
export class ConfigManager {
  private config: any = {};

  /**
   * 加载配置
   */
  public async loadConfig(): Promise<void> {
    // 可以从配置文件或环境变量加载配置
    this.config = {
      skillsDirectory: process.env.SKILLS_DIR || './claude-skills',
      serverName: 'claude-skill-mcp-server',
      serverVersion: '1.0.0'
    };
  }

  /**
   * 获取配置项
   */
  public get(key: string): any {
    return this.config[key];
  }
}
