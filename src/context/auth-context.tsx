'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

/**
 * @fileOverview Contexto de autenticación.
 * Gestiona el estado del usuario, el inicio de sesión y la protección de rutas.
 */

const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || 'https://script.google.com/a/macros/banescoseguros.com/s/AKfycbwj5d3nQsxIurkHs3Hnk8JQ4Z_cgx50BIl2MCumpWe-Hw-X0RndwdWTVjmnINuJiJya7A/exec';

const api = {
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: any }> {
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      
      const text = await response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Auth API Error:", error);
      return { success: false, message: "Error de conexión con el servidor. Por favor, asegúrate de haber autorizado el script de Google en tu navegador." };
    }
  },
};

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Comprobar si hay una sesión guardada en sessionStorage
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setCurrentUser(user);
      } catch (e) {
        sessionStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success && response.user) {
      const user = response.user as User;
      setIsAuthenticated(true);
      setCurrentUser(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      router.push('/');
    } else {
      throw new Error(response.message || "Credenciales incorrectas.");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, currentUser, login, logout }}>
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
            <p className="text-slate-400 text-xs font-light tracking-tight">Verificando credenciales...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
