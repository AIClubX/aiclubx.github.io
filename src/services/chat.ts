import type { ChatConfig } from '../types/chat';

export async function sendChatMessage(message: string, config: ChatConfig) {
  if (!config.isEnabled || !config.apiKey) {
    throw new Error('Chat is not configured or disabled');
  }

  if (config.provider === 'openai') {
    return sendOpenAIMessage(message, config);
  } else if (config.provider === 'anthropic') {
    return sendAnthropicMessage(message, config);
  }

  throw new Error('Invalid provider');
}

async function sendOpenAIMessage(message: string, config: ChatConfig) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.modelName,
      messages: [
        { role: 'system', content: config.systemPrompt },
        { role: 'user', content: message }
      ],
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

async function sendAnthropicMessage(message: string, config: ChatConfig) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.modelName,
      messages: [
        { role: 'user', content: message }
      ],
      system: config.systemPrompt,
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}