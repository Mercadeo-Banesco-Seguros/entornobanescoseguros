'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

// REEMPLAZA ESTA URL CON LA QUE TE DA GOOGLE AL IMPLEMENTAR COMO APP WEB
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFlj39v2_OzLc0-mEg2MuSXjXwkzWSjHluWEexjXK7OL-rLHZjXbnLFmesV0NX9C_8ig/exec';

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
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'getData' }),
        mode: 'cors',
        redirect: 'follow'
      });

      if (!response.ok) return;

      const data = await response.json();
      if (data.users) setUsers(data.users);
      if (data.cargos) setCargos(data.cargos);
    } catch (e) {
      console.warn('Error al cargar datos globales:', e);
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
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'login', email, password }),
        mode: 'cors',
        redirect: 'follow'
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('La respuesta del servidor no es válida. Verifica la configuración del script.');
      }

      if (data.success && data.user) {
        const user: User = data.user;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.cookie = "auth_session=true; path=/";
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(data.message || 'Credenciales incorrectas.');
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message.includes('Failed to fetch') 
        ? 'Error de conexión: No se pudo contactar con el servidor. Verifica que el script esté desplegado como "Cualquier persona".' 
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
  }), [currentUser, users, cargos, loading, error, login, logout, fetchUsers]);

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