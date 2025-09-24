import type { LucideIcon } from 'lucide-react';

export type User = {
  id: number; // Suponiendo que el script lo genera
  name: string;
  email: string;
  level: number;
  xp: number;
  avatar: string;
};

// Ya no necesitamos una entidad Level separada, la información está en User
// y en la propia Task.

export type TaskStatus = 'completed' | 'pending';

export type Task = {
  id: number;
  title: string;
  description: string;
  level: number;
  xp: number;
  // El status será determinado dinámicamente
  status?: TaskStatus;
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

// AppData se simplifica, ya no traerá Levels y Avatars como listas separadas
export type AppDataFromSheet = {
  users: Omit<User, 'id'>[]; // El script no necesita devolver 'id'
  tasks: Omit<Task, 'status'>[];
};
