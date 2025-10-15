'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import type { User, Task, Avatar, Level, Prize, PrizeCategory } from '@/lib/types';
import { tasks as staticTasks, levels as staticLevels, avatars as staticAvatars, prizes as staticPrizes, prizeCategories as staticPrizeCategories } from '@/lib/data';

type AuthContextType = {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: Avatar[];
  prizes: Prize[];
  prizeCategories: PrizeCategory[];
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  redeemPrize: (prize: Prize) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Static data from data.ts
  const tasks = staticTasks.map(t => ({...t, status: 'pending'}) as Task);
  const levels = staticLevels;
  const avatars = staticAvatars;
  const prizes = staticPrizes;
  const prizeCategories = staticPrizeCategories;


  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getData' }),
        cache: 'no-store',
      });
      const data = await response.json();
      if (data.error) throw new Error(data.message);
      
      const allUsers = (data.users || []).map((u: any) => ({
        id: u.correo,
        name: u.nombre,
        email: u.correo,
        level: Number(u.nivel),
        xp: Number(u.puntaje),
        avatar: u.avatar
      }));
      setUsers(allUsers);
    } catch (err: any) {
      setError("Error cargando los datos del ranking: " + err.message);
      console.error(err);
    }
  }, []);

  const loadInitialData = useCallback(async () => {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
        try {
            const user = JSON.parse(userJson);
            setCurrentUser(user);
            await fetchUsers();
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('currentUser');
        }
    }
  }, [fetchUsers]);

  useEffect(() => {
    const checkUserSession = async () => {
      setLoading(true);
      setError(null);
      await loadInitialData();
      setLoading(false);
    };
    checkUserSession();
  }, [loadInitialData]);
  
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'login', email, password }),
        });

        const data = await response.json();
        if (data.error || !data.user) {
            throw new Error(data.message || 'Credenciales inválidas');
        }
        
        const user: User = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            level: Number(data.user.level),
            xp: Number(data.user.xp),
            avatar: data.user.avatar
        };

        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        await fetchUsers();
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
     try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'register', name, email, password }),
        });

        const data = await response.json();
        if (data.error) {
          throw new Error(data.message);
        }
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  };

  const redeemPrize = async (prize: Prize) => {
    if (!currentUser) throw new Error("Usuario no autenticado");
    if (currentUser.xp < prize.cost) throw new Error("No tienes suficientes puntos");

    try {
        const response = await fetch('/api/bazar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                action: 'registerPurchase',
                userId: currentUser.id,
                prizeId: prize.id,
                cost: prize.cost,
            }),
        });

        const result = await response.json();
        if (result.error) {
            throw new Error(result.message);
        }

        // Si la compra es exitosa, actualiza los puntos del usuario en el frontend
        const updatedUser = { ...currentUser, xp: currentUser.xp - prize.cost };
        setCurrentUser(updatedUser);
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    } catch (err: any) {
        console.error("Error al canjear el premio:", err.message);
        throw err; // Lanza el error para que la UI pueda manejarlo
    }
  };


  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setUsers([]);
    setError(null);
  };

  const value = useMemo(() => ({
    currentUser,
    users,
    tasks,
    levels,
    avatars,
    prizes,
    prizeCategories,
    loading,
    error,
    login,
    register,
    logout,
    fetchUsers,
    redeemPrize
  }), [currentUser, users, tasks, levels, avatars, prizes, prizeCategories, loading, error, fetchUsers]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
