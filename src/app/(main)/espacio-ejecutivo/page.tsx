'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from "@/lib/utils";
import { Utensils, Cake, Loader2, PieChart, Library, ClipboardList, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';

const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
};

const startOfWeek = (date: Date, _options?: { weekStartsOn?: number }) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const format = (date: Date, formatStr: string, _options?: { locale?: any }) => {
    if (formatStr === 'yyyy-MM-dd') {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    if (formatStr === 'EEEE') {
        return date.toLocaleDateString('es-ES', { weekday: 'long' });
    }
    if (formatStr === 'd') {
        return String(date.getDate());
    }
    return date.toLocaleDateString('es-ES');
};

const es = {};

export default function EspacioEjecutivoPage() {
    const { fetchMenuData, fetchCalendarData } = useAuth();
    const [todaysMenu, setTodaysMenu] = React.useState<any | null>(null);
    const [isLoadingMenu, setIsLoadingMenu] = React.useState(true);
    const [weekEvents, setWeekEvents] = React.useState<any[]>([]);
    const [isLoadingEvents, setIsLoadingEvents] = React.useState(true);

    const loadDynamicData = React.useCallback(async () => {
        setIsLoadingMenu(true);
        setIsLoadingEvents(true);

        try {
            const allMenus = await fetchMenuData();
            const dayName = new Date().toLocaleString('es-ES', { weekday: 'long' });
            
            const normalize = (str: string) => 
                str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim() : "";
            
            const normalizedToday = normalize(dayName);
            
            const menuItem = allMenus.find(item => 
                normalize(item.day) === normalizedToday && 
                item.type === 'Ejecutivo'
            ) || null;
            
            setTodaysMenu(menuItem);

            const calData = await fetchCalendarData();
            setWeekEvents(calData || []);
        } catch (error) {
            console.error("Failed to fetch executive data:", error);
        } finally {
            setIsLoadingMenu(false);
            setIsLoadingEvents(false);
        }
    }, [fetchMenuData, fetchCalendarData]);

    React.useEffect(() => {
        loadDynamicData();
    }, [loadDynamicData]);

    const today = new Date();
    const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
    const daysOfWeek = Array.from({ length: 5 }).map((_, i) => addDays(startOfCurrentWeek, i));

    return (
        <div className="flex flex-col w-full min-h-screen">
            {/* 1. Full Width Hero Section (Full-Bleed) - BLUE BACKGROUND */}
            <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54] shadow-2xl">
                {/* Atmospheric Glows */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                  <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-400/20 blur-[150px] -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-white/10 blur-[120px] translate-y-1/4 -translate-x-1/4" />
                </div>

                <div className="relative z-10 text-center text-white p-8 max-w-4xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex justify-center mb-6">
                         <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] text-white font-light tracking-wide">
                            Acceso Concedido
                         </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">Espacio Ejecutivo</h1>
                    <p className="text-[11px] md:text-xs text-white/70 font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
                        Un ecosistema estratégico diseñado para potenciar el liderazgo y la gestión institucional de Banesco Seguros.
                    </p>
                </div>
            </section>

            {/* 2. Quick Access Cards Container */}
            <div className="relative w-screen left-1/2 -ml-[50vw] py-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-[2000px] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: 'Información Clave', desc: 'Informes estratégicos y reportes de gestión corporativa.', bgColor: 'bg-[#0054A6]', btn: 'Consultar' },
                            { title: 'Liderazgo', desc: 'Biblioteca de recursos y artículos sobre gestión de equipos.', bgColor: 'bg-[#003B73]', btn: 'Explorar' },
                            { title: 'Gestión de Equipos', desc: 'Herramientas digitales para la optimización de procesos.', bgColor: 'bg-slate-500', btn: 'Ver Herramientas' }
                        ].map((item, idx) => (
                            <Card key={idx} className={cn("group relative rounded-[2.5rem] overflow-hidden shadow-none h-[280px] flex flex-col justify-end border-none transition-all duration-500 hover:-translate-y-2", item.bgColor)}>
                                {/* Decorative Circular Lines */}
                                <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 pointer-events-none opacity-20 group-hover:scale-110 transition-transform duration-700">
                                    <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
                                        <circle cx="150" cy="150" r="149" stroke="white" strokeWidth="0.5" />
                                        <circle cx="150" cy="150" r="110" stroke="white" strokeWidth="0.5" />
                                        <circle cx="150" cy="150" r="70" stroke="white" strokeWidth="0.5" />
                                        <circle cx="150" cy="150" r="30" stroke="white" strokeWidth="0.5" />
                                    </svg>
                                </div>
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                <CardContent className="relative z-10 p-10 text-white">
                                    <h3 className="text-2xl font-bold tracking-tight text-white">{item.title}</h3>
                                    <p className="text-[10px] text-white/70 mt-2 font-light leading-relaxed">{item.desc}</p>
                                    <Button variant="secondary" size="sm" className="mt-6 bg-white text-slate-900 hover:bg-white/90 rounded-xl font-light text-[10px] px-8 h-8 border-none">{item.btn}</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Calendario Institucional (Full Width Section) */}
            <section className="relative w-screen left-1/2 -ml-[50vw] bg-[#004285] py-20 px-6 md:px-12 lg:px-20 text-white">
                <div className="max-w-[2000px] mx-auto">
                    <div className="mb-12">
                        <h2 className="text-4xl font-bold tracking-tighter text-white">Calendario Institucional</h2>
                        <p className="text-white/80 font-light text-[11px] tracking-tight">Vista semanal de hitos y recordatorios (Lunes a Viernes).</p>
                    </div>
                    
                    {isLoadingEvents ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-white animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                            {daysOfWeek.map((day) => {
                                const dateStr = format(day, 'yyyy-MM-dd');
                                const dayData = weekEvents.find(e => e.date === dateStr);
                                const isDayToday = isToday(day);

                                return (
                                    <div key={dateStr} className={cn(
                                        "min-h-[180px] p-8 rounded-[2.5rem] flex flex-col gap-5 transition-all border-none",
                                        isDayToday ? "bg-white text-[#004285] shadow-2xl scale-[1.02] z-10" : "bg-white/10 text-white"
                                    )}>
                                        <div className="flex flex-col">
                                            <span className={cn(
                                                "text-[9px] font-light tracking-tight capitalize",
                                                isDayToday ? "text-[#004285]/70" : "text-white/60"
                                            )}>
                                                {format(day, 'EEEE', { locale: es })}
                                            </span>
                                            <span className={cn(
                                                "text-3xl font-black tracking-tighter", 
                                                isDayToday ? "text-[#004285]" : "text-white"
                                            )}>
                                                {format(day, 'd')}
                                            </span>
                                        </div>
                                        <div className="flex-grow space-y-2.5 overflow-y-auto no-scrollbar">
                                            {dayData?.events?.map((ev: string, i: number) => (
                                                <div 
                                                    key={`ev-${i}`} 
                                                    className={cn(
                                                        "px-3.5 py-2 rounded-xl text-[9px] font-light leading-tight",
                                                        isDayToday ? "bg-[#004285] text-white" : "bg-white text-slate-800"
                                                    )}
                                                >
                                                    {ev}
                                                </div>
                                            ))}
                                            {dayData?.birthdays?.map((bd: string, i: number) => (
                                                <div 
                                                    key={`bd-${i}`} 
                                                    className={cn(
                                                        "px-3.5 py-2 rounded-xl text-[9px] font-light leading-tight flex items-center gap-2",
                                                        isDayToday ? "bg-pink-500 text-white" : "bg-pink-50 text-pink-700"
                                                    )}
                                                >
                                                    <Cake className={cn("w-3.5 h-3.5 shrink-0", isDayToday ? "text-white" : "text-pink-600")} />
                                                    {bd}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* 4. Menú Ejecutivo y Herramientas Section */}
            <div className="relative w-screen left-1/2 -ml-[50vw] py-20 px-6 md:px-12 lg:px-20">
                <div className="max-w-[2000px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Tarjeta de Menú Ejecutivo */}
                    <Card className="flex flex-col rounded-[3rem] overflow-hidden border-none bg-slate-900 min-h-[420px] shadow-none">
                        <CardContent className="p-0 h-full">
                           {isLoadingMenu ? (
                                <div className="p-10 h-full flex flex-col items-center justify-center text-center gap-6">
                                    <Skeleton className="h-48 w-full rounded-[2rem] bg-white/5" />
                                    <Skeleton className="h-6 w-3/4 bg-white/5" />
                                    <Skeleton className="h-4 w-1/2 bg-white/5" />
                                </div>
                           ) : todaysMenu ? (
                                <div className="relative w-full h-full flex flex-col justify-end">
                                    <Image 
                                        src={todaysMenu.imageUrl || "https://images.unsplash.com/photo-1551731388-75ce9981881a?auto=format&fit=crop&q=80&w=800"}
                                        alt={todaysMenu.name}
                                        fill
                                        className="object-cover opacity-50"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent pointer-events-none" />
                                    <div className="relative z-10 p-10 space-y-8">
                                        <div className="space-y-1">
                                            <span className="text-blue-400 text-[9px] font-light tracking-tight uppercase">Menú Ejecutivo</span>
                                            <h4 className="text-white text-xl font-bold tracking-tighter leading-none">Menú del Día</h4>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            <h3 className="text-lg font-medium text-white tracking-tight leading-tight">{todaysMenu.name}</h3>
                                            <p className="text-[10px] text-white/40 font-light leading-relaxed line-clamp-4 tracking-tight">{todaysMenu.description}</p>
                                        </div>

                                        <div className="pt-1">
                                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-white text-[9px] font-light">
                                                <Utensils className="w-3.5 h-3.5" />
                                                Servicio Premium
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-10 h-full flex flex-col items-center justify-center text-center text-slate-500 gap-6">
                                    <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center">
                                        <Utensils className="h-10 w-10 opacity-20" />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-white font-medium text-base">Sin menú ejecutivo</p>
                                        <p className="text-[10px] text-white/20 font-light max-w-[150px]">No hay platos registrados para hoy.</p>
                                    </div>
                                </div>
                           )}
                        </CardContent>
                    </Card>

                    {/* Tarjeta de Herramientas de Gestión */}
                    <Card className="flex flex-col rounded-[3rem] overflow-hidden border border-slate-100 bg-white min-h-[420px] shadow-none">
                        <CardContent className="p-10 h-full flex flex-col">
                            <div className="space-y-1 mb-10">
                                <span className="text-[#0054A6] text-[9px] font-light tracking-tight uppercase">Accesos Directos</span>
                                <h2 className="text-slate-900 text-xl font-bold tracking-tighter">Herramientas de Gestión</h2>
                            </div>

                            <div className="flex-grow space-y-3">
                                {[
                                    { 
                                        title: 'Site Actuarial', 
                                        desc: 'Cálculos de riesgo, reservas y análisis estadístico avanzado.', 
                                        icon: PieChart, 
                                        href: 'https://sites.google.com/banescoseguros.com/site-actuarial?usp=sharing', 
                                        color: 'text-blue-600', 
                                        bg: 'bg-blue-50' 
                                    },
                                    { 
                                        title: 'Biblioteca de Procesos', 
                                        desc: 'Documentación técnica y flujogramas de la operativa ejecutiva.', 
                                        icon: Library, 
                                        href: '/biblioteca', 
                                        color: 'text-sky-600', 
                                        bg: 'bg-sky-50' 
                                    },
                                    { 
                                        title: 'Portal de Requerimientos', 
                                        desc: 'Gestión y seguimiento de solicitudes de alta prioridad.', 
                                        icon: ClipboardList, 
                                        href: '/requerimientos', 
                                        color: 'text-[#0054A6]', 
                                        bg: 'bg-[#0054A6]/5' 
                                    }
                                ].map((tool, idx) => (
                                    <Link key={idx} href={tool.href} target={tool.href.startsWith('http') ? "_blank" : undefined} className="group block">
                                        <div className={cn(
                                            "flex items-center gap-4 p-4 rounded-[1.5rem] border border-transparent transition-all duration-300 hover:shadow-md hover:scale-[1.01] hover:bg-white",
                                            tool.bg
                                        )}>
                                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 bg-white")}>
                                                <tool.icon className={cn("w-5 h-5", tool.color)} />
                                            </div>
                                            <div className="flex-grow">
                                                <h4 className="text-slate-900 font-bold text-sm tracking-tight group-hover:text-[#0054A6] transition-colors">{tool.title}</h4>
                                                <p className="text-slate-500 text-[9px] font-light leading-relaxed tracking-tight">{tool.desc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 text-slate-300">
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="py-20" />
        </div>
    );
}
