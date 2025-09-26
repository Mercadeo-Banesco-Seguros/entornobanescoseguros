
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { avatars as defaultAvatars, levels as defaultLevels, tasks as defaultTasks } from '@/lib/data';

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
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
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

        // Si el script devuelve un currentUser, lo establecemos.
        if (data.currentUser) {
          setCurrentUser(data.currentUser);
        } else {
          // Si no, simplemente lo dejamos como null y mostramos un mensaje en la consola.
          console.warn('Usuario no autenticado o no encontrado en la hoja de cálculo.');
          setCurrentUser(null);
        }

        // Cargamos los datos estáticos que vienen del script o los de fallback.
        // Esto asegura que la app no se rompa si el script solo devuelve el usuario.
        setTasks(data.tasks || defaultTasks.map((task, index) => ({...task, id: index, status: 'completed'})));
        setLevels(data.levels || defaultLevels);
        setAvatars(data.avatars || defaultAvatars);

      } catch (err: any) {
        console.error("Authentication or data loading failed:", err);
        setError(err.message || 'Ocurrió un error inesperado.');
        setCurrentUser(null); // Asegurarse de que el usuario es nulo en caso de error
        // Cargar datos de fallback para que la app no quede en blanco
        setTasks(defaultTasks.map((task, index) => ({...task, id: index, status: 'completed'})));
        setLevels(defaultLevels);
        setAvatars(defaultAvatars);
      } finally {
        setLoading(false);
      }
    };

    authenticateAndLoadData();
  }, []);

  const value = {
    currentUser,
    tasks,
    levels,
    avatars,
    loading,
    error,
  };
  
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

  // Mostramos un error en la consola si ocurrió, pero no bloqueamos la app.
  if (error) {
    console.error("Error en AuthProvider:", error);
    // Podrías mostrar un Toast o un pequeño banner aquí si lo deseas
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
