import api from './api';
import type { Contributor } from '../types';

// Development fallback data
const fallbackContributors: Contributor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    title: 'AI Research Lead at Stanford',
    bio: 'Pioneer in neural network architectures with groundbreaking contributions to deep learning optimization.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    featured: true,
    startDate: '2024-01-01'
  },
  {
    id: '2',
    name: 'Michael Rodriguez',
    title: 'Chapter Head, MIT AI Club',
    bio: 'Led the development of an award-winning AI ethics curriculum now adopted by 20+ universities.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    featured: true,
    startDate: '2024-01-01'
  },
  {
    id: '3',
    name: 'Dr. Aisha Patel',
    title: 'AI Ethics Advisor',
    bio: 'Renowned expert in responsible AI development, focusing on fairness and transparency in machine learning systems.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
    featured: true,
    startDate: '2024-01-01'
  }
];

export async function getContributors(): Promise<Contributor[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      return fallbackContributors;
    }
    const response = await api.get('/contributors');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for contributors');
    return fallbackContributors;
  }
}

export async function getFeaturedContributors(): Promise<Contributor[]> {
  try {
    if (process.env.NODE_ENV === 'development') {
      return fallbackContributors.filter(c => c.featured);
    }
    const response = await api.get('/contributors/featured');
    return response.data;
  } catch (error) {
    console.warn('Using fallback data for featured contributors');
    return fallbackContributors.filter(c => c.featured);
  }
}

export async function createContributor(data: Omit<Contributor, 'id'>): Promise<Contributor> {
  try {
    const response = await api.post('/contributors', data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to create contributor: ${error.message}`);
    }
    throw new Error('Failed to create contributor');
  }
}

export async function updateContributor(id: string, data: Partial<Contributor>): Promise<Contributor> {
  try {
    const response = await api.put(`/contributors/${id}`, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to update contributor: ${error.message}`);
    }
    throw new Error('Failed to update contributor');
  }
}

export async function deleteContributor(id: string): Promise<void> {
  try {
    await api.delete(`/contributors/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to delete contributor: ${error.message}`);
    }
    throw new Error('Failed to delete contributor');
  }
}