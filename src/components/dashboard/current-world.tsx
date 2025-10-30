'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { vicepresidenciaMessages } from '@/lib/data';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

type CurrentWorldProps = {
  currentUser: User;
  levels: Level[];
  users: User[];
};

export default function CurrentWorld({ currentUser, levels, users }: CurrentWorldProps) {
  const isAdministrator = currentUser.cargo === 'ADMINISTRADOR';

  // Obtener la lista de VPs directamente de los datos estáticos para asegurar que sea correcta.
  const vicepresidencias = useMemo(() => {
    return Object.keys(vicepresidenciaMessages);
  }, []);
  
  // El estado de la VP seleccionada por el admin. Por defecto, la primera de la lista.
  const [selectedVp, setSelectedVp] = useState(vicepresidencias[0] || '');

  // Determinar qué vicepresidencia mostrar: la seleccionada por el admin o la del propio asesor.
  const displayVp = isAdministrator ? selectedVp : currentUser.vicepresidencia;

  // Obtener los detalles (mensaje e imagen) para la vicepresidencia a mostrar.
  const vpDetails = useMemo(() => {
    if (!displayVp) return null;
    return vicepresidenciaMessages[displayVp];
  }, [displayVp]);

  const welcomeMessage = vpDetails?.message || "Bienvenido al Circuito Banesco. Mensaje no disponible para tu vicepresidencia.";
  const worldImageId = vpDetails?.worldImageId;
  const worldImage = PlaceHolderImages.find(p => p.id === worldImageId);
  const worldName = displayVp || "Pista General";

  // Vista para Asesores Integrales (no administradores)
  if (!isAdministrator) {
    return (
        <Card className="h-full border-0 shadow-none">
            <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
                <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
                    <div className="relative w-80 h-80">
                        {worldImage ? (
                            <Image
                                src={worldImage.imageUrl}
                                alt={worldName}
                                fill
                                quality={100}
                                className="object-contain"
                                data-ai-hint={worldImage.imageHint}
                            />
                        ) : <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-muted-foreground">Imagen no disponible</div>}
                    </div>
                    <div className="w-64 text-center md:text-left">
                       <h3 className="text-base font-semibold">{worldName}</h3>
                       <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{welcomeMessage}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
  }

  // Vista para Administradores, con tarjetas seleccionables
  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        {/* Contenedor principal de la imagen y texto */}
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            <div className="relative w-80 h-80">
                 {worldImage ? (
                    <Image
                        src={worldImage.imageUrl}
                        alt={worldName}
                        fill
                        quality={100}
                        className="object-contain"
                        data-ai-hint={worldImage.imageHint}
                    />
                ) : <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center text-muted-foreground">Imagen no disponible</div>}
            </div>
            <div className="w-64 text-center md:text-left">
               <h3 className="text-base font-semibold">{worldName}</h3>
               <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{welcomeMessage}</p>
            </div>
        </div>
        {/* Selector de vicepresidencias */}
         <div className="flex items-end justify-center space-x-2 w-full overflow-x-auto pb-2">
          {vicepresidencias.map((vp) => {
            const vpData = vicepresidenciaMessages[vp];
            const image = vpData ? PlaceHolderImages.find(p => p.id === vpData.worldImageId) : null;
            const isSelected = selectedVp === vp;

            return (
              <button
                key={vp}
                onClick={() => setSelectedVp(vp)}
                className={cn(
                  'flex flex-col items-center text-center transition-all duration-300 flex-shrink-0',
                  isSelected ? 'scale-105' : 'scale-100 opacity-60 hover:opacity-100'
                )}
              >
                <div
                  className={cn(
                    'relative mb-2 w-24 h-24 bg-secondary rounded-lg flex items-center justify-center p-2 transition-all',
                     isSelected ? 'border-2 border-primary' : 'border-2 border-transparent'
                  )}
                >
                  {image ? (
                      <Image
                        src={image.imageUrl}
                        alt={vp}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                  ) : <div className="w-full h-full bg-gray-300 rounded-md" />}
                </div>
                <p className="text-[10px] font-semibold w-24 truncate">{vp}</p>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
