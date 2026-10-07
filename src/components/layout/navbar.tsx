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
  UserCircle,
  Clock,
  Database,
  Sparkles,
  FileCheck,
  XCircle,
  ChevronRight,
  Utensils,
  Cake,
  CalendarDays
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
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
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface NotificationItem {
  id: string | number;
  title: string;
  description: string;
  time: string;
  icon: any;
  color: string;
  bgColor: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, currentUser, logout, fetchCalendarData, fetchMenuData } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isTimeExpanded, setIsTimeExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [temperature, setTemperature] = useState<number | null>(null);
  const [showAIModal, setShowAIModal] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [reminders, setReminders] = useState<NotificationItem[]>([]);

  const triggerAIModal = () => {
    setShowAIModal(true);
  };

  const handleLogout = () => {
    logout();
  };

  const loadDynamicContent = useCallback(async () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const currentDayName = dayNames[dayOfWeek];

    const dynamicNotifications: NotificationItem[] = [
      { 
        id: 'portal-1', 
        title: 'Nueva Identidad', 
        description: 'El cambio de marca ya está aquí.', 
        time: 'Portal', 
        icon: Sparkles, 
        color: 'text-blue-400', 
        bgColor: 'bg-blue-50' 
      },
      { 
        id: 'portal-2', 
        title: 'Gestión Documental', 
        description: 'La Biblioteca ha sido actualizada con nuevos protocolos.', 
        time: 'Portal', 
        icon: FileCheck, 
        color: 'text-green-400', 
        bgColor: 'bg-green-50' 
      }
    ];

    try {
      const menuData = await fetchMenuData();
      const normalize = (str: string) => 
        str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
      
      const todayPlate = menuData.find(p => 
        normalize(p.day) === normalize(currentDayName) && 
        normalize(p.type) === normalize('Clásico')
      );
      
      if (todayPlate) {
        dynamicNotifications.unshift({
          id: 'menu-today',
          title: 'Menú del Día',
          description: `Hoy en el comedor: ${todayPlate.name || todayPlate.description}`,
          time: 'Ahora',
          icon: Utensils,
          color: 'text-orange-400',
          bgColor: 'bg-orange-50'
        });
      }
    } catch (e) {
      console.warn("No se pudo cargar el menú real para la notificación");
    }

    setNotifications(dynamicNotifications);

    try {
      const calendarData = await fetchCalendarData();
      if (Array.isArray(calendarData)) {
        const upcoming: NotificationItem[] = [];
        
        const sortedData = calendarData
          .filter(day => {
            const eventDate = new Date(day.date + 'T00:00:00');
            const diffTime = eventDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays >= -1 && diffDays <= 7;
          })
          .sort((a, b) => a.date.localeCompare(b.date));

        sortedData.forEach((day, idx) => {
          const isToday = new Date(day.date + 'T00:00:00').toDateString() === today.toDateString();
          const timeLabel = isToday ? 'Hoy' : day.date.split('-').reverse().slice(0, 2).join('/');

          day.events?.forEach((ev: string, i: number) => {
            upcoming.push({
              id: `ev-${idx}-${i}`,
              title: ev,
              description: 'Evento Institucional',
              time: timeLabel,
              icon: CalendarDays,
              color: 'text-[#0054A6]',
              bgColor: 'bg-blue-50'
            });
          });

          day.birthdays?.forEach((bd: string, i: number) => {
            upcoming.push({
              id: `bd-${idx}-${i}`,
              title: `Cumpleaños: ${bd}`,
              description: 'Festejo del equipo',
              time: timeLabel,
              icon: Cake,
              color: 'text-pink-400',
              bgColor: 'bg-pink-50'
            });
          });
        });

        setReminders(upcoming.slice(0, 5));
      }
    } catch (e) {
      console.warn("No se pudieron cargar recordatorios dinámicos");
    }
  }, [fetchCalendarData, fetchMenuData]);

  useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    const fetchWeather = async () => {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=10.488&longitude=-66.879&current_weather=true');
        const data = await response.json();
        if (data.current_weather) {
          setTemperature(Math.round(data.current_weather.temperature));
        }
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 600000); 

    loadDynamicContent();

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, [loadDynamicContent]);

  if (!mounted || !isAuthenticated || pathname === '/login') return null;

  const fullTimeFormatted = currentTime.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });
  
  const day = currentTime.getDate();
  const month = currentTime.toLocaleString('es-ES', { month: 'short' });

  const aiPlaceholder = PlaceHolderImages.find(img => img.id === 'segurito-ai-status');
  const isotypeImage = PlaceHolderImages.find(img => img.id === 'corporate-isotype');

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center gap-3 px-4 pointer-events-none">
      <div className="flex justify-center items-center gap-3 w-full pointer-events-auto">
        
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
                    CARACAS {temperature !== null ? `• ${temperature}°C` : ''}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

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
                placeholder="Buscar en el portal..."
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
                {isotypeImage && (
                  <div className="relative w-7 h-7 mx-2 shrink-0 animate-in fade-in zoom-in-95 duration-500">
                    <Image 
                      src={isotypeImage.imageUrl}
                      alt="Banesco Seguros"
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                )}
                
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

              <div className="flex items-center gap-1 px-1">
                <button 
                  onClick={() => setIsSearchActive(true)} 
                  className="p-1.5 text-white/60 hover:text-white transition-colors"
                >
                  <Search className="w-3 h-3" strokeWidth={1.5} />
                </button>

                <Popover>
                  <PopoverTrigger asChild>
                    <button className="p-1.5 text-white/60 hover:text-white transition-colors relative">
                      <Bell className="w-3 h-3" strokeWidth={1.5} />
                      {(notifications.length > 0 || reminders.length > 0) && (
                        <span className="absolute top-1.5 right-1.5 w-1 h-1 bg-blue-500 rounded-full" />
                      )}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-transparent border-none shadow-none flex flex-col md:flex-row gap-4 mt-4 mr-4 outline-none">
                    <div className="w-[300px] p-5 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-slate-700 text-[11px] font-light tracking-tight">Notificaciones</h4>
                          <p className="text-[9px] text-slate-400 font-light mt-0.5">Operatividad del Portal</p>
                        </div>
                      </div>

                      <div className="space-y-4 pt-1 max-h-[300px] overflow-y-auto no-scrollbar">
                        {notifications.length === 0 ? (
                          <p className="text-[9px] text-slate-300 font-light italic py-4 text-center">Sin avisos por ahora.</p>
                        ) : (
                          notifications.map((item) => (
                            <div key={item.id} className="group cursor-pointer flex items-center gap-3">
                              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", item.bgColor)}>
                                <item.icon className={cn("w-3.5 h-3.5", item.color)} strokeWidth={1} />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-slate-700 font-light">{item.title}</span>
                                  <span className="text-[7px] text-slate-300 font-light">• {item.time}</span>
                                </div>
                                <p className="text-[8px] text-slate-400 font-light leading-tight mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    <div className="w-[300px] p-5 bg-white border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-xl overflow-hidden space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-slate-700 text-[11px] font-light tracking-tight">Recordatorios</h4>
                          <p className="text-[9px] text-slate-400 font-light mt-0.5">Calendario Institucional</p>
                        </div>
                        <Link href="/calendario" className="w-6 h-6 rounded-full bg-[#0054A6]/5 flex items-center justify-center hover:bg-[#0054A6]/10 transition-colors">
                          <ChevronRight className="w-3 h-3 text-[#0054A6]" />
                        </Link>
                      </div>

                      <div className="space-y-4 pt-1 max-h-[300px] overflow-y-auto no-scrollbar">
                        {reminders.length === 0 ? (
                          <div className="py-8 text-center space-y-2">
                             <Clock className="w-6 h-6 text-slate-100 mx-auto" strokeWidth={1} />
                             <p className="text-[9px] text-slate-300 font-light italic">Sin eventos próximos.</p>
                          </div>
                        ) : (
                          reminders.map((item) => (
                            <div key={item.id} className="group cursor-pointer flex items-center gap-3">
                              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-105", item.bgColor)}>
                                <item.icon className={cn("w-3.5 h-3.5", item.color)} strokeWidth={1} />
                              </div>
                              <div className="flex-grow">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[9px] text-slate-700 font-light">{item.title}</span>
                                  <span className="text-[7px] text-slate-300 font-light">• {item.time}</span>
                                </div>
                                <p className="text-[8px] text-slate-400 font-light leading-tight mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 text-white/60 hover:text-white transition-colors">
                      <UserIcon className="w-3 h-3" strokeWidth={1.5} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44 bg-white border-none text-slate-900 rounded-xl p-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.08)] mt-4 mr-4 outline-none">
                    <div className="px-1 pb-1.5 mb-1.5 border-b border-slate-50">
                      <h3 className="text-[10px] font-light text-slate-900 leading-tight">{currentUser?.name || 'Colaborador'}</h3>
                      <p className="text-[8px] font-light text-slate-400 mt-0.5 uppercase tracking-wider">
                        {currentUser?.rol === 'Administrador' ? 'Administrador' : currentUser?.cargo || 'Colaborador'}
                      </p>
                    </div>
                    
                    <div className="space-y-0.5">
                      <DropdownMenuItem asChild className="focus:bg-slate-50 focus:text-slate-900 rounded-lg cursor-pointer py-1 px-2 border-none outline-none group">
                        <Link href="/profile" className="flex items-center gap-2">
                          <UserCircle className="w-3.5 h-3.5 text-slate-400 stroke-[1] group-hover:text-slate-600 transition-colors" />
                          <span className="text-[9px] font-light text-slate-600">Mi Perfil</span>
                        </Link>
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

        <div className="bg-[#003B73]/90 backdrop-blur-sm rounded-full flex items-center shadow-2xl border border-white/10 h-10 px-1 gap-1">
          <button 
            onClick={triggerAIModal}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Plus className="w-3 h-3" strokeWidth={1.5} />
          </button>
          <div className="px-3 flex items-center">
            <input 
              type="text"
              placeholder="Habla con Segurito"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={triggerAIModal}
              className="bg-transparent text-[9px] font-light text-white placeholder:text-white/60 tracking-tight outline-none w-28 border-none focus:ring-0 p-0 cursor-pointer"
            />
          </div>
          <button 
            onClick={triggerAIModal}
            className="p-1.5 text-white/60 hover:text-white transition-colors"
          >
            <Mic className="w-3 h-3" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <Dialog open={showAIModal} onOpenChange={setShowAIModal}>
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-[3.5rem]">
          <div className="flex flex-col md:flex-row items-center p-8 gap-8">
            <div className="relative w-full md:w-1/2 aspect-square">
              <Image 
                src={aiPlaceholder?.imageUrl || "https://docs.google.com/drawings/d/e/2PACX-1vSBtI8YJ80xUbACa1RDn_iid3x1LG9Zyox5h55zON4vV3xBJn6K3QHU31FE7aUr4985cmCkoX_6rJhz/pub?w=960&h=720&format=png"}
                alt="Segurito IA"
                fill
                className="object-contain"
                unoptimized
                data-ai-hint={aiPlaceholder?.imageHint || "robot assistant"}
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6 text-left">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-slate-800 tracking-tighter">Segurito</h2>
                <p className="text-slate-500 font-light text-[11px] leading-relaxed">
                  Las funciones de inteligencia artificial aún no están disponibles. 
                  Estamos trabajando para integrar a Segurito en tu flujo de trabajo diario muy pronto.
                </p>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                className="w-full bg-[#003B73] text-white text-[10px] font-light px-8 py-3 rounded-xl hover:bg-[#003B73]/90 transition-colors tracking-normal"
              >
                Entendido
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
