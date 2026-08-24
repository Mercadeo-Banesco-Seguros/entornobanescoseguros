
'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function NosotrosPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'nosotros-hero');

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section - Nuestra Visión 2026 */}
      {/* Se usa margin negativo y padding superior para que la Navbar flote encima y la imagen llegue al borde superior */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[500px] md:min-h-[600px] lg:min-h-[700px] overflow-hidden flex items-center bg-slate-900">
        {heroImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={heroImage.imageUrl}
              alt="Nuestra Visión para el 2026"
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            {/* Capas de superposición para legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
          </div>
        )}
        
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              nuestra visión para el 2026
            </h1>
            <p className="text-[10px] md:text-[11px] lg:text-[12px] font-light leading-relaxed max-w-xl text-white/90 tracking-tight">
              convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido adicional centrado */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Secciones futuras de la página nosotros */}
        </div>
      </div>
    </div>
  );
}
