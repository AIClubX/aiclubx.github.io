import type { Message, ChatConfig } from '../../types/chat';
import type { ChatAction } from './types';

export const addMessage = (message: Message): ChatAction => ({
  type: 'ADD_MESSAGE',
  message
});

export const updateConfig = (config: Partial<ChatConfig>): ChatAction => ({
  type: 'UPDATE_CONFIG',
  config
});

export const clearMessages = (): ChatAction => ({
  type: 'CLEAR_MESSAGES'
});