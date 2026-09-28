
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User } from '@/lib/types';

// URL de implementación del Google Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbwj5d3nQsxIurkHs3Hnk8JQ4Z_cgx50BIl2MCumpWe-Hw-X0RndwdWTVjmnINuJiJya7A/exec';

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
      // Petición simple: Sin headers para evitar Preflight OPTIONS que Google rechaza
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'getData' }),
        mode: 'cors',
      });

      if (!response.ok) return;

      const text = await response.text();
      try {
        const data = JSON.parse(text);
        if (data.users) setUsers(data.users);
        if (data.cargos) setCargos(data.cargos);
      } catch (e) {
        // Silencioso para no interrumpir la experiencia si la respuesta no es JSON
      }
    } catch (e) {
      console.warn('Error de conexión inicial. Esto es normal si no hay sesión activa de Google.');
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
      // PETICIÓN ULTRA-SIMPLIFICADA: 
      // Se envía el JSON como texto plano. Esto es clave para saltar el bloqueo de CORS.
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email, password }),
        mode: 'cors',
      });
      
      const text = await response.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error('La respuesta del servidor no es válida. Por favor, asegúrate de haber abierto la URL del script en una pestaña aparte y que diga "ACTIVO".');
      }

      if (data && data.success && data.user) {
        const user: User = data.user;
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        document.cookie = "auth_session=true; path=/";
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error(data?.message || 'Credenciales incorrectas (Correo o Cédula).');
      }
    } catch (err: any) {
      setLoading(false);
      const msg = err.message.includes('Failed to fetch') 
        ? 'Error de conexión con Google. Tu navegador está bloqueando la salida de datos. Abre la URL del script en una pestaña nueva, verifica el mensaje "ACTIVO" y reintenta aquí.' 
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
