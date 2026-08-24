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
    { href: '/', label: 'Inicio', icon: Home },
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
  { id: 1, name: 'Etapa 1', xpThreshold: 0, worldName: 'Gran Caracas', worldImageId: 'world-level-1' },
  { id: 2, name: 'Etapa 2', xpThreshold: 1000, worldName: 'Ctro. Occid. Los Andes', worldImageId: 'world-level-2' },
  { id: 3, name: 'Etapa 3', xpThreshold: 2500, worldName: 'Centro Llanos - Carabobo', worldImageId: 'world-level-3' },
  { id: 4, name: 'Etapa 4', xpThreshold: 4500, worldName: 'Oriente', worldImageId: 'world-level-4' },
  { id: 5, name: 'Etapa 5', xpThreshold: 7000, worldName: 'Zulia - Falcón', worldImageId: 'world-level-5' },
];

export const avatars: Avatar[] = [
  { id: 1, name: 'Base', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png', description: 'Perfil Inicial.' },
  { id: 2, name: 'Bronce', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/bronce.png', description: 'Nivel Bronce.' },
  { id: 3, name: 'Plata', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/plataa.png', description: 'Nivel Plata.' },
  { id: 4, name: 'Oro', level: 1, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/oro.png', description: 'Nivel Oro.' },
];

export const prizeCategories: PrizeCategory[] = [
  { name: 'Oro' },
  { name: 'Plata' },
  { name: 'Bronce' },
];

export const prizes: Prize[] = [
  { id: 1, name: 'Primer Lugar', description: 'Reconocimiento Especial y Experiencia Banesco.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-4-Photoroom.png', category: 'Oro' },
  { id: 2, name: 'Segundo Lugar', description: 'Bono Especial Corporativo.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-5-Photoroom.png', category: 'Plata' },
  { id: 3, name: 'Tercer Lugar', description: 'Reconocimiento al Desempeño.', cost: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/11/Tarjeta-Datos-Bancarios-Organico-Rosa-y-Amarillo-6-Photoroom.png', category: 'Bronce' },
];

export const carEvolutions: CarEvolution[] = [
  { 
    id: 1, 
    name: 'Perfil Profesional', 
    category: 'Base', 
    progressThreshold: 0, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png', 
    description: 'Tu perfil inicial en el portal corporativo.' 
  },
  { 
    id: 2, 
    name: 'Colaborador Bronce', 
    category: 'Bronce', 
    progressThreshold: 25, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/bronce.png', 
    description: 'Has alcanzado el nivel Bronce. Tu compromiso es visible.' 
  },
  { 
    id: 3, 
    name: 'Estratega Plata', 
    category: 'Plata', 
    progressThreshold: 50, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/plataa.png', 
    description: 'Nivel Plata alcanzado. Destacas por tu eficiencia operativa.' 
  },
  { 
    id: 4, 
    name: 'Líder Oro', 
    category: 'Oro', 
    progressThreshold: 80, 
    imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/oro.png', 
    description: 'Máximo reconocimiento alcanzado. Eres un referente en la organización.' 
  },
];

export const vicepresidenciaMessages: Record<string, { name: string; message: string; worldImageId: string }> = {
  "gran-caracas": { 
    name: "VP. Comercial Gran Caracas", 
    message: "¡Equipo VP. Comercial Gran Caracas!\n\nLiderando la gestión en la capital. ¡Hacia el cumplimiento de nuestras metas!", 
    worldImageId: "world-level-1" 
  },
  "centro-occidente-andes": { 
    name: "VP. Comercial Ctro. Occid. Andes", 
    message: "¡Equipo VP. Comercial Ctro. Occid. Los Andes!\n\nGestión enfocada y resultados sólidos. ¡Sigamos adelante!", 
    worldImageId: "world-level-2" 
  },
  "centro-llanos-carabobo": { 
    name: "VP. Comercial Centro Llanos-Carabobo", 
    message: "¡Equipo VP. Comercial Centro Llanos-Carabobo!\n\nCompromiso desde el corazón del país. ¡Excelencia en cada paso!", 
    worldImageId: "world-level-3" 
  },
  "oriente": { 
    name: "VP. Comercial Oriente", 
    message: "¡Equipo VP. Comercial Oriente!\n\nDeterminación y crecimiento constante. ¡Vamos por más!", 
    worldImageId: "world-level-4" 
  },
  "zulia-falcon": { 
    name: "VP. Comercial Zulia - Falcón", 
    message: "¡Equipo VP. Comercial Zulia - Falcón!\n\nResultados con energía y enfoque. ¡Juntos logramos el éxito!", 
    worldImageId: "world-level-5" 
  },
};
