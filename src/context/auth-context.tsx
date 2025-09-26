
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, tasks as staticTasks, users as staticUsers, currentUserEmail } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

type AuthContextType = {
  currentUser: User | null;
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLocalData = () => {
      setLoading(true);
      setError(null);
      try {
        // Simular la carga de datos locales para el usuario actual
        const user = staticUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());

        if (user) {
          setCurrentUser(user);
          
          // El estado de las tareas se simula localmente
          const userTasks = staticTasks.map(task => ({
              ...task,
              status: 'completed'
          } as Task));
          setTasks(userTasks);

        } else {
          setCurrentUser(null);
          setError('El usuario de ejemplo no fue encontrado en los datos locales.');
        }

      } catch (err: any) {
        console.error("Local data loading failed:", err);
        setError(err.message || 'Ocurrió un error al cargar los datos de ejemplo.');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    loadLocalData();
  }, []);

  const value = {
    currentUser,
    tasks,
    levels: staticLevels,
    avatars: staticAvatars,
    loading,
    error,
  };

  if (loading) {
    return (
       <div className="w-full h-screen flex items-center justify-center">
         <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-12 w-12 rounded-full" />
            <p className="text-muted-foreground mt-4">Cargando datos de la expedición...</p>
         </div>
       </div>
    );
  }

  if (error || !currentUser) {
     return (
       <div className="w-full h-screen flex items-center justify-center text-center p-4">
         <div>
            <p className="font-bold text-lg text-destructive">Error de Carga</p>
            <p className="text-sm text-destructive-foreground bg-destructive p-2 rounded-md">{error || 'No se pudo cargar la información del usuario.'}</p>
            <p className="text-xs mt-2 text-muted-foreground">Por favor, revisa los datos de ejemplo y recarga la página.</p>
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
