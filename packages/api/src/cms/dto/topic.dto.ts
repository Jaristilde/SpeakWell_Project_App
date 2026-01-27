import { IsString, IsOptional, IsNumber, IsBoolean, IsEnum } from 'class-validator';

// Content categories as specified in the plan
export enum TopicCategory {
  COMMUNICATION_SKILLS = 'communication_skills',
  SELF_GROWTH = 'self_growth',
  KNOWLEDGE = 'knowledge',
}

// Sub-categories for more granular organization
export enum CommunicationSkillType {
  PUBLIC_SPEAKING = 'public_speaking',
  STORYTELLING = 'storytelling',
  NEGOTIATION = 'negotiation',
  ACTIVE_LISTENING = 'active_listening',
  PERSUASION = 'persuasion',
  CONFLICT_RESOLUTION = 'conflict_resolution',
  NETWORKING = 'networking',
  PRESENTATION = 'presentation',
}

export enum SelfGrowthType {
  CONFIDENCE = 'confidence',
  EMOTIONAL_INTELLIGENCE = 'emotional_intelligence',
  LEADERSHIP = 'leadership',
  RELATIONSHIPS = 'relationships',
  MINDFULNESS = 'mindfulness',
  GOAL_SETTING = 'goal_setting',
  SELF_AWARENESS = 'self_awareness',
  RESILIENCE = 'resilience',
}

export enum KnowledgeType {
  ART = 'art',
  HISTORY = 'history',
  LOGIC = 'logic',
  BIOLOGY = 'biology',
  MATH = 'math',
  FINANCE = 'finance',
  SCIENCE = 'science',
  TECHNOLOGY = 'technology',
  PHILOSOPHY = 'philosophy',
}

export class CreateTopicDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(TopicCategory)
  category: TopicCategory;

  @IsString()
  @IsOptional()
  subCategory?: string; // Use specific type enums above

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string; // Hex color for UI

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TopicCategory)
  @IsOptional()
  category?: TopicCategory;

  @IsString()
  @IsOptional()
  subCategory?: string;

  @IsString()
  @IsOptional()
  icon?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsNumber()
  @IsOptional()
  order?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export interface TopicResponse {
  id: string;
  name: string;
  description: string;
  category: TopicCategory;
  subCategory: string | null;
  icon: string | null;
  color: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Response for category listings
export interface CategoryResponse {
  category: TopicCategory;
  displayName: string;
  description: string;
  subCategories: SubCategoryInfo[];
  topicCount: number;
  lessonCount: number;
}

export interface SubCategoryInfo {
  key: string;
  displayName: string;
  description: string;
}

// Predefined category metadata
export const CATEGORY_METADATA: Record<TopicCategory, { displayName: string; description: string }> = {
  [TopicCategory.COMMUNICATION_SKILLS]: {
    displayName: 'Communication Skills',
    description: 'Master the art of effective communication in any situation',
  },
  [TopicCategory.SELF_GROWTH]: {
    displayName: 'Self Growth',
    description: 'Develop your personal and professional potential',
  },
  [TopicCategory.KNOWLEDGE]: {
    displayName: 'Knowledge',
    description: 'Expand your understanding across diverse subjects',
  },
};

// Predefined sub-category metadata
export const SUBCATEGORY_METADATA: Record<string, { displayName: string; description: string }> = {
  // Communication Skills
  public_speaking: { displayName: 'Public Speaking', description: 'Speak confidently to any audience' },
  storytelling: { displayName: 'Storytelling', description: 'Craft and deliver compelling narratives' },
  negotiation: { displayName: 'Negotiation', description: 'Achieve win-win outcomes in any discussion' },
  active_listening: { displayName: 'Active Listening', description: 'Truly understand and engage with others' },
  persuasion: { displayName: 'Persuasion', description: 'Influence others ethically and effectively' },
  conflict_resolution: { displayName: 'Conflict Resolution', description: 'Navigate disagreements constructively' },
  networking: { displayName: 'Networking', description: 'Build meaningful professional connections' },
  presentation: { displayName: 'Presentation', description: 'Create and deliver impactful presentations' },

  // Self Growth
  confidence: { displayName: 'Confidence', description: 'Build unshakeable self-belief' },
  emotional_intelligence: { displayName: 'Emotional Intelligence', description: 'Understand and manage emotions' },
  leadership: { displayName: 'Leadership', description: 'Inspire and guide others effectively' },
  relationships: { displayName: 'Relationships', description: 'Build deeper, more meaningful connections' },
  mindfulness: { displayName: 'Mindfulness', description: 'Stay present and focused' },
  goal_setting: { displayName: 'Goal Setting', description: 'Define and achieve your objectives' },
  self_awareness: { displayName: 'Self Awareness', description: 'Know yourself better' },
  resilience: { displayName: 'Resilience', description: 'Bounce back from challenges stronger' },

  // Knowledge
  art: { displayName: 'Art', description: 'Appreciate and discuss visual arts' },
  history: { displayName: 'History', description: 'Learn from the past' },
  logic: { displayName: 'Logic', description: 'Think clearly and reason well' },
  biology: { displayName: 'Biology', description: 'Understand life and living systems' },
  math: { displayName: 'Math', description: 'Master numerical thinking' },
  finance: { displayName: 'Finance', description: 'Understand money and investing' },
  science: { displayName: 'Science', description: 'Explore the natural world' },
  technology: { displayName: 'Technology', description: 'Stay current with tech trends' },
  philosophy: { displayName: 'Philosophy', description: 'Explore fundamental questions' },
};
