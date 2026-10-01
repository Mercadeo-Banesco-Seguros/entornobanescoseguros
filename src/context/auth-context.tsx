'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

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

interface CalendarDayData {
  date: string;
  events: string[];
  birthdays: string[];
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: User | null;
  login: (username: string, cedula: string) => Promise<void>;
  logout: () => void;
  users: User[];
  fetchUsers: () => Promise<void>;
  fetchCalendarData: () => Promise<CalendarDayData[]>;
  updateCalendarDay: (date: string, updates: { events: string[], birthdays: string[] }) => Promise<void>;
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
  const CALENDAR_SCRIPT_URL = process.env.NEXT_PUBLIC_CALENDAR_SCRIPT_URL;

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
    if (!SCRIPT_URL) throw new Error("URL del servidor de autenticación no configurada.");

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
        console.error("Respuesta no válida del servidor de acceso:", text);
        throw new Error("El servidor devolvió una respuesta no válida. Verifica el despliegue del script.");
      }

      if (data.success && data.user) {
        const userWithMeta = {
          ...data.user,
          avatar: data.user.rol === 'Administrador' ? 'Oro' : (data.user.avatar || 'Base'),
          progreso: data.user.progreso || 0,
          id: data.user.username || data.user.email
        };
        sessionStorage.setItem('bs_user', JSON.stringify(userWithMeta));
        setCurrentUser(userWithMeta);
        setIsAuthenticated(true);
        window.location.href = '/';
      } else {
        throw new Error(data.message || "Usuario o cédula incorrectos.");
      }
    } catch (error) {
      throw error instanceof Error ? error : new Error("Error de conexión con el servidor de acceso.");
    }
  }, [SCRIPT_URL]);

  const fetchCalendarData = React.useCallback(async () => {
    if (!CALENDAR_SCRIPT_URL) {
      console.warn("NEXT_PUBLIC_CALENDAR_SCRIPT_URL no configurada.");
      return [];
    }
    try {
      const response = await fetch(CALENDAR_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'getCalendar' }),
      });
      
      const text = await response.text();
      let data;
      
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Respuesta no válida del servidor de calendario (GET):", text);
        return [];
      }
      
      return (data.success && Array.isArray(data.data)) ? data.data : [];
    } catch (e) {
      console.error("Error fetching calendar:", e);
      return [];
    }
  }, [CALENDAR_SCRIPT_URL]);

  const updateCalendarDay = React.useCallback(async (date: string, updates: { events: string[], birthdays: string[] }) => {
    if (!CALENDAR_SCRIPT_URL) throw new Error("URL del servidor de calendario no configurada.");
    try {
      const response = await fetch(CALENDAR_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'updateCalendar', date, updates }),
      });

      if (!response.ok) {
        throw new Error(`Error de conexión HTTP: ${response.status}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error("Respuesta no válida del servidor de calendario (UPDATE):", text);
        throw new Error("El servidor devolvió una respuesta no válida (HTML). Revisa los permisos del script.");
      }

      if (!data.success) {
        throw new Error(data.message || "Error al actualizar la base de datos de calendario.");
      }
    } catch (error) {
      console.error("Error en updateCalendarDay:", error);
      throw error;
    }
  }, [CALENDAR_SCRIPT_URL]);

  const fetchUsers = React.useCallback(async () => {
    setLoading(true);
    try {
      const { mockUsers } = await import('@/lib/data');
      setUsers(mockUsers);
    } catch (e) {
      setError("Error al cargar colaboradores.");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = React.useCallback(() => {
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
    fetchCalendarData,
    updateCalendarDay,
    loading,
    error,
    vicepresidencias: ['Todas', 'VP. Comercial Gran Caracas', 'VP. Comercial Oriente', 'VP. Comercial Zulia - Falcón'],
    levels: [
      { id: 1, name: 'Etapa 1', worldName: 'Gran Caracas', worldImageId: 'world-level-1' },
      { id: 2, name: 'Etapa 2', worldName: 'Ctro. Occid. Los Andes', worldImageId: 'world-level-2' },
      { id: 3, name: 'Etapa 3', worldName: 'Centro Llanos - Carabobo', worldImageId: 'world-level-3' },
      { id: 4, name: 'Etapa 4', worldName: 'Oriente', worldImageId: 'world-level-4' },
      { id: 5, name: 'Etapa 5', worldName: 'Zulia - Falcón', worldImageId: 'world-level-5' },
    ],
    prizes: [
      { id: 1, name: 'Primer Lugar', imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-4-Photoroom.png' },
      { id: 2, name: 'Segundo Lugar', imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-5-Photoroom.png' },
      { id: 3, name: 'Tercer Lugar', imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-6-Photoroom.png' },
    ]
  }), [isAuthenticated, isLoading, currentUser, login, logout, users, fetchUsers, fetchCalendarData, updateCalendarDay, loading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
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
    if (!isLoading && !isAuthenticated) router.replace('/login');
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