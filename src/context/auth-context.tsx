
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

// ASEGÚRATE DE QUE ESTA URL SEA LA DE TU "NUEVA IMPLEMENTACIÓN" (TERMINA EN /exec)
const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbxCX4mEVzFaavUb_xHxUBLGLA1uIrc71k0irG59LIOjHtSSwLfgNAq_fcVDMA-eGhyhlQ/exec';

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
      // Usamos una petición "simple" (sin headers complejos) para evitar el bloqueo CORS del navegador
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify({ action: 'getData' })
      });

      if (!response.ok) return;

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data.users) setUsers(data.users);
        if (data.cargos) setCargos(data.cargos);
      } catch (e) {
        console.warn('Respuesta no válida de Google Sheets. Verifica la sesión de Google.');
      }
    } catch (e) {
      console.warn('Error de conexión con Google Sheets. Si el error persiste, abre la URL del script en otra pestaña.');
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
        mode: 'cors',
        redirect: 'follow',
        body: JSON.stringify({ action: 'login', email, password })
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('Error al procesar respuesta del servidor. Por favor, asegúrate de haber abierto la URL del script en tu navegador al menos una vez.');
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
        ? 'Error de conexión. Esto suele ocurrir si la sesión de Google no está activa. Abre la URL del script en una pestaña nueva, verifica que diga "ACTIVO" y vuelve a intentarlo.' 
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
