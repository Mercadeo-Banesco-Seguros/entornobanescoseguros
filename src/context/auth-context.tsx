'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level, Prize, PrizeCategory } from '@/lib/types';
import { tasks as staticTasks, levels as staticLevels, avatars as staticAvatars, prizes as staticPrizes, prizeCategories as staticPrizeCategories, mockUsers } from '@/lib/data';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  prizes: Prize[];
  prizeCategories: PrizeCategory[];
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  vicepresidencias: string[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vicepresidencias, setVicepresidencias] = useState<string[]>(['Todas']);

  const tasks = staticTasks;
  const levels = staticLevels;
  const avatars = staticAvatars;
  const prizes = staticPrizes;
  const prizeCategories = staticPrizeCategories;

  const fetchUsers = useCallback(async () => {
    // Operación puramente local con datos estáticos
    const allVps = Array.from(new Set(mockUsers.map(u => u.vicepresidencia).filter(Boolean)));
    setVicepresidencias(['Todas', ...allVps as string[]]);
    setUsers(mockUsers);
    return Promise.resolve();
  }, []);

  useEffect(() => {
    const checkSession = () => {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          setCurrentUser(JSON.parse(userJson));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
      fetchUsers();
      setLoading(false);
    };
    checkSession();
  }, [fetchUsers]);
  
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(u => 
          u.id.toString().toLowerCase() === username.toLowerCase() || 
          u.name.toLowerCase().includes(username.toLowerCase())
        );

        if (user) {
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          setError('Credenciales incorrectas o usuario no encontrado.');
          reject(new Error('Auth failed'));
        }
      }, 500);
    });
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setError(null);
  };

  const value = useMemo(() => ({
    currentUser,
    users,
    tasks,
    levels,
    avatars,
    prizes,
    prizeCategories,
    loading,
    error,
    login,
    logout,
    fetchUsers,
    vicepresidencias,
  }), [currentUser, users, loading, error, fetchUsers, vicepresidencias]);

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
