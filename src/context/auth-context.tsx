'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

/**
 * @fileOverview Contexto de autenticación institucional.
 * Utiliza GET para máxima compatibilidad con Google Apps Script en entornos restringidos.
 */

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "";

const api = {
  async request(params: Record<string, string>) {
    if (!APPS_SCRIPT_URL) throw new Error("URL de servidor no configurada.");
    
    const query = new URLSearchParams(params).toString();
    const url = `${APPS_SCRIPT_URL}?${query}`;

    try {
      // Usamos GET para evitar problemas de CORS con el redireccionamiento de Google
      const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
      });
      
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no JSON:", text);
        throw new Error("Respuesta inválida del servidor.");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      throw new Error("Error de conexión. Verifica la URL del script.");
    }
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    try {
      const data = await api.request({ action: 'getData' });
      if (data.users) setUsers(data.users);
    } catch (e) {
      console.error("Error al cargar usuarios:", e);
    }
  }, []);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setCurrentUser(user);
        fetchUsers();
      } catch (e) {
        sessionStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, [fetchUsers]);

  const login = async (email: string, password: string) => {
    const data = await api.request({ action: 'login', email, password });
    
    if (data.success && data.user) {
      const userData = data.user;
      setIsAuthenticated(true);
      setCurrentUser(userData);
      sessionStorage.setItem('currentUser', JSON.stringify(userData));
      
      // Cookie para el middleware
      document.cookie = `auth_session=true; path=/; max-age=86400; SameSite=Lax`;
      
      await fetchUsers();
      router.push('/');
    } else {
      throw new Error(data.message || "Credenciales incorrectas.");
    }
  };

  const logout = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      isLoading, 
      currentUser, 
      users, 
      login, 
      logout,
      fetchUsers 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003B73]"></div>
            <p className="text-slate-400 text-xs font-light">Validando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};