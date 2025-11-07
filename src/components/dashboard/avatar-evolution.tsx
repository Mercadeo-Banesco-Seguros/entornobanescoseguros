'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { carEvolutions } from '@/lib/data';
import { useState, useEffect, useMemo } from 'react';
import { Progress } from '@/components/ui/progress';
import { Lock, Check } from 'lucide-react';

type CarEvolutionProps = {
  currentUser: User;
};

function toTitleCase(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function CarEvolution({ currentUser }: CarEvolutionProps) {
  const isAdministrator = currentUser.cargo === 'ADMINISTRATOR';
  const userCategory = toTitleCase(currentUser.avatar);

  const categoryOrder: { [key: string]: number } = { 'Base': 0, 'Bronce': 1, 'Plata': 2, 'Oro': 3 };
  
  const userCategoryRank = isAdministrator ? 3 : (categoryOrder[userCategory] ?? 0);

  const getCurrentEvolution = () => {
    if (isAdministrator) {
        return carEvolutions.find(e => e.category === 'Oro') || carEvolutions[carEvolutions.length - 1];
    }
    const unlockedEvolutions = carEvolutions.filter(e => categoryOrder[e.category as keyof typeof categoryOrder] <= userCategoryRank);
    return unlockedEvolutions.sort((a, b) => categoryOrder[b.category as keyof typeof categoryOrder] - categoryOrder[a.category as keyof typeof categoryOrder])[0] || carEvolutions[0];
  };
  
  const [selectedEvolution, setSelectedEvolution] = useState(getCurrentEvolution());

  useEffect(() => {
    setSelectedEvolution(getCurrentEvolution());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const progressData = useMemo(() => {
    const currentProgress = currentUser.progreso || 0;
    return {
        progress: currentProgress,
        text: `Llevas un ${currentProgress.toFixed(2)}% de logro.`
    };
  }, [currentUser.progreso]);

  const isSelectedEvolutionUnlocked = selectedEvolution && categoryOrder[selectedEvolution.category as keyof typeof categoryOrder] <= userCategoryRank;

  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            {selectedEvolution && (
                <>
                  <div className="relative w-80 h-80">
                     <Image 
                        src={selectedEvolution.imageUrl} 
                        alt={selectedEvolution.name} 
                        fill 
                        quality={100}
                        className={cn(
                          'object-contain',
                          !isSelectedEvolutionUnlocked && 'grayscale'
                        )}
                      />
                  </div>
                  <div className="w-64 text-center md:text-left">
                      <span className={cn(
                          'text-xs font-bold px-3 py-1 rounded-full text-white',
                          selectedEvolution.category === 'Oro' && 'bg-yellow-500',
                          selectedEvolution.category === 'Plata' && 'bg-gray-400',
                          selectedEvolution.category === 'Bronce' && 'bg-amber-700',
                          selectedEvolution.category === 'Base' && 'bg-gray-500',
                      )}>
                          {selectedEvolution.category}
                      </span>
                      <h3 className="text-base font-semibold mt-2">{selectedEvolution.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 whitespace-pre-line">{selectedEvolution.description}</p>
                  </div>
                </>
            )}
        </div>
        
        {currentUser.cargo !== 'ADMINISTRATOR' && isSelectedEvolutionUnlocked && (
          <div className="w-full max-w-sm px-4">
            <Progress value={progressData.progress} className="h-2" />
            <p className="text-xs text-muted-foreground mt-2 whitespace-nowrap">{progressData.text}</p>
          </div>
        )}

        <div className="flex items-end justify-center space-x-4 w-full">
          {carEvolutions.map((evolution) => {
            const isUnlocked = categoryOrder[evolution.category as keyof typeof categoryOrder] <= userCategoryRank;
            const isSelected = selectedEvolution?.id === evolution.id;

            return (
              <button
                key={evolution.id}
                onClick={() => setSelectedEvolution(evolution)}
                className={cn(
                  'flex flex-col items-center text-center transition-all duration-300',
                  isSelected ? 'scale-110' : 'scale-100 opacity-50 hover:opacity-75'
                )}
              >
                <div
                  className={cn(
                    'relative mb-2 w-24 h-24 bg-secondary rounded-lg flex items-center justify-center p-2 transition-all',
                     isSelected ? 'border-2 border-primary' : 'border-2 border-transparent'
                  )}
                >
                  <Image
                    src={evolution.imageUrl}
                    alt={evolution.name}
                    width={80}
                    height={80}
                    className={cn(
                      'object-contain',
                      !isUnlocked && 'grayscale'
                    )}
                  />
                  {!isUnlocked ? (
                    <div className="absolute inset-0 bg-black/30 rounded-lg flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white/70" />
                    </div>
                  ) : (
                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}