
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Award, Search, Share2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const academiaHeroStates = [
  {
    tag: "Cultura Institucional",
    title: "Sangre Azul Banesco Seguros",
    imageId: "academia-hero-1",
  },
  {
    tag: "Valores Institucionales",
    title: "Compromiso con el Código de Ética",
    imageId: "academia-hero-2",
  },
  {
    tag: "Formación Comercial",
    title: "Conoce Nuestros Productos",
    imageId: "academia-hero-3",
  }
];

function Counter({ end, duration = 5000, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{prefix}{count}{suffix}</>;
}

function ConcentricArcs() {
  return (
    <div className="absolute right-[-10%] top-[-20%] w-[120%] h-[140%] pointer-events-none opacity-20 hidden lg:block overflow-hidden">
      <svg viewBox="0 0 1000 1000" className="w-full h-full text-white fill-none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="800" cy="400" r="150" strokeDasharray="4 4" />
        <circle cx="800" cy="400" r="250" />
        <circle cx="800" cy="400" r="350" strokeWidth="0.5" opacity="0.5" />
        <circle cx="800" cy="400" r="450" />
        <circle cx="800" cy="400" r="550" strokeDasharray="8 8" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function AcademiaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % academiaHeroStates.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentState = academiaHeroStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Dynamic Hero Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[528px] overflow-hidden flex flex-col items-center justify-start transition-colors duration-700 bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54] shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full blur-[150px] bg-blue-400/20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-white/10 translate-x-1/4 translate-y-1/4" />
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
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight max-w-md drop-shadow-md">
              {currentState.title}
            </h2>
            <div className="flex gap-4">
              <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">
                Comenzar Formación
              </button>
            </div>
          </div>

          <div className="hidden md:flex w-1/2 h-full items-end justify-end">
            <div 
              key={`image-${currentStateIndex}`}
              className="relative transition-all duration-1000 ease-in-out w-[800px] h-[700px] translate-y-10"
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

      {/* 2. Categorías de Aprendizaje - New Minimalist Insight Design */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-32 px-8 md:px-16 lg:px-24 overflow-hidden border-b border-slate-50">
        {/* Top Info Labels */}
        <div className="absolute top-10 left-8 md:left-16 lg:left-24">
          <span className="text-[9px] text-slate-400 font-normal tracking-[0.2em] uppercase">Academia Banesco Seguros</span>
        </div>
        <div className="absolute top-10 right-8 md:right-16 lg:right-24">
          <span className="text-[9px] text-slate-400 font-normal tracking-[0.2em] uppercase">Reporte de Formación 2026</span>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left Column */}
          <div className="w-full lg:w-[22%] space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-normal tracking-tight text-slate-900 leading-tight">Cultura Institucional</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed">
                Los colaboradores que dominan nuestra cultura y valores son <span className="bg-yellow-100 px-1 font-medium text-slate-900 italic">+60% más efectivos</span> en su gestión diaria.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal tracking-tight text-slate-900 leading-tight">Liderazgo Consciente</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed">
                El desarrollo de habilidades de liderazgo incrementa la <span className="bg-yellow-100 px-1 font-medium text-slate-900 italic">retención de talento</span> y la satisfacción del equipo.
              </p>
            </div>
          </div>

          {/* Center Circle Content */}
          <div className="relative w-full lg:w-[45%] aspect-square flex items-center justify-center order-1 lg:order-2">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-200">
              {Array.from({ length: 120 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="2"
                  x2="50"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="0.4"
                  transform={`rotate(${(i * 360) / 120} 50 50)`}
                />
              ))}
            </svg>
            <div className="relative z-10 text-center px-6 md:px-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal tracking-tighter text-slate-900 leading-[1.1] max-w-md mx-auto">
                La formación constante potencia el talento individual y fortalece los resultados de todo el equipo.
              </h2>
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[22%] space-y-12 order-3">
             <div className="space-y-4">
              <h3 className="text-2xl font-normal tracking-tight text-slate-900 leading-tight">Excelencia Comercial</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed">
                El dominio de nuestros productos aumenta un <span className="bg-yellow-100 px-1 font-medium text-slate-900 italic">+45% la probabilidad</span> de alcanzar tus metas comerciales.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-normal tracking-tight text-slate-900 leading-tight">Estrategia de Ventas</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed">
                Aplicar técnicas de venta consultiva mejora la <span className="bg-yellow-100 px-1 font-medium text-slate-900 italic">experiencia del cliente</span> y la rentabilidad de la cartera.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="mt-32 max-w-4xl border-t border-slate-100 pt-8">
          <p className="text-[10px] text-slate-400 font-light leading-relaxed uppercase tracking-tight max-w-2xl">
            * Datos basados en el análisis de desempeño institucional del ciclo 2024-2025. La formación se considera un eje transversal para el cumplimiento de los objetivos estratégicos de Banesco Seguros y el fortalecimiento de la Sangre Azul.
          </p>
        </div>
      </section>

      {/* 2b. Impacto de la Formación Corporativa */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-gradient-to-br from-[#004285] via-[#0054A6] to-[#0061C1] py-24 px-8 md:px-16 lg:px-24 text-white overflow-hidden">
        <ConcentricArcs />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col space-y-6 mb-24 max-w-2xl">
            <span className="text-white/60 text-[11px] font-light tracking-normal">Formación Institucional</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
              El Impacto de la <br /> Formación Corporativa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { 
                value: 250, 
                suffix: "%", 
                label: "Crecimiento Proyectado", 
                desc: "Incremento estimado del e-learning corporativo para el cierre del ciclo 2026."
              },
              { 
                value: 92, 
                suffix: "%", 
                label: "Satisfacción Interna", 
                desc: "Porcentaje de colaboradores que valoran positivamente los planes de carrera."
              },
              { 
                value: 90, 
                suffix: "%", 
                label: "Adopción Digital", 
                desc: "Empresas líderes que utilizan formación online como eje de capacitación."
              },
              { 
                value: 218, 
                suffix: "%", 
                label: "Rendimiento Operativo", 
                desc: "Aumento de ingresos por empleado en organizaciones con formación integral."
              }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col space-y-6 border-l border-white/10 pl-8 group">
                <span className="text-5xl font-bold tracking-tighter">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <div className="space-y-3">
                   <h4 className="text-[12px] font-medium tracking-tight text-white/90">{stat.label}</h4>
                   <p className="text-[10px] font-light text-white/60 leading-relaxed max-w-[200px]">
                      {stat.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Visita Nuestra Academia Banesco Seguros */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-slate-50 py-24 px-8 md:px-16 lg:px-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 w-fit backdrop-blur-sm border border-slate-300/30">
                <Share2 className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-light text-slate-600">Academia Banesco Seguros</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.9] text-slate-900">
                Visita Nuestra <br /> <span className="text-[#0054A6]">Academia Banesco Seguros</span>
              </h2>
            </div>
            <div className="max-w-md space-y-6 text-right">
              <p className="text-[10px] font-light leading-relaxed text-slate-500">
                Nuestros cursos están diseñados para potenciar tu carrera profesional con conceptos claros y aplicables al entorno actual.
              </p>
              <Button className="bg-[#0054A6] hover:bg-[#0054A6]/90 text-white rounded-xl px-10 h-11 text-[10px] font-light">
                Ver Todo el Catálogo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Gestión de Riesgos', subtitle: 'Nivel Avanzado', bg: 'bg-[#0054A6]' },
              { id: '02', title: 'Estrategia Comercial', subtitle: 'Liderazgo de Ventas', bg: 'bg-[#003B73]' },
              { id: '03', title: 'Atención al Cliente', subtitle: 'Excelencia en Servicio', bg: 'bg-[#002D54]' },
            ].map((course) => (
              <div key={course.id} className={cn(
                "group relative aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-sm",
                course.bg
              )}>
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <span className="text-[9px] font-light text-white/60 uppercase tracking-tight mb-2">{course.subtitle}</span>
                   <h3 className="text-2xl font-bold text-white tracking-tighter leading-none">{course.title}</h3>
                   <div className="mt-6 flex items-center gap-2 text-white text-[10px] font-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <PlayCircle className="w-4 h-4" />
                      </div>
                      Continuar Aprendiendo
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
