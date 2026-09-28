'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

// URL de la aplicación web desplegada en Google Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbw1q3DEqcmAcKeABcKg7MeFDRTwq91WtqL_VQO2_Ajzo0m2U2RZdtexscZ_E_vTUQvbDg/exec';

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

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data.users) setUsers(data.users);
        if (data.cargos) setCargos(data.cargos);
      } catch (e) {
        console.warn('La respuesta de Google no es JSON válido (puede ser una redirección de login).');
      }
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
        throw new Error('Sesión de Google requerida. Por favor, asegúrate de estar logueado en tu cuenta corporativa de Google en este navegador.');
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
        ? 'Error de conexión: Verifica que tengas abierta tu sesión de Google corporativa.' 
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
