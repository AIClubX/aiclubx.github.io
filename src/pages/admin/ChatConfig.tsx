import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useChatConfigStore } from '../../stores/chatConfigStore';
import type { ChatConfig } from '../../types/chat';

export default function ChatConfig() {
  const { config, updateConfig } = useChatConfigStore();
  const [formData, setFormData] = useState<ChatConfig>(config);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig(formData);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Chat Configuration</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Provider
          </label>
          <select
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value as 'openai' | 'anthropic' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="openai">OpenAI</option>
            <option value="anthropic">Anthropic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            type="password"
            value={formData.apiKey}
            onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Model Name
          </label>
          <input
            type="text"
            value={formData.modelName}
            onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            System Prompt
          </label>
          <textarea
            value={formData.systemPrompt}
            onChange={(e) => setFormData({ ...formData, systemPrompt: e.target.value })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isEnabled"
            checked={formData.isEnabled}
            onChange={(e) => setFormData({ ...formData, isEnabled: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="isEnabled" className="ml-2 block text-sm text-gray-900">
            Enable Chat Widget
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Save className="h-5 w-5 mr-2" />
            Save Configuration
          </button>
        </div>
      </form>
    </div>
  );
}