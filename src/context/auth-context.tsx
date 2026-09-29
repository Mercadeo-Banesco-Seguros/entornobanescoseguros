'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Contexto de autenticación (Borrador para rediseño).
 * Se ha eliminado la lógica de conexión antigua para implementar la nueva propuesta.
 */

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Comprobar persistencia básica
    const sessionEmail = sessionStorage.getItem('userEmail');
    if (sessionEmail) {
      setIsAuthenticated(true);
      setUserEmail(sessionEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Lógica de login eliminada para rediseño desde cero.
    console.log("Intento de login con:", email, password);
    
    // Simulación temporal para evitar errores de compilación
    if (email && password) {
       console.warn("Esperando instrucciones para implementar el nuevo flujo de conexión.");
    }
  };

  const logout = () => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false);
    setUserEmail(null);
    sessionStorage.removeItem('userEmail');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, userEmail, login, logout }}>
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
        <div className="flex flex-col items-center space-y-2">
            <svg className="animate-spin h-8 w-8 text-[#003B73]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-400 text-[10px] font-light uppercase tracking-tight">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
