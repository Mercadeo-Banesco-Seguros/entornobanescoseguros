'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type CurrentWorldProps = {
  currentUser: User;
  levels: Level[];
};

export default function CurrentWorld({ currentUser, levels }: CurrentWorldProps) {
  const currentLevel = levels.find(l => l.id === currentUser.level);

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
                <h3 className="text-base font-semibold">{currentLevel.worldName}</h3>
                <p className="text-xs text-muted-foreground mt-1">{currentLevel.story}</p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
