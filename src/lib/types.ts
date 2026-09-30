import type { LucideIcon } from 'lucide-react';

export type UserRole = 'Administrador' | 'Usuario';

export interface User {
  name: string;
  username: string;
  rol: string;
  cargo: string;
  email: string;
  birthDate?: string;
  // Campos para compatibilidad con el resto de la app
  id?: string;
  avatar?: string;
  progreso?: number;
  prog_pol?: number;
  prog_sus?: number;
  prog_cob?: number;
  vicepresidencia?: string;
  level?: number;
}

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type TaskStatus = 'completed' | 'pending';

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};

export type Level = {
  id: number;
  name: string;
  worldName: string;
  worldImageId: string;
};

export type Avatar = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
};

export type PrizeCategory = {
  name: 'Oro' | 'Plata' | 'Bronce';
};

export type Prize = {
  id: number;
  name: string;
  description: string;
  cost: number;
  imageUrl: string;
  category: PrizeCategory['name'];
};

export interface CarEvolution {
  id: number;
  name: string;
  category: string;
  progressThreshold: number;
  imageUrl: string;
  description: string;
}
