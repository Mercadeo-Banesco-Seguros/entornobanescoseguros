
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { User, Level } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { CircleCheck, Lock } from 'lucide-react';

type CurrentWorldProps = {
  currentUser: User;
  levels: Level[];
};

export default function CurrentWorld({ currentUser, levels }: CurrentWorldProps) {
  const currentLevelFromUser = levels.find(l => l.id === currentUser.level);
  const [selectedLevel, setSelectedLevel] = useState(currentLevelFromUser || levels[0]);

  const handleLevelSelect = (level: Level) => {
    setSelectedLevel(level);
  };
  
  const worldImage = PlaceHolderImages.find(p => p.id === selectedLevel.worldImageId);
  const isSelectedLevelUnlocked = selectedLevel.id <= currentUser.level;
  
  const allLevels = [...levels].sort((a, b) => a.id - b.id);

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            {selectedLevel && (
                <>
                  <div className="relative w-80 h-80">
                      {worldImage ? (
                          <Image
                              src={worldImage.imageUrl}
                              alt={selectedLevel.worldName}
                              fill
                              quality={100}
                              className={cn(
                                  'object-contain',
                                  !isSelectedLevelUnlocked && "grayscale"
                              )}
                              data-ai-hint={worldImage.imageHint}
                          />
                      ) : (
                      <div className="w-full h-full bg-gray-200 rounded-lg" />
                      )}
                  </div>
                   <div className={cn("w-64 text-center md:text-left", !isSelectedLevelUnlocked && 'opacity-50')}>
                      <h3 className="text-base font-semibold">{selectedLevel.worldName}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{selectedLevel.story}</p>
                  </div>
                </>
            )}
        </div>
        <div className="flex items-end justify-center space-x-4 w-full">
            {allLevels.map(level => {
                const isUnlocked = level.id <= currentUser.level;
                const levelWorldImage = PlaceHolderImages.find(p => p.id === level.worldImageId);

                return (
                    <button
                        key={level.id}
                        className="flex flex-col items-center text-center"
                        onClick={() => handleLevelSelect(level)}
                        aria-label={`Seleccionar ${level.worldName}`}
                    >
                         <div className="relative mb-2">
                             <div className={cn(
                               "w-28 h-28 bg-secondary rounded-lg flex items-center justify-center p-2 transition-all",
                                selectedLevel.id === level.id && 'ring-2 ring-primary ring-offset-2',
                               !isUnlocked && 'opacity-60'
                              )}>
                               {levelWorldImage && (
                                <Image
                                    src={levelWorldImage.imageUrl}
                                    alt={level.worldName}
                                    width={96}
                                    height={96}
                                    className={cn("object-contain", !isUnlocked && "grayscale")}
                                />
                               )}
                             </div>
                          </div>
                          {isUnlocked ? (
                            <CircleCheck className="h-5 w-5 text-green-500" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted" />
                          )}
                    </button>
                )
            })}
        </div>
      </CardContent>
    </Card>
  );
}
