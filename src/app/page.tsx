'use client';

import * as React from "react";
import { Cloud, X, Share2, FileText, HeartPulse, ShieldCheck, Home, User, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AuthGuard } from '@/context/auth-context';
import Link from 'next/link';

type TimePeriod = 'day' | 'night';

interface CloudData {
  top: string;
  duration: string;
  delay: string;
  size: number;
}

const values = [
  { 
    id: '01', 
    title: 'Innovación', 
    description: 'Transformamos el futuro del sector asegurador mediante tecnología de vanguardia y soluciones creativas que anticipan y superan las expectativas de nuestros clientes.' 
  },
  { 
    id: '02', 
    title: 'Responsabilidad', 
    description: 'Actuamos con integridad y compromiso social, garantizando que cada una de nuestras decisiones fortalezca la seguridad y el bienestar de las comunidades que protegemos.' 
  },
  { 
    id: '03', 
    title: 'Calidad', 
    description: 'Buscamos la excelencia en cada proceso y servicio, ofreciendo estándares superiores de atención y respaldo que definen nuestro liderazgo en el mercado.' 
  },
  { 
    id: '04', 
    title: 'Confiabilidad', 
    description: 'Somos el aliado sólido en el que puedes delegar tu tranquilidad. Nuestra palabra es compromiso y nuestra trayectoria es la garantía de tu protección.' 
  },
];

const pillars = [
  { id: '01', title: 'Ética', description: 'Mantenemos los más altos estándares de integridad en todas nuestras interacciones y decisiones.' },
  { id: '02', title: 'Cercanía', description: 'Estamos presentes cuando más nos necesitas, brindando un trato humano y personalizado.' },
  { id: '03', title: 'Solidez', description: 'Contamos con el respaldo y la trayectoria necesarios para garantizar tu tranquilidad a largo plazo.' },
  { id: '04', title: 'Integridad', description: 'La coherencia entre nuestras palabras y acciones es la base fundamental de nuestra cultura organizacional.' },
];

const mission = [
  { id: '01', title: 'Propósito', description: 'Nuestra misión es brindar protección y seguridad a las familias venezolanas, acompañándolas en cada paso de su vida.' },
  { id: '02', title: 'Visión', description: 'Ser la aseguradora líder reconocida por su innovación constante, solidez financiera y profunda cercanía humana.' },
  { id: '03', title: 'Alcance', description: 'Expandimos nuestras soluciones para cubrir cada necesidad, garantizando respaldo en cualquier momento y lugar.' },
  { id: '04', title: 'Compromiso', description: 'Dedicamos nuestra energía a superar los desafíos del entorno, cumpliendo nuestras promesas con excelencia y rapidez.' },
];

const dressCodeDays = [
  { id: 'lunes', day: 'Lunes', style: 'Formal de Negocios' },
  { id: 'martes', day: 'Martes', style: 'Casual de Negocios' },
  { id: 'miercoles', day: 'Miércoles', style: 'Ejecutivo Moderno' },
  { id: 'jueves', day: 'Jueves', style: 'Smart Casual' },
  { id: 'viernes', day: 'Viernes', style: 'Casual Corporativo' },
];

const dressCodeImages = {
  Caballeros: [
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_ruwheoruwheoruwh-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_qzecp6qzecp6qzec-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_xh0ronxh0ronxh0r-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_cps86vcps86vcps8-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_6txkf46txkf46txk-Photoroom.png',
  ],
  Damas: [
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_br9lsfbr9lsfbr9l-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Casual%20de%20negocios%202%20DAMA-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_8t6e9o8t6e9o8t6e-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_2gtngz2gtngz2gtn-Photoroom.png',
    'https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/Gemini_Generated_Image_851tlb851tlb851t-Photoroom.png',
  ]
};

const menuDays = [
  { id: 'lunes', day: 'Lunes', style: 'Bowl Energético' },
  { id: 'martes', day: 'Martes', style: 'Pollo al Curry' },
  { id: 'miercoles', day: 'Miércoles', style: 'Pasta Mediterránea' },
  { id: 'jueves', day: 'Jueves', style: 'Salmón Grillado' },
  { id: 'viernes', day: 'Viernes', style: 'Bowl de Proteína' },
];

