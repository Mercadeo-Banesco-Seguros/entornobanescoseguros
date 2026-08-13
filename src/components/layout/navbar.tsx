'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Bell, User } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isTimeExpanded, setIsTimeExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Actualizar reloj cada minuto
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Obtener clima real (Caracas) usando wttr.in
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/Caracas?format=%t');
        const data = await response.text();
        if (data) {
          // Limpiar posibles espacios o signos + que devuelve wttr.in
          setTemperature(data.trim().replace('+', ''));
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
    
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  // Formateo de hora en 12h (AM/PM) con minutos
  const fullTimeFormatted = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString('es-ES', { month: 'short' });

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center gap-3 px-4">
      
      {/* Cápsula de Tiempo Independiente */}
      <div 
        onClick={() => setIsTimeExpanded(!isTimeExpanded)}
        className={cn(
          "bg-[#003B73]/90 backdrop-blur-sm rounded-full flex items-center transition-all duration-300 cursor-pointer hover:bg-[#003B73]/100 shadow-2xl border border-white/10 h-10 px-1",
          isTimeExpanded ? "min-w-fit" : ""
        )}
      >
        {/* Cápsula interna Glassy para la hora */}
        <div className={cn(
          "flex items-center gap-2 px-3 h-8 rounded-full bg-white/10 transition-all duration-300",
          !isTimeExpanded && "hover:bg-white/20"
        )}>
          <span className="text-[10px] font-light text-white tabular-nums whitespace-nowrap">
            {fullTimeFormatted}
          </span>
          
          {isTimeExpanded && (
            <div className="flex items-center gap-2 border-l border-white/20 pl-2 animate-in fade-in slide-in-from-left-2 duration-300 whitespace-nowrap">
              <div className="flex flex-col leading-none">
                <span className="text-[7px] text-white/60 font-light uppercase tracking-tighter">
                  {day} {month}
                </span>
                <span className="text-[8px] text-white font-light uppercase">
                  CARACAS
                </span>
              </div>
              <div className="h-3 w-[1px] bg-white/10 mx-0.5" />
              <span className="text-[8px] text-white font-light">
                {temperature || '--°C'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Barra de Navegación Principal */}
      <nav className="bg-[#003B73]/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-0.5 shadow-2xl border border-white/10 max-w-fit overflow-x-auto no-scrollbar h-10">
        <div className="flex items-center gap-0.5">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-200 group whitespace-nowrap',
                  isActive 
                    ? 'bg-white/10 text-white font-normal' 
                    : 'text-white/60 hover:text-white font-light'
                )}
              >
                <Icon 
                  className={cn("w-3 h-3", isActive ? "text-white" : "text-white/60 group-hover:text-white")} 
                  strokeWidth={isActive ? 2 : 1.5}
                />
                {isActive && (
                  <span className="text-[9px] tracking-tight">
                    {link.label}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Separador vertical de acciones */}
        <div className="h-3 w-[1px] bg-white/10 mx-1 hidden sm:block" />

        <div className="flex items-center gap-0 px-0.5">
          <button className="p-1.5 text-white/60 hover:text-white transition-colors">
            <Search className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <button className="p-1.5 text-white/60 hover:text-white transition-colors relative">
            <Bell className="w-3 h-3" strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-blue-500 rounded-full flex items-center justify-center text-[7px] text-white font-light">
              4
            </span>
          </button>
          <button className="p-1.5 text-white/60 hover:text-white transition-colors">
            <User className="w-3 h-3" strokeWidth={1.5} />
          </button>
        </div>
      </nav>
    </div>
  );
}
