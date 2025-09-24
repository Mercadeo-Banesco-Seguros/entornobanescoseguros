
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, users as staticUsers, tasks as staticTasks, currentUserEmail } from '@/lib/data';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
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
    // --- LÓGICA DE DESARROLLO CON DATOS LOCALES ---
    const loadMockData = () => {
      setLoading(true);
      
      const loggedInUser = staticUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());

      if (loggedInUser) {
        // Determinar el estado de las tareas para el usuario actual
        // Una tarea está 'completed' si su nivel es INFERIOR al nivel del usuario.
        // Las tareas del nivel actual del usuario están 'pending'.
        const userTasks = staticTasks.map(task => ({
          ...task,
          status: task.level < loggedInUser.level ? 'completed' : 'pending'
        }));
        
        // Simular un tiempo de carga
        setTimeout(() => {
          setCurrentUser(loggedInUser);
          setUsers(staticUsers);
          setTasks(userTasks);
          setLoading(false);
        }, 1500);

      } else {
        setError('Usuario de ejemplo no encontrado.');
        setLoading(false);
      }
    };

    loadMockData();

  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, users, tasks, levels: staticLevels, avatars: staticAvatars, loading, error }}>
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
