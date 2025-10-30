import { Trophy, User as UserIcon, LucideIcon, Rocket, ClipboardList, Home, Store, Wrench } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level, Prize, PrizeCategory } from './types';

export const avatars: Avatar[] = [
  { id: 1, name: 'Piloto Novato', level: 1, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Inicias tu carrera en el circuito. Tu coche está listo, tu casco puesto y el espíritu de competición arde en ti. Tu misión es aprender la pista, dominar las curvas y demostrar tu compromiso. Cada acción te suma Puntos para canjear por mejoras y premios. ¡Tú decides tu estrategia!' },
  { id: 2, name: 'Piloto Profesional', level: 2, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Ya no eres un novato. Conoces cada curva y cada recta. Tu equipo y tu coche han mejorado. Tu misión es aplicar tu conocimiento, colaborar con tu equipo y demostrar tus habilidades de adelantamiento para avanzar en la clasificación. ¡La meta está más cerca!' },
  { id: 3, name: 'Piloto de Élite', level: 3, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Perteneces a la élite del circuito. Lideras y superas los desafíos más complejos. Tu equipamiento es de última generación y tu visión de la carrera es total. Tu misión es demostrar tu maestría, aplicar todo lo aprendido y guiar tu progreso hacia la victoria final. ¡El podio te espera!' },
  { id: 4, name: 'Leyenda del Circuito', level: 4, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Tu nombre es sinónimo de victoria. Inspiras y guías a las nuevas generaciones de pilotos. Tu equipo es icónico y refleja tu trayectoria de éxito. Tu misión es consolidar tu legado, completar el desafío final y dejar tu huella como el guardián de la historia de Banesco Seguros en el circuito.' },
];

export const levels: Level[] = [
    { id: 1, name: 'Pista de Calentamiento', xpThreshold: 1000, worldName: 'Pista de Calentamiento', worldImageId: 'world-level-1', story: 'Bienvenido a la Pista de Calentamiento, la primera etapa de tu carrera. Aquí inicias como Piloto Novato, aprendiendo las trazadas y sumando tus primeros puntos. Este circuito pondrá a prueba tu potencial. Solo los más rápidos y constantes lograrán avanzar.' },
    { id: 2, name: 'Circuito Profesional', xpThreshold: 2500, worldName: 'Circuito Profesional', worldImageId: 'world-level-2', story: 'Has llegado al Circuito Profesional. Las curvas son más cerradas y los rivales más duros. Como Piloto Profesional, te enfrentarás a desafíos mayores que pondrán a prueba tu habilidad y estrategia. Este es el lugar donde se forjan los campeones.' },
    { id: 3, name: 'Pista de Alta Velocidad', xpThreshold: 5000, worldName: 'Pista de Alta Velocidad', worldImageId: 'world-level-3', story: 'Bienvenido a la Pista de Alta Velocidad, un desafío solo para la élite. Como Piloto de Élite, deberás demostrar tu experiencia y liderar la carrera. Esta pista exige perfección en cada maniobra y una colaboración impecable con tu equipo.' },
    { id: 4, name: 'El Circuito de Leyendas', xpThreshold: 10000, worldName: 'El Circuito de Leyendas', worldImageId: 'world-level-4', story: 'Has llegado al olimpo de las carreras, el Circuito de Leyendas. Aquí culmina tu viaje. Como Leyenda, has dominado cada desafío. Tu misión final es cruzar la meta y consolidar tu legado como el mejor Asesor Integral en la historia de Banesco Seguros.' },
];

export const tasks: Omit<Task, 'status'>[] = [
    { id: 1, title: 'Participación en capacitaciones o actividades de integración', description: 'Asiste a eventos que fortalecen al equipo.', level: 1, xp: 10 },
    { id: 2, title: 'Participación en videos de Capital Humano', description: 'Colabora activamente en producciones de CH.', level: 1, xp: 10 },
    { id: 3, title: 'Participación como extra en videos de Capital Humano', description: 'Aparece como extra y apoya las iniciativas de CH.', level: 1, xp: 5 },
];

export const navLinks: NavLink[] = [
    { href: '/inicio', label: 'Inicio', icon: Home },
    { href: '/dashboard', label: 'Panel', icon: Rocket },
    { href: '/misiones', label: 'Objetivos', icon: ClipboardList },
    { href: '/ranking', label: 'Clasificación', icon: Trophy },
    { href: '/cajero', label: 'Pits', icon: Wrench },
];

export const prizeCategories: PrizeCategory[] = [
  { name: 'Diamante' },
  { name: 'Oro' },
  { name: 'Plata' },
  { name: 'Bronce' },
];

export const prizes: Prize[] = [
  // Bronce
  { id: 1, name: 'Bolígrafo', description: 'Un bolígrafo de precisión para tus estrategias.', cost: 50, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(7).png?raw=true', category: 'Bronce' },
  { id: 2, name: 'Libreta', description: 'Anota tus ideas y estrategias de carrera.', cost: 50, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(5).png?raw=true', category: 'Bronce' },
  { id: 4, name: 'Cartuchera', description: 'Para guardar tus herramientas de piloto.', cost: 50, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(8).png?raw=true', category: 'Bronce' },
  
  // Plata
  { id: 5, name: 'Gorra', description: 'Una gorra oficial del equipo para los días de carrera.', cost: 100, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(2).png?raw=true', category: 'Plata' },
  { id: 6, name: 'Termo', description: 'Mantén la hidratación en las carreras más largas.', cost: 100, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(3).png?raw=true', category: 'Plata' },
  { id: 8, name: 'Cangurera', description: 'Lleva lo esencial contigo en la pista.', cost: 100, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(6).png?raw=true', category: 'Plata' },
  
  // Oro
  { id: 9, name: 'Almuerzo Ejecutivo', description: 'Recarga energías como un campeón.', cost: 200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(8).png?raw=true', category: 'Oro' },
  { id: 10, name: 'Desayuno Cafetín', description: 'El desayuno de los campeones.', cost: 200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(9).png?raw=true', category: 'Oro' },
  { id: 11, name: 'Chaqueta', description: 'La chaqueta oficial del equipo de élite.', cost: 200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(7).png?raw=true', category: 'Oro' },
  { id: 7, name: 'Bolso', description: 'Lleva tu equipo con estilo profesional.', cost: 200, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/unnamed%20(4).png?raw=true', category: 'Oro' },

  // Diamante
  { id: 13, name: 'Premio Misterioso', description: 'Un trofeo legendario te espera en el podio.', cost: 300, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/5ffdcd0d76650425722555858ebe6053-Photoroom.png?raw=true', category: 'Diamante' },
];
