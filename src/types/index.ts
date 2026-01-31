/**
 * Skill 元数据接口
 */
export interface SkillMetadata {
  name: string;
  description: string;
  author?: string;
  version?: string;
  category?: string;
  tags?: string[];
  language?: string;
}

/**
 * Skill 信息接口
 */
export interface SkillInfo {
  /** Skill 文件路径 */
  path: string;
  /** Skill 元数据 */
  metadata: SkillMetadata;
}
