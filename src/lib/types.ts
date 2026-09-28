import type { LucideIcon } from 'lucide-react';

export type UserRole = 'Administrador' | 'Usuario';

export type User = {
  id: string;
  name: string;
  email: string;
  rol: UserRole;
  cargo: string;
  birthDate?: string;
};

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
