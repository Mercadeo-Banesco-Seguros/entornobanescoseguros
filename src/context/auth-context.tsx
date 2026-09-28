'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Contexto de autenticación.
 * Gestiona el estado del usuario, el inicio de sesión y la protección de rutas.
 */

const api = {
  async login(email: string, password: string): Promise<{ success: boolean; message: string }> {
    // Intentar obtener la URL de las variables de entorno
    const scriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
    
    if (!scriptUrl || scriptUrl.includes("TU_URL")) {
      return { success: false, message: "URL de servidor no configurada en .env.local" };
    }
    
    try {
      // Usamos una petición POST simple (sin headers complejos) para evitar el bloqueo de CORS
      // Google Apps Script maneja mejor las peticiones cuando se envían como texto plano
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ action: 'login', email, password }),
      });
      
      // IMPORTANTE: Leemos como texto primero. Google Apps Script con MimeType.TEXT
      // es la única forma fiable de evitar errores de CORS en entornos restringidos.
      const text = await response.text();
      
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Error al parsear respuesta:", text);
        return { success: false, message: "Respuesta inválida del servidor." };
      }
    } catch (error) {
      console.error("Error de red:", error);
      return { success: false, message: "Error de conexión con el servidor. Verifique su conexión a la red interna." };
    }
  },
};

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
    // Comprobar persistencia
    const sessionEmail = sessionStorage.getItem('userEmail');
    if (sessionEmail) {
      setIsAuthenticated(true);
      setUserEmail(sessionEmail);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success) {
      setIsAuthenticated(true);
      setUserEmail(email);
      sessionStorage.setItem('userEmail', email);
      
      // Establecer cookie para el middleware
      document.cookie = "auth_session=true; path=/; max-age=86400; SameSite=Lax";
      
      router.push('/dashboard');
    } else {
      throw new Error(response.message || "Credenciales incorrectas.");
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
