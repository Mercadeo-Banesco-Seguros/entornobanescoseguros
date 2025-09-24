import { Home, Trophy, User as UserIcon, Backpack } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level } from './types';

export const avatars: Avatar[] = [
  { id: 1, name: 'Explorador', level: 1, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(1).png?raw=true' },
  { id: 2, name: 'Aventurero', level: 2, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_d8yt3ld8yt3ld8yt-Photoroom.png?raw=true' },
  { id: 3, name: 'Maestro', level: 3, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_wmczxswmczxswmcz-Photoroom.png?raw=true' },
  { id: 4, name: 'Leyenda', level: 4, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_8xqjlv8xqjlv8xqj-Photoroom.png?raw=true' },
];

export const levels: Level[] = [
    { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'Mundo Desierto', worldImageId: 'world-level-1' },
    { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'El Bosque del Explorador', worldImageId: 'world-level-2' },
    { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'Las Cumbres del Navegante', worldImageId: 'world-level-3' },
    { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'La Metrópolis del Conquistador', worldImageId: 'world-level-4' },
];

// Los datos de users y tasks ahora vendrán de la API.
export const users: User[] = [];
export const tasks: Task[] = [];
export const currentUser: User | null = null;


export const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Usuario', icon: UserIcon },
    { href: '/tasks', label: 'Tareas', icon: Backpack },
];
