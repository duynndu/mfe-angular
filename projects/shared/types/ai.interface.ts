export type AIModelId =
  | 'auto'
  | 'auto/coding'
  | 'auto/fast'
  | 'auto/cheap'
  | 'gemini-3.7-flash'
  | 'gemini-2.5-flash'
  | 'gpt-4o'
  | 'gpt-4o-mini'
  | 'claude-3-7-sonnet'
  | 'deepseek-chat'
  | 'custom';

export type AIProvider = 'omniroute';

export type AIStreamCallback = (chunk: string, accumulated: string) => void;

export interface AIProviderConfig {
  provider: AIProvider;
  apiKey: string;
  model: string;
  customEndpoint?: string;
}

export interface AIGeneratorRequest {
  prompt: string;
  mode: 'prompt' | 'image' | 'tweak' | 'mock-data';
  templateType?: 'document' | 'ui';
  screenType?: 'login' | 'dashboard' | 'form' | 'custom';
  pageSize?: 'A4' | 'A5';
  orientation?: 'portrait' | 'landscape';
  theme?: 'medical' | 'modern' | 'classic' | 'dark' | 'glassmorphism';
  imageData?: string; // base64 data url
  currentTemplate?: string;
  currentScript?: string;
  currentContext?: any;
  tweakAction?: 'optimize-print' | 'add-signature' | 'two-columns' | 'translate-en' | 'generate-mock';
}

export interface AIGeneratorResult {
  template: string;
  script: string;
  context: Record<string, any>;
  summary: string;
  usedProvider: AIProvider;
  usedModel: string;
}

export interface AIPresetPrompt {
  id: string;
  title: string;
  category: 'medical' | 'general' | 'ui';
  badge: string;
  icon: string;
  prompt: string;
  templateType?: 'document' | 'ui';
  pageSize?: 'A4' | 'A5';
  orientation?: 'portrait' | 'landscape';
  screenType?: 'login' | 'dashboard' | 'form' | 'custom';
}
