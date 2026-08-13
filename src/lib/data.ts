import { 
  Home, 
  LineChart, 
  Calendar, 
  Heart, 
  GraduationCap, 
  Camera, 
  Mail, 
  Library 
} from 'lucide-react';
import type { NavLink } from './types';

export const navLinks: (NavLink & { icon: any })[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/nosotros', label: 'Nosotros', icon: LineChart },
    { href: '/calendario', label: 'Calendario', icon: Calendar },
    { href: '/bienestar', label: 'Bienestar', icon: Heart },
    { href: '/academia', label: 'Academia', icon: GraduationCap },
    { href: '/multimedia', label: 'Multimedia', icon: Camera },
    { href: '/requerimientos', label: 'Requerimientos', icon: Mail },
    { href: '/biblioteca', label: 'Biblioteca', icon: Library },
];
