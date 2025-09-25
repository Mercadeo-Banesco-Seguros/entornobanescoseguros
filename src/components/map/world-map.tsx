'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { CircleCheck, Lock, MapPin } from 'lucide-react';

type WorldMapProps = {
  currentUser: User;
  levels: Level[];
};

export default function WorldMap({ currentUser, levels }: WorldMapProps) {
  const currentLevelFromUser = levels.find(l => l.id === currentUser.level);
  const [selectedLevel, setSelectedLevel] = useState(currentLevelFromUser || levels[0]);

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
  };
  
  const worldImage = PlaceHolderImages.find(p => p.id === selectedLevel.worldImageId);
  const isSelectedLevelUnlocked = selectedLevel.id <= currentUser.level;
  
  const allLevels = [...levels].sort((a, b) => a.id - b.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2 space-y-4">
            <Card className="border-0 shadow-none">
                <CardContent className="p-0">
                    <div className="relative w-full h-[600px] rounded-lg flex items-center justify-center bg-secondary/30">
                        {worldImage ? (
                            <Image
                                src={worldImage.imageUrl}
                                alt={selectedLevel.worldName}
                                fill
                                quality={100}
                                className={cn(
                                    'object-contain p-4',
                                    !isSelectedLevelUnlocked && "grayscale"
                                )}
                                data-ai-hint={worldImage.imageHint}
                            />
                        ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg" />
                        )}
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>{selectedLevel.worldName}</CardTitle>
                    <CardDescription>{selectedLevel.story}</CardDescription>
                </CardHeader>
            </Card>
        </div>
      <div className="md:col-span-1 space-y-4">
        {allLevels.map(level => {
          const isUnlocked = level.id <= currentUser.level;
          const isSelected = selectedLevel.id === level.id;
          const levelWorldImage = PlaceHolderImages.find(p => p.id === level.worldImageId);
          return (
            <Card 
                key={level.id}
                onClick={() => handleLevelSelect(level)}
                className={cn(
                    "cursor-pointer transition-all border-2",
                    isSelected ? 'border-primary' : 'border-transparent',
                    !isUnlocked && 'opacity-70 bg-secondary/50'
                )}
            >
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4 p-4">
                {levelWorldImage && (
                    <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                        <Image
                            src={levelWorldImage.imageUrl}
                            alt={level.worldName}
                            width={80}
                            height={80}
                            className={cn("object-contain", !isUnlocked && "grayscale")}
                        />
                    </div>
                )}
                <div className="flex-grow">
                  <CardTitle className="text-lg">{level.worldName}</CardTitle>
                   <div className="mt-2 flex flex-col items-start gap-2 text-sm">
                    {isUnlocked ? (
                        <span className="flex items-center gap-1 text-green-600 font-semibold">
                            <CircleCheck className="h-4 w-4" /> Desbloqueado
                        </span>
                    ) : (
                        <span className="flex items-center gap-1 text-muted-foreground font-semibold">
                            <Lock className="h-4 w-4" /> Bloqueado
                        </span>
                    )}
                    {currentUser.level === level.id && (
                        <span className="flex items-center gap-1 text-primary font-bold">
                            <MapPin className="h-4 w-4" /> Estás aquí
                        </span>
                    )}
                   </div>
                </div>
              </CardHeader>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
