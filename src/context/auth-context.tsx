'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import type { User, Task, Avatar, Level } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { avatars as defaultAvatars, levels as defaultLevels, tasks as defaultTasksData, users, currentUserEmail } from '@/lib/data';

// Prepara las tareas por defecto con un ID y estado válidos.
const defaultTasks: Task[] = defaultTasksData.map((task, index) => ({
  ...task,
  id: task.id ?? index,
  status: 'completed',
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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = () => {
      setLoading(true);
      try {
        // Carga el usuario de ejemplo directamente desde los datos locales
        const userToLoad = users.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());
        
        if (userToLoad) {
          setCurrentUser(userToLoad);
        } else {
          // Si no se encuentra, carga el primer usuario como fallback
          setCurrentUser(users[0] || null);
        }

        // Carga los datos estáticos (misiones, niveles, avatares)
        setTasks(defaultTasks);
        setLevels(defaultLevels);
        setAvatars(defaultAvatars);
        setError(null);
      } catch (err: any) {
        setError("Error cargando los datos de ejemplo.");
        console.error(err);
      } finally {
        // Simula un pequeño retraso para la carga, para que la UI no parpadee
        setTimeout(() => setLoading(false), 500);
      }
    };
    
    loadData();
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
          <p className="text-muted-foreground mt-4">Cargando datos de la expedición...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-center">
           <p className="text-destructive font-semibold">Error al cargar la aplicación</p>
           <p className="text-muted-foreground">{error}</p>
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
