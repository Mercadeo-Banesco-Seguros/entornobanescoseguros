'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { tasks as staticTasks, levels as staticLevels, avatars as staticAvatars } from '@/lib/data';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST', // Siempre usamos POST para el proxy
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getData' }),
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      
      const allUsers = (data.users || []).map((u: any) => ({
        id: u.correo, // El ID único es el email
        name: u.nombre,
        email: u.correo,
        level: Number(u.nivel),
        xp: Number(u.puntaje),
        avatar: u.avatar
      }));
      setUsers(allUsers);
    } catch (err: any) {
      setError("Error cargando los datos del ranking: " + err.message);
      console.error(err);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    // Cargar datos estáticos directamente
    const userTasks = staticTasks.map(t => ({...t, status: 'pending'}) as Task);
    setTasks(userTasks);
    setLevels(staticLevels);
    setAvatars(staticAvatars);
  }, []);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      setError(null);
      await loadInitialData(); // Carga los datos estáticos primero
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
            const user = JSON.parse(userJson);
            setCurrentUser(user);
            await fetchUsers(); // Carga el ranking después de verificar sesión
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('currentUser');
        }
      }
      setLoading(false);
    };
    checkUserSession();
  }, [loadInitialData, fetchUsers]);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password }),
        });

        const data = await response.json();
        if (data.error || !data.user) {
            throw new Error(data.message || 'Credenciales inválidas');
        }
        
        const user: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            level: Number(data.user.level),
            xp: Number(data.user.xp),
            avatar: data.user.avatar
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

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
     try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'register', name, email, password }),
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };

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
    loading,
    error,
    login,
    register,
    logout,
    fetchUsers,
  }), [currentUser, users, tasks, levels, avatars, loading, error, fetchUsers]);

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
