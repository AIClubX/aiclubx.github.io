import api from './api';
import type { Chapter } from '../types';

// Sample data for development
const sampleChapters: Chapter[] = [
  {
    id: '1',
    name: 'MIT AI Club',
    university: 'Massachusetts Institute of Technology',
    location: 'Cambridge, MA',
    memberCount: 150,
    leadEmail: 'lead@mit.edu',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100&h=100',
    showMemberCount: true,
    chapterHead: {
      name: 'Michael Rodriguez',
      bio: 'PhD candidate in Machine Learning, focusing on reinforcement learning and robotics.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100',
      email: 'michael.r@mit.edu',
      phone: '(617) 555-0123'
    },
    coreTeam: [
      {
        id: '101',
        name: 'Sarah Chen',
        role: 'Technical Lead',
        classYear: '2024',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100'
      },
      {
        id: '102',
        name: 'James Wilson',
        role: 'Events Coordinator',
        classYear: '2025',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100'
      }
    ],
    members: [
      { id: '201', name: 'Alice Johnson', classYear: '2024' },
      { id: '202', name: 'Bob Smith', classYear: '2025' }
    ]
  },
  {
    id: '2',
    name: 'Stanford AI Society',
    university: 'Stanford University',
    location: 'Stanford, CA',
    memberCount: 120,
    leadEmail: 'lead@stanford.edu',
    logo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=100&h=100',
    showMemberCount: true,
    chapterHead: {
      name: 'Emily Chang',
      bio: 'Masters student in Computer Science with a focus on natural language processing.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100',
      email: 'emily.c@stanford.edu',
      phone: '(650) 555-0123'
    },
    coreTeam: [
      {
        id: '103',
        name: 'David Park',
        role: 'Research Lead',
        classYear: '2024',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100'
      }
    ],
    members: [
      { id: '203', name: 'Carol Martinez', classYear: '2024' },
      { id: '204', name: 'Daniel Lee', classYear: '2025' }
    ]
  }
];

export async function getChapters(): Promise<Chapter[]> {
  try {
    const response = await api.get('/chapters');
    return response.data;
  } catch (error) {
    console.warn('Using sample chapter data');
    return sampleChapters;
  }
}

export async function getChapter(id: string): Promise<Chapter | null> {
  try {
    const response = await api.get(`/chapters/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Using sample chapter data');
    return sampleChapters.find(chapter => chapter.id === id) || null;
  }
}

export async function createChapter(data: Omit<Chapter, 'id' | 'memberCount' | 'members'>): Promise<Chapter> {
  try {
    const response = await api.post('/chapters', data);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock chapter creation');
      const newChapter: Chapter = {
        id: crypto.randomUUID(),
        memberCount: 0,
        members: [],
        ...data
      };
      sampleChapters.push(newChapter);
      return newChapter;
    }
    throw error;
  }
}

export async function updateChapter(id: string, data: Partial<Chapter>): Promise<Chapter> {
  try {
    const response = await api.put(`/chapters/${id}`, data);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock chapter update');
      const index = sampleChapters.findIndex(chapter => chapter.id === id);
      if (index === -1) throw new Error('Chapter not found');
      
      const updatedChapter = {
        ...sampleChapters[index],
        ...data
      };
      sampleChapters[index] = updatedChapter;
      return updatedChapter;
    }
    throw error;
  }
}