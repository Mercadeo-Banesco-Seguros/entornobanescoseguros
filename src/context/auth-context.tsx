'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbxS7oblHffYm7gIR0ESlz_9Uxv7tKtv9xqkSI1mwXfZ3zkiIaIX5vBfuO0oxJTVvmHBkA/exec';

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
        // El uso de text/plain evita solicitudes preflight OPTIONS que Apps Script no soporta bien
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'getData' }),
        mode: 'cors',
        redirect: 'follow'
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.users) {
        setUsers(data.users);
      }
      if (data.cargos) {
        setCargos(data.cargos);
      }
    } catch (e) {
      console.warn('No se pudieron obtener los datos de colaboradores. Verifica la configuración de Apps Script:', e);
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
      // Intentar cargar datos globales sin bloquear la carga inicial de la UI
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
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ action: 'login', email, password }),
        mode: 'cors',
        redirect: 'follow'
      });
      
      if (!response.ok) {
        throw new Error(`Error de red (${response.status})`);
      }

      const data = await response.json();

      if (data.success && data.user) {
        const user: User = data.user;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.cookie = "auth_session=true; path=/";
        setLoading(false);
      } else {
        setLoading(false);
        const msg = data.message || 'El correo o la cédula son incorrectos.';
        setError(msg);
        throw new Error(msg);
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message === 'Failed to fetch' 
        ? 'Error de conexión: No se pudo contactar con el servidor. Verifica que el script esté desplegado como "Cualquier persona".' 
        : (err.message || 'Error de conexión con el servidor.');
      setError(msg);
      throw new Error(msg);
    }
  };
  
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    setError(null);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
