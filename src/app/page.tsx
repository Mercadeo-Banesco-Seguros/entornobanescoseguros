
'use client';

import * as React from "react";
import { Cloud, X, Zap, Globe, Link as LinkIcon, Box, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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
];

const mission = [
  { id: '01', title: 'Propósito', description: 'Nuestra misión es brindar protección y seguridad a las familias venezolanas, acompañándolas en cada paso de su vida con soluciones innovadoras y confiables.' },
];

const dressCodeDays = [
  { id: 'lunes', day: 'Lunes', style: 'Corporativo' },
  { id: 'martes', day: 'Martes', style: 'Corporativo' },
  { id: 'miercoles', day: 'Miércoles', style: 'Corporativo' },
  { id: 'jueves', day: 'Jueves', style: 'Corporativo' },
  { id: 'viernes', day: 'Viernes', style: 'Corporativo' },
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

const courses = [
  { 
    id: '01', 
    title: 'Gestión de Riesgos', 
    subtitle: 'Amplify Intelligence',
    description: 'Analiza y mitiga riesgos con herramientas de última generación en el entorno asegurador.',
    icon: Zap,
    image: 'course-1'
  },
  { 
    id: '02', 
    title: 'Estrategia Comercial', 
    subtitle: 'Command Global Operations',
    description: 'Coordina tu organización a través de agentes orquestados que aseguran precisión y eficiencia.',
    icon: Globe,
    image: 'course-2',
    featured: true
  },
  { 
    id: '03', 
    title: 'Eliminate Silos', 
    subtitle: 'Conectividad Total',
    description: 'Rompe las barreras operativas y fomenta la colaboración interdisciplinaria.',
    icon: LinkIcon,
    image: 'course-3'
  },
  { 
    id: '04', 
    title: 'Scale with Clarity', 
    subtitle: 'Escalabilidad Segura',
    description: 'Crece de manera sostenible con visión estratégica y procesos optimizados.',
    icon: Box,
    image: 'course-4'
  },
];

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  const [timeTheme, setTimeTheme] = React.useState<TimePeriod>('day');
  const [showFinalText, setShowFinalText] = React.useState(false);
  const [clouds, setClouds] = React.useState<CloudData[]>([]);
  const [activeCategory, setActiveCategory] = React.useState('Nuestros Valores');
  const [activeDayIndex, setActiveDayIndex] = React.useState(new Date().getDay() === 0 || new Date().getDay() === 6 ? 0 : new Date().getDay() - 1);
  const [activeGender, setActiveGender] = React.useState<'Caballeros' | 'Damas'>('Caballeros');
  const [showShortcuts, setShowShortcuts] = React.useState(false);
  const [activeCourseId, setActiveCourseId] = React.useState(courses.find(c => c.featured)?.id || courses[0].id);
  
  const currentItems = React.useMemo(() => {
    if (activeCategory === 'Nuestros Pilares') return pillars;
    if (activeCategory === 'Nuestra Misión') return mission;
    return values;
  }, [activeCategory]);

  const [activeItem, setActiveItem] = React.useState(currentItems[0]);

  React.useEffect(() => {
    setActiveItem(currentItems[0]);
  }, [currentItems]);

  React.useEffect(() => {
    setMounted(true);
    
    const updateTheme = () => {
      const hour = new Date().getHours();
      if (hour >= 18 || hour < 6) {
        setTimeTheme('night');
      } else {
        setTimeTheme('day');
      }
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
  
  const vacationsImage = PlaceHolderImages.find(img => img.id === 'vacations-banner');
  const consultImage = PlaceHolderImages.find(img => img.id === 'consult-days-banner');

  return (
    <div className="relative w-full font-sans select-none overflow-x-hidden">
      
      {/* Sección Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Fondo Dinámico */}
        <div className={cn("absolute inset-0 transition-all duration-[3000ms] ease-in-out -z-30", current.gradient)} />

        {/* Capa de Nubes Animadas */}
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
              Bienvenido al Entorno <br /> Banesco Seguros
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

      {/* Sección Nuestros Valores / Pilares / Misión */}
      <section className="bg-white py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Columna Izquierda: Lista Dinámica */}
          <div className="space-y-6">
            <div className="flex gap-8 mb-12">
              {['Nuestros Valores', 'Nuestros Pilares', 'Nuestra Misión'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "text-sm font-light transition-all duration-300 tracking-tight outline-none",
                    activeCategory === cat ? "text-black font-medium" : "text-gray-400 hover:text-gray-600"
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
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full bg-black transition-all duration-300",
                    activeItem.id === item.id ? "opacity-100 scale-110" : "opacity-0 scale-0"
                  )} />
                  <span className={cn(
                    "font-light tracking-tighter transition-all duration-300",
                    activeItem.id === item.id 
                      ? "text-black translate-x-2 text-xl md:text-2xl lg:text-3xl font-normal" 
                      : "text-gray-300 group-hover:text-gray-400 text-lg md:text-xl lg:text-2xl"
                  )}>
                    {item.title}.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Visual y Descripción */}
          <div className="flex flex-col gap-12 max-w-lg mx-auto lg:mx-0 w-full">
            {/* Tarjeta con Gradiente */}
            <div className="relative aspect-[2/1] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 p-8 flex flex-col justify-between">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              
              <div className="relative z-10">
                <span className="text-7xl font-light text-white/90 tracking-tighter tabular-nums">
                  {activeItem.id}
                </span>
              </div>
            </div>

            {/* Descripción Dinámica */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeItem.id}>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {activeItem.description}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Sección Viste Seguro */}
      <section className="relative w-full py-12 overflow-hidden min-h-[600px] flex flex-col transition-colors duration-700 bg-[#0054A6]">
        {/* Fondo con formas abstractas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 bg-blue-500/20" />
          <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700 bg-sky-400/15" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-[150px] transition-colors duration-700 bg-blue-700/10" />
        </div>

        <div className="container mx-auto px-12 md:px-24 relative z-10 flex flex-col flex-grow">
          {/* Fila de Avatares */}
          <div className="flex justify-center items-end gap-1 md:gap-4 lg:gap-6 flex-grow pb-6">
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
                  <div className="relative w-24 h-48 md:w-36 md:h-72 lg:w-40 lg:h-80">
                    <Image 
                      src={currentImageUrl} 
                      alt={item.day} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles Inferiores */}
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-8 px-4 pb-4">
            {/* Izquierda: Título y Botón */}
            <div className="space-y-4 text-left">
              <div className="space-y-0">
                <p className="text-white/70 text-[10px] font-light tracking-tight">Viste Seguro</p>
                <h2 className="text-white text-2xl md:text-3xl font-light tracking-tighter">Banesco Seguros</h2>
              </div>
              <Button 
                variant="secondary" 
                className="bg-white hover:bg-white/90 rounded-xl px-6 font-light text-[10px] h-8 transition-colors duration-700 text-[#0054A6] border-none"
              >
                Explorar Guía
              </Button>
            </div>

            {/* Derecha: Info Día y Género */}
            <div className="flex flex-col items-end gap-6">
              <div className="text-right">
                <p className="text-white/80 text-[10px] font-light uppercase tracking-widest">{activeDay.day}</p>
                <h3 className="text-white text-2xl md:text-3xl font-light tracking-tighter leading-none mt-1">
                  {activeDay.style}
                </h3>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setActiveGender('Caballeros')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[10px] font-light transition-all duration-300 h-8",
                    activeGender === 'Caballeros' 
                      ? "bg-white text-[#0054A6]" 
                      : "bg-white/10 text-white/60 hover:text-white"
                  )}
                >
                  Caballeros
                </button>
                <button
                  onClick={() => setActiveGender('Damas')}
                  className={cn(
                    "px-6 py-2 rounded-xl text-[10px] font-light transition-all duration-300 h-8",
                    activeGender === 'Damas' 
                      ? "bg-white text-[#0054A6]" 
                      : "bg-white/10 text-white/60 hover:text-white"
                  )}
                >
                  Damas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Capital Humano - Vacaciones */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Planifica Vacaciones */}
          <div className="group relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-transform duration-500 hover:scale-[1.01]">
            {vacationsImage && (
              <Image 
                src={vacationsImage.imageUrl} 
                alt="Planifica tus Próximas Vacaciones" 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={vacationsImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end items-start gap-4">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-light tracking-tight">
                Capital Humano
              </span>
              <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter leading-tight max-w-sm">
                Planifica tus Próximas Vacaciones
              </h3>
              <button className="mt-2 px-8 py-2.5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white text-[11px] font-light hover:bg-white/30 transition-colors">
                Gestionar
              </button>
            </div>
          </div>

          {/* Card 2: Consultar Días Disponibles */}
          <div className="group relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-transform duration-500 hover:scale-[1.01]">
            {consultImage && (
              <Image 
                src={consultImage.imageUrl} 
                alt="Consultar Días Disponibles" 
                fill 
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                data-ai-hint={consultImage.imageHint}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-10 flex flex-col justify-end items-start gap-4">
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-light tracking-tight">
                Capital Humano
              </span>
              <h3 className="text-white text-3xl md:text-4xl font-bold tracking-tighter leading-tight max-w-sm">
                Consultar Días Disponibles
              </h3>
              <button className="mt-2 px-8 py-2.5 rounded-xl bg-white/20 backdrop-blur-lg border border-white/20 text-white text-[11px] font-light hover:bg-white/30 transition-colors">
                Consultar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Portal de Requerimientos */}
      <section className="relative w-full py-32 overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-[#0054A6]">
        {/* Fondo con formas abstractas */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-400/20 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-blue-300/10 -translate-x-1/4 translate-y-1/4" />
          <div className="absolute top-0 left-1/4 w-[2px] h-[200%] bg-white/5 -rotate-45 transform origin-top" />
          <div className="absolute top-0 left-1/2 w-[200px] h-[200%] bg-white/5 -rotate-45 transform origin-top" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {!showShortcuts ? (
            <div className="text-center space-y-10 animate-in fade-in duration-500">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight max-w-4xl mx-auto">
                Visita nuestro <br /> Portal de Requerimientos
              </h2>
              
              <div className="flex justify-center gap-4">
                <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">
                  Acceder
                </button>
                <button 
                  onClick={() => setShowShortcuts(true)}
                  className="px-10 py-3 rounded-xl bg-transparent border border-white/40 text-white text-[10px] font-light hover:bg-white/10 transition-colors"
                >
                  Atajos
                </button>
              </div>
            </div>
          ) : (
            <div className="relative w-full max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <button 
                onClick={() => setShowShortcuts(false)}
                className="absolute -top-12 md:top-0 right-0 p-2 text-white/60 hover:text-white transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left pt-8 md:pt-0">
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-base tracking-tight">Capital Humano</h4>
                  <ul className="space-y-2 text-white/70 text-[11px] font-light">
                    <li className="hover:text-white cursor-pointer transition-colors">Vacaciones</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Carta de Trabajo</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Inquietudes</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Solicitudes</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-base tracking-tight">Comercial</h4>
                  <ul className="space-y-2 text-white/70 text-[11px] font-light">
                    <li className="hover:text-white cursor-pointer transition-colors">Sistemática Comercial</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Mercadeo</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Comunicaciones</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-base tracking-tight">Tecnología</h4>
                  <ul className="space-y-2 text-white/70 text-[11px] font-light">
                    <li className="hover:text-white cursor-pointer transition-colors">Seguridad</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Actualizaciones</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Solicitudes</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Problemas</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-bold text-base tracking-tight">Suscripción</h4>
                  <ul className="space-y-2 text-white/70 text-[11px] font-light">
                    <li className="hover:text-white cursor-pointer transition-colors">Salud</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Patrimonial</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Automóvil</li>
                    <li className="hover:text-white cursor-pointer transition-colors">Personas</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Sección Nuestros Cursos */}
      <section className="relative w-full py-32 bg-[#F8FAFC] overflow-hidden">
        {/* Cuadrícula de fondo sutil */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Cabecera de la sección */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-20 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 w-fit backdrop-blur-sm border border-slate-300/30">
                <Share2 className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-medium text-slate-600 uppercase tracking-widest">Academia</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.9] text-slate-900">
                Hemos orquestado <br /> <span className="text-[#0054A6]">Inteligencia.</span>
              </h2>
            </div>
            
            <div className="max-w-md space-y-6">
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Nuestros cursos traen claridad, no complejidad - uniendo cada concepto en un sistema adaptativo que aprende, actúa y evoluciona en tu carrera profesional.
              </p>
              <Button className="bg-black hover:bg-black/90 text-white rounded-full px-8 h-12 text-[11px] font-medium tracking-wide">
                Explorar Más
              </Button>
            </div>
          </div>

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
            {courses.map((course) => {
              const Icon = course.icon;
              const isFeatured = activeCourseId === course.id;
              const placeholder = PlaceHolderImages.find(img => img.id === course.image);

              return (
                <div 
                  key={course.id}
                  onMouseEnter={() => setActiveCourseId(course.id)}
                  className={cn(
                    "relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer group rounded-[2rem] overflow-hidden border border-white/40",
                    isFeatured 
                      ? "lg:col-span-1 lg:h-[600px] bg-white shadow-2xl scale-[1.02] z-20" 
                      : "lg:col-span-1 lg:h-[450px] bg-white/50 backdrop-blur-sm shadow-xl opacity-80 hover:opacity-100"
                  )}
                >
                  {/* Contenido de la tarjeta destacada */}
                  {isFeatured && placeholder && (
                    <div className="absolute inset-0 z-0">
                      <Image 
                        src={placeholder.imageUrl} 
                        alt={course.title} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-20"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/80 to-white" />
                    </div>
                  )}

                  <div className="relative z-10 p-10 h-full flex flex-col justify-between">
                    <div className="space-y-8">
                      <span className="text-6xl font-light text-slate-200 tracking-tighter tabular-nums group-hover:text-slate-300 transition-colors">
                        {course.id}.
                      </span>
                      
                      <div className="space-y-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
                          isFeatured ? "bg-[#0054A6] text-white" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                        )}>
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-2">
                          <h4 className={cn(
                            "text-xs font-semibold tracking-wide transition-colors",
                            isFeatured ? "text-slate-400" : "text-slate-400"
                          )}>
                            {course.subtitle}
                          </h4>
                          <h3 className={cn(
                            "text-2xl font-bold tracking-tighter transition-colors",
                            isFeatured ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
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
                      <p className="text-sm text-slate-500 font-light leading-relaxed mb-8">
                        {course.description}
                      </p>
                      <button className="flex items-center gap-2 text-[10px] font-bold text-slate-900 group-hover:gap-3 transition-all uppercase tracking-widest">
                        Ver Detalles
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}
