
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User } from '@/lib/types';

/**
 * @fileOverview Contexto de autenticación institucional.
 * Gestiona la comunicación con Google Apps Script y la protección de rutas.
 */

// La URL se lee de la variable de entorno configurada en el despliegue
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || "TU_URL_AQUI";

const api = {
  async login(email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    if (!APPS_SCRIPT_URL || APPS_SCRIPT_URL.includes("TU_URL")) {
      return { success: false, message: "Error: URL de Apps Script no configurada." };
    }
    
    try {
      // CRÍTICO: Eliminamos la propiedad 'headers' por completo.
      // Al enviar el body sin especificar un Content-Type, el navegador lo trata como 'text/plain'.
      // Esto convierte la petición en una "Simple Request", evitando el Preflight de CORS que Google bloquea.
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'login', email, password }),
        credentials: 'include', // Indispensable para enviar las cookies de sesión de la organización
      });
      
      const text = await response.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no válida del script:", text);
        return { success: false, message: "Respuesta inesperada del servidor institucional." };
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      return { success: false, message: "Error de conexión. Abre la URL del script en otra pestaña para activar la sesión de tu organización y recarga esta página." };
    }
  },

  async getData(): Promise<{ users: User[]; cargos: string[] }> {
    if (!APPS_SCRIPT_URL) return { users: [], cargos: [] };
    try {
      const response = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ action: 'getData' }),
        credentials: 'include',
      });
      const text = await response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Data Fetch Error:", error);
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
  fetchUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [cargos, setCargos] = useState<string[]>([]);
  const router = useRouter();

  const fetchUsers = useCallback(async () => {
    const data = await api.getData();
    if (data.users) setUsers(data.users);
    if (data.cargos) setCargos(data.cargos);
  }, []);

  useEffect(() => {
    const checkSession = async () => {
      const savedUser = sessionStorage.getItem('currentUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          setIsAuthenticated(true);
          setCurrentUser(user);
          await fetchUsers();
        } catch (e) {
          sessionStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };
    checkSession();
  }, [fetchUsers]);

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password);
    if (response.success && response.user) {
      setIsAuthenticated(true);
      setCurrentUser(response.user);
      sessionStorage.setItem('currentUser', JSON.stringify(response.user));
      
      // Cookie para persistencia en el middleware
      document.cookie = `auth_session=true; path=/; max-age=86400; SameSite=Lax`;
      
      await fetchUsers();
      router.push('/');
    } else {
      throw new Error(response.message || "Credenciales incorrectas.");
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
      cargos, 
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
            <p className="text-slate-400 text-xs font-light tracking-tight">Verificando sesión institucional...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
