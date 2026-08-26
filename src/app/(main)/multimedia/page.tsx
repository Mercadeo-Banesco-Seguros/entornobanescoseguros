'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MultimediaPage() {
  const placeholder = PlaceHolderImages.find(img => img.id === 'multimedia-construction');
  const imageUrl = placeholder?.imageUrl || "https://docs.google.com/drawings/d/e/2PACX-1vQDYWrs3tS3au8IfBhDzA21ZZBPGR4XCdiRMcDUXeI1ZSCGaVmrWNBMHj10NXVuFV7WEn5hOQOfERx2/pub?w=960&h=720";

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] pt-2 pb-10 bg-transparent animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl w-full">
        {/* Imagen */}
        <div className="relative w-full max-w-[320px] aspect-[4/3] shrink-0">
          <Image
            src={imageUrl}
            alt="Sección en construcción"
            fill
            priority
            className="object-contain"
            unoptimized
            data-ai-hint={placeholder?.imageHint || "construction cat"}
          />
        </div>

        {/* Texto al lado y alineado a la derecha */}
        <div className="text-right space-y-2 md:pt-4 flex-grow">
          <h2 className="text-[10px] font-normal text-slate-400 uppercase tracking-normal">
            Próximamente
          </h2>
          <p className="text-slate-400 font-light text-[11px] tracking-tight max-w-[480px] ml-auto leading-relaxed">
            Esta sección está en construcción. <br /> 
            Muy pronto compartiremos contenido exclusivo contigo.
          </p>
        </div>
      </div>
    </div>
  );
}
