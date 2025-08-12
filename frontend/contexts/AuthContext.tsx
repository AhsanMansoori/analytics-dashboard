import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '~backend/auth/auth';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth data on app start
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // In real app, call backend API
      const mockResponse = {
        user: {
          id: "1",
          email,
          name: "Demo User",
          role: "admin" as const,
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
        },
        token: "mock_token_123"
      };

      setUser(mockResponse.user);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      // In real app, call backend API
      const mockResponse = {
        user: {
          id: "2",
          email,
          name,
          role: "viewer" as const,
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop&crop=face"
        },
        token: "mock_token_456"
      };

      setUser(mockResponse.user);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));
      localStorage.setItem('token', mockResponse.token);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
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
