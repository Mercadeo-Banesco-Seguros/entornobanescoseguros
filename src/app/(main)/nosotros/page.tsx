
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NosotrosPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'nosotros-hero');

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section - Nuestra Visión 2026 */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[500px] md:min-h-[550px] overflow-hidden flex items-center bg-slate-900">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage.imageUrl}
              alt="Nuestra Visión para el 2026"
              fill
              className="object-cover opacity-60"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            {/* Capas de superposición para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight">
              Nuestra Visión para el 2026
            </h1>
            <p className="text-[10px] md:text-[11px] lg:text-[12px] font-light leading-relaxed max-w-2xl text-white/90 tracking-tight">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable.
              Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido adicional centrado */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Espacio para futuras secciones como Misión, Valores, etc. */}
        </div>
      </div>
    </div>
  );
}
