'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';
import { 
  Search, 
  Bell, 
  User as UserIcon, 
  Plus, 
  Mic, 
  X, 
  AlertTriangle, 
  LogOut, 
  Settings, 
  UserCircle,
  Calendar,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isTimeExpanded, setIsTimeExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<string | null>(null);
  const [showIANotification, setShowIANotification] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  // Search state
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const triggerIANotification = () => {
    setShowIANotification(true);
    setTimeout(() => setShowIANotification(false), 8000);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
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

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Nueva Misión', description: '¡La pista Gran Caracas te espera!', icon: Calendar, time: '2h ago' },
    { id: 2, title: 'Logro Alcanzado', description: 'Has subido un 5% en tu progreso semanal.', icon: CheckCircle2, time: '5h ago' },
    { id: 3, title: 'Recordatorio', description: 'Revisa tus objetivos de cierre de mes.', icon: Clock, time: '1d ago' },
  ];

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center gap-3 px-4 pointer-events-none">
      <div className="flex justify-center items-center gap-3 w-full pointer-events-auto">
        
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
        <nav className={cn(
          "bg-[#003B73]/90 backdrop-blur-sm rounded-full px-1 py-1 flex items-center shadow-2xl border border-white/10 transition-all duration-300 h-10",
          isSearchActive ? "w-full max-w-md" : "max-w-fit overflow-x-auto no-scrollbar"
        )}>
          {isSearchActive ? (
            <div className="flex items-center w-full px-2 animate-in fade-in zoom-in-95 duration-300">
              <Search className="w-3 h-3 text-white/60 mr-2" />
              <input 
                type="text"
                autoFocus
                placeholder="Buscar en el circuito..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Escape' && setIsSearchActive(false)}
                className="bg-transparent text-[10px] font-light text-white placeholder:text-white/40 outline-none w-full border-none focus:ring-0 p-0"
              />
              <button 
                onClick={() => {
                  setIsSearchActive(false);
                  setSearchQuery('');
                }}
                className="p-1.5 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <>
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
                {/* BUSCADOR */}
                <button 
                  onClick={() => setIsSearchActive(true)} 
                  className="p-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <Search className="w-3 h-3" strokeWidth={1.5} />
                </button>

                {/* NOTIFICACIONES */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 text-white/60 hover:text-white transition-colors relative">
                      <Bell className="w-3 h-3" strokeWidth={1.5} />
                      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-white border-slate-200 shadow-xl rounded-2xl overflow-hidden mt-2 mr-4">
                    <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                      <h4 className="text-slate-900 text-xs font-light tracking-tight">Notificaciones</h4>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                            <notif.icon className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-[10px] font-light text-slate-900">{notif.title}</p>
                            <p className="text-[9px] text-slate-500 leading-tight mt-0.5 font-light">{notif.description}</p>
                            <span className="text-[8px] text-slate-400 mt-1 block font-light">{notif.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center bg-slate-50/30">
                      <button className="text-[9px] text-blue-600 hover:text-blue-700 font-light tracking-tight">Ver todo el historial</button>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* USUARIO */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 text-white/60 hover:text-white transition-colors">
                      <UserIcon className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white border-slate-200 text-slate-900 rounded-2xl p-2 shadow-xl mt-2 mr-4">
                    <DropdownMenuLabel className="text-[10px] font-light text-slate-500 px-2 py-1.5">
                      {currentUser?.name || 'Piloto'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem asChild className="focus:bg-slate-50 focus:text-slate-900 rounded-xl cursor-pointer">
                      <Link href="/profile" className="flex items-center gap-2">
                        <UserCircle className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[10px] font-light">Mi Perfil</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-900 rounded-xl cursor-pointer flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-[10px] font-light">Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-slate-100" />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="focus:bg-red-50 text-red-600 focus:text-red-700 rounded-xl cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-light">Cerrar Sesión</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          )}
        </nav>

        {/* Cápsula de Chat IA */}
        <div className="bg-[#003B73]/90 backdrop-blur-sm rounded-full flex items-center shadow-2xl border border-white/10 h-10 px-1 gap-1">
          <button 
            onClick={triggerIANotification}
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
                  triggerIANotification();
                  setInputValue('');
                }
              }}
              className="bg-transparent text-[9px] font-light text-white placeholder:text-white/60 tracking-tight outline-none w-16 border-none focus:ring-0 p-0"
            />
          </div>
          <button 
            onClick={triggerIANotification}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Mic className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <div 
            onClick={triggerIANotification}
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
        <div className="animate-in fade-in slide-in-from-top-4 duration-500 absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 pointer-events-auto">
          <div className="bg-red-100/90 backdrop-blur-md py-3 px-6 rounded-2xl border border-red-200/50 flex items-center gap-4">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" strokeWidth={1.5} />
            
            <div className="flex-grow">
              <p className="text-[10px] font-light text-red-900 leading-tight tracking-tight">
                Las funcionalidades de inteligencia artificial se encuentran en fase de implementación y estarán disponibles próximamente.
              </p>
            </div>

            <button 
              onClick={() => setShowIANotification(false)}
              className="p-1 text-red-600/60 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
