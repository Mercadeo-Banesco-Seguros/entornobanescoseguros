
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
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
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const authenticateAndLoadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Hacemos una única llamada a la API que obtiene todos los datos, incluido el currentUser.
        const response = await fetch('/api/data', { cache: 'no-store' });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'No se pudo obtener la información de la expedición.');
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.message);
        }

        // El script de Google debe devolver un objeto currentUser si el usuario está autorizado.
        if (data.currentUser) {
          setCurrentUser(data.currentUser);
          // Usamos los datos que vienen del script
          setTasks(data.tasks || []);
          setLevels(data.levels || []);
          setAvatars(data.avatars || []);
        } else {
          // Si el script no devuelve un currentUser, el usuario no está autorizado.
          throw new Error('Usuario no autorizado. Tu correo no se encuentra en la lista de acceso.');
        }
      } catch (err: any) {
        console.error("Authentication or data loading failed:", err);
        setError(err.message || 'Ocurrió un error inesperado.');
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

  if (error || !currentUser) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-center p-4">
        <div>
          <p className="font-bold text-lg text-destructive">Acceso Denegado</p>
          <p className="text-sm text-destructive-foreground bg-destructive p-2 rounded-md mt-2">{error || 'No se pudo cargar la información del usuario.'}</p>
          <p className="text-xs mt-4 text-muted-foreground">Por favor, asegúrate de que tu correo esté en la hoja de cálculo `DATA` y que el script de Google tenga los permisos correctos.</p>
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
