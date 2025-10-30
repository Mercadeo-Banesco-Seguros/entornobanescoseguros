'use client';

import { Card, CardContent } from '@/components/ui/card';
import { User } from '@/lib/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { carEvolutions } from '@/lib/data';

type CarEvolutionProps = {
  currentUser: User;
};

export default function CarEvolution({ currentUser }: CarEvolutionProps) {
  const userProgress = currentUser.progreso || 0;

  const getCurrentEvolution = () => {
    // Sort evolutions by progress threshold descending
    const sortedEvolutions = [...carEvolutions].sort((a, b) => b.progressThreshold - a.progressThreshold);
    // Find the first evolution where the user's progress is sufficient
    return sortedEvolutions.find(evo => userProgress >= evo.progressThreshold) || carEvolutions[0];
  };

  const currentEvolution = getCurrentEvolution();
  
  return (
    <Card className="h-full border-0 shadow-none">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-6 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-4">
            {currentEvolution && (
                <>
                  <div className="relative w-80 h-80">
                     <Image 
                        src={currentEvolution.imageUrl} 
                        alt={currentEvolution.name} 
                        fill 
                        quality={100}
                        className="object-contain"
                      />
                  </div>
                  <div className="w-64 text-center md:text-left">
                      <span className={cn(
                          'text-xs font-bold px-3 py-1 rounded-full text-white',
                          currentEvolution.category === 'Oro' && 'bg-yellow-500',
                          currentEvolution.category === 'Plata' && 'bg-gray-400',
                          currentEvolution.category === 'Bronce' && 'bg-amber-700',
                          currentEvolution.category === 'Base' && 'bg-gray-500',
                      )}>
                          {currentEvolution.category}
                      </span>
                      <h3 className="text-base font-semibold mt-2">{currentEvolution.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{currentEvolution.description}</p>
                  </div>
                </>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
