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
      {/* 1. Hero Section - Soft Blurred Blobs */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-48 pb-32 overflow-hidden flex items-center min-h-[70vh]">
        {/* Atmospheric Background Blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-yellow-100/40 blur-[120px]" />
          <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] rounded-full bg-orange-100/30 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-50/50 blur-[100px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <span className="text-[10px] font-medium uppercase tracking-widest text-slate-900">
                  Novedad: Manuales 2025 Actualizados
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tighter text-slate-900 leading-[0.95] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Biblioteca de <br /> Gestión Documental
              </h1>
            </div>
            
            <div className="max-w-md space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed tracking-tight">
                La central de inteligencia operativa de Banesco Seguros. Un espacio colaborativo para la consulta, formación y estandarización de nuestros procesos.
              </p>
              <div className="pt-4">
                <p className="text-[11px] font-medium uppercase tracking-tighter text-slate-400">
                  Impulsado por la Unidad de Procesos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Strategy Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-32 bg-white border-y border-slate-50">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
            {/* Left: Minimalist Icon/Graphic */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 flex items-center justify-center">
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-[3rem] rotate-12" />
                <div className="absolute inset-0 border-[0.5px] border-slate-200 rounded-[3rem] -rotate-6" />
                <div className="relative z-10 w-32 h-32 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-sm">
                  <div className="w-12 h-12 rounded-xl border border-cyan-200 flex items-center justify-center">
                    <div className="w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-sm" />
                  </div>
                </div>
                {/* Dots grid like the reference */}
                <div className="absolute top-0 right-0 grid grid-cols-4 gap-2 opacity-20">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <h2 className="text-3xl md:text-4xl font-light tracking-tighter text-slate-900 leading-tight">
                Educar y Empoderar a <br /> nuestro equipo humano
              </h2>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed max-w-sm tracking-tight">
                Brindamos las herramientas y el conocimiento necesario para que cada colaborador pueda gestionar procesos con excelencia y visión estratégica.
              </p>
              
              <div className="flex items-center gap-2 pt-4">
                <div className="w-2 h-2 rounded-full border border-slate-300" />
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-2 h-2 rounded-full border border-slate-300" />
                <div className="w-2 h-2 rounded-full border border-slate-300" />
              </div>

              <button className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-widest text-slate-900 group">
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                Conoce nuestros programas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directory Section (Inspired by Advisors list) */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-32 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-24">
            <h2 className="text-xl md:text-2xl font-light tracking-tighter text-slate-900 shrink-0">
              Directorio de Procesos
            </h2>
            <p className="text-slate-500 text-[13px] font-light leading-relaxed max-w-xl tracking-tight">
              Explora nuestra red de conocimiento institucional. Cada documento ha sido validado por la Unidad de Procesos para asegurar la eficiencia en tu gestión diaria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full border-t border-slate-100">
            {categories.map((item, idx) => (
              <div 
                key={idx} 
                className="group py-10 px-8 border-b border-slate-100 flex items-center justify-between transition-colors hover:bg-slate-50/50 cursor-pointer"
              >
                <div className="space-y-1">
                  <h4 className="text-[13px] font-normal tracking-tighter text-slate-900 group-hover:text-[#0054A6] transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-light text-slate-400">
                    {item.area}
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Plus className="w-4 h-4 text-slate-300" strokeWidth={1} />
                </div>
              </div>
            ))}
          </div>

          {/* Search CTA */}
          <div className="mt-20 flex justify-center">
            <button className="px-12 py-4 rounded-full border border-slate-100 bg-slate-50/30 text-[11px] font-light tracking-widest text-slate-500 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 flex items-center gap-3">
              <Search className="w-3.5 h-3.5" />
              BUSCAR DOCUMENTOS ESPECÍFICOS
            </button>
          </div>
        </div>
      </section>

      {/* Footer Space padding */}
      <div className="py-20" />
    </div>
  );
}
