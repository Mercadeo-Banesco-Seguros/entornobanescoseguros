import { Trophy, User as UserIcon, LucideIcon, Rocket, ClipboardList } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level } from './types';

export const avatars: Avatar[] = [
  { id: 1, name: 'Explorador', level: 1, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE1.png?raw=true', description: 'Inicia su viaje, lleno de curiosidad y ganas de aprender, superando los primeros desafíos.' },
  { id: 2, name: 'Aventurero', level: 2, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE2.png?raw=true', description: 'Conoce el terreno y se atreve a explorar rutas más complejas, colaborando con otros.' },
  { id: 3, name: 'Maestro', level: 3, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE3.png?raw=true', description: 'Un guía para los demás, domina las artes de la expedición y comparte su conocimiento.' },
  { id: 4, name: 'Leyenda', level: 4, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE4.png?raw=true', description: 'Su nombre es sinónimo de éxito. Ha alcanzado la cima y su historia inspira a nuevas generaciones.' },
];

export const levels: Level[] = [
    { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'Las Selvas Exteriores', worldImageId: 'world-level-1', story: 'Bienvenido a las Selvas Exteriores, la primera frontera de nuestra gran expedición. Aquí inicias tu viaje como Explorador(a), aprendiendo los primeros pasos y descubriendo los fragmentos iniciales del ADN Banesco Seguros. Este territorio está lleno de misterios, senderos desconocidos y secretos de nuestro ADN. Solo los exploradores más curiosos y valientes lograrán avanzar, dejando su huella en la historia de nuestra organización.' },
    { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'La Ciudad Perdida', worldImageId: 'world-level-2', story: 'Bienvenido a la Ciudad Perdida, el corazón de antiguas ruinas que guarda secretos de nuestra expedición. Aquí continúas tu viaje como Aventurero(a), enfrentando enigmas más desafiantes y descubriendo fragmentos clave de nuestra cultura organizacional. Este lugar está lleno de misterios por descifrar que solo los exploradores audaces podrán revelar.' },
    { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'El Templo Oculto', worldImageId: 'world-level-3', story: 'Bienvenido al Templo Oculto, un lugar sagrado protegido por antiguas pruebas que desafían incluso a los exploradores más hábiles. Aquí continúas tu viaje como Guía Maestro(a), demostrando tu experiencia y liderando tu propio camino en la expedición. Este templo guarda pruebas cruciales que solo pueden ser superadas por aquellos que combinan conocimiento, estrategia y colaboración.' },
    { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'El Núcleo del Legado', worldImageId: 'world-level-4', story: 'Bienvenido al Núcleo del Legado, el corazón de toda nuestra expedición, donde se concentran los logros más grandes y la prueba más valiosa. Aquí culmina tu viaje como Leyenda, el explorador que ha dominado cada desafío y ha demostrado maestría, liderazgo y compromiso con nuestra cultura.' },
];

// Datos de ejemplo para desarrollo local
export const users: User[] = [
  { id: 1, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', level: 1, xp: 850, avatar: 'Explorador' },
  { id: 2, name: 'Ana Martínez', email: 'ana.martinez@example.com', level: 3, xp: 4800, avatar: 'Maestro' },
  { id: 3, name: 'Luis García', email: 'luis.garcia@example.com', level: 2, xp: 1900, avatar: 'Aventurero' },
  { id: 4, name: 'Sofía López', email: 'sofia.lopez@example.com', level: 4, xp: 12500, avatar: 'Leyenda' },
];

export const tasks: Omit<Task, 'status'>[] = [
    { id: 1, title: 'Participación en capacitaciones o actividades de integración', description: 'Asiste a eventos que fortalecen al equipo.', level: 1, xp: 10 },
    { id: 2, title: 'Participación en videos de Capital Humano', description: 'Colabora activamente en producciones de CH.', level: 1, xp: 10 },
    { id: 3, title: 'Participación como extra en videos de Capital Humano', description: 'Aparece como extra y apoya las iniciativas de CH.', level: 1, xp: 5 },
];

// Usuario que simulará estar logueado
export const currentUserEmail = 'carlos.rodriguez@example.com';


export const navLinks: NavLink[] = [
    { href: '/dashboard', label: 'Dashboard', icon: Rocket },
    { href: '/misiones', label: 'Misiones', icon: ClipboardList },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/profile', label: 'Mi Perfil', icon: UserIcon },
];
