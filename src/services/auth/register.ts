import api from '../api';
import type { User } from '../../types/auth';

export async function register(userData: {
  fullName: string;
  email: string;
  password: string;
  role: string;
  university?: string;
  company?: string;
  title?: string;
}): Promise<void> {
  // Move register logic here
}