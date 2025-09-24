import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number;
  name: string;
  email: string;
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
  Icon: ((props: React.SVGProps<SVGSVGElement>) => JSX.Element) | LucideIcon;
};

export type NavLink = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type AppData = {
  users: User[];
  tasks: Task[];
  levels: Level[];
  avatars: { id: number; name: string; level: number; }[];
}
