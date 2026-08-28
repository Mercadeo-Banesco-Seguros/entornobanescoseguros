'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { CalendarDays, Gift, CreditCard, ChevronRight, Utensils } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const wellnessStates = [
  {
    tag: "Tu Salud Es Nuestra Prioridad",
    title: "Recursos que maximizan tu potencial",
    imageId: "wellness-hero-1",
  },
  {
    tag: "Bienestar Corporativo",
    title: "Un espacio para tu bienestar integral",
    imageId: "wellness-hero-2",
  }
];

const wellnessActivities = [
  { id: 'wellness-yoga', day: 'Salud Física', style: 'Yoga y Flexibilidad' },
  { id: 'wellness-nutrition', day: 'Alimentación', style: 'Nutrición Balanceada' },
  { id: 'wellness-mindfulness', day: 'Salud Mental', style: 'Mindfulness' },
  { id: 'wellness-fitness', day: 'Energía', style: 'Actividad Física' },
  { id: 'wellness-ergonomics', day: 'Confort', style: 'Ergonomía Laboral' },
];

const upcomingEvents = [
  { 
    id: 1, 
    date: '15', 
    month: 'AGO', 
    title: 'Asunción de la Virgen', 
    type: 'Feriado Nacional', 
    icon: CalendarDays, 
    color: 'text-purple-500', 
    bgColor: 'bg-purple-50',
    hoverBg: 'hover:bg-purple-500',
    iconColor: 'text-purple-500'
  },
  { 
    id: 2, 
    date: '26', 
    month: 'AGO', 
    title: '2da Quincena y Ticket', 
    type: 'Pago Programado', 
    icon: CreditCard, 
    color: 'text-blue-500', 
    bgColor: 'bg-blue-50',
    hoverBg: 'hover:bg-blue-500',
    iconColor: 'text-blue-500'
  },
  { 
    id: 3, 
    date: '28', 
    month: 'AGO', 
    title: 'Aniversario Institucional', 
    type: 'Evento Especial', 
    icon: Gift, 
    color: 'text-pink-500', 
    bgColor: 'bg-pink-50',
    hoverBg: 'hover:bg-pink-500',
    iconColor: 'text-pink-500'
  },
];

const menuDays = [
  { id: 'lunes', day: 'Lunes', style: 'Bowl Energético' },
  { id: 'martes', day: 'Martes', style: 'Pollo al Curry' },
  { id: 'miercoles', day: 'Miércoles', style: 'Pasta Mediterránea' },
  { id: 'jueves', day: 'Jueves', style: 'Salmón Grillado' },
  { id: 'viernes', day: 'Viernes', style: 'Bowl de Proteína' },
];

