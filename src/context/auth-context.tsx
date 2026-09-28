'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level, Prize, PrizeCategory } from '@/lib/types';
import { tasks as staticTasks, levels as staticLevels, avatars as staticAvatars, prizes as staticPrizes, prizeCategories as staticPrizeCategories } from '@/lib/data';

// REEMPLAZA ESTA URL CON TU URL DE DESPLIEGUE DE GOOGLE APPS SCRIPT
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFlj39v2_OzLc0-mEg2MuSXjXwkzWSjHluWEexjXK7OL-rLHZjXbnLFmesV0NX9C_8ig/exec';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  prizes: Prize[];
  prizeCategories: PrizeCategory[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  vicepresidencias: string[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [vicepresidencias, setVicepresidencias] = useState<string[]>(['Todas']);

  const tasks = staticTasks;
  const levels = staticLevels;
  const avatars = staticAvatars;
  const prizes = staticPrizes;
  const prizeCategories = staticPrizeCategories;

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getData' }),
        mode: 'no-cors' // Nota: Las Apps Script con modo web app suelen requerir redirección.
      });

      // Debido a las restricciones de CORS de Apps Script, a menudo es mejor usar un proxy o 
      // manejarlo con el modo 'no-cors' si no se necesita el cuerpo, o una configuración específica.
      // Para un prototipo funcional que retorna JSON, la Apps Script debe permitir el acceso.
      
      // Intento de fetch real (asumiendo que el script permite CORS):
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'getData' })
      });
      const data = await res.json();
      
      if (data.users) {
        setUsers(data.users);
        const allVps = Array.from(new Set(data.users.map((u: any) => u.vicepresidencia).filter(Boolean)));
        setVicepresidencias(['Todas', ...allVps as string[]]);
      }
    } catch (e) {
      console.error('Error fetching users from Sheets:', e);
      // Fallback a vacio o mock si falla
    }
  }, []);

  useEffect(() => {
    const checkSession = () => {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          setCurrentUser(JSON.parse(userJson));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
      fetchUsers();
      setLoading(false);
    };
    checkSession();
  }, [fetchUsers]);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email, password })
      });
      
      const data = await response.json();

      if (data.success && data.user) {
        const user: User = {
          ...data.user,
          level: 1, // Por defecto
          xp: data.user.xp || 0
        };
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setLoading(false);
      } else {
        setLoading(false);
        const msg = data.message || 'Credenciales incorrectas.';
        setError(msg);
        throw new Error(msg);
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message || 'Error de conexión con el servidor.';
      setError(msg);
      throw new Error(msg);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setError(null);
  };

  const value = useMemo(() => ({
    currentUser,
    users,
    tasks,
    levels,
    avatars,
    prizes,
    prizeCategories,
    loading,
    error,
    login,
    logout,
    fetchUsers,
    vicepresidencias,
  }), [currentUser, users, loading, error, fetchUsers, vicepresidencias]);

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
