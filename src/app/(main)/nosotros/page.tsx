
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NosotrosPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'nosotros-hero');

  return (
    <div className="flex flex-col w-full gap-12">
      {/* Hero Section - Nuestra Visión 2026 */}
      <section className="relative w-screen left-1/2 -ml-[50vw] min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center bg-[#003B73]">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage.imageUrl}
              alt="Nuestra Visión para el 2026"
              fill
              className="object-cover opacity-30 mix-blend-overlay"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            {/* Capas de superposición para lograr el efecto de la imagen */}
            <div className="absolute inset-0 bg-[#003B73]/40" />
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white">
          <div className="max-w-3xl space-y-6 md:space-y-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.85] md:leading-[0.9] drop-shadow-xl uppercase">
              Nuestra Visión <br className="hidden md:block" /> para el 2026
            </h1>
            <p className="text-[12px] md:text-sm lg:text-base font-light leading-relaxed max-w-2xl text-white/90 tracking-tight">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable.
              Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido adicional centrado */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Espacio para futuras secciones */}
        </div>
      </div>
    </div>
  );
}