const playlists = [
  {
    id: 'playlist-1',
    title: 'Clásicos en Inglés',
    description: 'Los éxitos que marcaron una época.',
  },
  {
    id: 'playlist-2',
    title: 'Rock Suave',
    description: 'La selección perfecta para concentrarse.',
  },
  {
    id: 'playlist-3',
    title: 'Salsa y Merengue',
    description: 'Ritmos latinos para subir el ánimo.',
  },
  {
    id: 'playlist-4',
    title: 'Solo Éxitos Pop',
    description: 'Las canciones más populares del momento.',
  },
];

const courses = [
  { 
    id: '01', 
    title: 'Gestión de Riesgos', 
    subtitle: 'Inteligencia Amplificada',
    description: 'Analiza y mitiga riesgos con herramientas de última generación en el entorno asegurador.',
  },
  { 
    id: '02', 
    title: 'Estrategia Comercial', 
    subtitle: 'Operaciones Globales',
    description: 'Coordina tu organización a través de agentes orquestados que aseguran precisión y eficiencia.',
    featured: true
  },
  { 
    id: '03', 
    title: 'Escalar con Claridad', 
    subtitle: 'Escalabilidad Segura',
    description: 'Crece de manera sostenible con visión estratégica y procesos optimizados.',
  },
];

const faqCategories = [
  { id: 'general', title: 'General', icon: Home },
  { id: 'soporte', title: 'Soporte', icon: User },
  { id: 'otros', title: 'Otros', icon: Settings },
];

