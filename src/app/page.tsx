
'use client';

import * as React from "react";
import { Cloud } from "lucide-react";
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

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  const [timeTheme, setTimeTheme] = React.useState<TimePeriod>('day');
  const [showFinalText, setShowFinalText] = React.useState(false);
  const [clouds, setClouds] = React.useState<CloudData[]>([]);
  const [activeCategory, setActiveCategory] = React.useState('Nuestros Valores');
  const [activeDayIndex, setActiveDayIndex] = React.useState(new Date().getDay() === 0 || new Date().getDay() === 6 ? 0 : new Date().getDay() - 1);
  const [activeGender, setActiveGender] = React.useState<'Caballeros' | 'Damas'>('Caballeros');
  
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
                  onClick={() => setActiveDayIndex(index)}
                  className={cn(
                    "relative transition-all duration-500 cursor-pointer group flex flex-col items-center",
                    isActive 
                      ? "scale-100 z-20 translate-y-[-10px]" 
                      : "scale-75 opacity-40 hover:opacity-100 hover:scale-100 hover:z-20"
                  )}
                >
                  <div className="relative w-24 h-48 md:w-36 md:h-72 lg:w-56 lg:h-[420px]">
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
                <h2 className="text-white text-2xl font-light tracking-tighter">Banesco Seguros</h2>
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
                <h3 className="text-white text-2xl font-light tracking-tighter leading-none mt-1">
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
            <Image 
              src={vacationsImage?.imageUrl || "https://picsum.photos/seed/vacations/800/600"} 
              alt="Planifica tus Próximas Vacaciones" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={vacationsImage?.imageHint || "airplane tropical"}
            />
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

          {/* Card 2: Consultar Días */}
          <div className="group relative aspect-[4/3] md:aspect-[16/10] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl transition-transform duration-500 hover:scale-[1.01]">
            <Image 
              src={consultImage?.imageUrl || "https://picsum.photos/seed/coast/800/600"} 
              alt="Consultar Días Disponibles" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={consultImage?.imageHint || "aerial coast"}
            />
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

    </div>
  );
}
