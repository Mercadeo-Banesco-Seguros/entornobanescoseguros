
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Avatar } from '@/lib/types';
import { avatars as staticAvatars, levels as staticLevels } from '@/lib/data';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = (email: string) => {
      fetch(`/api/data?email=${encodeURIComponent(email)}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to fetch data');
          }
          return res.json();
        })
        .then(data => {
          // Asignar IDs a los usuarios y tareas
          const allUsers: User[] = data.users.map((u: Omit<User, 'id'>, index: number) => ({ ...u, id: index + 1 }));
          const allTasks: Task[] = data.tasks.map((t: Omit<Task, 'status'>, index: number) => ({ ...t, id: index + 1 }));

          const loggedInUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

          if (loggedInUser) {
            // Determinar el estado de las tareas para el usuario actual
            // Una tarea está 'completed' si su nivel es INFERIOR al nivel del usuario.
            // Las tareas del nivel actual del usuario están 'pending'.
            const userTasks = allTasks.map(task => ({
              ...task,
              status: task.level < loggedInUser.level ? 'completed' : 'pending'
            }));

            setCurrentUser(loggedInUser);
            setTasks(userTasks);
          } else {
            setError('Usuario no autorizado.');
          }

          setUsers(allUsers);
        })
        .catch(err => {
          console.error(err);
          setError('Error al cargar los datos de la aplicación.');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const getAuthenticatedUserEmail = () => {
      return new Promise<string>((resolve) => {
        setTimeout(() => {
          resolve('carlos.rodriguez@example.com');
        }, 1500);
      });
    };
    
    getAuthenticatedUserEmail()
      .then(email => {
        if (email) {
          fetchUserData(email);
        } else {
          setError('No se pudo obtener el email del usuario.');
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Error en la autenticación.');
        setLoading(false);
      });

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
