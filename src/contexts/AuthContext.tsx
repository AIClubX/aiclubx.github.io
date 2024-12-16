import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types/auth';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../services/auth';
import { handleGoogleLogin } from '../services/oauth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  isAuthenticated: boolean;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  role: string;
  university?: string;
  company?: string;
  title?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const user = await loginApi(email, password);
    setUser(user);
  };

  const loginWithGoogle = async (credential: string) => {
    const user = await handleGoogleLogin(credential);
    setUser(user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const register = async (userData: RegisterData) => {
    await registerApi(userData);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      loginWithGoogle,
      logout,
      register,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}