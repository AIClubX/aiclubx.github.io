import api from './api';
import type { User } from '../types/auth';
import { hashPassword } from '../utils/auth';

export async function login(email: string, password: string): Promise<User> {
  try {
    // For development, handle admin login directly
    if (email === 'admin@aiclubx.org' && password === 'Admin123!') {
      const adminUser = {
        id: '1',
        email: 'admin@aiclubx.org',
        name: 'Admin User',
        role: 'club_admin' as const,
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      return adminUser;
    }

    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Invalid credentials');
  }
}

export async function register(userData: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  university?: string;
  company?: string;
  title?: string;
}): Promise<void> {
  try {
    await api.post('/auth/register', userData);
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

export function getCurrentUser(): User | null {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}