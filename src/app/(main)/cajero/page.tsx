'use client';

import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import type { Prize } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

export default function CajeroPage() {
  const { currentUser, loading, prizes } = useAuth();

  if (loading || !currentUser) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-lg" />)}
        </div>
      </div>
    );
  }
  
  if (!prizes || prizes.length === 0) {
      return <div>No se encontraron premios.</div>;
  }

  const goldPrizes = prizes.filter(p => p.category === 'Oro');
  const silverPrizes = prizes.filter(p => p.category === 'Plata');
  const bronzePrizes = prizes.filter(p => p.category === 'Bronce');

  const PrizeCard = ({ prize, bgColor, textColor, categoryColor, categoryTextColor }: { prize: Prize, bgColor: string, textColor: string, categoryColor: string, categoryTextColor: string }) => {
    return (
        <Card
            className={cn(
                "rounded-2xl p-6 flex flex-col justify-between h-96 shadow-lg",
                bgColor,
                textColor
            )}
        >
            <CardContent className="p-0 flex flex-col h-full">
                <div className="flex-grow flex items-center justify-center">
                    <div className="relative w-48 h-48">
                        <Image src={prize.imageUrl} alt={prize.name} fill className="object-contain" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center text-center mt-4 space-y-2">
                    <div className='flex items-center gap-2'>
                        <h3 className="font-black text-xl tracking-tighter">{prize.name}</h3>
                        <span className={cn('text-xs font-bold px-3 py-1 rounded-full', categoryColor, categoryTextColor)}>{prize.category}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
  };
  
  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Vitrinas de Premios</h1>
        <p className="text-muted text-lg mt-1">Estos son los trofeos que esperan a los mejores pilotos del circuito.</p>
      </header>

      {/* Gold Prizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-yellow-500 tracking-tighter">ORO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {goldPrizes.map(prize => <PrizeCard key={prize.id} prize={prize} bgColor="bg-yellow-400" textColor="text-black" categoryColor="bg-black/10" categoryTextColor="text-black" />)}
        </div>
      </div>

      {/* Silver Prizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-400 tracking-tighter">PLATA</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {silverPrizes.map(prize => <PrizeCard key={prize.id} prize={prize} bgColor="bg-gray-300" textColor="text-black" categoryColor="bg-black/10" categoryTextColor="text-black" />)}
        </div>
      </div>
      
      {/* Bronze Prizes */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-amber-700 tracking-tighter">BRONCE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bronzePrizes.map(prize => <PrizeCard key={prize.id} prize={prize} bgColor="bg-amber-600" textColor="text-white" categoryColor="bg-white/20" categoryTextColor="text-white" />)}
        </div>
      </div>
    </div>
  );
}
