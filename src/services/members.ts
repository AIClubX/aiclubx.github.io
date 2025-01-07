import api from './api';
import type { Member } from '../types';

// Sample data for development
const sampleMembers: Member[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'regular',
    isActive: true
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'chapter_head',
    university: 'MIT',
    isActive: true
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice.j@example.com',
    role: 'advisor',
    company: 'Tech Corp',
    title: 'AI Research Lead',
    isActive: true
  }
];

export async function getMembers(): Promise<Member[]> {
  try {
    const response = await api.get('/members');
    return response.data;
  } catch (error) {
    console.warn('Using sample member data');
    return sampleMembers;
  }
}

export async function getMember(id: string): Promise<Member | null> {
  try {
    const response = await api.get(`/members/${id}`);
    return response.data;
  } catch (error) {
    console.warn('Using sample member data');
    return sampleMembers.find(member => member.id === id) || null;
  }
}

export async function createMember(data: Omit<Member, 'id'>): Promise<Member> {
  try {
    const response = await api.post('/members', data);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock member creation');
      const newMember = {
        id: crypto.randomUUID(),
        ...data
      };
      sampleMembers.push(newMember);
      return newMember;
    }
    throw error;
  }
}

export async function updateMember(id: string, data: Partial<Member>): Promise<Member> {
  try {
    const response = await api.put(`/members/${id}`, data);
    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using mock member update');
      const index = sampleMembers.findIndex(member => member.id === id);
      if (index === -1) throw new Error('Member not found');
      
      const updatedMember = {
        ...sampleMembers[index],
        ...data
      };
      sampleMembers[index] = updatedMember;
      return updatedMember;
    }
    throw error;
  }
}

export async function updateMemberStatus(id: string, isActive: boolean): Promise<Member> {
  return updateMember(id, { isActive });
}