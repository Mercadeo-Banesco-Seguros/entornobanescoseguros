
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Task, Level, Avatar, AppData } from '@/lib/types';
import { avatars as staticAvatars } from '@/lib/data';
import { Compass, Backpack, Star, Mountain, LucideIcon } from 'lucide-react';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to get Icon component from string
const iconMap: { [key: string]: LucideIcon } = {
  'Brújula': Compass,
  'Mochila de Explorador': Backpack,
  'Mapa Estelar': Star,
  'Pico y Bandera': Mountain
};

const getIconFromName = (name: string): LucideIcon => {
    return iconMap[name] || Compass;
};


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [levels, setLevels] = useState<Level[]>([]);
  const [avatars, setAvatars] = useState<Avatar[]>([]);
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
        .then((data: AppData) => {
          const loggedInUser = data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
          setCurrentUser(loggedInUser || null);
          setUsers(data.users);
          setTasks(data.tasks);
          setLevels(data.levels);

          const dynamicAvatars = data.avatars.map(a => ({
              ...a,
              Icon: getIconFromName(a.name)
          }));
          setAvatars(dynamicAvatars);

          if (!loggedInUser) {
            setError('Usuario no autorizado.');
          }
        })
        .catch(err => {
          console.error(err);
          setError('Error al cargar los datos de la aplicación.');
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // --- Simulación de Google Apps Script ---
    // En un entorno real de Google Sites, reemplazarías esto
    // con `google.script.run` para obtener el email del usuario.
    const getAuthenticatedUserEmail = () => {
      return new Promise<string>((resolve, reject) => {
        // Simulamos una demora y devolvemos un email de prueba.
        // En tu implementación final, esto vendrá de la sesión de Google.
        setTimeout(() => {
          // Cambia este email para probar con diferentes usuarios de tu Google Sheet
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
      .catch(err => {
        setError('Error en la autenticación.');
        setLoading(false);
      });

  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, users, tasks, levels, avatars, loading, error }}>
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
