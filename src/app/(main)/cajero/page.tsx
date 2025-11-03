'use client';

import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { useState } from 'react';
import type { Prize } from '@/lib/types';
import PrizeModal from '@/components/prizes/prize-modal';

export default function CajeroPage() {
  const { prizes, loading } = useAuth();
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);

  if (loading) {
    return <div>Cargando premios...</div>;
  }

  const primerLugar = prizes.find(p => p.id === 1);
  const segundoLugar = prizes.find(p => p.id === 2);
  const tercerLugar = prizes.find(p => p.id === 3);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-left mb-12">
          <h1 className="text-5xl font-black text-foreground tracking-tight">
            ¡Descubre la lista de Premios!
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl">
            Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-end">
          {segundoLugar && (
            <div
              className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPrize(segundoLugar)}
            >
              <div className="relative w-full h-80">
                <Image
                  src={segundoLugar.imageUrl}
                  alt={segundoLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          )}

          {primerLugar && (
            <div
              className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPrize(primerLugar)}
            >
              <div className="relative w-full h-96">
                <Image
                  src={primerLugar.imageUrl}
                  alt={primerLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          )}

          {tercerLugar && (
            <div
              className="flex flex-col items-center transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
              onClick={() => setSelectedPrize(tercerLugar)}
            >
              <div className="relative w-full h-80">
                <Image
                  src={tercerLugar.imageUrl}
                  alt={tercerLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      {selectedPrize && (
        <PrizeModal
          prize={selectedPrize}
          onClose={() => setSelectedPrize(null)}
        />
      )}
    </>
  );
}
