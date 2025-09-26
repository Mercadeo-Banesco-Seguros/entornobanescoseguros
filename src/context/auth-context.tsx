
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, tasks as staticTasks } from '@/lib/data';
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
    const authenticateAndLoadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const authResponse = await fetch('/api/auth');
        if (!authResponse.ok) {
          const errorData = await authResponse.json();
          throw new Error(errorData.message || 'Error de autenticación');
        }
        const authData = await authResponse.json();

        if (authData.authorized && authData.user) {
          setCurrentUser(authData.user);
          
          // El estado de las tareas se simula localmente
          const userTasks = staticTasks.map(task => ({
              ...task,
              status: 'completed'
          } as Task));
          setTasks(userTasks);

        } else {
          setCurrentUser(null);
          setError(authData.message || 'No tienes permiso para acceder a esta aplicación.');
        }

      } catch (err: any) {
        console.error("Authentication or data loading failed:", err);
        setError(err.message || 'Ocurrió un error al intentar iniciar sesión.');
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    authenticateAndLoadData();
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
            <p className="text-muted-foreground mt-4">Verificando acceso...</p>
         </div>
       </div>
    );
  }

  if (error || !currentUser) {
     return (
       <div className="w-full h-screen flex items-center justify-center text-center text-destructive p-4">
         <div>
            <p className="font-bold text-lg">Acceso Denegado</p>
            <p className="text-sm">{error || 'No se pudo cargar la información del usuario.'}</p>
            <p className="text-xs mt-2 text-muted-foreground">Por favor, contacta al administrador si crees que es un error.</p>
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
