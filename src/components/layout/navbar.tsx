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
  Clock,
  Database,
  Sparkles,
  FileCheck,
  XCircle,
  ChevronRight,
  Info
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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

  // Notifications Data
  const notificationsData = [
    { id: 1, title: 'Cifras actualizadas', description: 'Los tableros de producción ya reflejan el cierre de ayer.', time: 'Hace 5m', icon: Database, color: 'text-slate-400', bgColor: 'bg-slate-50' },
    { id: 2, title: 'Nueva funcionalidad', description: 'Módulo de análisis de tubería optimizado ya disponible.', time: 'Hoy', icon: Sparkles, color: 'text-blue-400', bgColor: 'bg-blue-50' },
    { id: 3, title: 'Póliza renovada', description: 'Corporación Polar C.A. ha renovado su póliza de Salud.', time: 'Hace 1h', icon: FileCheck, color: 'text-green-400', bgColor: 'bg-green-50' },
  ];

  // Reminders Data
  const remindersData = [
    { id: 1, title: 'Vencimiento Próximo', description: 'La póliza corporativa 90021345 vence en menos de 48h.', time: 'Hace 45m', icon: Clock, color: 'text-orange-400', bgColor: 'bg-orange-50' },
    { id: 2, title: 'Cobro Fallido', description: 'Error en el cargo automático del cliente Inversiones HL.', time: 'Hace 2h', icon: XCircle, color: 'text-red-400', bgColor: 'bg-red-50' },
    { id: 3, title: 'Siniestro Crítico', description: 'Reportado siniestro de gran magnitud en Ramo Patrimonial.', time: 'Hace 4h', icon: AlertTriangle, color: 'text-red-500', bgColor: 'bg-red-50' },
    { id: 4, title: 'Incumplimiento SLA', description: '3 solicitudes de emisión han excedido el tiempo límite.', time: 'Ayer', icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-50' },
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

                {/* NOTIFICACIONES Y RECORDATORIOS */}
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 text-white/60 hover:text-white transition-colors relative">
                      <Bell className="w-3 h-3" strokeWidth={1.5} />
                      <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-blue-500 rounded-full" />
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-transparent border-none shadow-none flex gap-4 mt-4 mr-4 outline-none">
                    {/* Tarjeta Notificaciones */}
                    <div className="w-[280px] p-8 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden space-y-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-slate-700 text-[11px] font-normal tracking-tight">Notificaciones</h4>
                          <p className="text-[9px] text-slate-400 font-light mt-0.5">Actividad y actualizaciones</p>
                        </div>
                        <button className="text-[9px] text-slate-400 font-light hover:text-slate-600 flex items-center gap-0.5 transition-colors">
                          Ver todas <ChevronRight className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      {/* Banner Construcción */}
                      <div className="bg-[#EEF4FF]/50 p-4 rounded-2xl flex gap-3 items-center border border-blue-50/50">
                        <div className="shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                          <Info className="w-3 h-3 text-blue-500 stroke-[1.2]" />
                        </div>
                        <p className="text-[8.5px] text-blue-900/60 font-light leading-snug">
                          Este módulo de notificaciones se encuentra en construcción.
                        </p>
                      </div>

                      <div className="space-y-4 pt-1">
                        {notificationsData.map((item) => (
                          <div key={item.id} className="group cursor-pointer flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", item.bgColor)}>
                              <item.icon className={cn("w-3.5 h-3.5", item.color)} strokeWidth={1} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] text-slate-700 font-normal">{item.title}</span>
                                <span className="text-[7px] text-slate-300 font-light">• {item.time}</span>
                              </div>
                              <p className="text-[8px] text-slate-400 font-light leading-tight mt-0.5">{item.description}</p>
                            </div>
                            <ChevronRight className="w-2.5 h-2.5 text-slate-200 group-hover:text-slate-400 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tarjeta Recordatorios */}
                    <div className="w-[280px] p-8 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl overflow-hidden space-y-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-slate-700 text-[11px] font-normal tracking-tight">Recordatorios</h4>
                          <p className="text-[9px] text-slate-400 font-light mt-0.5">Riesgos y vencimientos</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center">
                          <AlertTriangle className="w-3 h-3 text-red-400 stroke-[1.2]" />
                        </div>
                      </div>

                      <div className="space-y-4 pt-1">
                        {remindersData.map((item) => (
                          <div key={item.id} className="group cursor-pointer flex items-center gap-3">
                            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", item.bgColor)}>
                              <item.icon className={cn("w-3.5 h-3.5", item.color)} strokeWidth={1} />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] text-slate-700 font-normal">{item.title}</span>
                                <span className="text-[7px] text-slate-300 font-light">• {item.time}</span>
                              </div>
                              <p className="text-[8px] text-slate-400 font-light leading-tight mt-0.5">{item.description}</p>
                            </div>
                            <ChevronRight className="w-2.5 h-2.5 text-slate-200 group-hover:text-slate-400 transition-colors" />
                          </div>
                        ))}
                      </div>
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
                  <DropdownMenuContent className="w-44 bg-white border-none text-slate-900 rounded-xl p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] mt-4 mr-4 outline-none">
                    <div className="px-1 pb-1.5 mb-1.5 border-b border-slate-50">
                      <h3 className="text-[10px] font-light text-slate-900 leading-tight">{currentUser?.name || 'Piloto'}</h3>
                      <p className="text-[8px] font-light text-slate-400 mt-0.5 uppercase tracking-wider">
                        {currentUser?.cargo === 'ADMINISTRADOR' ? 'Administrador' : 'Asesor Integral'}
                      </p>
                    </div>
                    
                    <div className="space-y-0.5">
                      <DropdownMenuItem asChild className="focus:bg-slate-50 focus:text-slate-900 rounded-lg cursor-pointer py-1 px-2 border-none outline-none group">
                        <Link href="/profile" className="flex items-center gap-2">
                          <UserCircle className="w-3.5 h-3.5 text-slate-400 stroke-[1] group-hover:text-slate-600 transition-colors" />
                          <span className="text-[9px] font-light text-slate-600">Mi Perfil</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-900 rounded-lg cursor-pointer flex items-center gap-2 py-1 px-2 border-none outline-none group">
                        <Settings className="w-3.5 h-3.5 text-slate-400 stroke-[1] group-hover:text-slate-600 transition-colors" />
                        <span className="text-[9px] font-light text-slate-600">Configuración</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem className="focus:bg-slate-50 focus:text-slate-900 rounded-lg cursor-pointer flex items-center gap-2 py-1 px-2 border-none outline-none group">
                        <Info className="w-3.5 h-3.5 text-slate-400 stroke-[1] group-hover:text-slate-600 transition-colors" />
                        <span className="text-[9px] font-light text-slate-600">Ayuda</span>
                      </DropdownMenuItem>
                    </div>

                    <div className="mt-1.5 pt-1.5 border-t border-slate-50">
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="focus:bg-red-50 text-red-500 focus:text-red-600 rounded-lg cursor-pointer flex items-center gap-2 py-1 px-2 border-none outline-none"
                      >
                        <LogOut className="w-3.5 h-3.5 stroke-[1]" />
                        <span className="text-[9px] font-light">Cerrar Sesión</span>
                      </DropdownMenuItem>
                    </div>
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
