'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { vicepresidenciaMessages } from '@/lib/data';
import { useState, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type CurrentWorldProps = {
  currentUser: User;
  levels: Level[];
  users: User[];
};

export default function CurrentWorld({ currentUser, levels, users }: CurrentWorldProps) {
  const currentLevel = levels.find(l => l.id === currentUser.level);

  const vicepresidencias = useMemo(() => {
    const allVps = users.map(user => user.vicepresidencia).filter(Boolean);
    return [...Array.from(new Set(allVps))];
  }, [users]);
  
  const [selectedVp, setSelectedVp] = useState(currentUser.vicepresidencia || vicepresidencias[0]);

  if (!currentLevel) {
    return (
        <Card className="h-full border-0 shadow-none">
            <CardContent className="flex items-center justify-center h-full">
                <p>Información de la pista no disponible.</p>
            </CardContent>
        </Card>
    );
  }

  const worldImage = PlaceHolderImages.find(p => p.id === currentLevel.worldImageId);
  
  const isAdministrator = currentUser.cargo === 'ADMINISTRADOR';
  const displayVp = isAdministrator ? selectedVp : currentUser.vicepresidencia;
  const welcomeMessage = displayVp ? (vicepresidenciaMessages[displayVp] || currentLevel.story) : currentLevel.story;

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            <div className="relative w-80 h-80">
                {worldImage ? (
                    <Image
                        src={worldImage.imageUrl}
                        alt={currentLevel.worldName}
                        fill
                        quality={100}
                        className="object-contain"
                        data-ai-hint={worldImage.imageHint}
                    />
                ) : (
                <div className="w-full h-full bg-gray-200 rounded-lg" />
                )}
            </div>
             <div className="w-64 text-center md:text-left">
                {isAdministrator ? (
                    <Select onValueChange={setSelectedVp} defaultValue={selectedVp}>
                        <SelectTrigger className="w-full mb-2 text-base font-semibold">
                            <SelectValue placeholder="Seleccionar VP" />
                        </SelectTrigger>
                        <SelectContent>
                            {vicepresidencias.map((vp) => (
                                <SelectItem key={vp} value={vp}>{vp}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                ) : (
                   <h3 className="text-base font-semibold">{displayVp || currentLevel.worldName}</h3>
                )}
                <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{welcomeMessage}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
