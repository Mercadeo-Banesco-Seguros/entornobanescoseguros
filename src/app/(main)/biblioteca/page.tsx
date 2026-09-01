'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight, FileText, Search, Plus } from 'lucide-react';

const categories = [
  { name: 'Manuales de Suscripción', area: 'Operaciones' },
  { name: 'Protocolos de Siniestros', area: 'Salud / Patrimoniales' },
  { name: 'Guías de Atención', area: 'Comercial' },
  { name: 'Políticas de Riesgo', area: 'Actuarial' },
  { name: 'Procedimientos Internos', area: 'Unidad de Procesos' },
  { name: 'Formatos Estándar', area: 'Administración' },
  { name: 'Documentación Legal', area: 'Legal' },
  { name: 'Estatutos Institucionales', area: 'Gobierno Corporativo' },
];

export default function BibliotecaPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section - Full Width & Immersive */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-56 pb-32 overflow-hidden flex items-center min-h-[85vh] bg-white">
        {/* Atmospheric Background Blobs - Full Bleed */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[5%] left-[-15%] w-[800px] h-[800px] rounded-full bg-yellow-100/40 blur-[140px]" />
          <div className="absolute top-[15%] right-[-10%] w-[900px] h-[900px] rounded-full bg-orange-100/30 blur-[160px]" />
          <div className="absolute bottom-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-50/60 blur-[120px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-5xl space-y-16">
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                  Gestión del Conocimiento
                </span>
                <div className="h-px w-12 bg-slate-200" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-900">
                  Actualización 2025
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-medium tracking-tighter text-slate-900 leading-[0.85] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Biblioteca de <br /> Gestión Documental
              </h1>
            </div>
            
            <div className="max-w-lg space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed tracking-tight">
                La central de inteligencia operativa de Banesco Seguros. Un espacio colaborativo diseñado para la consulta, formación y estandarización de nuestros procesos críticos.
              </p>
              <div className="pt-4">
                <button className="px-14 py-3 rounded-full bg-white/40 backdrop-blur-md border border-slate-200 text-slate-600 text-[11px] font-light tracking-wide hover:bg-white/60 transition-all duration-300 shadow-sm">
                  Explorar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Strategy Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-40 bg-white border-y border-slate-50">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-32">
            {/* Left: Minimalist Graphic */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 flex items-center justify-center">
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-[3.5rem] rotate-12" />
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-[3.5rem] -rotate-6" />
                <div className="relative z-10 w-40 h-40 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-xl shadow-slate-100">
                  <div className="w-16 h-16 rounded-2xl border border-cyan-100 flex items-center justify-center">
                    <div className="w-8 h-8 border-b-[3px] border-r-[3px] border-cyan-400 rounded-sm" />
                  </div>
                </div>
                {/* Dots grid decoration */}
                <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-2 opacity-30">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 space-y-10">
              <h2 className="text-4xl md:text-5xl font-light tracking-tighter text-slate-900 leading-tight">
                Educar y Empoderar a <br /> nuestro equipo humano
              </h2>
              <p className="text-slate-500 text-lg font-light leading-relaxed max-w-md tracking-tight">
                Brindamos las herramientas y el conocimiento necesario para que cada colaborador pueda gestionar procesos con excelencia operativa y una clara visión estratégica.
              </p>
              
              <div className="flex items-center gap-3 pt-6">
                <div className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                <div className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                <div className="w-2.5 h-2.5 rounded-full border border-slate-300" />
              </div>

              <button className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 group pt-4">
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                Conoce nuestros programas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directory Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-40 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-28">
            <h2 className="text-2xl md:text-3xl font-light tracking-tighter text-slate-900 shrink-0">
              Directorio de Procesos
            </h2>
            <p className="text-slate-500 text-base font-light leading-relaxed max-w-xl tracking-tight">
              Explora nuestra red de conocimiento institucional. Cada documento ha sido validado por la Unidad de Procesos para asegurar la máxima eficiencia en tu gestión diaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border-t border-slate-100">
            {categories.map((item, idx) => (
              <div 
                key={idx} 
                className="group py-12 px-10 border-b border-slate-100 flex items-center justify-between transition-all hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="space-y-2">
                  <h4 className="text-base font-normal tracking-tight text-slate-900 group-hover:text-[#0054A6] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[11px] font-light text-slate-400 uppercase tracking-widest">
                    {item.area}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <Plus className="w-5 h-5 text-slate-300" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </div>

          {/* Search CTA */}
          <div className="mt-24 flex justify-center">
            <button className="px-14 py-5 rounded-full border border-slate-100 bg-slate-50/30 text-[11px] font-bold tracking-[0.25em] text-slate-500 hover:bg-white hover:text-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 flex items-center gap-4 group">
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              BUSCAR DOCUMENTOS ESPECÍFICOS
            </button>
          </div>
        </div>
      </section>

      {/* Footer Space padding */}
      <div className="py-24" />
    </div>
  );
}