export default function BienestarPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [activeActivityIndex, setActiveActivityIndex] = React.useState(0);
  const [activeMenuDayIndex, setActiveMenuDayIndex] = React.useState(0);
  const [activeMenuType, setActiveMenuType] = React.useState<'Clásico' | 'Dieta' | 'Ejecutivo'>('Clásico');

  React.useEffect(() => {
    setMounted(true);
    
    // Evitar error de hidratación ajustando el día después del montaje
    const today = new Date().getDay();
    const initialDayIndex = today === 0 || today === 6 ? 0 : today - 1;
    setActiveMenuDayIndex(initialDayIndex);

    const timer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev === 0 ? 1 : 0));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentState = wellnessStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);
  const activeActivity = wellnessActivities[activeActivityIndex];
  const activeMenuDay = menuDays[activeMenuDayIndex];

  const getMenuImageUrl = (type: 'Clásico' | 'Dieta' | 'Ejecutivo', index: number) => {
    const prefixMap = { 'Clásico': 'menu-c-', 'Dieta': 'menu-d-', 'Ejecutivo': 'menu-e-' };
    const prefix = prefixMap[type];
    const id = `${prefix}${index + 1}`;
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${id}/600/800`;
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Dynamic Hero Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[528px] overflow-hidden flex flex-col items-center justify-start transition-colors duration-700 bg-gradient-to-br from-[#0061C1] via-[#0072CE] to-[#38BDF8] shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] rounded-full blur-[150px] bg-sky-400/20 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-white/10 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <div 
            key={`text-${currentStateIndex}`}
            className="w-full md:w-1/2 pl-16 md:pl-32 space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[10px] text-white font-light tracking-tight">
                {currentState.tag}
              </span>
            </div>
            <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight max-w-md drop-shadow-md">
              {currentState.title}
            </h2>
            <div className="flex gap-4">
              <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">
                Ver Más
              </button>
            </div>
          </div>

          <div className="hidden md:flex w-1/2 h-full items-end justify-end">
            <div 
              key={`image-${currentStateIndex}`}
              className={cn(
                "relative transition-all duration-1000 ease-in-out",
                currentStateIndex === 0 
                  ? "w-[650px] h-[550px] translate-y-4 scale-100" 
                  : "w-[800px] h-[700px] translate-y-10"
              )}
            >
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl}
                  alt={currentState.title}
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sección: Tu bienestar nos importa */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-8 px-6 overflow-hidden">
        <div className="w-full flex flex-col items-center">
          <div className="text-center space-y-2 mb-6">
            <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Actividades</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-slate-900 leading-none">Tu bienestar nos importa</h2>
            <p className="text-slate-500 text-[9px] md:text-[10px] font-light leading-relaxed max-w-2xl mx-auto mt-1">
              Explora las diferentes dimensiones de salud que hemos preparado para ti. Interactúa con las tarjetas.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4 max-w-[1800px] mx-auto">
            <div className="flex justify-center items-end gap-1 md:gap-4 lg:gap-6 flex-grow pb-4">
              {wellnessActivities.map((item, index) => {
                const activityImage = PlaceHolderImages.find(img => img.id === item.id);
                const isActive = activeActivityIndex === index;

                return (
                  <div 
                    key={item.id}
                    onMouseEnter={() => setActiveActivityIndex(index)}
                    className={cn(
                      "relative transition-all duration-500 cursor-pointer group flex flex-col items-center",
                      isActive 
                        ? "scale-105 z-20 translate-y-[-5px]" 
                        : "scale-90 opacity-40 hover:opacity-100 hover:scale-105 hover:z-20"
                    )}
                  >
                    <div className="relative w-28 h-36 md:w-40 md:h-48 lg:w-48 lg:h-64 rounded-3xl overflow-hidden border border-slate-100 shadow-lg bg-slate-50">
                      {activityImage && (
                        <Image 
                          src={activityImage.imageUrl} 
                          alt={item.style} 
                          fill 
                          unoptimized
                          className="object-cover"
                          data-ai-hint={activityImage.imageHint}
                        />
                      )}
                      <div className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        isActive ? "bg-black/10" : "bg-white/40"
                      )} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-4 px-12 pt-4">
              <div className="space-y-2 text-left">
                <div className="space-y-0">
                  <p className="text-slate-400 text-[9px] font-light tracking-tight uppercase">Bienestar 360°</p>
                  <h2 className="text-slate-900 text-lg md:text-xl font-light tracking-tighter">Banesco Seguros</h2>
                </div>
                <button 
                  className="bg-[#0054A6] hover:bg-[#0054A6]/90 text-white rounded-xl px-6 py-1.5 font-light text-[9px] transition-colors"
                >
                  Conocer Detalles
                </button>
              </div>

              <div className="flex flex-col items-end gap-1">
                <div className="text-right">
                  <p className="text-slate-400 text-[9px] font-light uppercase tracking-widest">{activeActivity.day}</p>
                  <h3 className="text-[#0054A6] text-xl md:text-2xl font-bold tracking-tighter leading-none mt-1">
                    {activeActivity.style}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sabor Seguro (Menú) Section - Colocada entre actividades y eventos */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-12 overflow-hidden min-h-[600px] flex flex-col transition-colors duration-700 bg-[#0054A6]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-700 bg-blue-500/20" />
          <div className="absolute bottom-1/4 -left-20 w-96 h-96 rounded-full blur-[100px] transition-colors duration-700 bg-sky-400/15" />
          <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full blur-[150px] transition-colors duration-700 bg-blue-700/10" />
        </div>

        <div className="container mx-auto px-12 md:px-24 relative z-10 flex flex-col flex-grow">
          <div className="flex justify-center items-end gap-1 md:gap-4 lg:gap-6 flex-grow pb-6">
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
                  <div className="relative w-24 h-48 md:w-36 md:h-72 lg:w-40 lg:h-80 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
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

      {/* 4. Sección: Feriados y eventos - Ahora al final */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-slate-50 py-16 px-12 md:px-24 lg:px-32 overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Calendario</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900 leading-none">Feriados y eventos</h2>
              <p className="text-slate-500 text-[11px] font-light leading-relaxed max-w-xl mt-2">
                Mantente al día con las fechas más importantes de nuestra organización. Planifica tu tiempo y celebra con nosotros.
              </p>
            </div>
            <Link href="/calendario">
              <button className="group flex items-center gap-2 bg-[#0054A6] text-white text-[11px] font-light transition-all px-6 py-2.5 rounded-xl hover:bg-[#0054A6]/90 shadow-sm active:scale-95">
                Ver Calendario Completo <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div 
                key={event.id} 
                className={cn(
                  "bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-5 group hover:shadow-2xl transition-all duration-300 cursor-pointer",
                  event.hoverBg
                )}
              >
                <div className={cn(
                  "w-16 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border border-slate-50 shadow-inner transition-colors duration-300", 
                  event.bgColor,
                  "group-hover:bg-white/20 group-hover:border-white/30"
                )}>
                  <span className={cn("text-xl font-bold leading-none tracking-tighter transition-colors duration-300", event.color, "group-hover:text-white")}>{event.date}</span>
                  <span className={cn("text-[9px] font-medium mt-1 uppercase transition-colors duration-300", event.color, "group-hover:text-white")}>{event.month}</span>
                </div>
                <div className="flex-grow space-y-1">
                  <div className="flex items-center gap-1.5">
                    <event.icon className={cn("w-3.5 h-3.5 transition-colors duration-300", event.color, "group-hover:text-white")} strokeWidth={1.5} />
                    <span className="text-slate-400 text-[9px] font-light uppercase tracking-wider transition-colors duration-300 group-hover:text-white/80">{event.type}</span>
                  </div>
                  <h4 className="text-slate-800 text-sm font-semibold tracking-tight leading-tight transition-colors duration-300 group-hover:text-white">
                    {event.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
