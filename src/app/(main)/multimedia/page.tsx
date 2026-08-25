'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MultimediaPage() {
  const placeholder = PlaceHolderImages.find(img => img.id === 'multimedia-construction');
  const imageUrl = placeholder?.imageUrl || "https://docs.google.com/drawings/d/e/2PACX-1vQDYWrs3tS3au8IfBhDzA21ZZBPGR4XCdiRMcDUXeI1ZSCGaVmrWNBMHj10NXVuFV7WEn5hOQOfERx2/pub?w=960&h=720";

  return (
    <div className="flex flex-col items-center justify-start pt-0 pb-10 bg-slate-50 animate-in fade-in duration-1000">
      <div className="relative w-full max-w-[280px] aspect-[4/3] mb-6">
        <Image
          src={imageUrl}
          alt="Sección en construcción"
          fill
          priority
          className="object-contain"
          unoptimized
          data-ai-hint={placeholder?.imageHint}
        />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-[9px] font-light text-slate-400 uppercase tracking-[0.4em]">Próximamente</h2>
        <p className="text-slate-400 font-light text-[11px] tracking-tight max-w-[240px] mx-auto leading-relaxed">
          Esta sección está en construcción. Muy pronto compartiremos contenido exclusivo contigo.
        </p>
      </div>
    </div>
  );
}
