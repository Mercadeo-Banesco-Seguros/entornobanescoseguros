import { Home, Trophy, User as UserIcon, Compass, Backpack, Star, Mountain } from 'lucide-react';
import type { User, Task, Avatar, NavLink } from './types';

// Los avatares ahora son estáticos en el frontend, ya que no cambian a menudo.
// La lógica los asignará según el nivel del usuario.
export const avatars: Avatar[] = [
  { id: 1, name: 'Brújula', level: 1, Icon: Compass },
  { id: 2, name: 'Mochila de Explorador', level: 2, Icon: Backpack },
  { id: 3, name: 'Mapa Estelar', level: 3, Icon: Star },
  { id: 4, name: 'Pico y Bandera', level: 4, Icon: Mountain },
];

// Los niveles también pueden ser estáticos o definidos por los umbrales de XP.
// Esto simplifica la hoja de cálculo.
export const levels = [
    { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'Mundo Desierto', worldImageId: 'world-level-1' },
    { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'El Bosque del Explorador', worldImageId: 'world-level-2' },
    { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'Las Cumbres del Navegante', worldImageId: 'world-level-3' },
    { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'La Metrópolis del Conquistador', worldImageId: 'world-level-4' },
];

// Los datos de users y tasks ahora vendrán de la API, por lo que estos son solo para referencia.
export const users: User[] = [];
export const tasks: Task[] = [];
export const currentUser: User | null = null;


export const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Usuario', icon: UserIcon },
];
