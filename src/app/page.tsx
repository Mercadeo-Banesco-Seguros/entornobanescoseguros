
'use client';

import * as React from "react";
import { Cloud } from "lucide-react";
import { cn } from "@/lib/utils";

type TimePeriod = 'day' | 'night';

interface CloudData {
  top: string;
  duration: string;
  delay: string;
  size: number;
}

export default function LandingPage() {
  const [mounted, setMounted] = React.useState(false);
  const [timeTheme, setTimeTheme] = React.useState<TimePeriod>('day');
  const [showFinalText, setShowFinalText] = React.useState(false);
  const [clouds, setClouds] = React.useState<CloudData[]>([]);

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

    // Generar nubes solo en el cliente para evitar discrepancias de hidratación
    setClouds([...Array(16)].map(() => ({
      top: `${Math.random() * 85}%`,
      duration: `${40 + Math.random() * 50}s`,
      delay: `${-Math.random() * 60}s`,
      size: 280 + Math.random() * 420
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
    <div className="fixed inset-0 top-0 left-0 w-full h-full overflow-hidden font-sans select-none">
      
      {/* 1. Fondo Dinámico */}
      <div className={cn("absolute inset-0 transition-all duration-[3000ms] ease-in-out -z-30", current.gradient)} />

      {/* 2. Capa de Nubes Animadas */}
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

      {/* 3. Contenido Principal (Hero) */}
      <main className="relative z-10 w-full h-full flex flex-col items-center pt-32 px-6">
        <div className="max-w-6xl text-center w-full relative h-[300px] flex items-center justify-center">
          
          {/* Texto 1: Bienvenido al Entorno Banesco Seguros */}
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

          {/* Texto 2: Estamos Contigo */}
          <h1 
            className={cn(
              "absolute text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.95] transition-all duration-[1200ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              current.textColor,
              showFinalText 
                ? "opacity-100 scale-100 blur-none" 
                : "opacity-0 scale-50 blur-xl pointer-events-none"
            )}
          >
            Estamos <br /> Contigo
          </h1>

        </div>
      </main>

      {/* Gradiente sutil inferior */}
      <div className={cn("absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t to-transparent pointer-events-none -z-10 transition-all duration-[3000ms]", current.bottomGradient)} />

    </div>
  );
}