const faqData: Record<string, { question: string; answer: string }[]> = {
  general: [
    { 
      question: '¿Cómo puedo consultar la cobertura de mi póliza HCM?', 
      answer: 'Puedes consultar todos los detalles de tu póliza, incluyendo coberturas, red de clínicas y estatus de reembolsos, accediendo a la sección \'Póliza HCM\' desde el menú de Accesos Rápidos en esta misma página.' 
    },
    { 
      question: '¿Cuál es el procedimiento para solicitar vacaciones?', 
      answer: 'Puedes gestionarlas directamente a través del portal de Capital Humano, seleccionando las fechas en el calendario de planificación disponible.' 
    },
    { 
      question: '¿Dónde puedo ver el menú del comedor de esta semana?', 
      answer: 'El menú está actualizado diariamente en la sección \'Sabor Seguro\' de este portal corporativo.' 
    },
  ],
  soporte: [
    { 
      question: '¿Cómo reporto un problema técnico con mi equipo?', 
      answer: 'Debe ingresar al Portal de Requerimientos y abrir un ticket en la categoría de Tecnología.' 
    },
  ],
  otros: [
    { 
      question: '¿Hay convenios con gimnasios?', 
      answer: 'Sí, contamos con alianzas estratégicas para tu bienestar. Consulta los detalles en el área de Capital Humano.' 
    },
  ]
};

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  const [timeTheme, setTimeTheme] = React.useState<TimePeriod>('day');
  const [showFinalText, setShowFinalText] = React.useState(false);
  const [clouds, setClouds] = React.useState<CloudData[]>([]);
  const [activeCategory, setActiveCategory] = React.useState('Nuestros Valores');
  const [activeDayIndex, setActiveDayIndex] = React.useState(0);
  const [activeGender, setActiveGender] = React.useState<'Caballeros' | 'Damas'>('Caballeros');
  const [activeMenuDayIndex, setActiveMenuDayIndex] = React.useState(0);
  const [activeMenuType, setActiveMenuType] = React.useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [activeCourseId, setActiveCourseId] = React.useState('02');
  const [activeFaqCategory, setActiveFaqCategory] = React.useState('general');

  React.useEffect(() => {
    setMounted(true);
    
    const today = new Date().getDay();
    const initialDay = today === 0 || today === 6 ? 0 : today - 1;
    setActiveDayIndex(initialDay);
    setActiveMenuDayIndex(initialDay);

    const updateTheme = () => {
      const hour = new Date().getHours();
      setTimeTheme(hour >= 18 || hour < 6 ? 'night' : 'day');
    };

    updateTheme();
    const interval = setInterval(updateTheme, 60000);

    const textTimer = setTimeout(() => {
      setShowFinalText(true);
    }, 3000);

    setClouds([...Array(16)].map((_, i) => ({
      top: `${(i * 5 + Math.sin(i) * 10) % 85}%`,
      duration: `${40 + (i % 5) * 10}s`,
      delay: `${-i * 5}s`,
      size: 280 + (i % 3) * 100
    })));

    return () => {
      clearInterval(interval);
      clearTimeout(textTimer);
    };
  }, []);

  const currentItems = React.useMemo(() => {
    if (activeCategory === 'Nuestros Pilares') return pillars;
    if (activeCategory === 'Nuestra Misión') return mission;
    return values;
  }, [activeCategory]);

  const [activeItem, setActiveItem] = React.useState(values[0]);

  React.useEffect(() => {
    if (currentItems.length > 0) {
      setActiveItem(currentItems[0]);
    }
  }, [currentItems]);

  if (!mounted) return null;

  const themes = {
    day: {
      gradient: "bg-gradient-to-b from-[#0284c7] via-[#38bdf8] to-[#bae6fd]",
      textColor: "text-blue-50/95",
      cloudOpacity: "opacity-90",
      cloudColor: "text-white fill-white",
      bottomGradient: "from-white/50"
    },
    night: {
      gradient: "bg-gradient-to-b from-[#003c71] via-[#002d54] to-[#001a3d]",
      textColor: "text-blue-50/80",
      cloudOpacity: "opacity-40",
      cloudColor: "text-white fill-white",
      bottomGradient: "from-black/40"
    }
  };

  const current = themes[timeTheme];
  const activeDay = dressCodeDays[activeDayIndex];
  const activeMenuDay = menuDays[activeMenuDayIndex];
  
  const vacationsImage = PlaceHolderImages.find(img => img.id === 'vacations-banner');
  const consultImage = PlaceHolderImages.find(img => img.id === 'consult-days-banner');
  const rankingImage = PlaceHolderImages.find(img => img.id === 'ranking-explorer');

  const getMenuImageUrl = (type: 'Clásico' | 'Dieta' | 'Ejecutivo', index: number) => {
    const prefixMap = { 'Clásico': 'menu-c-', 'Dieta': 'menu-d-', 'Ejecutivo': 'menu-e-' };
    const prefix = prefixMap[type];
    const id = `${prefix}${index + 1}`;
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/800`;
  };

  return (
    <AuthGuard>
      <div className="relative w-full font-sans select-none overflow-x-hidden">
        
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden">
          <div className={cn("absolute inset-0 transition-all duration-[3000ms] ease-in-out -z-30", current.gradient)} />
          <div className="absolute inset-x-0 bottom-0 h-2/3 overflow-hidden pointer-events-none -z-20">
            {clouds.map((cloud, i) => (
              <div 
                key={i}
                className={cn("absolute animate-drift transition-opacity duration-[3000ms]", current.cloudOpacity)}
                style={{ 
                  top: cloud.top, 
                  left: "-20%", 
                  '--duration': cloud.duration,
                  animationDelay: cloud.delay,
                } as React.CSSProperties}
              >
                <Cloud 
                  className={cn("drop-shadow-[0_20px_50px_rgba(255,255,255,0.4)]", current.cloudColor)}
                  size={cloud.size} 
                  strokeWidth={0}
                />
              </div>
            ))}
          </div>

          <main className="relative z-10 w-full h-full flex flex-col items-center pt-32 px-6">
            <div className="max-w-6xl text-center w-full relative h-[300px] flex items-center justify-center">
              <h1 
                className={cn(
                  "absolute text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] transition-all duration-[1000ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  current.textColor,
                  showFinalText 
                    ? "opacity-0 scale-50 blur-xl pointer-events-none" 
                    : "opacity-100 scale-100 blur-none"
                )}
              >
                Bienvenido a tu Portal <br /> Corporativo
              </h1>

              <h1 
                className={cn(
                  "absolute text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] whitespace-nowrap",
                  current.textColor,
                  showFinalText 
                    ? "opacity-100 scale-100 blur-none" 
                    : "opacity-0 scale-50 blur-xl pointer-events-none"
                )}
              >
                Estamos Contigo
              </h1>
            </div>
          </main>

          <div className={cn("absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t to-transparent pointer-events-none -z-10 transition-all duration-[3000ms]", current.bottomGradient)} />
        </section>

        {/* 1. Valores/Pilares/Misión */}
        <section className="bg-white py-32 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4 mb-12">
                {['Nuestros Valores', 'Nuestros Pilares', 'Nuestra Misión'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-[10px] px-6 py-2 rounded-xl transition-all duration-300 outline-none font-light border border-transparent",
                      activeCategory === cat 
                        ? "bg-[#0054A6] text-white" 
                        : "bg-slate-50 text-gray-400 hover:bg-slate-100 hover:text-gray-600"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              
              <div className="flex flex-col gap-4">
                {currentItems.map((item) => (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setActiveItem(item)}
                    onClick={() => setActiveItem(item)}
                    className="group flex items-center cursor-pointer"
                  >
                    <span className={cn(
                      "tracking-tighter transition-all duration-300",
                      activeItem.id === item.id 
                        ? "text-black text-3xl md:text-5xl lg:text-[3.2rem] font-normal translate-x-0" 
                        : "text-gray-300 group-hover:text-gray-400 text-lg md:text-xl lg:text-2xl font-light"
                    )}>
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-12 max-w-lg mx-auto lg:mx-0 w-full">
              <div className="relative aspect-[2/1] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 p-8 flex flex-col justify-between">
                <div />
                <div className="relative z-10">
                  <span className="text-7xl font-extralight text-white/90 tracking-tighter transition-colors tabular-nums">
                    {activeItem.id}
                  </span>
                </div>
              </div>
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeItem.id}>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {activeItem.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Viste Seguro Section */}
        <section className="relative w-full py-16 overflow-hidden min-h-[700px] flex flex-col transition-colors duration-700 bg-[#0054A6]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 bg-blue-500/20" />
            <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700 bg-sky-400/15" />
            <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[150px] transition-colors duration-700 bg-blue-700/10" />
          </div>

          <div className="container mx-auto px-12 md:px-24 relative z-10 flex flex-col flex-grow">
            <div className="flex justify-center items-end gap-1 md:gap-4 lg:gap-6 flex-grow pb-10">
              {dressCodeDays.map((item, index) => {
                const currentImageUrl = dressCodeImages[activeGender][index];
                const isActive = activeDayIndex === index;

                return (
                  <div 
                    key={item.day}
                    onMouseEnter={() => setActiveDayIndex(index)}
                    className={cn(
                      "relative transition-all duration-500 cursor-pointer group flex flex-col items-center",
                      isActive 
                        ? "scale-100 z-20 translate-y-[-10px]" 
                        : "scale-75 opacity-40 hover:opacity-100 hover:scale-100 hover:z-20"
                    )}
                  >
                    <div className="relative w-24 h-56 md:w-36 md:h-80 lg:w-44 lg:h-[420px]">
                      <Image 
                        src={currentImageUrl} 
                        alt={item.day} 
                        fill 
                        unoptimized
                        className="object-contain"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 px-4 pb-4">
              <div className="space-y-4 text-left">
                <div className="space-y-0">
                  <p className="text-white/70 text-[10px] font-light tracking-tight">Estilo Corporativo</p>
                  <h2 className="text-white text-2xl md:text-3xl font-light tracking-tighter">Banesco Seguros</h2>
                </div>
                <Button 
                  variant="secondary" 
                  className="bg-white hover:bg-white/90 rounded-xl px-6 font-light text-[10px] h-8 transition-colors duration-700 text-[#0054A6] border-none"
                >
                  Explorar Guía
                </Button>
              </div>

              <div className="flex flex-col items-end gap-6">
                <div className="text-right">
                  <p className="text-white/80 text-[10px] font-light uppercase tracking-widest">{activeDay.day}</p>
                  <h3 className="text-white text-2xl md:text-3xl font-light tracking-tighter leading-none mt-1">
                    {activeDay.style}
                  </h3>
                </div>
                <div className="flex gap-3">
                  {['Caballeros', 'Damas'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setActiveGender(gender as 'Caballeros' | 'Damas')}
                      className={cn(
                        "px-6 py-2 rounded-xl text-[10px] font-light transition-all duration-300 h-8",
                        activeGender === gender 
                          ? "bg-white text-[#0054A6]" 
                          : "bg-white/10 text-white/60 hover:text-white"
                      )}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Vacaciones y Consultar Días Section */}
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-transform duration-500 hover:scale-[1.01]">
              {vacationsImage && (
                <Image 
                  src={`${vacationsImage.imageUrl}`} 
                  alt="Planifica tus Próximas Vacaciones" 
                  fill 
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-start gap-4">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-light tracking-tight">Capital Humano</span>
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter leading-tight max-sm">Planifica tus Próximas Vacaciones</h3>
                <button className="mt-2 px-8 py-2.5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white text-[11px] font-light hover:bg-white/30 transition-colors">Gestionar</button>
              </div>
            </div>

            <div className="group relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-transform duration-500 hover:scale-[1.01]">
              {consultImage && (
                <Image 
                  src={`${consultImage.imageUrl}`} 
                  alt="Consultar Días Disponibles" 
                  fill 
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-10 flex flex-col justify-end items-start gap-4">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-light tracking-tight">Capital Humano</span>
                <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter leading-tight max-sm">Consultar Días Disponibles</h3>
                <button className="mt-2 px-8 py-2.5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white text-[11px] font-light hover:bg-white/30 transition-colors">Consultar</button>
              </div>
            </div>
          </div>
        </section>

        {/* 3b. Portal de Requerimientos */}
        <div className="relative w-screen left-1/2 -ml-[50vw] h-[480px] overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-[#0054A6] shadow-2xl">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-400/20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-blue-300/10 -translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="container mx-auto px-6 relative z-10 h-full flex items-center justify-center">
            {!showShortcuts ? (
              <div className="text-center space-y-10 animate-in fade-in duration-500">
                <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto">Visita nuestro <br /> Portal de Requerimientos</h2>
                <div className="flex justify-center gap-4">
                  <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">Acceder</button>
                  <button onClick={() => setShowShortcuts(true)} className="px-10 py-3 rounded-xl bg-transparent border border-white/40 text-white text-[10px] font-light hover:bg-white/10 transition-colors">Atajos</button>
                </div>
              </div>
            ) : (
              <div className="relative w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex justify-end mb-6">
                  <button onClick={() => setShowShortcuts(false)} className="p-2 text-white/60 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-6 text-left">
                  {[
                    { title: 'Capital Humano', links: ['Vacaciones', 'Carta de Trabajo', 'Inquietudes', 'Solicitudes'] },
                    { title: 'Comercial', links: ['Sistemática Comercial', 'Mercadeo', 'Comunicaciones'] },
                    { title: 'Tecnología', links: ['Seguridad', 'Actualizaciones', 'Solicitudes', 'Problemas'] },
                    { title: 'Suscripción', links: ['Salud', 'Patrimonial', 'Automóvil', 'Personas'] },
                    { title: 'Finanzas', links: ['Pagos', 'Facturación', 'Anticipos', 'Viáticos'] }
                  ].map((group) => (
                    <div key={group.title} className="space-y-4">
                      <h4 className="text-white font-bold text-[13px] tracking-tight">{group.title}</h4>
                      <ul className="space-y-1.5 text-white/70 text-[9px] font-light">
                        {group.links.map(link => <li key={link} className="hover:text-white cursor-pointer transition-colors">{link}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Academia Section */}
        <section className="relative w-full py-24 bg-[#F8FAFC] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 w-fit backdrop-blur-sm border border-slate-300/30">
                  <Share2 className="w-3 h-3 text-slate-600" />
                  <span className="text-[10px] font-light text-slate-600">Academia Banesco Seguros</span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.9] text-slate-900">
                  Hemos generado <br /> <span className="text-[#0054A6]">Educación para ti</span>
                </h2>
              </div>
              <div className="max-w-md space-y-6">
                <p className="text-[10px] font-light leading-relaxed text-slate-500">
                  Nuestros cursos traen claridad, no complejidad - uniendo cada concepto en un sistema adaptativo que aprende, actúa y evoluciona en tu carrera profesional.
                </p>
                <Link href="/academia#aprendizaje-interactivo">
                  <Button className="bg-[#0054A6] hover:bg-[#0054A6]/90 text-white rounded-xl px-10 h-11 text-[10px] font-light tracking-normal">
                    Explorar Más
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {courses.map((course) => {
                const isFeatured = activeCourseId === course.id;
                return (
                  <Link href="/academia#aprendizaje-interactivo" key={course.id}>
                    <div 
                      onMouseEnter={() => setActiveCourseId(course.id)}
                      className={cn(
                        "relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer group rounded-[2rem] overflow-hidden border border-white/40",
                        isFeatured 
                          ? "lg:h-[230px] bg-[#0054A6] shadow-2xl scale-[1.02] z-20" 
                          : "lg:h-[210px] bg-white shadow-xl opacity-90 hover:opacity-100"
                      )}
                    >
                      <div className="absolute inset-0 z-0">
                        <Image 
                          src="https://docs.google.com/drawings/d/e/2PACX-1vSD7pB-bTLWe5lwhcuWvZ_bEoJTiPMAIhPBRLNZSEE73sMh5-z7G33Q8KlsSBNMuh1mCuCIggL7VBZl/pub?w=960&h=720&format=png" 
                          alt={course.title} 
                          fill 
                          unoptimized
                          className={cn(
                            "object-cover transition-all duration-1000 group-hover:scale-105",
                            isFeatured ? "opacity-30 grayscale-0" : "opacity-20 grayscale"
                          )}
                        />
                        <div className={cn(
                            "absolute inset-0 transition-opacity duration-700",
                            isFeatured 
                              ? "bg-gradient-to-b from-[#0054A6]/40 via-[#0054A6]/70 to-[#0054A6] opacity-100" 
                              : "bg-slate-900/5 opacity-40"
                        )} />
                      </div>

                      <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                        <div className="space-y-8">
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h4 className={cn(
                                "text-xs font-light tracking-normal transition-colors",
                                isFeatured ? "text-blue-100" : "text-slate-500"
                              )}>
                                {course.subtitle}
                              </h4>
                              <h3 className={cn(
                                "text-xl font-bold tracking-tight transition-colors whitespace-nowrap",
                                isFeatured ? "text-white" : "text-slate-600 group-hover:text-slate-900"
                              )}>
                                {course.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className={cn(
                          "transition-all duration-500",
                          isFeatured ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                        )}>
                          <p className={cn(
                            "text-[10px] font-light leading-relaxed",
                            isFeatured ? "text-blue-50" : "text-slate-500"
                          )}>
                            {course.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. Sabor Seguro */}
        <section className="relative w-full py-16 overflow-hidden min-h-[700px] flex flex-col transition-colors duration-700 bg-[#0054A6]">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 bg-blue-500/20" />
            <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700 bg-sky-400/15" />
            <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[150px] transition-colors duration-700 bg-blue-700/10" />
          </div>

          <div className="container mx-auto px-12 md:px-24 relative z-10 flex flex-col flex-grow">
            <div className="flex justify-center items-end gap-1 md:gap-4 lg:gap-6 flex-grow pb-10">
              {menuDays.map((item, index) => {
                const currentImageUrl = getMenuImageUrl(activeMenuType, index);
                const isActive = activeMenuDayIndex === index;

                return (
                  <div 
                    key={item.day}
                    onMouseEnter={() => setActiveMenuDayIndex(index)}
                    className={cn(
                      "relative transition-all duration-500 cursor-pointer group flex flex-col items-center",
                      isActive 
                        ? "scale-100 z-20 translate-y-[-10px]" 
                        : "scale-75 opacity-40 hover:opacity-100 hover:scale-100 hover:z-20"
                    )}
                  >
                    <div className="relative w-24 h-56 md:w-36 md:h-80 lg:w-44 lg:h-[420px] rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                      <Image 
                        src={currentImageUrl} 
                        alt={item.day} 
                        fill 
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 px-4 pb-4">
              <div className="space-y-4 text-left">
                <div className="space-y-0">
                  <p className="text-white/70 text-[10px] font-light tracking-tight">Menú {activeMenuType}</p>
                  <h2 className="text-white text-2xl md:text-3xl font-light tracking-tighter">Banesco Seguros</h2>
                </div>
                <Button 
                  variant="secondary" 
                  className="bg-white hover:bg-white/90 rounded-xl px-6 font-light text-[10px] h-8 transition-colors duration-700 text-[#0054A6] border-none"
                >
                  Ver Menú Completo
                </Button>
              </div>

              <div className="flex flex-col items-end gap-6">
                <div className="text-right">
                  <p className="text-white/80 text-[10px] font-light uppercase tracking-widest">{activeMenuDay.day}</p>
                  <h3 className="text-white text-2xl md:text-3xl font-light tracking-tighter leading-none mt-1">
                    {activeMenuDay.style}
                  </h3>
                </div>
                <div className="flex gap-3">
                  {['Clásico', 'Dieta', 'Ejecutivo'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setActiveMenuType(type as 'Clásico' | 'Dieta' | 'Ejecutivo')}
                      className={cn(
                        "px-6 py-2 rounded-xl text-[10px] font-light transition-all duration-300 h-8",
                        activeMenuType === type 
                          ? "bg-white text-[#0054A6]" 
                          : "bg-white/10 text-white/60 hover:text-white"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Póliza HCM Section */}
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <Image 
                src="https://docs.google.com/drawings/d/e/2PACX-1vSXJYbUG3bld6KfkVAIBMtVUmct9WH1UCMk4rAMs9agRks7EtP8lgZ1l76_myh7LdZeZDUjGaLHlDCm/pub?format=png&w=960&h=720" 
                alt="Protocolos y Procedimientos" 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <FileText className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-light tracking-tight">Documentación</span>
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start gap-3">
                <h3 className="text-white text-2xl font-bold tracking-tight leading-tight">Protocolos y Procedimientos</h3>
                <p className="text-white/70 text-[10px] font-light max-w-[200px]">Guías detalladas para la gestión de siniestros y solicitudes.</p>
                <button className="mt-2 px-6 py-2 rounded-xl bg-[#0054A6] text-white text-[10px] font-light hover:bg-[#0054A6]/90 transition-colors">Consultar</button>
              </div>
            </div>

            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#003B73] flex flex-col items-center justify-center p-8 text-center shadow-xl">
               <div className="absolute inset-0 pointer-events-none opacity-10">
                  <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-blue-400 blur-3xl -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-blue-300 blur-3xl translate-y-1/2 -translate-x-1/2" />
               </div>
               <div className="relative z-10 flex flex-col items-center gap-6">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-white/60 text-[10px] font-light tracking-tight">Estamos aquí para ayudarte</p>
                    <h3 className="text-white text-4xl md:text-5xl font-bold tracking-tighter leading-none">Nuestra Póliza <br /> HCM</h3>
                  </div>
                  <div className="flex gap-4 w-full justify-center">
                    <button className="px-8 py-2.5 rounded-xl bg-white text-[#003B73] text-[10px] font-light hover:bg-white/90 transition-colors w-24 flex items-center justify-center">Acceder</button>
                    <button className="px-8 py-2.5 rounded-xl bg-transparent border border-white/30 text-white text-[10px] font-light hover:bg-white/10 transition-colors w-24 flex items-center justify-center">Contacto</button>
                  </div>
               </div>
            </div>

            <div className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-lg">
              <Image 
                src="https://docs.google.com/drawings/d/e/2PACX-1vSZiKd9swEfXGrgPZGF_oY6PxPCw9KVDIlUI9GALt7AsJ-byTwIzExGCOw7EQH-heSLd9uxMVYTlXnr/pub?format=png&w=960&h=720" 
                alt="Aliados Vitales" 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <HeartPulse className="w-3 h-3 text-white" />
                <span className="text-[10px] text-white font-light tracking-tight">Red de Salud</span>
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start gap-3">
                <h3 className="text-white text-2xl font-bold tracking-tight leading-tight">Aliados Vitales</h3>
                <p className="text-white/70 text-[10px] font-light max-w-[200px]">Encuentra proveedores de servicios médicos en nuestra red nacional.</p>
                <button className="mt-2 px-6 py-2 rounded-xl bg-[#0054A6] text-white text-[10px] font-light hover:bg-[#0054A6]/90 transition-colors">Consultar</button>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Espacio Ejecutivo */}
        <div className="relative w-screen left-1/2 -ml-[50vw] h-[480px] overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-[#0054A6] shadow-2xl">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-400/20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-blue-300/10 -translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="container mx-auto px-6 relative z-10 h-full flex items-center justify-center">
            <div className="text-center space-y-10 animate-in fade-in duration-500">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto drop-shadow-md">Visita nuestro <br /> Espacio Ejecutivo</h2>
              <div className="flex justify-center">
                <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">Acceder</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 8. Nuestra Playlist Section */}
        <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 w-fit mx-auto border border-slate-200">
              <span className="text-[10px] font-medium text-slate-500">Playlists</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Nuestra Playlist Corporativa
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto font-light">
              La banda sonora para un día de trabajo productivo y agradable.
            </p>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {playlists.map((playlist) => {
              const playlistImage = PlaceHolderImages.find(img => img.id === playlist.id);
              return (
                <div 
                  key={playlist.id} 
                  className="group relative aspect-[5/4] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300 bg-slate-50 p-8 flex flex-col justify-end"
                >
                  {playlistImage && (
                    <Image 
                      src={`${playlistImage.imageUrl}&format=png`} 
                      alt={playlist.title} 
                      fill 
                      unoptimized 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="relative z-10">
                    <h3 className="text-white text-lg font-bold tracking-tight mb-1">{playlist.title}</h3>
                    <p className="text-white/80 text-[9px] font-light leading-tight">{playlist.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 9. Ranking Section */}
        <div className="relative w-screen left-1/2 -ml-[50vw] h-[480px] overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-[#0054A6] shadow-2xl">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-400/20 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-blue-300/10 -translate-x-1/4 translate-y-1/4" />
          </div>
          <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
            <div className="w-full md:w-1/2 pl-16 md:pl-32 space-y-8 animate-in fade-in duration-500 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                <span className="text-[10px] text-white font-light tracking-tight">Expedición por Nuestro ADN</span>
              </div>
              <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight max-w-md drop-shadow-md">
                ¿Ya conoces tu <br /> lugar en el ranking?
              </h2>
              <div className="flex gap-4">
                <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">Explorar Gestión</button>
              </div>
            </div>
            <div className="hidden md:flex w-1/2 h-full items-end justify-end">
              <div className="relative w-[900px] h-[800px]">
                {rankingImage && (
                  <Image 
                    src={`${rankingImage.imageUrl}&format=png`}
                    alt="Colaborador"
                    fill
                    unoptimized
                    className="object-contain object-bottom"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 10. FAQ Section */}
        <section className="bg-[#F8FAFC] py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div>
                <h4 className="text-[#0054A6] text-[10px] font-light tracking-normal uppercase mb-2">¿Tienes dudas?</h4>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Preguntas Frecuentes</h2>
              </div>
              <div className="space-y-2">
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveFaqCategory(cat.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 text-[11px] font-light border border-slate-100",
                      activeFaqCategory === cat.id 
                        ? "bg-[#0054A6] text-white" 
                        : "bg-white text-slate-500 hover:bg-slate-50 shadow-none"
                    )}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <Accordion type="single" collapsible className="space-y-4">
                {faqData[activeFaqCategory].map((item, idx) => (
                  <AccordionItem 
                    key={idx} 
                    value={`item-${idx}`} 
                    className="bg-white rounded-2xl border border-slate-100 px-6 overflow-hidden shadow-none"
                  >
                    <AccordionTrigger className="text-[12px] font-normal text-slate-700 hover:no-underline py-5 text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-[11px] font-light text-slate-500 leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
    </AuthGuard>
  );
}
