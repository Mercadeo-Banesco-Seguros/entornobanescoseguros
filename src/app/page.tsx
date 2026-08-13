
'use client';

import * as React from "react";
import { Cloud, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  const [timeTheme, setTimeTheme] = React.useState<TimePeriod>('day');
  const [showFinalText, setShowFinalText] = React.useState(false);
  const [clouds, setClouds] = React.useState<CloudData[]>([]);
  const [activeValue, setActiveValue] = React.useState(values[0]);

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

      {/* Sección Nuestros Valores */}
      <section className="bg-white py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Columna Izquierda: Lista de Valores */}
          <div className="space-y-6">
            <h2 className="text-sm font-medium text-gray-400 mb-12 uppercase tracking-widest">Nuestros Valores</h2>
            <div className="flex flex-col gap-4">
              {values.map((val) => (
                <div 
                  key={val.id}
                  onMouseEnter={() => setActiveValue(val)}
                  className="group flex items-center gap-4 cursor-pointer"
                >
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full bg-black transition-all duration-300",
                    activeValue.id === val.id ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  )} />
                  <span className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter transition-all duration-300",
                    activeValue.id === val.id ? "text-black translate-x-2" : "text-gray-300 group-hover:text-gray-400"
                  )}>
                    {val.title}.
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Tarjeta Visual y Descripción */}
          <div className="flex flex-col gap-12 max-w-lg mx-auto lg:mx-0">
            {/* Tarjeta con Gradiente y Patrón */}
            <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-teal-600 p-8 flex flex-col justify-between shadow-2xl">
              <div className="w-2 h-2 rounded-full bg-white/40" />
              
              {/* Patrón de Destellos */}
              <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none opacity-30">
                <div className="grid grid-cols-5 gap-6">
                  {[...Array(25)].map((_, i) => (
                    <Sparkles key={i} className="w-4 h-4 text-white" strokeWidth={1} />
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <span className="text-7xl font-light text-white/90 tracking-tighter tabular-nums">
                  {activeValue.id}
                </span>
              </div>
            </div>

            {/* Descripción Dinámica */}
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500" key={activeValue.id}>
              <p className="text-sm text-gray-500 leading-relaxed font-light">
                {activeValue.description}
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
