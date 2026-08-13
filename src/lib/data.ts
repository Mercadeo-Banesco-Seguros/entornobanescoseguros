import { 
  Home, 
  LineChart, 
  ClipboardList, 
  Globe, 
  FlaskConical, 
  Megaphone, 
  Wrench, 
  Send 
} from 'lucide-react';
import type { NavLink } from './types';

export const navLinks: (NavLink & { icon: any })[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/nosotros', label: 'Nosotros', icon: LineChart },
    { href: '/calendario', label: 'Calendario', icon: ClipboardList },
    { href: '/bienestar', label: 'Bienestar', icon: Globe },
    { href: '/academia', label: 'Academia', icon: FlaskConical },
    { href: '/multimedia', label: 'Multimedia', icon: Megaphone },
    { href: '/requerimientos', label: 'Requerimientos', icon: Wrench },
    { href: '/biblioteca', label: 'Biblioteca', icon: Send },
];
