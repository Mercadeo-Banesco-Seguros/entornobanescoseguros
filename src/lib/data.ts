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

// Datos de ejemplo para desarrollo local
export const users: User[] = [
  { id: 1, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', level: 1, xp: 850, avatar: 'Explorador' },
  { id: 2, name: 'Ana Martínez', email: 'ana.martinez@example.com', level: 3, xp: 4800, avatar: 'Maestro' },
  { id: 3, name: 'Luis García', email: 'luis.garcia@example.com', level: 2, xp: 1900, avatar: 'Aventurero' },
  { id: 4, name: 'Sofía López', email: 'sofia.lopez@example.com', level: 4, xp: 12500, avatar: 'Leyenda' },
];

export const tasks: Omit<Task, 'status'>[] = [
    { id: 1, title: 'Completar Perfil', description: 'Asegúrate de que toda tu información esté actualizada.', level: 1, xp: 50 },
    { id: 2, title: 'Curso de Bienvenida', description: 'Finaliza el curso introductorio de la empresa.', level: 1, xp: 150 },
    { id: 3, title: 'Primera Venta', description: 'Registra tu primera venta en el sistema.', level: 1, xp: 200 },
    { id: 4, title: 'Venta Cruzada', description: 'Logra una venta de un segundo producto a un cliente.', level: 2, xp: 300 },
    { id: 5, title: 'Mentoría', description: 'Participa como mentor para un nuevo integrante.', level: 3, xp: 500 },
    { id: 6, title: 'Proyecto Innovador', description: 'Lidera un proyecto que mejore un proceso interno.', level: 4, xp: 1000 },
];

// Usuario que simulará estar logueado
export const currentUserEmail = 'carlos.rodriguez@example.com';


export const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Usuario', icon: UserIcon },
    { href: '/tasks', label: 'Tareas', icon: Backpack },
];
