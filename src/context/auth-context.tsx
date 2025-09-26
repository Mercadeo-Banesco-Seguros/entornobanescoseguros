
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
  setCurrentUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/auth');
        const authData = await response.json();

        if (authData.authorized && authData.user) {
          setCurrentUser(authData.user);

          // Simular el estado de las tareas para el usuario autenticado
          const userTasks = staticTasks.map(task => ({
              ...task,
              // Por ahora, marcamos todas como completadas para cualquier usuario logueado
              status: 'completed'
          } as Task));
          setTasks(userTasks);

        } else {
          setError(authData.message || 'No estás autorizado para acceder a esta aplicación.');
          setCurrentUser(null);
        }
      } catch (err) {
        console.error("Authentication failed:", err);
        setError('Ocurrió un error al intentar iniciar sesión. Revisa la consola.');
      } finally {
        setLoading(false);
      }
    };
    
    authenticateUser();
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
