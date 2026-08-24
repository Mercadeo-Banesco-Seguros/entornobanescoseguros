'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level, Prize, PrizeCategory } from '@/lib/types';
import { tasks as staticTasks, levels as staticLevels, avatars as staticAvatars, prizes as staticPrizes, prizeCategories as staticPrizeCategories } from '@/lib/data';

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
  register: (name: string, email: string, password: string, vicepresidencia: string, cargo: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  vicepresidencias: string[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toTitleCase(str: string): string {
  if (!str) return 'Base';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vicepresidencias, setVicepresidencias] = useState<string[]>(['Todas']);

  const tasks = staticTasks.map(t => ({...t, status: 'pending'}) as Task);
  const levels = staticLevels;
  const avatars = staticAvatars;
  const prizes = staticPrizes;
  const prizeCategories = staticPrizeCategories;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getData' }),
        cache: 'no-store',
      });

      if (!response.ok) {
        console.warn(`Fetch users warning: HTTP ${response.status}`);
        return;
      }

      const data = await response.json();
      if (data.error) {
        console.warn('Fetch users API error:', data.message);
        return;
      }
      
      const allUsers = (data.users || [])
        .map((u: any) => ({
          id: u.id,
          name: u.name,
          level: 1,
          xp: u.xp || 0,
          avatar: toTitleCase(u.avatar),
          progreso: u.progreso || 0, 
          vicepresidencia: u.vicepresidencia || '',
          posicion: u.posicion || 0,
          cargo: u.cargo || '',
          prog_pol: u.prog_pol || 0,
          prog_sus: u.prog_sus || 0,
          prog_cob: u.prog_cob || 0,
        }))
        .filter((user: User) => user.cargo === 'ASESOR INTEGRAL' || user.cargo === 'ADMINISTRADOR');

      setUsers(allUsers);
      
      const competingUsers = allUsers.filter((user: User) => user.cargo !== 'ADMINISTRADOR');
      const allVps = competingUsers.map(user => user.vicepresidencia).filter(Boolean);
      setVicepresidencias(['Todas', ...Array.from(new Set(allVps))]);

      setCurrentUser(prevUser => {
        if (prevUser && prevUser.id) {
          const updatedCurrentUser = allUsers.find(u => u.id && u.id.toString().toLowerCase() === prevUser.id.toString().toLowerCase());
          if (updatedCurrentUser) {
            localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
            return updatedCurrentUser;
          }
        }
        return prevUser;
      });

    } catch (err: any) {
      console.error("Silent error in fetchUsers:", err.message);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
        try {
            const user = JSON.parse(userJson);
            setCurrentUser(user);
            await fetchUsers();
        } catch (e) {
            localStorage.removeItem('currentUser');
        }
    }
  }, [fetchUsers]);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      await loadInitialData();
      setLoading(false);
    };
    checkUserSession();
  }, [loadInitialData]);
  
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', username, password }),
        });

        const data = await response.json();
        if (!response.ok || data.error) {
            throw new Error(data.message || 'Credenciales incorrectas');
        }
        
        const user: User = {
            id: data.user.id,
            name: data.user.name,
            level: 1,
            xp: data.user.xp || 0,
            avatar: toTitleCase(data.user.avatar),
            progreso: data.user.progreso || 0,
            vicepresidencia: data.user.vicepresidencia || '',
            posicion: data.user.posicion || 0,
            cargo: data.user.cargo || '',
            prog_pol: data.user.prog_pol || 0,
            prog_sus: data.user.prog_sus || 0,
            prog_cob: data.user.prog_cob || 0,
        };

        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        await fetchUsers();
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const register = async () => Promise.resolve();
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setUsers([]);
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
    register,
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
