import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number | string;
  name: string;
  level: number;
  xp: number;
  avatar: string; // Ahora es PREMIO_CAT: 'Bronce', 'Plata', 'Oro'
  progreso?: number;
  vicepresidencia?: string;
  posicion?: number;
  cargo?: string;
};

export type TaskStatus = 'completed' | 'pending';

export type Task = {
  id: number;
  title: string;
  description: string;
  level: number;
  xp: number;
  status: TaskStatus;
};

export type Level = {
  id: number;
  name: string;
  xpThreshold: number;
  worldName: string;
  worldImageId: string;
};

export type CarEvolution = {
  id: number;
  name: string;
  category: 'Bronce' | 'Plata' | 'Oro' | 'Base';
  progressThreshold: number; // Progreso mínimo para alcanzar esta evolución
  imageUrl: string;
  description: string;
};

export type Avatar = {
  id: number;
  name: string;
  level: number;
  imageUrl: string;
  description: string;
};


export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type PrizeCategory = {
  name: 'Diamante' | 'Oro' | 'Plata' | 'Bronce';
};

export type Prize = {
  id: number;
  name: string;
  description: string;
  cost: number;
  imageUrl: string;
  category: PrizeCategory['name'];
};
