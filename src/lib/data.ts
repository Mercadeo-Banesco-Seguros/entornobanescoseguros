import { Trophy, User as UserIcon, LucideIcon, Rocket, ClipboardList, Home, Store, Wrench, Flag } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level, Prize, PrizeCategory, CarEvolution } from './types';

export const carEvolutions: CarEvolution[] = [
  { id: 1, name: 'Coche Básico', category: 'Base', progressThreshold: 0, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png', description: 'Tu coche inicial. Fiable, pero con mucho margen de mejora. Cada carrera y cada objetivo completado te permitirán mejorarlo.' },
  { id: 2, name: 'Coche de Rally', category: 'Bronce', progressThreshold: 25, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/bronce.png', description: 'Has alcanzado la categoría Bronce. Tu coche ahora es más robusto y está preparado para terrenos más difíciles. La suspensión y los neumáticos han sido mejorados.' },
  { id: 3, name: 'Coche de Competición', category: 'Plata', progressThreshold: 50, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/plataa.png', description: 'Categoría Plata. El motor ha sido ajustado para una mayor potencia y la aerodinámica ha mejorado. Estás listo para competir en las grandes ligas.' },
  { id: 4, name: 'Fórmula 1', category: 'Oro', progressThreshold: 75, imageUrl: 'https://www.banescoseguros.com/wp-content/uploads/2025/10/oro.png', description: 'Has llegado a la élite. Tu coche es una máquina de precisión de Fórmula 1, diseñado para la máxima velocidad y rendimiento. El podio es tu único objetivo.' },
];

export const vicepresidenciaMessages: { [key: string]: { name: string; message: string; worldImageId: string; } } = {
  "gran-caracas": {
    name: "VP. Comercial Gran Caracas",
    message: `¡Equipo VP. Comercial Gran Caracas!\n\n¡Los motores están encendidos! La gran carrera del Concurso de Asesores Integrales ha comenzado.\n\nEn la capital, marcamos el ritmo. Esta es nuestra pista y estamos listos para tomar la pole position. Es hora de acelerar a fondo, demostrar nuestra agilidad y estrategia en cada curva.\n\n¡Que nadie nos alcance! ¡Vamos a demostrar por qué Gran Caracas siempre está en la delantera!\n\n¡A la meta por esa victoria!`,
    worldImageId: "world-level-1"
  },
  "centro-occidente-andes": {
    name: "VP. Comercial Ctro. Occid. Andes",
    message: `¡Equipo VP. Comercial Ctro. Occid. Los Andes!\n\n¡Se ha dado la señal de partida! El Concurso de Asesores Integrales está en marcha.\n\nEsta es una carrera de resistencia y potencia, y nuestro equipo sabe cómo manejar tanto las rectas como las subidas más exigentes. Es el momento de activar toda nuestra tracción y avanzar con fuerza imparable.\n\n¡Demostremos la tenacidad que nos caracteriza! ¡Que el podio lleve nuestro nombre!\n\n¡Vamos con todo hacia la bandera a cuadros!`,
    worldImageId: "world-level-2"
  },
  "centro-llanos-carabobo": {
    name: "VP. Comercial Centro Llanos-Carabobo",
    message: `¡Equipo VP. Comercial Centro Llanos-Carabobo!\n\n¡Luz verde! La competencia de Asesores Integrales ha iniciado oficialmente.\n\nEn el corazón del país, tenemos el combustible y la potencia para dominar esta pista. Es hora de pisar el acelerador, mantenernos en el carril rápido y demostrar de qué estamos hechos.\n\n¡Que el rugido de nuestros motores resuene en toda la pista! ¡Vamos a liderar cada vuelta!\n\n¡Acelera, equipo! ¡Nos vemos en la meta!`,
    worldImageId: "world-level-3"
  },
  "oriente": {
    name: "VP. Comercial Oriente",
    message: `¡Equipo VP. Comercial Oriente!\n\n¡La carrera ha comenzado! El Concurso de Asesores Integrales espera por sus campeones.\n\nEn Oriente sabemos lo que es arrancar con fuerza y mantener la velocidad. Esta es nuestra oportunidad de brillar, de demostrar nuestra destreza y de trabajar en equipo como la mejor escudería.\n\n¡Activemos el nitro y no dejemos que nadie nos rebase! ¡Esta victoria es nuestra!\n\n¡Directo al podio, Oriente!`,
    worldImageId: "world-level-4"
  },
  "zulia-falcon": {
    name: "VP. Comercial Zulia - Falcón",
    message: `¡Equipo VP. Comercial Zulia - Falcón!\n\n¡Se ha bajado la bandera verde! El Concurso de Asesores Integrales está aquí.\n\nSabemos que en nuestra VP corre la energía y la determinación. Esta es una carrera de campeones, y estamos listos para demostrar que tenemos la potencia para ganar.\n\n¡Es hora de poner toda la máquina a funcionar, no mirar por el retrovisor y conquistar esa meta!\n\n¡Vamos con esa fuerza indetenible! ¡A ganar!`,
    worldImageId: "world-level-5"
  },
};

export const avatars: Avatar[] = [
  { id: 1, name: 'Piloto Novato', level: 1, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Inicias tu carrera en el circuito. Tu coche está listo, tu casco puesto y el espíritu de competición arde en ti. Tu misión es aprender la pista, dominar las curvas y demostrar tu compromiso. Cada acción te suma Puntos para canjear por mejoras y premios. ¡Tú decides tu estrategia!' },
  { id: 2, name: 'Piloto Profesional', level: 2, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Ya no eres un novato. Conoces cada curva y cada recta. Tu equipo y tu coche han mejorado. Tu misión es aplicar tu conocimiento, colaborar con tu equipo y demostrar tus habilidades de adelantamiento para avanzar en la clasificación. ¡La meta está más cerca!' },
  { id: 3, name: 'Piloto de Élite', level: 3, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Perteneces a la élite del circuito. Lideras y superas los desafíos más complejos. Tu equipamiento es de última generación y tu visión de la carrera es total. Tu misión es demostrar tu maestría, aplicar todo lo aprendido y guiar tu progreso hacia la victoria final. ¡El podio te espera!' },
  { id: 4, name: 'Leyenda del Circuito', level: 4, imageUrl: 'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/c2b29402-990a-426c-851f-d5b78ac313a0-removebg-preview.png', description: 'Tu nombre es sinónimo de victoria. Inspiras y guías a las nuevas generaciones de pilotos. Tu equipo es icónico y refleja tu trayectoria de éxito. Tu misión es consolidar tu legado, completar el desafío final y dejar tu huella como el guardián de la historia de Banesco Seguros en el circuito.' },
];

export const levels: Level[] = [
    { id: 1, name: 'Pista de Calentamiento', xpThreshold: 1000, worldName: 'Pista de Calentamiento', worldImageId: 'world-level-1' },
    { id: 2, name: 'Circuito Profesional', xpThreshold: 2500, worldName: 'Circuito Profesional', worldImageId: 'world-level-2' },
    { id: 3, name: 'Pista de Alta Velocidad', xpThreshold: 5000, worldName: 'Pista de Alta Velocidad', worldImageId: 'world-level-3' },
    { id: 4, name: 'El Circuito de Leyendas', xpThreshold: 10000, worldName: 'El Circuito de Leyendas', worldImageId: 'world-level-4' },
];

export const tasks: Omit<Task, 'status'>[] = [
    { id: 1, title: 'Participación en capacitaciones o actividades de integración', description: 'Asiste a eventos que fortalecen al equipo.', level: 1, xp: 10 },
    { id: 2, title: 'Participación en videos de Capital Humano', description: 'Colabora activamente en producciones de CH.', level: 1, xp: 10 },
    { id: 3, title: 'Participación como extra en videos de Capital Humano', description: 'Aparece como extra y apoya las iniciativas de CH.', level: 1, xp: 5 },
];

export const navLinks: NavLink[] = [
    { href: '/inicio', label: 'Inicio', icon: Home },
    { href: '/dashboard', label: 'Panel', icon: Rocket },
    { href: '/ranking', label: 'Clasificación', icon: Trophy },
    { href: '/cajero', label: 'Gran Premio', icon: Flag },
];

export const prizeCategories: PrizeCategory[] = [
  { name: 'Oro' },
  { name: 'Plata' },
  { name: 'Bronce' },
];

export const prizes: Prize[] = [
  { id: 1, name: 'Primer Lugar', description: 'Viaje en grupo de los 10 ganadores de 3 días y 2 noches en el Sunsol Ecoland de Margarita Todo incluido y un abono de USD 200 en la 15.', cost: 0, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Tarjeta%20Datos%20Bancarios%20Org%C3%A1nico%20Rosa%20y%20Amarillo%20(4)-Photoroom.png?raw=true', category: 'Oro' },
  { id: 2, name: 'Segundo Lugar', description: 'Abono de USD 150 en la 15. Fecha del abono 9/1/2026', cost: 0, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Tarjeta%20Datos%20Bancarios%20Org%C3%A1nico%20Rosa%20y%20Amarillo%20(5)-Photoroom.png?raw=true', category: 'Plata' },
  { id: 3, name: 'Tercer Lugar', description: 'Abono de USD 50 en la 15. Fecha del abono 9/1/2026', cost: 0, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Tarjeta%20Datos%20Bancarios%20Org%C3%A1nico%20Rosa%20y%20Amarillo%20(6)-Photoroom.png?raw=true', category: 'Bronce' },
];
