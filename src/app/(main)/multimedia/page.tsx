'use client';

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function MultimediaPage() {
  const constructionImage = PlaceHolderImages.find(img => img.id === 'multimedia-construction');

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-12 animate-in fade-in duration-1000">
      <div className="relative w-full max-w-xl aspect-[4/3] overflow-hidden mb-8">
        {constructionImage && (
          <Image
            src={constructionImage.imageUrl}
            alt={constructionImage.description}
            fill
            priority
            className="object-contain"
            unoptimized
          />
        )}
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-[10px] font-light text-slate-400 uppercase tracking-[0.3em]">Próximamente</h2>
        <p className="text-slate-500 font-light text-[12px] tracking-tight">
          Esta sección está en construcción. Muy pronto compartiremos contenido exclusivo contigo.
        </p>
      </div>
    </div>
  );
}
