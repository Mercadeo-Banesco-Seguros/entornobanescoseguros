'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { carEvolutions } from '@/lib/data';
import { useState } from 'react';

type CarEvolutionProps = {
  currentUser: User;
};

export default function CarEvolution({ currentUser }: CarEvolutionProps) {
  const userProgress = currentUser.progreso || 0;

  const getCurrentEvolution = () => {
    const sortedEvolutions = [...carEvolutions].sort((a, b) => b.progressThreshold - a.progressThreshold);
    return sortedEvolutions.find(evo => userProgress >= evo.progressThreshold) || carEvolutions[0];
  };

  const currentEvolution = getCurrentEvolution();
  const [selectedEvolution, setSelectedEvolution] = useState(currentEvolution);

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
                        className="object-contain"
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
                      <p className="text-xs text-muted-foreground mt-1">{selectedEvolution.description}</p>
                  </div>
                </>
            )}
        </div>
        <div className="flex items-end justify-center space-x-4 w-full">
          {carEvolutions.map((evolution) => {
            const isUnlocked = userProgress >= evolution.progressThreshold;
            const isSelected = selectedEvolution.id === evolution.id;

            return (
              <button
                key={evolution.id}
                onClick={() => setSelectedEvolution(evolution)}
                className={cn(
                  'flex flex-col items-center text-center transition-all duration-300',
                  isSelected ? 'scale-110' : 'scale-100 opacity-50 hover:opacity-75'
                )}
                disabled={!isUnlocked}
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
                </div>
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
