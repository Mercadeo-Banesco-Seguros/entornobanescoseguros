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
  const vicepresidencias = useMemo(() => {
    const allVps = users.map(user => user.vicepresidencia).filter(Boolean) as string[];
    return [...Array.from(new Set(allVps))];
  }, [users]);
  
  const [selectedVp, setSelectedVp] = useState(currentUser.vicepresidencia || vicepresidencias[0]);

  const isAdministrator = currentUser.cargo === 'ADMINISTRADOR';
  
  // Determina qué VP mostrar. Para el admin, es la que selecciona. Para el resto, es la suya.
  const displayVp = isAdministrator ? selectedVp : currentUser.vicepresidencia;

  // Busca los detalles de la VP a mostrar.
  const vpDetails = displayVp ? vicepresidenciaMessages[displayVp] : null;

  // Busca el nivel actual del usuario para tenerlo de respaldo si algo falla.
  const currentLevel = levels.find(l => l.id === currentUser.level);

  // **LÓGICA CORREGIDA**: Prioriza SIEMPRE el mensaje de la VP. Si no existe, usa la historia del nivel como último recurso.
  const welcomeMessage = vpDetails?.message || currentLevel?.story || "Mensaje no disponible.";
  const worldImageId = vpDetails?.worldImageId || currentLevel?.worldImageId;
  const worldImage = PlaceHolderImages.find(p => p.id === worldImageId);
  const worldName = vpDetails ? displayVp : currentLevel?.worldName;


  if (!isAdministrator) {
    return (
        <Card className="h-full border-0 shadow-none">
            <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
                <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
                    <div className="relative w-80 h-80">
                        {worldImage ? (
                            <Image
                                src={worldImage.imageUrl}
                                alt={worldName || ''}
                                fill
                                quality={100}
                                className="object-contain"
                                data-ai-hint={worldImage.imageHint}
                            />
                        ) : <div className="w-full h-full bg-gray-200 rounded-lg" />}
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

  // Admin view with selectable cards
  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            <div className="relative w-80 h-80">
                 {worldImage ? (
                    <Image
                        src={worldImage.imageUrl}
                        alt={worldName || ''}
                        fill
                        quality={100}
                        className="object-contain"
                        data-ai-hint={worldImage.imageHint}
                    />
                ) : <div className="w-full h-full bg-gray-200 rounded-lg" />}
            </div>
            <div className="w-64 text-center md:text-left">
               <h3 className="text-base font-semibold">{worldName}</h3>
               <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{welcomeMessage}</p>
            </div>
        </div>
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
                  {image && (
                      <Image
                        src={image.imageUrl}
                        alt={vp}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                  )}
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
