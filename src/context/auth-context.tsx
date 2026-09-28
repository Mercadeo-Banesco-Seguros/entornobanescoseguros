'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

/**
 * @fileOverview Contexto de autenticación.
 * Gestiona el estado del usuario, el inicio de sesión y la protección de rutas.
 */

// Fallback por si la variable de entorno no está configurada
const FALLBACK_URL = "https://script.google.com/macros/s/XXXXX/exec";

const api = {
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || FALLBACK_URL;
    
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      
      const text = await response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Auth API Error:", error);
      return { success: false, message: "Error de conexión con el servidor. Verifica tu sesión de Google en el navegador." };
    }
  },

  async getData(): Promise<{ users: any[]; cargos: string[] }> {
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || FALLBACK_URL;
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getData' }),
      });
      const text = await response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Data API Error:", error);
      return { users: [], cargos: [] };
    }
  }
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  users: User[];
  cargos: string[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cargos, setCargos] = useState<string[]>([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await api.getData();
    setUsers(data.users || []);
    setCargos(data.cargos || []);
  };

  useEffect(() => {
    const checkSession = async () => {
      const savedUser = sessionStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setIsAuthenticated(true);
          setCurrentUser(user);
          await fetchData();
        } catch (e) {
          sessionStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success && response.user) {
      const user = response.user as User;
      setIsAuthenticated(true);
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      await fetchData();
      router.push('/');
    } else {
      throw new Error(response.message || "Credenciales incorrectas.");
    }
  };

  const logout = () => {
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
      cargos, 
      login, 
      logout,
      fetchData 
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
            <p className="text-slate-400 text-xs font-light tracking-tight">Verificando sesión institucional...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};