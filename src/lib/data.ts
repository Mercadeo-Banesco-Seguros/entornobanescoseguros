import { Trophy, User as UserIcon, LucideIcon, Rocket, ClipboardList, Home, Store, Wrench, Flag } from 'lucide-react';
import type { User, Task, Avatar, NavLink, Level, Prize, PrizeCategory, CarEvolution } from './types';

export const carEvolutions: CarEvolution[] = [
  { id: 1, name: 'Coche Básico', category: 'Base', progressThreshold: 0, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/B%C3%81SICO%20-%20CIRCUITO.png?raw=true', description: 'Tu coche inicial. Fiable, pero con mucho margen de mejora. Cada carrera y cada objetivo completado te permitirán mejorarlo.' },
  { id: 2, name: 'Coche de Rally', category: 'Bronce', progressThreshold: 25, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/BRONCE%20-%20CIRCUITO.png?raw=true', description: 'Has alcanzado la categoría Bronce. Tu coche ahora es más robusto y está preparado para terrenos más difíciles. La suspensión y los neumáticos han sido mejorados.' },
  { id: 3, name: 'Coche de Competición', category: 'Plata', progressThreshold: 50, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/PLATA%20-%20CIRCUITO.png?raw=true', description: 'Categoría Plata. El motor ha sido ajustado para una mayor potencia y la aerodinámica ha mejorado. Estás listo para competir en las grandes ligas.' },
  { id: 4, name: 'Fórmula 1', category: 'Oro', progressThreshold: 75, imageUrl: 'https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/F1%20-%20CIRCUITO.png?raw=true', description: 'Has llegado a la élite. Tu coche es una máquina de precisión de Fórmula 1, diseñado para la máxima velocidad y rendimiento. El podio es tu único objetivo.' },
];

export const vicepresidenciaMessages: { [key: string]: { message: string; worldImageId: string; } } = {
  "Comercial Gran Caracas": {
      message: `¡Equipo VP. Comercial Gran Caracas!

¡Los motores están encendidos! La gran carrera del Concurso de Asesores Integrales ha comenzado.

En la capital, marcamos el ritmo. Esta es nuestra pista y estamos listos para tomar la pole position. Es hora de acelerar a fondo, demostrar nuestra agilidad y estrategia en cada curva.

¡Que nadie nos alcance! ¡Vamos a demostrar por qué Gran Caracas siempre está en la delantera!

¡A la meta por esa victoria!`,
      worldImageId: "world-level-1"
  },
  "Comercial Ctro. Occid.Andes": {
      message: `¡Equipo VP. Comercial Ctro. Occid. Los Andes!

¡Se ha dado la señal de partida! El Concurso de Asesores Integrales está en marcha.

Esta es una carrera de resistencia y potencia, y nuestro equipo sabe cómo manejar tanto las rectas como las subidas más exigentes. Es el momento de activar toda nuestra tracción y avanzar con fuerza imparable.

¡Demostremos la tenacidad que nos caracteriza! ¡Que el podio lleve nuestro nombre!

¡Vamos con todo hacia la bandera a cuadros!`,
      worldImageId: "world-level-2"
  },
  "Comercial Centro Llanos-Carabobo": {
      message: `¡Equipo VP. Comercial Centro Llanos-Carabobo!

¡Luz verde! La competencia de Asesores Integrales ha iniciado oficialmente.

En el corazón del país, tenemos el combustible y la potencia para dominar esta pista. Es hora de pisar el acelerador, mantenernos en el carril rápido y demostrar de qué estamos hechos.

¡Que el rugido de nuestros motores resuene en toda la pista! ¡Vamos a liderar cada vuelta!

¡Acelera, equipo! ¡Nos vemos en la meta!`,
      worldImageId: "world-level-3"
  },
  "Comercial Oriente": {
      message: `¡Equipo VP. Comercial Oriente!

¡La carrera ha comenzado! El Concurso de Asesores Integrales espera por sus campeones.

En Oriente sabemos lo que es arrancar con fuerza y mantener la velocidad. Esta es nuestra oportunidad de brillar, de demostrar nuestra destreza y de trabajar en equipo como la mejor escudería.

¡Activemos el nitro y no dejemos que nadie nos rebase! ¡Esta victoria es nuestra!

¡Directo al podio, Oriente!`,
      worldImageId: "world-level-4"
  },
  "Comercial Zulia - Falcón": {
      message: `¡Equipo VP. Comercial Zulia - Falcón!

¡Se ha bajado la bandera verde! El Concurso de Asesores Integrales está aquí.

Sabemos que en nuestra VP corre la energía y la determinación. Esta es una carrera de campeones, y estamos listos para demostrar que tenemos la potencia para ganar.

¡Es hora de poner toda la máquina a funcionar, no mirar por el retrovisor y conquistar esa meta!

¡Vamos con esa fuerza indetenible! ¡A ganar!`,
      worldImageId: "world-level-1"
  },
};

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
    { href: '/ranking', label: 'Clasificación', icon: Trophy },
    { href: '/cajero', label: 'Meta', icon: Flag },
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
