import React from 'react';
import { ChatMessage } from './ChatMessage';
import type { Message } from '../../types/chat';

interface ChatMessagesProps {
  messages: Message[];
  loading?: boolean;
}

export function ChatMessages({ messages, loading }: ChatMessagesProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          👋 Hi! How can I help you learn more about AI Club X?
        </div>
      )}
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="bg-gray-100 rounded-lg p-3 animate-pulse">
            Typing...
          </div>
        </div>
      )}
    </div>
  );
}