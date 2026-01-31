import { SkillMetadata } from '../types/index.js';

/**
 * 元数据解析器
 * 从 skill.md 文件中解析元数据
 */
export class MetadataParser {
  private static readonly SKILL_FILE_NAME = 'skill.md';

  /**
   * 从文件路径解析元数据
   * @param skillFilePath skill.md 文件路径
   * @returns 解析后的元数据
   */
  public async parseMetadata(skillFilePath: string): Promise<SkillMetadata> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(skillFilePath, 'utf-8');
      
      // 解析 front matter 或从内容中提取元数据
      const parsed = this.extractMetadata(content);
      const metadata: SkillMetadata = {
        name: parsed.name || '',
        description: parsed.description || '',
        author: parsed.author,
        version: parsed.version,
        category: parsed.category,
        tags: Array.isArray(parsed.tags) ? parsed.tags : (parsed.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        language: parsed.language || 'undefined'
      };

      return metadata;
    } catch (error) {
      throw new Error(`解析元数据失败: ${error}`);
    }
  }

  /**
   * 从内容中提取元数据
   */
  private extractMetadata(content: string): any {
    const metadata: any = {};
    
    // 提取元数据字段
    const lines = content.split('\n');
    for (const line of lines) {
      if (line.startsWith('name:')) metadata.name = line.substring(5).trim();
      if (line.startsWith('description:')) metadata.description = line.substring(12).trim();
      if (line.startsWith('author:')) metadata.author = line.substring(7).trim();
      if (line.startsWith('version:')) metadata.version = line.substring(8).trim();
      if (line.startsWith('category:')) metadata.category = line.substring(9).trim();
      if (line.startsWith('tags:')) metadata.tags = line.substring(5).trim();
      if (line.startsWith('language:')) metadata.language = line.substring(9).trim();
    }
    
    return metadata;
  }
}
