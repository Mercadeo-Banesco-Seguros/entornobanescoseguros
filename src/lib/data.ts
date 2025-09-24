import { Home, Trophy, User as UserIcon, Compass, Backpack, Star, Mountain } from 'lucide-react';
import type { User, Level, Task, Avatar, NavLink } from './types';

// This file now contains placeholder/default data.
// The actual data will be fetched from the API.

export const avatars: Avatar[] = [
  { id: 1, name: 'Brújula', level: 1, Icon: Compass },
  { id: 2, name: 'Mochila de Explorador', level: 2, Icon: Backpack },
  { id: 3, name: 'Mapa Estelar', level: 3, Icon: Star },
  { id: 4, name: 'Pico y Bandera', level: 4, Icon: Mountain },
];

export const levels: Level[] = [
  { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'Mundo Desierto', avatarName: 'Brújula', worldImageId: 'world-level-1' },
  { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'El Bosque del Explorador', avatarName: 'Mochila de Explorador', worldImageId: 'world-level-2' },
  { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'Las Cumbres del Navegante', avatarName: 'Mapa Estelar', worldImageId: 'world-level-3' },
  { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'La Metrópolis del Conquistador', avatarName: 'Pico y Bandera', worldImageId: 'world-level-4' },
];

export const users: User[] = [
  { id: 1, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', level: 1, xp: 850, avatar: 'Brújula' },
  { id: 2, name: 'Ana Martínez', email: 'ana.martinez@example.com', level: 3, xp: 4800, avatar: 'Mapa Estelar' },
  { id: 3, name: 'Luisa Fernández', email: 'luisa.fernandez@example.com', level: 2, xp: 1800, avatar: 'Mochila de Explorador' },
  { id: 4, name: 'Jorge Pérez', email: 'jorge.perez@example.com', level: 4, xp: 11000, avatar: 'Pico y Bandera' },
  { id: 5, name: 'Sofía Gómez', email: 'sofia.gomez@example.com', level: 1, xp: 400, avatar: 'Brújula' },
  { id: 6, name: 'Miguel Torres', email: 'miguel.torres@example.com', level: 2, xp: 2100, avatar: 'Mochila de Explorador' },
  { id: 7, name: 'Elena Ramírez', email: 'elena.ramirez@example.com', level: 3, xp: 3200, avatar: 'Mapa Estelar' },
  { id: 8, name: 'David Sánchez', email: 'david.sanchez@example.com', level: 1, xp: 950, avatar: 'Brújula' },
];

// The concept of a single 'currentUser' is deprecated.
// The logged-in user will be determined via AuthContext.
export const currentUser = users[0];

export const tasks: Task[] = [
    { id: 1, title: 'Get Fitter', description: 'Tone up & feel healthy', level: 1, xp: 150, status: 'completed' },
    { id: 2, title: 'Lose Weight', description: 'Burn fat & get lean', level: 1, xp: 100, status: 'pending' },
    { id: 3, title: 'Gain Muscle', description: 'Build mass & strength', level: 1, xp: 200, status: 'pending' },
    { id: 4, title: 'Lose Weight', description: 'Burn fat & get lean', level: 2, xp: 300, status: 'pending' },
    { id: 5, title: 'Gain Muscle', description: 'Build mass & strength', level: 2, xp: 150, status: 'pending' },
];

export const navLinks: NavLink[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Usuario', icon: UserIcon },
];
