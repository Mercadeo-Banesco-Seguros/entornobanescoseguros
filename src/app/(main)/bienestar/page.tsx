
'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

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

export default function BienestarPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [activeActivityIndex, setActiveActivityIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev === 0 ? 1 : 0));
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentState = wellnessStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);
  const activeActivity = wellnessActivities[activeActivityIndex];

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Dynamic Hero Section - Altura aumentada un 10% (480px -> 528px) */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[528px] overflow-hidden flex flex-col items-center justify-start transition-colors duration-700 bg-gradient-to-br from-[#0061C1] via-[#0072CE] to-[#38BDF8] shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] rounded-full blur-[150px] bg-sky-400/20 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-white/10 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          {/* Text Content */}
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

          {/* Image Content */}
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

      {/* Nueva Sección: Tu bienestar nos importa - Altura Reducida y Full Width */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-8 px-6 overflow-hidden border-t border-slate-50">
        <div className="w-full flex flex-col items-center">
          <div className="text-center space-y-2 mb-6">
            <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Actividades</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tighter text-slate-900 leading-none">Tu bienestar nos importa</h2>
            <p className="text-slate-500 text-[9px] md:text-[10px] font-light leading-relaxed max-w-2xl mx-auto mt-1">
              Explora las diferentes dimensiones de salud que hemos preparado para ti. Interactúa con las tarjetas.
            </p>
          </div>

          {/* Grid de Tarjetas (Estilo Menú con Fondo Blanco) */}
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
                      {/* Overlay sutil para las tarjetas no activas */}
                      <div className={cn(
                        "absolute inset-0 transition-opacity duration-500",
                        isActive ? "bg-black/10" : "bg-white/40"
                      )} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Información de la Actividad Seleccionada */}
            <div className="flex flex-col md:flex-row justify-between items-end w-full gap-4 px-12 border-t border-slate-100 pt-4">
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
    </div>
  );
}
