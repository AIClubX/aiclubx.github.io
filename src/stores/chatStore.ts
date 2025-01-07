import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'chat-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);