'use client';

import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { prizes } from '@/lib/data';
import { Card } from '@/components/ui/card';

export default function CajeroPage() {
  const { loading } = useAuth();

  const firstPlace = prizes.find(p => p.name === 'Primer Lugar');
  const secondPlace = prizes.find(p => p.name === 'Segundo Lugar');
  const thirdPlace = prizes.find(p => p.name === 'Tercer Lugar');

  if (loading) {
    return <Skeleton className="h-[600px] w-full" />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center md:text-left md:flex md:items-center md:gap-8 mb-12">
        <div className="flex-shrink-0 mb-8 md:mb-0 mx-auto md:mx-0">
          <Image
            src="https://www.banescoseguros.com/wp-content/uploads/2025/10/Gemini_Generated_Image_vll4rkvll4rkvll4-Photoroom.png"
            alt="Resort"
            width={250}
            height={250}
            className="rounded-lg object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
            ¡Descubre la lista de Premios!
          </h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-md">
            Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros.
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {/* Primer Lugar */}
        {firstPlace && (
          <Card className="p-6 border-0 shadow-none">
            <div className="grid md:grid-cols-3 items-center gap-8">
              <div className="relative h-64 md:h-80 w-full flex justify-center md:justify-start">
                <Image
                  src={firstPlace.imageUrl}
                  alt={firstPlace.name}
                  width={200}
                  height={320}
                  className="object-contain"
                />
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight">{firstPlace.name}</h2>
                <p className="text-muted-foreground mt-2 max-w-lg">{firstPlace.description}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Segundo Lugar */}
        {secondPlace && (
          <Card className="p-6 border-0 shadow-none">
            <div className="grid md:grid-cols-3 items-center gap-8">
              <div className="relative h-64 md:h-80 w-full flex justify-center md:justify-start">
                <Image
                  src={secondPlace.imageUrl}
                  alt={secondPlace.name}
                  width={200}
                  height={320}
                  className="object-contain"
                />
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight">{secondPlace.name}</h2>
                <p className="text-muted-foreground mt-2 max-w-lg">{secondPlace.description}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Tercer Lugar */}
        {thirdPlace && (
           <Card className="p-6 border-0 shadow-none">
            <div className="grid md:grid-cols-3 items-center gap-8">
              <div className="relative h-64 md:h-80 w-full flex justify-center md:justify-start">
                <Image
                  src={thirdPlace.imageUrl}
                  alt={thirdPlace.name}
                   width={200}
                  height={320}
                  className="object-contain"
                />
              </div>
              <div className="md:col-span-2 text-center md:text-left">
                <h2 className="text-3xl font-bold tracking-tight">{thirdPlace.name}</h2>
                <p className="text-muted-foreground mt-2 max-w-lg">{thirdPlace.description}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
