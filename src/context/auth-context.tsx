
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels } from '@/lib/data';
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al cargar los datos iniciales');
        }
        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }
        
        // El currentUser y las tasks vienen del script ahora.
        setCurrentUser(data.currentUser);
        setTasks(data.tasks || []);

      } catch (err: any) {
        console.error("Error en AuthProvider:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const value = {
    currentUser,
    tasks,
    levels: staticLevels, // Los niveles y avatares pueden seguir siendo estáticos por ahora
    avatars: staticAvatars,
    loading,
    error,
    setCurrentUser, // Exponemos para poder actualizar si es necesario
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

  if (error) {
     return (
       <div className="w-full h-screen flex items-center justify-center text-center text-destructive p-4">
         <div>
            <p className="font-bold text-lg">Error al Cargar la Expedición</p>
            <p className="text-sm">{error}</p>
            <p className="text-xs mt-4">Asegúrate de que la URL en <code className="bg-destructive/10 p-1 rounded">src/app/api/data/route.ts</code> sea correcta y que la implementación de Apps Script esté activa.</p>
         </div>
       </div>
    );
  }

  if (!currentUser) {
     return (
       <div className="w-full h-screen flex items-center justify-center text-center text-muted-foreground p-4">
         <div>
            <p className="font-bold text-lg">Usuario no encontrado</p>
            <p className="text-sm">Tu correo no fue encontrado en la hoja de cálculo 'DATA'.</p>
            <p className="text-xs mt-2">Verifica que estás accediendo con la cuenta de Google correcta.</p>
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
