'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Contexto de autenticación robusto.
 * Maneja la comunicación con Google Apps Script y la redirección forzada.
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

  const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  useEffect(() => {
    const savedUser = sessionStorage.getItem('bs_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (e) {
        sessionStorage.removeItem('bs_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, cedula: string) => {
    if (!SCRIPT_URL) {
      throw new Error("URL del servidor no configurada en .env.local");
    }

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'login', username, password: cedula }),
      });

      const text = await response.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error("La respuesta del servidor no es válida.");
      }

      if (data.success && data.user) {
        const user = data.user;
        
        // 1. Guardar sesión en el almacenamiento local del navegador
        sessionStorage.setItem('bs_user', JSON.stringify(user));
        
        // 2. Establecer cookie para el middleware (necesaria para el acceso a rutas)
        // Usamos SameSite=None y Secure para máxima compatibilidad en iframes de previsualización
        document.cookie = `auth_session=active; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`;
        
        // 3. Actualizar estado local
        setCurrentUser(user);
        setIsAuthenticated(true);
        
        // 4. Redirección forzada mediante recarga de ventana
        // Esto soluciona el problema de quedarse "pegado" en el login en el editor
        window.location.replace('/');
      } else {
        throw new Error(data.message || "Usuario o cédula incorrectos.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      throw error instanceof Error ? error : new Error("Error de comunicación con el circuito.");
    }
  };

  const logout = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.removeItem('bs_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    window.location.replace('/login');
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
          <p className="text-[10px] text-slate-400 font-light uppercase tracking-widest">Iniciando Circuito...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};