'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

type AuthContextType = {
  currentUser: User | null;
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInitialData = useCallback(async (user: User) => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getData', email: user.email }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      
      setTasks(data.tasks || []);
      setLevels(data.levels || []);
      setAvatars(data.avatars || []);
    } catch (err: any) {
      setError("Error cargando los datos de la aplicación.");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        const user = JSON.parse(userJson);
        setCurrentUser(user);
        await loadInitialData(user);
      }
      setLoading(false);
    };
    checkUserSession();
  }, [loadInitialData]);
  
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
    });

    const data = await response.json();
    if (data.error || !data.user) {
        throw new Error(data.message || 'Credenciales inválidas');
    }
    
    const user = data.user;
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    await loadInitialData(user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await fetch('/api/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'register', name, email, password }),
    });

    const data = await response.json();
    if (data.error) {
      throw new Error(data.message);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    // Clear other data as well
    setTasks([]);
    setLevels([]);
    setAvatars([]);
  };

  const value = useMemo(() => ({
    currentUser,
    tasks,
    levels,
    avatars,
    loading,
    error,
    login,
    register,
    logout,
  }), [currentUser, tasks, levels, avatars, loading, error, register]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
