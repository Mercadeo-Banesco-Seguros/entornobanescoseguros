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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-[28rem] w-full rounded-lg" />)}
        </div>
      </div>
    );
  }
  
  if (!prizes || prizes.length === 0) {
      return <div>No se encontraron premios.</div>;
  }

  const goldPrize = prizes.find(p => p.category === 'Oro');
  const silverPrize = prizes.find(p => p.category === 'Plata');
  const bronzePrize = prizes.find(p => p.category === 'Bronce');

  const PrizeCard = ({ prize, bgColor, textColor, categoryColor, categoryTextColor }: { prize: Prize, bgColor: string, textColor: string, categoryColor: string, categoryTextColor: string }) => {
    return (
        <Card
            className={cn(
                "rounded-2xl p-6 flex flex-col justify-between h-[28rem] shadow-lg",
                bgColor,
                textColor
            )}
        >
            <CardContent className="p-0 flex flex-col h-full">
                <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
                    <Image src={prize.imageUrl} alt={prize.name} layout="fill" className="object-cover" />
                </div>
                <div className="flex flex-col items-center justify-center text-center mt-4 space-y-2">
                    <div className='flex items-center gap-2'>
                        <h3 className="font-black text-2xl tracking-tighter">{prize.name}</h3>
                    </div>
                     <p className="text-sm">{prize.description}</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {goldPrize && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-yellow-500 tracking-tighter">ORO</h2>
                    <PrizeCard prize={goldPrize} bgColor="bg-yellow-400" textColor="text-black" categoryColor="bg-black/10" categoryTextColor="text-black" />
                </div>
            )}
            {silverPrize && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-gray-400 tracking-tighter">PLATA</h2>
                    <PrizeCard prize={silverPrize} bgColor="bg-gray-300" textColor="text-black" categoryColor="bg-black/10" categoryTextColor="text-black" />
                </div>
            )}
            {bronzePrize && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-amber-700 tracking-tighter">BRONCE</h2>
                    <PrizeCard prize={bronzePrize} bgColor="bg-amber-600" textColor="text-white" categoryColor="bg-white/20" categoryTextColor="text-white" />
                </div>
            )}
        </div>
    </div>
  );
}
