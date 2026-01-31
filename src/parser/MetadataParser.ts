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
   * @returns 解析后的元数据和原始元数据文本
   */
  public async parseMetadata(skillFilePath: string): Promise<{ metadata: SkillMetadata; rawMetadata: string }> {
    try {
      const fs = await import('fs/promises');
      const content = await fs.readFile(skillFilePath, 'utf-8');
      
      // 提取原始元数据文本（从文件开头到第一个 # 标题之前）
      const rawMetadata = this.extractRawMetadata(content);
      
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

      return { metadata, rawMetadata };
    } catch (error) {
      throw new Error(`解析元数据失败: ${error}`);
    }
  }

  /**
   * 提取原始元数据文本
   */
  private extractRawMetadata(content: string): string {
    const lines = content.split('\n');
    const metadataLines: string[] = [];
    
    for (const line of lines) {
      // 遇到第一个 # 标题就停止
      if (line.trim().startsWith('#')) {
        break;
      }
      // 收集元数据行
      if (line.trim() && (
        line.startsWith('name:') ||
        line.startsWith('description:') ||
        line.startsWith('author:') ||
        line.startsWith('version:') ||
        line.startsWith('category:') ||
        line.startsWith('tags:') ||
        line.startsWith('language:')
      )) {
        metadataLines.push(line);
      }
    }
    
    return metadataLines.join('\n');
  }

  /**
   * 从内容中提取元数据
   */
  private extractMetadata(content: string): any {
    const metadata: any = {};
    
    // 检查是否有 YAML front matter (--- 包围的部分)
    const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    
    let linesToParse: string[];
    if (yamlMatch) {
      // 解析 YAML front matter
      linesToParse = yamlMatch[1].split('\n');
    } else {
      // 解析普通格式
      linesToParse = content.split('\n');
    }
    
    // 提取元数据字段
    for (const line of linesToParse) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('name:')) {
        metadata.name = this.extractValue(trimmedLine, 'name:');
      } else if (trimmedLine.startsWith('description:')) {
        metadata.description = this.extractValue(trimmedLine, 'description:');
      } else if (trimmedLine.startsWith('author:')) {
        metadata.author = this.extractValue(trimmedLine, 'author:');
      } else if (trimmedLine.startsWith('version:')) {
        metadata.version = this.extractValue(trimmedLine, 'version:');
      } else if (trimmedLine.startsWith('category:')) {
        metadata.category = this.extractValue(trimmedLine, 'category:');
      } else if (trimmedLine.startsWith('tags:')) {
        metadata.tags = this.extractValue(trimmedLine, 'tags:');
      } else if (trimmedLine.startsWith('language:')) {
        metadata.language = this.extractValue(trimmedLine, 'language:');
      } else if (trimmedLine.startsWith('license:')) {
        metadata.license = this.extractValue(trimmedLine, 'license:');
      }
    }
    
    return metadata;
  }

  /**
   * 提取字段值，处理引号
   */
  private extractValue(line: string, prefix: string): string {
    let value = line.substring(prefix.length).trim();
    
    // 移除引号（单引号或双引号）
    if ((value.startsWith('"') && value.endsWith('"')) || 
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.substring(1, value.length - 1);
    }
    
    return value;
  }
}
