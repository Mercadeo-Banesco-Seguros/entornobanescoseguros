
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, users as staticUsers, tasks as staticTasks, currentUserEmail } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

type AuthContextType = {
  currentUser: User | null;
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
  setCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Cargar siempre datos de ejemplo para evitar el bloqueo de "usuario no encontrado"
    setLoading(true);
    const userFromData = staticUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());
    
    if (userFromData) {
        setCurrentUser(userFromData);

        // Simular el estado de las tareas para el usuario de ejemplo
        const userTasks = staticTasks.map((task, index) => ({
            ...task,
            // Simular algunas tareas completadas y otras pendientes
            status: index % 2 === 0 ? 'completed' : 'pending'
        } as Task));
        setTasks(userTasks);

    } else {
        setError("El usuario de ejemplo no fue encontrado en los datos locales.");
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    tasks,
    levels: staticLevels,
    avatars: staticAvatars,
    loading,
    error,
    setCurrentUser,
  };

  if (loading) {
    return (
       <div className="w-full h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
         </div>
       </div>
    );
  }

  if (error || !currentUser) {
     return (
       <div className="w-full h-screen flex items-center justify-center text-center text-destructive p-4">
         <div>
            <p className="font-bold text-lg">Error al Cargar la Expedición</p>
            <p className="text-sm">{error || 'No se pudo cargar el usuario de ejemplo.'}</p>
         </div>
       </div>
    );
  }

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
