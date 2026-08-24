import { 
  Home, 
  LineChart, 
  Calendar, 
  Heart, 
  GraduationCap, 
  Video, 
  Mail, 
  Library
} from 'lucide-react';
import type { NavLink, Task, Level, Avatar, Prize, PrizeCategory, CarEvolution, User } from './types';

export const navLinks: (NavLink & { icon: any })[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/nosotros', label: 'Nosotros', icon: LineChart },
    { href: '/calendario', label: 'Calendario', icon: Calendar },
    { href: '/bienestar', label: 'Bienestar', icon: Heart },
    { href: '/academia', label: 'Academia', icon: GraduationCap },
    { href: '/multimedia', label: 'Multimedia', icon: Video },
    { href: '/requerimientos', label: 'Requerimientos', icon: Mail },
    { href: '/biblioteca', label: 'Biblioteca', icon: Library },
];

export const mockUsers: User[] = [
  { 
    id: "admin", 
    name: "Administrador Banesco", 
    level: 1, 
    xp: 10000, 
    avatar: "Oro", 
    cargo: "ADMINISTRADOR", 
    vicepresidencia: "Sede Principal",
    progreso: 100,
    prog_pol: 100,
    prog_sus: 100,
    prog_cob: 100
  },
  { 
    id: "piloto1", 
    name: "Juan Pérez", 
    level: 1, 
    xp: 2500, 
    avatar: "Plata", 
    cargo: "ASESOR INTEGRAL", 
    vicepresidencia: "VP. Comercial Gran Caracas",
    progreso: 65.4,
    prog_pol: 70,
    prog_sus: 60,
    prog_cob: 66
  },
  { 
    id: "piloto2", 
    name: "María Rodríguez", 
    level: 1, 
    xp: 4800, 
    avatar: "Oro", 
    cargo: "ASESOR INTEGRAL", 
    vicepresidencia: "VP. Comercial Oriente",
    progreso: 88.2,
    prog_pol: 90,
    prog_sus: 85,
    prog_cob: 89
  },
  { 
    id: "piloto3", 
    name: "Carlos Gómez", 
    level: 1, 
    xp: 1200, 
    avatar: "Bronce", 
    cargo: "ASESOR INTEGRAL", 
    vicepresidencia: "VP. Comercial Zulia - Falcón",
    progreso: 42.1,
    prog_pol: 40,
    prog_sus: 45,
    prog_cob: 41
  }
];

export const tasks: Task[] = [
  { id: 1, title: 'Participación en capacitaciones', description: 'Asiste a eventos que fortalecen al equipo.', level: 1, xp: 10, status: 'pending' },
  { id: 2, title: 'Cierre de pólizas Salud', description: 'Logra tus metas de suscripción en salud.', level: 1, xp: 50, status: 'pending' },
  { id: 3, title: 'Reporte Semanal', description: 'Envía tu reporte de actividad a tiempo.', level: 1, xp: 20, status: 'pending' },
];

export const levels: Level[] = [
  { id: 1, name: 'Nivel 1', xpThreshold: 0, worldName: 'Gran Caracas', worldImageId: 'world-level-1' },
  { id: 2, name: 'Nivel 2', xpThreshold: 1000, worldName: 'Ctro. Occid. Los Andes', worldImageId: 'world-level-2' },
  { id: 3, name: 'Nivel 3', xpThreshold: 2500, worldName: 'Centro Llanos - Carabobo', worldImageId: 'world-level-3' },
  { id: 4, name: 'Nivel 4', xpThreshold: 4500, worldName: 'Oriente', worldImageId: 'world-level-4' },
  { id: 5, name: 'Nivel 5', xpThreshold: 7000, worldName: 'Zulia - Falcón', worldImageId: 'world-level-5' },
];

export const avatars: Avatar[] = [
  { id: 1, name: 'Base', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png', description: 'Piloto inicial.' },
  { id: 2, name: 'Bronce', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/bronce.png', description: 'Piloto de Bronce.' },
  { id: 3, name: 'Plata', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/plataa.png', description: 'Piloto de Plata.' },
  { id: 4, name: 'Oro', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/oro.png', description: 'Piloto de Oro.' },
];

export const prizeCategories: PrizeCategory[] = [
  { name: 'Oro' },
  { name: 'Plata' },
  { name: 'Bronce' },
];

export const prizes: Prize[] = [
  { id: 1, name: 'Primer Lugar', description: 'Viaje a Margarita con todo incluido y bono Todoticket.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-4-Photoroom.png', category: 'Oro' },
  { id: 2, name: 'Segundo Lugar', description: 'Bono Todoticket de 34.000 Bs.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-5-Photoroom.png', category: 'Plata' },
  { id: 3, name: 'Tercer Lugar', description: 'Bono Todoticket de 17.000 Bs.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-6-Photoroom.png', category: 'Bronce' },
];

export const carEvolutions: CarEvolution[] = [
  { 
    id: 1, 
    name: 'Coche Básico', 
    category: 'Base', 
    progressThreshold: 0, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png', 
    description: 'Tu coche inicial. Fiable, pero con mucho margen de mejora.' 
  },
  { 
    id: 2, 
    name: 'Coche de Rally', 
    category: 'Bronce', 
    progressThreshold: 25, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/bronce.png', 
    description: 'Ya estás participando por el Bronce. Tu coche ahora es más robusto.' 
  },
  { 
    id: 3, 
    name: 'Coche de Competición', 
    category: 'Plata', 
    progressThreshold: 50, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/plataa.png', 
    description: 'Ya estás participando en el nivel Plata. Motor ajustado para mayor potencia.' 
  },
  { 
    id: 4, 
    name: 'Fórmula 1', 
    category: 'Oro', 
    progressThreshold: 80, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/oro.png', 
    description: 'Has llegado a la élite. Tu coche es una máquina de precisión de Fórmula 1.' 
  },
];

export const vicepresidenciaMessages: Record<string, { name: string; message: string; worldImageId: string }> = {
  "gran-caracas": { 
    name: "VP. Comercial Gran Caracas", 
    message: "¡Equipo VP. Comercial Gran Caracas!\n\nEn la capital marcamos el ritmo. ¡A la meta por esa victoria!", 
    worldImageId: "world-level-1" 
  },
  "centro-occidente-andes": { 
    name: "VP. Comercial Ctro. Occid. Andes", 
    message: "¡Equipo VP. Comercial Ctro. Occid. Los Andes!\n\nUna carrera de resistencia y potencia. ¡Vamos con fuerza imparable!", 
    worldImageId: "world-level-2" 
  },
  "centro-llanos-carabobo": { 
    name: "VP. Comercial Centro Llanos-Carabobo", 
    message: "¡Equipo VP. Comercial Centro Llanos-Carabobo!\n\nEn el corazón del país, dominamos esta pista. ¡Acelera, equipo!", 
    worldImageId: "world-level-3" 
  },
  "oriente": { 
    name: "VP. Comercial Oriente", 
    message: "¡Equipo VP. Comercial Oriente!\n\nSabemos arrancar con fuerza. ¡Directo al podio, Oriente!", 
    worldImageId: "world-level-4" 
  },
  "zulia-falcon": { 
    name: "VP. Comercial Zulia - Falcón", 
    message: "¡Equipo VP. Comercial Zulia - Falcón!\n\nEnergía y determinación zuliana. ¡A ganar!", 
    worldImageId: "world-level-5" 
  },
};
