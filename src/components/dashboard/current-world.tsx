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

// More robust function to get a simplified key from a full VP name
const getVpKeyFromName = (name: string): string | null => {
  if (!name) return null;
  const lowerName = name.toLowerCase();
  if (lowerName.includes('gran caracas')) return 'gran-caracas';
  if (lowerName.includes('ctro. occid') || lowerName.includes('andes')) return 'centro-occidente-andes';
  if (lowerName.includes('centro llanos') || lowerName.includes('carabobo')) return 'centro-llanos-carabobo';
  if (lowerName.includes('oriente')) return 'oriente';
  if (lowerName.includes('zulia') || lowerName.includes('falcón')) return 'zulia-falcon';
  return null;
};


export default function CurrentWorld({ currentUser, levels, users }: CurrentWorldProps) {
  const isAdministrator = currentUser.cargo === 'ADMINISTRADOR';
  const vicepresidenciaKeys = useMemo(() => Object.keys(vicepresidenciaMessages), []);
  
  const initialVpKey = getVpKeyFromName(currentUser.vicepresidencia || '') || vicepresidenciaKeys[0];
  const [selectedVpKey, setSelectedVpKey] = useState(initialVpKey);

  const displayVpKey = isAdministrator ? selectedVpKey : getVpKeyFromName(currentUser.vicepresidencia || '');

  const vpDetails = useMemo(() => {
    if (!displayVpKey) return null;
    return vicepresidenciaMessages[displayVpKey];
  }, [displayVpKey]);

  const welcomeMessage = vpDetails?.message || "Bienvenido al Circuito Banesco. Mensaje no disponible para tu vicepresidencia.";
  const worldImageId = vpDetails?.worldImageId;
  const worldImage = PlaceHolderImages.find(p => p.id === worldImageId);
  const worldName = vpDetails?.name || currentUser.vicepresidencia || "Pista General";

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
          {vicepresidenciaKeys.map((vpKey) => {
            const vpData = vicepresidenciaMessages[vpKey];
            const image = vpData ? PlaceHolderImages.find(p => p.id === vpData.worldImageId) : null;
            const isSelected = selectedVpKey === vpKey;

            return (
              <button
                key={vpKey}
                onClick={() => setSelectedVpKey(vpKey)}
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
                        alt={vpData.name}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                  ) : <div className="w-full h-full bg-gray-300 rounded-md" />}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
