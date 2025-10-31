'use client';

import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { prizes } from '@/lib/data';

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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-16">
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tighter">
            ¡Descubre la lista de Premios!
          </h1>
          <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto md:mx-0">
            Aprende a desenvolverte mejor en el entorno empresarial con el sistema de cursos y herramientas educativas de Banesco Seguros.
          </p>
        </div>
        <div className="md:w-1/3">
          <Image
            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_xxt9shxxt9shxxt9-Photoroom.png?raw=true"
            alt="Resort"
            width={300}
            height={300}
            className="rounded-lg object-contain mx-auto"
          />
        </div>
      </div>

      {/* Prizes Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
        {firstPlace && (
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 mb-6">
              <Image
                src={firstPlace.imageUrl}
                alt={firstPlace.name}
                layout="fill"
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{firstPlace.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">{firstPlace.description}</p>
          </div>
        )}
        
        {secondPlace && (
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 mb-6">
              <Image
                src={secondPlace.imageUrl}
                alt={secondPlace.name}
                layout="fill"
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{secondPlace.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">{secondPlace.description}</p>
          </div>
        )}

        {thirdPlace && (
          <div className="flex flex-col items-center">
            <div className="relative h-64 w-64 mb-6">
              <Image
                src={thirdPlace.imageUrl}
                alt={thirdPlace.name}
                layout="fill"
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">{thirdPlace.name}</h2>
            <p className="text-muted-foreground mt-2 text-sm max-w-xs">{thirdPlace.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
