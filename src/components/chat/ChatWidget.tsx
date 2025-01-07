import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useChatStore } from '../../stores/chatStore';
import { useChatConfigStore } from '../../stores/chatConfigStore';
import { sendChatMessage } from '../../services/chat';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { messages, addMessage } = useChatStore();
  const { config } = useChatConfigStore();

  const handleSendMessage = async (message: string) => {
    if (isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await sendChatMessage(message, config);
      addMessage({
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      addMessage({
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!config.isEnabled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 text-white rounded-full p-3 shadow-lg hover:bg-indigo-700 transition-colors"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 h-[500px] flex flex-col">
          <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">AI Club X Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <ChatMessages messages={messages} loading={isLoading} />
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      )}
    </div>
  );
}