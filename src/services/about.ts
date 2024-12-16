import api from './api';
import type { SuccessStory } from '../types/about';

// Development fallback data
const fallbackStories: SuccessStory[] = [
  {
    id: '1',
    title: 'AI Research Breakthrough',
    description: 'Our team achieved a significant breakthrough in neural network optimization.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    date: '2024-01-15',
    category: 'project'
  }
];

export async function getSuccessStories(): Promise<SuccessStory[]> {
  try {
    const response = await api.get('/about/success-stories');
    return response.data;
  } catch (error) {
    console.warn('Using fallback success stories data');
    return fallbackStories;
  }
}

export async function createSuccessStory(data: Omit<SuccessStory, 'id'>): Promise<SuccessStory> {
  try {
    const response = await api.post('/about/success-stories', data);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // Mock response for development
      const newStory = {
        ...data,
        id: crypto.randomUUID()
      };
      fallbackStories.push(newStory);
      return newStory;
    }
    throw error;
  }
}