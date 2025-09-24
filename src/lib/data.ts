import { Compass, Briefcase, Map, Flag, Home, Trophy, User as UserIcon, ListChecks } from 'lucide-react';
import type { User, Level, Task, Avatar, NavLink } from './types';

export const avatars: Avatar[] = [
  { id: 1, name: 'Brújula', level: 1, Icon: Compass },
  { id: 2, name: 'Mochila de Explorador', level: 2, Icon: Briefcase },
  { id: 3, name: 'Mapa Estelar', level: 3, Icon: Map },
  { id: 4, name: 'Pico y Bandera', level: 4, Icon: Flag },
];

export const levels: Level[] = [
  { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'La Isla del Aspirante', avatarName: 'Brújula', worldImageId: 'world-level-1' },
  { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'El Bosque del Explorador', avatarName: 'Mochila de Explorador', worldImageId: 'world-level-2' },
  { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'Las Cumbres del Navegante', avatarName: 'Mapa Estelar', worldImageId: 'world-level-3' },
  { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'La Metrópolis del Conquistador', avatarName: 'Pico y Bandera', worldImageId: 'world-level-4' },
];

export const users: User[] = [
  { id: 1, name: 'Carlos Rodríguez', level: 1, xp: 850, avatar: 'Brújula' },
  { id: 2, name: 'Ana Martínez', level: 3, xp: 4800, avatar: 'Mapa Estelar' },
  { id: 3, name: 'Luisa Fernández', level: 2, xp: 1800, avatar: 'Mochila de Explorador' },
  { id: 4, name: 'Jorge Pérez', level: 4, xp: 11000, avatar: 'Pico y Bandera' },
  { id: 5, name: 'Sofía Gómez', level: 1, xp: 400, avatar: 'Brújula' },
  { id: 6, name: 'Miguel Torres', level: 2, xp: 2100, avatar: 'Mochila de Explorador' },
  { id: 7, name: 'Elena Ramírez', level: 3, xp: 3200, avatar: 'Mapa Estelar' },
  { id: 8, name: 'David Sánchez', level: 1, xp: 950, avatar: 'Brújula' },
];

// Current user is Carlos Rodríguez
export const currentUser = users[0];

export const tasks: Task[] = [
  { id: 1, title: 'Ver el webinar sobre el nuevo producto X', description: 'Accede al portal de formación y completa el visionado del webinar sobre el producto "Seguro Vida Total".', level: 1, xp: 150, status: 'completed' },
  { id: 2, title: 'Participar en la encuesta de clima laboral', description: 'Tu opinión es importante. Completa la encuesta anual de clima laboral antes de fin de mes.', level: 1, xp: 100, status: 'completed' },
  { id: 3, title: 'Registrar tus objetivos del trimestre', description: 'Define y registra tus OKRs para el Q3 en la plataforma de gestión de talento.', level: 1, xp: 200, status: 'pending' },
  { id: 4, title: 'Curso de Excel Avanzado', description: 'Finaliza el curso asignado en la plataforma de e-learning.', level: 2, xp: 300, status: 'pending' },
  { id: 5, title: 'Reunión de feedback con tu líder', description: 'Agenda y realiza tu sesión de feedback trimestral.', level: 2, xp: 150, status: 'pending' },
  { id: 6, title: 'Presentar resultados del proyecto', description: 'Prepara y presenta los resultados del proyecto "Optimización Digital".', level: 3, xp: 500, status: 'pending' },
  { id: 7, title: 'Mentorear a un nuevo integrante', description: 'Sé el mentor de un nuevo compañero durante su primer mes.', level: 4, xp: 700, status: 'pending' },
];

export const navLinks: NavLink[] = [
    { href: '/', label: 'Inicio', icon: Home },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Mi Perfil', icon: UserIcon },
    { href: '/tasks', label: 'Tareas', icon: ListChecks },
];
