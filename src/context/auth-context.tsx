'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

// SUSTITUYE ESTA URL POR TU URL DE IMPLEMENTACIÓN REAL
const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbxcGJCi49y21AvRYeskIpVXUY7QFUp5m8z9iDt8EP3VnUqnwTim6Ek2DN-qEnJfbbtj7A/exec';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  cargos: string[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cargos, setCargos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes('TU_URL_AQUI')) return;

    try {
      // Usamos text/plain para evitar el preflight de CORS que suele fallar en scripts restringidos
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getData' }),
        mode: 'cors',
        redirect: 'follow'
      });

      if (!response.ok) return;

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data.users) setUsers(data.users);
        if (data.cargos) setCargos(data.cargos);
      } catch (e) {
        // Probablemente devolvió HTML porque la sesión de Google no está activa en el navegador
        console.warn('La base de datos requiere sesión activa de Google. Abre la URL del script en otra pestaña.');
      }
    } catch (e) {
      console.warn('No se pudo conectar con la base de datos de Google Sheets.');
    }
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const userJson = localStorage.getItem('currentUser');
      if (userJson) {
        try {
          setCurrentUser(JSON.parse(userJson));
        } catch (e) {
          localStorage.removeItem('currentUser');
        }
      }
      await fetchUsers();
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
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', email, password }),
        mode: 'cors',
        redirect: 'follow'
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Sesión de Google requerida. Por favor, abre la URL del script directamente en tu navegador una vez para autorizar el acceso.');
      }

      if (data.success && data.user) {
        const user: User = data.user;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.cookie = "auth_session=true; path=/";
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(data.message || 'El correo o la cédula son incorrectos.');
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message.includes('Failed to fetch') 
        ? 'Error de conexión. Asegúrate de estar logueado en tu cuenta corporativa de Google y de haber abierto la URL del script al menos una vez.' 
        : err.message;
      setError(msg);
      throw new Error(msg);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  };

  const value = useMemo(() => ({
    currentUser,
    users,
    cargos,
    loading,
    error,
    login,
    logout,
    fetchUsers,
  }), [currentUser, users, cargos, loading, error, fetchUsers]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
