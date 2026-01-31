import { SkillInfo } from '../types/index.js';
import { MetadataParser } from '../parser/MetadataParser.js';

/**
 * Skill 扫描器
 * 扫描指定目录下的所有 skill.md 文件
 */
export class SkillScanner {
  private static readonly SKILL_FILE_NAME = 'skill.md';

  /**
   * 扫描根路径下的所有 skill
   * @param rootPath 根路径，默认为当前目录
   * @returns skill 信息数组
   */
  public async scanDirectory(rootPath: string = process.cwd()): Promise<SkillInfo[]> {
    const skillInfos: SkillInfo[] = [];

    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      
      // 读取目录
      const entries = await fs.readdir(rootPath, { withFileTypes: true });

      // 遍历目录项
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const skillPath = path.join(rootPath, entry.name);
          
          // 检查是否包含 skill.md
          const skillFilePath = path.join(skillPath, SkillScanner.SKILL_FILE_NAME);
          
          try {
            await fs.access(skillFilePath);
            
            // 解析元数据
            const parser = new MetadataParser();
            const { metadata, rawMetadata } = await parser.parseMetadata(skillFilePath);
            
            skillInfos.push({
              path: skillFilePath,
              metadata,
              rawMetadata
            });
          } catch (error) {
            // 文件不存在，跳过
            continue;
          }
        }
      }
    } catch (error) {
      console.error(`扫描目录失败 (${rootPath}):`, error);
      throw error;
    }

    return skillInfos;
  }

  /**
   * 验证 skill 文件是否存在
   */
  public async isValidSkillDirectory(skillPath: string): Promise<boolean> {
    try {
      const fs = await import('fs/promises');
      const path = await import('path');
      const skillFilePath = path.join(skillPath, SkillScanner.SKILL_FILE_NAME);
      const stats = await fs.stat(skillFilePath);
      return stats.isFile();
    } catch (error) {
      return false;
    }
  }
}
