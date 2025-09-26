'use client';

import Image from 'next/image';

export default function MisionesPage() {
  return (
    <div className="flex flex-col items-center text-center h-full">
      <Image
        src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_lwc97dlwc97dlwc9-Photoroom.png?raw=true"
        alt="Sección en construcción"
        width={500}
        height={500}
        className="object-contain"
        quality={100}
      />
      <h1 className="text-3xl font-bold text-foreground mt-8">
        ¡Esta sección se está forjando!
      </h1>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">
        Nuestros mejores exploradores están trazando nuevas rutas y preparando misiones emocionantes para ti. ¡Vuelve pronto para descubrir los próximos desafíos!
      </p>
    </div>
  );
}
