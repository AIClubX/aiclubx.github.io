import type { Message, ChatConfig } from '../../types/chat';

export interface ChatState {
  messages: Message[];
  config: ChatConfig;
}

export type ChatAction = 
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_CONFIG'; config: Partial<ChatConfig> }
  | { type: 'CLEAR_MESSAGES' };