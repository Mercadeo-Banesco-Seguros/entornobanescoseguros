'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Search, Bell, User, Plus, Mic, TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isTimeExpanded, setIsTimeExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<string | null>(null);
  const [showIANotification, setShowIANotification] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const triggerNotification = () => {
    setShowIANotification(true);
    setTimeout(() => setShowIANotification(false), 5000);
  };

  useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    const fetchWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/Caracas?format=%t');
        const data = await response.text();
        if (data) {
          const cleanTemp = data.trim().replace('+', '');
          const match = cleanTemp.match(/(\d+°C)/);
          setTemperature(match ? match[1] : cleanTemp.substring(0, 5));
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
    
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const fullTimeFormatted = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString('es-ES', { month: 'short' });

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center gap-3 px-4">
      <div className="flex justify-center items-center gap-3 w-full">
        
        {/* Cápsula de Tiempo Independiente */}
        <div 
          onClick={() => setIsTimeExpanded(!isTimeExpanded)}
          className={cn(
            "bg-[#003B73]/90 backdrop-blur-sm rounded-full flex items-center transition-all duration-300 cursor-pointer hover:bg-[#003B73]/100 shadow-2xl border border-white/10 h-10 px-1",
            isTimeExpanded ? "min-w-fit" : ""
          )}
        >
          <div className="flex items-center gap-2 px-3 h-8 rounded-full bg-white/10">
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
        <nav className="bg-[#003B73]/90 backdrop-blur-sm rounded-full px-1 py-1 flex items-center shadow-2xl border border-white/10 max-w-fit overflow-x-auto no-scrollbar h-10">
          <div className="flex items-center">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 h-8 rounded-full transition-all duration-200 group whitespace-nowrap',
                    isActive 
                      ? 'bg-white/10 text-white font-light' 
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

          <div className="h-3 w-[1px] bg-white/10 mx-1 hidden sm:block" />

          <div className="flex items-center pr-0.5">
            <button onClick={triggerNotification} className="p-1.5 text-white/60 hover:text-white transition-colors">
              <Search className="w-3 h-3" strokeWidth={1.5} />
            </button>
            <button onClick={triggerNotification} className="p-1.5 text-white/60 hover:text-white transition-colors relative">
              <Bell className="w-3 h-3" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
            <button onClick={triggerNotification} className="p-1.5 text-white/60 hover:text-white transition-colors">
              <User className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </div>
        </nav>

        {/* Cápsula de Chat IA */}
        <div className="bg-[#003B73]/90 backdrop-blur-sm rounded-full flex items-center shadow-2xl border border-white/10 h-10 px-1 gap-1">
          <button 
            onClick={triggerNotification}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Plus className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <div className="px-3 flex items-center">
            <input 
              type="text"
              placeholder="Hola Usuario..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  triggerNotification();
                  setInputValue('');
                }
              }}
              className="bg-transparent text-[9px] font-light text-white placeholder:text-white/60 tracking-tight outline-none w-16 border-none focus:ring-0 p-0"
            />
          </div>
          <button 
            onClick={triggerNotification}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Mic className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <div 
            onClick={triggerNotification}
            className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
          >
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <rect x="3" y="10" width="1.5" height="4" rx="0.75" fill="currentColor" />
                <rect x="7.5" y="7" width="1.5" height="10" rx="0.75" fill="currentColor" />
                <rect x="12" y="4" width="1.5" height="16" rx="0.75" fill="currentColor" />
                <rect x="16.5" y="7" width="1.5" height="10" rx="0.75" fill="currentColor" />
                <rect x="21" y="10" width="1.5" height="4" rx="0.75" fill="currentColor" />
             </svg>
          </div>
        </div>
      </div>

      {/* Notificación de IA */}
      {showIANotification && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
          <div className="relative bg-amber-50/95 backdrop-blur-md p-4 rounded-[28px] shadow-2xl border border-amber-200/50 flex items-center gap-4">
            
            {/* Distintivo Superior */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-[9px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <TriangleAlert className="w-2.5 h-2.5" strokeWidth={2.5} />
              <span className="tracking-wide uppercase">AVISO</span>
            </div>

            {/* Icono Principal */}
            <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 border border-amber-300/50 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
              <TriangleAlert className="w-6 h-6 text-amber-900/80" strokeWidth={1.5} />
            </div>

            {/* Bloque de Texto */}
            <div className="flex flex-col gap-0.5">
              <h4 className="text-xs font-bold text-amber-950/90 tracking-tight">Módulo en Desarrollo</h4>
              <p className="text-[10px] font-light text-amber-900/80 leading-tight tracking-tight">
                Las funciones de inteligencia artificial se encuentran en fase de implementación y estarán disponibles próximamente.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
