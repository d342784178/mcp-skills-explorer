import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { SkillScanner } from '../scanner/SkillScanner.js';
import { MetadataParser } from '../parser/MetadataParser.js';
import { ToolRegistry } from '../registry/ToolRegistry.js';
import { ToolHandler } from '../handler/ToolHandler.js';
import { ConfigManager } from '../config/ConfigManager.js';

/**
 * MCP 服务器
 */
export class MCPServer {
  private server: Server;
  private skillScanner: SkillScanner;
  private metadataParser: MetadataParser;
  private toolRegistry: ToolRegistry;
  private toolHandler: ToolHandler;
  private configManager: ConfigManager;

  constructor() {
    this.skillScanner = new SkillScanner();
    this.metadataParser = new MetadataParser();
    this.toolRegistry = new ToolRegistry();
    this.toolHandler = new ToolHandler(this.toolRegistry);
    this.configManager = new ConfigManager();

    this.server = new Server(
      {
        name: 'claude-skill-mcp-server',
        version: '1.0.0'
      },
      {
        capabilities: {
          tools: {}
        }
      }
    );

    this.setupHandlers();
  }

  /**
   * 设置请求处理器
   */
  private setupHandlers(): void {
    // 处理工具列表请求
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return this.toolHandler.handleListTools();
    });

    // 处理工具调用请求
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: arguments_ } = request.params;
      return this.toolHandler.handleCallTool(name, arguments_ || {});
    });
  }

  /**
   * 启动服务器
   */
  public async start(): Promise<void> {
    try {
      // 加载配置
      await this.configManager.loadConfig();

      // 扫描 skills
      const skillsDir = this.configManager.get('skillsDirectory');
      const skills = await this.skillScanner.scanDirectory(skillsDir);

      // 注册工具
      for (const skill of skills) {
        this.toolRegistry.registerTool(skill);
      }

      // 启动服务器
      const transport = new StdioServerTransport();
      await this.server.connect(transport);

      console.error('Claude Skill MCP Server 已启动');
    } catch (error) {
      console.error('启动服务器失败:', error);
      throw error;
    }
  }
}
