import type { Resource } from '../../types';

const STORAGE_KEY = 'resources-storage';

export function loadResources(): Resource[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load resources from storage:', error);
    return [];
  }
}

export function saveResources(resources: Resource[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
  } catch (error) {
    console.error('Failed to save resources to storage:', error);
  }
}