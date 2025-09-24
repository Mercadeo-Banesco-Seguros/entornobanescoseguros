import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number;
  name: string;
  level: number;
  xp: number;
  avatar: string;
};

export type Level = {
  id: number;
  name: string;
  xpThreshold: number;
  worldName: string;
  avatarName: string;
  worldImageId: string;
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

export type Avatar = {
  id: number;
  name: string;
  level: number;
  Icon: LucideIcon;
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};
