'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Contexto de autenticación rediseñado desde cero.
 * Gestión de sesión mediante Google Apps Script y persistencia local.
 */

interface User {
  name: string;
  username: string;
  rol: string;
  cargo: string;
  email: string;
  birthDate?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login: (username: string, cedula: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  useEffect(() => {
    // Verificar sesión al cargar
    const savedUser = sessionStorage.getItem('bs_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, cedula: string) => {
    if (!SCRIPT_URL) {
      throw new Error("Configuración del servidor no encontrada (.env)");
    }

    try {
      // Petición POST simple para evitar problemas de CORS corporativo
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', username, password: cedula }),
      });

      const data = await response.json();

      if (data.success) {
        const user = data.user;
        
        // Persistencia
        sessionStorage.setItem('bs_user', JSON.stringify(user));
        
        // Crear cookie para el middleware de NextJS
        document.cookie = `auth_session=active; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
        
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        router.push('/dashboard');
      } else {
        throw new Error(data.message || "Error al validar identidad.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      throw error instanceof Error ? error : new Error("No se pudo conectar con el servidor.");
    }
  };

  const logout = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.removeItem('bs_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth debe usarse dentro de un AuthProvider');
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
          <div className="w-10 h-10 border-2 border-[#003B73] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] text-slate-400 font-light uppercase tracking-widest">Validando Circuito...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
