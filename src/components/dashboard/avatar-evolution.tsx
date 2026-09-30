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
  if (!str) return 'Base';
  return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

export default function CarEvolution({ currentUser }: CarEvolutionProps) {
  const isAdministrator = currentUser.cargo === 'ADMINISTRADOR';
  const userCategory = toTitleCase(currentUser.avatar || 'Base');

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
        text: `Logro institucional acumulado: ${currentProgress.toFixed(2)}%`
    };
  }, [currentUser.progreso]);

  const isSelectedEvolutionUnlocked = selectedEvolution && categoryOrder[selectedEvolution.category as keyof typeof categoryOrder] <= userCategoryRank;

  return (
    <Card className="h-full border-0 shadow-none bg-white rounded-3xl">
      <CardContent className="flex flex-col items-center text-center gap-8 pt-10 h-full">
        <div className="flex-grow flex flex-col md:flex-row items-center justify-center h-96 w-full md:gap-12">
            {selectedEvolution && (
                <>
                  <div className="relative w-80 h-80 drop-shadow-2xl">
                     <Image 
                        src={selectedEvolution.imageUrl} 
                        alt={selectedEvolution.name} 
                        fill 
                        quality={100}
                        className={cn(
                          'object-contain transition-all duration-700',
                          !isSelectedEvolutionUnlocked && 'grayscale opacity-50'
                        )}
                        unoptimized
                      />
                  </div>
                  <div className="w-72 text-center md:text-left space-y-4">
                      <div className={cn(
                          'inline-flex text-[9px] font-bold px-4 py-1 rounded-full text-white uppercase tracking-widest',
                          selectedEvolution.category === 'Oro' && 'bg-yellow-500',
                          selectedEvolution.category === 'Plata' && 'bg-slate-400',
                          selectedEvolution.category === 'Bronce' && 'bg-amber-600',
                          selectedEvolution.category === 'Base' && 'bg-slate-500',
                      )}>
                          Nivel {selectedEvolution.category}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">{selectedEvolution.name}</h3>
                      <p className="text-[11px] font-light text-slate-500 leading-relaxed tracking-tight whitespace-pre-line">{selectedEvolution.description}</p>
                  </div>
                </>
            )}
        </div>
        
        {!isAdministrator && (
          <div className="w-full max-w-md px-4 space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Progreso Institucional</span>
              <span className="text-lg font-bold text-[#003B73] tracking-tighter">{progressData.progress.toFixed(2)}%</span>
            </div>
            <Progress value={progressData.progress} className="h-2 bg-slate-100" />
            <p className="text-[9px] text-slate-400 font-light italic">Continúa con tu gestión para alcanzar el siguiente nivel de reconocimiento.</p>
          </div>
        )}

        <div className="flex items-center justify-center gap-4 w-full pt-4">
          {carEvolutions.map((evolution) => {
            const isUnlocked = categoryOrder[evolution.category as keyof typeof categoryOrder] <= userCategoryRank;
            const isSelected = selectedEvolution?.id === evolution.id;

            return (
              <button
                key={evolution.id}
                onClick={() => setSelectedEvolution(evolution)}
                className={cn(
                  'flex flex-col items-center text-center transition-all duration-500',
                  isSelected ? 'scale-110 z-10' : 'scale-100 opacity-40 hover:opacity-100'
                )}
              >
                <div
                  className={cn(
                    'relative w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center p-3 transition-all border shadow-sm',
                     isSelected ? 'border-[#0054A6] bg-white ring-4 ring-[#0054A6]/10' : 'border-slate-100'
                  )}
                >
                  <Image
                    src={evolution.imageUrl}
                    alt={evolution.name}
                    width={60}
                    height={60}
                    className={cn(
                      'object-contain transition-all duration-500',
                      !isUnlocked && 'grayscale opacity-50'
                    )}
                    unoptimized
                  />
                  {!isUnlocked ? (
                    <div className="absolute inset-0 bg-white/60 rounded-[1.5rem] flex items-center justify-center backdrop-blur-[1px]">
                      <Lock className="w-4 h-4 text-slate-400" strokeWidth={1.5} />
                    </div>
                  ) : (
                    <div className="absolute -top-1.5 -right-1.5 bg-[#0054A6] rounded-full p-1 shadow-md border-2 border-white">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
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
