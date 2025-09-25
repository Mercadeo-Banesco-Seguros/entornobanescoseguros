
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar, Level, AppDataFromSheet } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels, currentUserEmail } from '@/lib/data';

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

// Define un flag para alternar entre desarrollo y producción.
// Cámbialo a 'production' cuando quieras usar Apps Script.
const ENVIRONMENT = 'development'; 

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // --- LÓGICA DE PRODUCCIÓN CON APPS SCRIPT ---
    const loadProductionData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/data?email=${encodeURIComponent(currentUserEmail)}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error al obtener los datos de producción.');
        }
        
        const data: AppDataFromSheet = await response.json();
        
        // Asignar IDs a los datos que vienen del sheet
        const allUsers = data.users.map((u, index) => ({ ...u, id: index + 1, level: Number(u.level), xp: Number(u.xp) }));
        const allTasks = data.tasks.map((t, index) => ({ ...t, id: index + 1, level: Number(t.level), xp: Number(t.xp) }));

        const loggedInUser = allUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());

        if (loggedInUser) {
           // En producción, asumimos que el status de las tareas vendrá del backend
           // o se determinará con una lógica más compleja.
           // Por ahora, las mostraremos todas como pendientes.
          const userTasks = allTasks.map(task => ({
            ...task,
            status: task.status || 'pending'
          }));

          setCurrentUser(loggedInUser);
          setUsers(allUsers);
          setTasks(userTasks);
        } else {
          throw new Error('Usuario no encontrado en los datos de producción.');
        }

      } catch (e: any) {
        console.error("Error en producción, cargando datos locales.", e);
        setError(`Error al cargar datos de producción: ${e.message}. Se usarán datos locales.`);
        loadDevelopmentData(); // Carga los datos locales si falla la producción
      } finally {
        setLoading(false);
      }
    };
    
    // --- LÓGICA DE DESARROLLO CON DATOS LOCALES ---
    const loadDevelopmentData = async () => {
      setLoading(true);
      setError(null);
      // Importamos los datos locales solo cuando se necesitan
      const { users: staticUsers, tasks: staticTasks } = await import('@/lib/data');
      
      const loggedInUser = staticUsers.find(u => u.email.toLowerCase() === currentUserEmail.toLowerCase());

      if (loggedInUser) {
        // En desarrollo, podemos simular el estado de las tareas.
        // Por ejemplo, aquí las marcamos todas como pendientes.
        // Puedes cambiar esta lógica si necesitas simular tareas completadas.
        const userTasks = staticTasks.map(task => ({
          ...task,
          status: 'pending' // Forzamos a 'pending' para el ejemplo
        }));
        
        setTimeout(() => { // Simular carga
          setCurrentUser(loggedInUser);
          setUsers(staticUsers);
          setTasks(userTasks);
          setLoading(false);
        }, 1000);

      } else {
        setError('Usuario de desarrollo no encontrado.');
        setLoading(false);
      }
    };

    if (ENVIRONMENT === 'production') {
      loadProductionData();
    } else {
      loadDevelopmentData();
    }
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
