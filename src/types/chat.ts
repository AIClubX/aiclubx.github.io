export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

export interface ChatConfig {
  provider: 'openai' | 'anthropic';
  apiKey: string;
  modelName: string;
  systemPrompt: string;
  isEnabled: boolean;
}