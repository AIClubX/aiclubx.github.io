import api from './api';
import { jwtDecode } from 'jwt-decode';
import type { OAuthUser } from '../types/auth';

interface GoogleTokenPayload {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

export async function handleGoogleLogin(credential: string) {
  try {
    const response = await api.post('/auth/google', { credential });
    const { token, user } = response.data;
    
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
}

export async function decodeGoogleToken(credential: string): Promise<OAuthUser> {
  try {
    const decoded = jwtDecode<GoogleTokenPayload>(credential);
    return {
      email: decoded.email,
      name: decoded.name,
      picture: decoded.picture,
      googleId: decoded.sub
    };
  } catch (error) {
    console.error('Token decode error:', error);
    throw error;
  }
}