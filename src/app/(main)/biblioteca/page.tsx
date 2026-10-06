'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

const libraryFeatures = [
  {
    title: 'Identificación precisa y \n codificación sistemática',
    description: 'Estandarización de códigos en todos los archivos y garantía de acceso a versiones recientes aprobadas, manteniendo las anteriores como registro histórico.',
    imageId: 'library-benefit-1'
  },
  {
    title: 'Búsqueda rápida de \n archivos y documentos',
    description: 'Buscador integrado que permite localizar ágilmente documentos específicos según la gerencia o unidad de negocio.',
    imageId: 'library-benefit-2'
  },
  {
    title: 'Control total del \n estatus y vigencia',
    description: 'Visualización del estado de cada documento por colores: verde (vigente y listo para uso oficial), amarillo (por actualizar o renovar pronto) y azul (en proceso de modificación o edición).',
    imageId: 'library-benefit-3'
  },
  {
    title: 'Alertas preventivas y \n notificaciones de renovación',
    description: 'Bot de notificaciones que envía correos automáticos al dueño del proceso para recordar la renovación o actualización oportuna.',
    imageId: 'library-benefit-4'
  },
];

export default function BibliotecaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [activeFeatureIndex, setActiveFeatureIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    
    // Ciclo automático cada 5 segundos
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % libraryFeatures.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const activeFeature = libraryFeatures[activeFeatureIndex];
  const libraryHeroUrl = "https://docs.google.com/drawings/d/e/2PACX-1vSReFA5gsC_kmGOO1U5zueFTWvRBbBEJcAJKVDzoTjwwbES0U-ivdnmPHscTt_JtB8yiHUub4F1iQI/pub?w=960&h=720";

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      {/* 1. Hero Section - Full Width & Immersive & Compact */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-24 pb-0 overflow-hidden flex items-center min-h-[30vh] bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40">
        {/* Atmospheric Background Blobs - Full Bleed */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[5%] left-[-15%] w-[800px] h-[800px] rounded-full bg-yellow-100/20 blur-[140px]" />
          <div className="absolute top-[15%] right-[-10%] w-[900px] h-[900px] rounded-full bg-orange-100/10 blur-[160px]" />
          <div className="absolute bottom-[-15%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-100/40 blur-[120px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                  <span className="text-[10px] font-normal text-slate-400 tracking-tight">
                    Desarrollado por La Unidad de Procesos
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-slate-900 leading-[1] animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  Biblioteca de <br /> Gestión Documental
                </h1>
              </div>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                <p className="text-slate-500 text-[10px] font-light leading-relaxed tracking-tight max-w-sm">
                  La central de inteligencia operativa de Banesco Seguros. Un espacio colaborativo diseñado para la consulta, formación y estandarización de nuestros procesos críticos.
                </p>
                <a 
                  href="https://www.appsheet.com/start/ce842c69-2210-4519-b586-a0ec8733dcdb" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-10 py-2.5 rounded-full bg-[#0054A6] text-white text-[11px] font-light tracking-wide hover:bg-[#0054A6]/90 transition-all duration-300 shadow-sm shrink-0 flex items-center justify-center"
                >
                  Explorar
                </a>
              </div>
            </div>

            {/* Columna de la Imagen - Llena el espacio derecho y se asienta en el fondo */}
            <div className="hidden md:flex justify-end items-end self-end animate-in fade-in zoom-in-95 duration-1000 delay-500">
              <div className="relative w-full aspect-video md:aspect-square max-w-[450px]">
                <Image 
                  src={libraryHeroUrl}
                  alt="Biblioteca de Gestión Documental"
                  fill
                  className="object-contain object-bottom"
                  priority
                  unoptimized
                  data-ai-hint="document management"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Secondary Strategy Section - BLUE BACKGROUND INTERACTIVE */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-16 bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54] text-white overflow-hidden transition-colors duration-700">
        {/* Background Subtle Blobs for depth */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-400 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-sky-300 blur-[100px]" />
        </div>

        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-32">
            {/* Left: Interactive Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-72 h-72 md:w-96 md:h-96">
                <div 
                  key={activeFeatureIndex}
                  className="relative w-full h-full rounded-[3rem] overflow-hidden animate-in fade-in zoom-in-95 duration-700"
                >
                  {(() => {
                    const img = PlaceHolderImages.find(i => i.id === activeFeature.imageId);
                    return img ? (
                      <Image 
                        src={img.imageUrl}
                        alt={activeFeature.title}
                        fill
                        className="object-cover"
                        data-ai-hint={img.imageHint}
                        unoptimized
                      />
                    ) : null;
                  })()}
                </div>
              </div>
            </div>

            {/* Right: Text Content with Interactivity */}
            <div className="w-full lg:w-1/2 space-y-10">
              <div 
                key={activeFeatureIndex} 
                className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-700"
              >
                <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-white leading-tight min-h-[100px] max-w-md whitespace-pre-line">
                  {activeFeature.title}
                </h2>
                <p className="text-white/70 text-[10px] md:text-xs font-light leading-relaxed max-w-xs tracking-tight min-h-[80px]">
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

      {/* Footer Space padding */}
      <div className="py-24" />
    </div>
  );
}
