import { Resource } from '../../types';
import { loadResources, saveResources } from './storage';

// Sample data for development
const sampleResources: Resource[] = [
  {
    id: '1',
    title: 'Introduction to Machine Learning',
    type: 'learning',
    description: 'Comprehensive course covering ML fundamentals',
    link: 'https://example.com/courses/ml-intro',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'AI Research Project',
    type: 'project',
    description: 'Open source project for developing an advanced image recognition system',
    link: 'https://github.com/example/ai-vision',
    createdAt: new Date().toISOString()
  }
];

export async function getResources(): Promise<Resource[]> {
  try {
    const storedResources = loadResources();
    return storedResources.length ? storedResources : sampleResources;
  } catch (error) {
    console.warn('Using sample resource data');
    return sampleResources;
  }
}

export async function createResource(data: Omit<Resource, 'id' | 'createdAt'>): Promise<Resource> {
  const newResource: Resource = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  try {
    const currentResources = loadResources();
    const updatedResources = [...currentResources, newResource];
    saveResources(updatedResources);
    return newResource;
  } catch (error) {
    console.error('Failed to create resource:', error);
    throw error;
  }
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<Resource> {
  try {
    const resources = loadResources();
    const index = resources.findIndex(r => r.id === id);
    if (index === -1) throw new Error('Resource not found');

    const updatedResource = {
      ...resources[index],
      ...data,
      id // Ensure ID doesn't change
    };

    resources[index] = updatedResource;
    saveResources(resources);
    return updatedResource;
  } catch (error) {
    console.error('Failed to update resource:', error);
    throw error;
  }
}

export async function deleteResource(id: string): Promise<void> {
  try {
    const resources = loadResources();
    const updatedResources = resources.filter(r => r.id !== id);
    saveResources(updatedResources);
  } catch (error) {
    console.error('Failed to delete resource:', error);
    throw error;
  }
}