import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ChatConfig } from '../types/chat';

interface ChatConfigState {
  config: ChatConfig;
  updateConfig: (config: Partial<ChatConfig>) => void;
}

const defaultConfig: ChatConfig = {
  provider: 'openai',
  apiKey: '',
  modelName: 'gpt-3.5-turbo',
  systemPrompt: 'You are a helpful assistant for the AI Club X website, helping visitors learn about our organization, events, and resources.',
  isEnabled: false,
};

export const useChatConfigStore = create<ChatConfigState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig },
      })),
    }),
    {
      name: 'chat-config',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ config: state.config }),
    }
  )
);