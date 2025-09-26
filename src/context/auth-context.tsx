
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { avatars as defaultAvatars, levels as defaultLevels, tasks as defaultTasksData } from '@/lib/data';

// Prepara las tareas por defecto con un ID y estado válidos.
const defaultTasks: Task[] = defaultTasksData.map((task, index) => ({
  ...task,
  id: task.id ?? index,
  status: 'completed', // Forzamos 'completed' como se pidió anteriormente
}));


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
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [levels, setLevels] = useState<Level[]>(defaultLevels);
  const [avatars, setAvatars] = useState<Avatar[]>(defaultAvatars);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticateAndLoadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/data', { cache: 'no-store' });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudo obtener la información de la expedición.');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        if (data.currentUser) {
          setCurrentUser(data.currentUser);
        } else {
          // Si no hay usuario, la app sigue funcionando con datos de ejemplo y currentUser a null.
          console.warn('Usuario no autenticado. La aplicación se mostrará con datos de ejemplo.');
          setCurrentUser(null);
        }

        // Cargar datos estáticos desde el script si están disponibles, si no, usar los de fallback.
        setTasks(data.tasks || defaultTasks);
        setLevels(data.levels || defaultLevels);
        setAvatars(data.avatars || defaultAvatars);

      } catch (err: any) {
        console.error("Authentication or data loading failed:", err);
        setError(err.message || 'Ocurrió un error inesperado.');
        setCurrentUser(null);
        // Cargar datos de fallback para que la app no quede en blanco
        setTasks(defaultTasks);
        setLevels(defaultLevels);
        setAvatars(defaultAvatars);
      } finally {
        setLoading(false);
      }
    };

    authenticateAndLoadData();
  }, []);

  const value = useMemo(() => ({
    currentUser,
    tasks,
    levels,
    avatars,
    loading,
    error,
  }), [currentUser, tasks, levels, avatars, loading, error]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="h-12 w-12 rounded-full" />
          <p className="text-muted-foreground mt-4">Verificando acceso y cargando datos...</p>
        </div>
      </div>
    );
  }

  // Si no hay usuario logueado, muestra un mensaje pero no bloquea la app
  if (!currentUser) {
     console.log("No hay un usuario autenticado. Mostrando contenido público/de ejemplo.");
     // Aquí se podría mostrar un banner o un toast si fuera necesario.
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
