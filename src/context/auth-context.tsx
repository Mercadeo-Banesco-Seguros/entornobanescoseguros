
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, currentUserEmail } from '@/lib/data';

type AuthContextType = {
  currentUser: User | null;
  users: User[]; // <- Estos serán los datos locales para otras páginas
  tasks: Task[];
  levels: typeof staticLevels;
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Esta función carga solo los datos locales para el contexto
    const loadLocalData = async () => {
      setLoading(true);
      setError(null);
      // Importamos los datos locales solo cuando se necesitan
      const { users: staticUsers, tasks: staticTasks } = await import('@/lib/data');
      
      const loggedInUser = staticUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());

      if (loggedInUser) {
        const userTasks = staticTasks.map(task => ({
          ...task,
          status: 'completed' as const
        }));
        
        setTimeout(() => { // Simular carga
          setCurrentUser(loggedInUser);
          setUsers(staticUsers); // <- Guardamos los usuarios locales en el contexto
          setTasks(userTasks);
          setLoading(false);
        }, 500); // Reducido el tiempo de carga simulado

      } else {
        setError('Usuario de desarrollo no encontrado.');
        setLoading(false);
      }
    };

    loadLocalData();
  }, []);

  const value = {
    currentUser,
    users, // <- Se exponen los usuarios locales
    tasks,
    levels: staticLevels,
    avatars: staticAvatars,
    loading,
    error,
  };

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
