import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number;
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

// Se ajusta para que el status sea opcional, ya que puede venir o no de la hoja de cálculo.
export type AppDataFromSheet = {
  users: Omit<User, 'id'>[];
  tasks: Omit<Task, 'id'>[];
};
