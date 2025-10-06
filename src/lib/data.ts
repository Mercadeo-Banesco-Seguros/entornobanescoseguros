import { Trophy, User as UserIcon, LucideIcon, Rocket, ClipboardList, Home, Store } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level, Prize, PrizeCategory } from './types';

export const avatars: Avatar[] = [
  { id: 1, name: 'Explorador', level: 1, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE1.png?raw=true', description: 'Eres el héroe que inicia la aventura. Llevas tu mochila con provisiones, ropa resistente y un espíritu aventurero. Tu misión es aprender, observar y demostrar tu compromiso con los valores de Banesco Seguros. Cada acción que realices te permitirá ganar ConnectCoins, puntos que te acercarán a recompensas de nivel bronce, plata, oro o diamante. ¡Tú decides! 👀.' },
  { id: 2, name: 'Aventurero', level: 2, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE2.png?raw=true', description: 'Eres un explorador experimentado. Tus habilidades han evolucionado al igual que tu equipo, ya que llevas una brújula precisa, un mapa en la mano y herramientas para superar obstáculos. Tu misión es aplicar tus conocimientos, colaborar con otros y demostrar tus habilidades mientras avanzas en la expedición. Cada acción te permitirá ganar ConnectCoins, puntos que te acercarán a recompensas de nivel bronce, plata, oro o diamante. ¡Tú decides tu estrategia! 🏆' },
  { id: 3, name: 'Maestro', level: 3, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE3.png?raw=true', description: 'Liderar y superar obstáculos complejos. Tus habilidades han mejorado al igual que tu equipamiento, llevas equipo especializado, como binoculares y herramientas avanzadas, además cuentas con una visión clara del territorio. Tu misión es demostrar tu habilidad, aplicar todo lo aprendido y orientar tu progreso mientras avanzas hacia los descubrimientos más importantes. Recuerda que cada acción que realices te permitirá ganar ConnectCoins, acercándote a recompensas de nivel bronce, plata oro o diamante. ¡Tú elige tu táctica! 💡' },
  { id: 4, name: 'Leyenda', level: 4, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/AVATAR%20HOMBRE4.png?raw=true', description: 'Inspirar y guiar. Llevas un equipo icónico y distintivo que refleja tu experiencia y tus logros. Tu misión es consolidar todo lo aprendido, completar el desafío final y dejar tu huella como guardián de la historia de la organización. Cada acción final refuerza tu estatus y te acerca a las recompensas más prestigiosas. ¡Rendirse no es una opción! 🌟' },
];

export const levels: Level[] = [
    { id: 1, name: 'Nivel 1', xpThreshold: 1000, worldName: 'Las Selvas Exteriores', worldImageId: 'world-level-1', story: 'Bienvenido a las Selvas Exteriores, la primera frontera de nuestra gran expedición. Aquí inicias tu viaje como Explorador(a), aprendiendo los primeros pasos y descubriendo los fragmentos iniciales del ADN Banesco Seguros. Este territorio está lleno de misterios, senderos desconocidos y secretos de nuestro ADN. Solo los exploradores más curiosos y valientes lograrán avanzar, dejando su huella en la historia de nuestra organización.' },
    { id: 2, name: 'Nivel 2', xpThreshold: 2500, worldName: 'La Ciudad Perdida', worldImageId: 'world-level-2', story: 'Bienvenido a la Ciudad Perdida, el corazón de antiguas ruinas que guarda secretos de nuestra expedición. Aquí continúas tu viaje como Aventurero(a), enfrentando enigmas más desafiantes y descubriendo fragmentos clave de nuestra cultura organizacional. Este lugar está lleno de misterios por descifrar que solo los exploradores audaces podrán revelar.' },
    { id: 3, name: 'Nivel 3', xpThreshold: 5000, worldName: 'El Templo Oculto', worldImageId: 'world-level-3', story: 'Bienvenido al Templo Oculto, un lugar sagrado protegido por antiguas pruebas que desafían incluso a los exploradores más hábiles. Aquí continúas tu viaje como Guía Maestro(a), demostrando tu experiencia y liderando tu propio camino en la expedición. Este templo guarda pruebas cruciais que solo pueden ser superadas por aquellos que combinan conocimiento, estrategia y colaboración.' },
    { id: 4, name: 'Nivel 4', xpThreshold: 10000, worldName: 'El Núcleo del Legado', worldImageId: 'world-level-4', story: 'Bienvenido al Núcleo del Legado, el corazón de toda nuestra expedición, donde se concentran los logros más grandes y la prueba más valiosa. Aquí culmina tu viaje como Leyenda, el explorador que ha dominado cada desafío y ha demostrado maestría, liderazgo y compromiso con nuestra cultura.' },
];

export const tasks: Omit<Task, 'status'>[] = [
    { id: 1, title: 'Participación en capacitaciones o actividades de integración', description: 'Asiste a eventos que fortalecen al equipo.', level: 1, xp: 10 },
    { id: 2, title: 'Participación en videos de Capital Humano', description: 'Colabora activamente en producciones de CH.', level: 1, xp: 10 },
    { id: 3, title: 'Participación como extra en videos de Capital Humano', description: 'Aparece como extra y apoya las iniciativas de CH.', level: 1, xp: 5 },
];

export const navLinks: NavLink[] = [
    { href: '/inicio', label: 'Inicio', icon: Home },
    { href: '/dashboard', label: 'Tablero', icon: Rocket },
    { href: '/misiones', label: 'Misiones', icon: ClipboardList },
    { href: '/ranking', label: 'Ranking', icon: Trophy },
    { href: '/cajero', label: 'Bazar', icon: Store },
];

export const prizeCategories: PrizeCategory[] = [
  { name: 'Diamante', imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(5).png?raw=true' },
  { name: 'Oro', imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(6).png?raw=true' },
  { name: 'Plata', imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/PLATA.png?raw=true' },
  { name: 'Bronce', imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/BRONCE.png?raw=true' },
];

export const prizes: Prize[] = [
  // Bronce
  { id: 1, name: 'Taza de Explorador', description: 'Una taza de cerámica para tus bebidas calientes.', cost: 100, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/taza.png?raw=true', category: 'Bronce' },
  { id: 2, name: 'Llavero del Viajero', description: 'Lleva contigo el símbolo de la expedición.', cost: 150, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Bronce' },
  { id: 3, name: 'Set de Pegatinas', description: 'Decora tus pertenencias con los emblemas de la expedición.', cost: 200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Bronce' },
  { id: 4, name: 'Cuaderno de Notas', description: 'Para apuntar todos tus descubrimientos.', cost: 220, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Bronce' },
  
  // Plata
  { id: 5, name: 'Gorra de Aventurero', description: 'Una gorra resistente para tus expediciones.', cost: 250, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/gorra.png?raw=true', category: 'Plata' },
  { id: 6, name: 'Botella de Agua', description: 'Mantente hidratado en tus aventuras.', cost: 400, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/botella.png?raw=true', category: 'Plata' },
  { id: 7, name: 'Camiseta Oficial', description: 'Viste los colores de la expedición.', cost: 500, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Plata' },
  { id: 8, name: 'Funda para Portátil', description: 'Protege tu equipo con estilo.', cost: 600, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Plata' },
  
  // Oro
  { id: 9, name: 'Sudadera "Leyenda"', description: 'Una sudadera cómoda y con estilo.', cost: 1000, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Oro' },
  { id: 10, name: 'Mochila de Expedición', description: 'Espaciosa y resistente para todas tus herramientas.', cost: 1200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Oro' },
  { id: 11, name: 'Auriculares Inalámbricos', description: 'Sumérgete en la banda sonora de tu aventura.', cost: 1500, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blobια/sudadera.png?raw=true', category: 'Oro' },
  { id: 12, name: 'Cargador Portátil', description: 'Para que nunca te quedes sin energía.', cost: 1800, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Oro' },

  // Diamante
  { id: 13, name: 'Reloj Inteligente', description: 'Monitorea tu progreso y mantente conectado.', cost: 3000, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Diamante' },
  { id: 14, name: 'Tablet Gráfica', description: 'Digitaliza tus mapas y descubrimientos.', cost: 4000, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Diamante' },
  { id: 15, name: 'Silla Gamer', description: 'La máxima comodidad para planificar tus próximas misiones.', cost: 5000, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Diamante' },
  { id: 16, name: 'Viaje de Expedición', description: 'Un premio legendario: una experiencia de viaje real.', cost: 10000, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/sudadera.png?raw=true', category: 'Diamante' },
];
