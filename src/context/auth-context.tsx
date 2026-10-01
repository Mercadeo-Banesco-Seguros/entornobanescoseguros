'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

/**
 * @fileOverview Contexto de autenticación optimizado para el Portal Corporativo.
 * Garantiza que la redirección post-login sea a la página de Inicio.
 */

interface User {
  name: string;
  username: string;
  rol: string;
  cargo: string;
  email: string;
  birthDate?: string;
  id?: string;
  avatar?: string;
  progreso?: number;
  prog_pol?: number;
  prog_sus?: number;
  prog_cob?: number;
  vicepresidencia?: string;
  level?: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login: (username: string, cedula: string) => Promise<void>;
  logout: () => void;
  users: User[];
  fetchUsers: () => Promise<void>;
  loading: boolean;
  error: string | null;
  vicepresidencias: string[];
  levels: any[];
  prizes: any[];
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  React.useEffect(() => {
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

  const login = React.useCallback(async (username: string, cedula: string) => {
    if (!SCRIPT_URL) {
      throw new Error("URL del servidor no configurada.");
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
        throw new Error("Error en la respuesta del servidor.");
      }

      if (data.success && data.user) {
        const userWithMeta = {
          ...data.user,
          avatar: data.user.rol === 'Administrador' ? 'Oro' : (data.user.avatar || 'Base'),
          progreso: data.user.progreso || 0,
          id: data.user.username || data.user.email
        };
        
        sessionStorage.setItem('bs_user', JSON.stringify(userWithMeta));
        document.cookie = `auth_session=active; path=/; max-age=${60 * 60 * 24}; SameSite=None; Secure`;
        
        setCurrentUser(userWithMeta);
        setIsAuthenticated(true);
        window.location.href = '/';
      } else {
        throw new Error(data.message || "Usuario o cédula incorrectos.");
      }
    } catch (error) {
      console.error("Auth Error:", error);
      throw error instanceof Error ? error : new Error("Error de conexión con el servidor corporativo.");
    }
  }, [SCRIPT_URL]);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const { mockUsers } = await import('@/lib/data');
      setUsers(mockUsers);
    } catch (e) {
      setError("No se pudieron cargar los datos de los colaboradores.");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = React.useCallback(() => {
    document.cookie = "auth_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    sessionStorage.removeItem('bs_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    window.location.href = '/login';
  }, []);

  const value = React.useMemo(() => ({
    isAuthenticated,
    isLoading,
    currentUser,
    login,
    logout,
    users,
    fetchUsers,
    loading,
    error,
    vicepresidencias: ['Todas', 'VP. Comercial Gran Caracas', 'VP. Comercial Oriente', 'VP. Comercial Zulia - Falcón'],
    levels: [],
    prizes: []
  }), [isAuthenticated, isLoading, currentUser, login, logout, users, fetchUsers, loading, error]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-2 border-[#003B73] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] text-slate-400 font-light uppercase tracking-widest">Cargando Portal...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
