
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

export default function BienestarPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setCurrentStateIndex(1);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const currentState = wellnessStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Dynamic Hero Section - Adjusted to overlay navbar */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[520px] overflow-hidden flex flex-col items-center justify-center transition-colors duration-700 bg-[#0054A6] shadow-2xl">
        {/* Background Gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-blue-400/20 translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[150px] bg-blue-300/10 -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          {/* Text Content */}
          <div 
            key={`text-${currentStateIndex}`}
            className="w-full md:w-1/2 pl-16 md:pl-32 space-y-8 animate-in fade-in slide-in-from-left-4 duration-1000 text-left"
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
          <div className="hidden md:flex w-1/2 h-full items-end justify-end pt-12">
            <div 
              key={`image-${currentStateIndex}`}
              className="relative w-[900px] h-[800px] animate-in fade-in zoom-in-95 duration-1000"
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

      {/* Additional Content */}
      <section className="bg-white py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Beneficios</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-none">Tu bienestar nos importa</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl mx-auto mt-6">
              Explora todos los recursos y beneficios que tenemos diseñados especialmente para acompañarte en tu día a día.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
