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

const libraryFeatures = [
  {
    title: 'Identificación precisa y codificación',
    description: 'Estandarización de códigos en todos los archivos y garantía de acceso a versiones recientes aprobadas, manteniendo las anteriores como registro histórico.',
  },
  {
    title: 'Búsqueda rápida',
    description: 'Buscador integrado que permite localizar ágilmente documentos específicos según la gerencia o unidad de negocio.',
  },
  {
    title: 'Control total del estatus',
    description: 'Visualización del estado de cada documento por colores: verde (vigente y listo para uso oficial), amarillo (por actualizar o renovar pronto) y azul (en proceso de modificación o edición).',
  },
  {
    title: 'Alertas preventivas',
    description: 'Bot de notificaciones que envía correos automáticos al dueño del proceso para recordar la renovación o actualización oportuna.',
  },
];

export default function BibliotecaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const activeFeature = libraryFeatures[activeFeatureIndex];

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section - Full Width & Immersive */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-48 pb-20 overflow-hidden flex items-center min-h-[50vh] bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40">
        {/* Atmospheric Background Blobs - Full Bleed */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[5%] left-[-15%] w-[800px] h-[800px] rounded-full bg-yellow-100/20 blur-[140px]" />
          <div className="absolute top-[15%] right-[-10%] w-[900px] h-[900px] rounded-full bg-orange-100/10 blur-[160px]" />
          <div className="absolute bottom-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="max-w-5xl space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                <span className="text-[10px] font-normal text-slate-400 tracking-tight">
                  Desarrollado por La Unidad de Procesos
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-slate-900 leading-[1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Biblioteca de <br /> Gestión Documental
              </h1>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-10 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
              <p className="text-slate-500 text-[10px] font-light leading-relaxed tracking-tight max-w-sm">
                La central de inteligencia operativa de Banesco Seguros. Un espacio colaborativo diseñado para la consulta, formación y estandarización de nuestros procesos críticos.
              </p>
              <button className="px-12 py-3 rounded-full bg-[#0054A6] text-white text-[11px] font-light tracking-wide hover:bg-[#0054A6]/90 transition-all duration-300 shadow-sm shrink-0">
                Explorar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Strategy Section - BLUE BACKGROUND INTERACTIVE */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-32 bg-[#0054A6] text-white overflow-hidden transition-colors duration-700">
        {/* Background Subtle Blobs for depth */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-300 blur-[100px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-32">
            {/* Left: Minimalist Graphic */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 flex items-center justify-center">
                <div className="absolute inset-0 border-[0.5px] border-white/20 rounded-[3.5rem] rotate-12" />
                <div className="absolute inset-0 border-[0.5px] border-white/20 rounded-[3.5rem] -rotate-6" />
                <div className="relative z-10 w-40 h-40 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="w-16 h-16 rounded-2xl border border-white/20 flex items-center justify-center">
                    <div className="w-8 h-8 border-b-[3px] border-r-[3px] border-sky-400 rounded-sm" />
                  </div>
                </div>
                {/* Dots grid decoration */}
                <div className="absolute -top-4 -right-4 grid grid-cols-4 gap-2 opacity-30">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Text Content with Interactivity */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div 
                key={activeFeatureIndex} 
                className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700"
              >
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white leading-tight min-h-[80px]">
                  {activeFeature.title}
                </h2>
                <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-md tracking-tight min-h-[100px]">
                  {activeFeature.description}
                </p>
              </div>
              
              <div className="flex items-center gap-3 pt-6">
                {libraryFeatures.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveFeatureIndex(idx)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300 outline-none",
                      activeFeatureIndex === idx 
                        ? "bg-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
                        : "border border-white/30 hover:border-white/60"
                    )}
                    aria-label={`Ver funcionalidad ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Directory Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-32 bg-white">
        <div className="container mx-auto px-8 md:px-16 lg:px-24">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-28">
            <h2 className="text-xl md:text-2xl font-light tracking-tighter text-slate-900 shrink-0">
              Directorio de Procesos
            </h2>
            <p className="text-slate-500 text-sm font-light leading-relaxed max-w-xl tracking-tight">
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
