import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number | string;
  name: string;
  email: string;
  level: number;
  xp: number;
  avatar: string;
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
  story: string;
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

export type PrizeCategory = 'Diamante' | 'Oro' | 'Plata' | 'Bronce';

export type Prize = {
  id: number;
  name: string;
  description: string;
  cost: number;
  imageUrl: string;
  category: PrizeCategory;
};
