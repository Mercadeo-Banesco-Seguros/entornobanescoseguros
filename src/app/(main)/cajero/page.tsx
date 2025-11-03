'use client';

import { useAuth } from '@/context/auth-context';
import Image from 'next/image';

export default function CajeroPage() {
  const { prizes, loading } = useAuth();

  if (loading) {
    return <div>Cargando premios...</div>;
  }

  const primerLugar = prizes.find(p => p.id === 1);
  const segundoLugar = prizes.find(p => p.id === 2);
  const tercerLugar = prizes.find(p => p.id === 3);

  return (
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
        {/* Primer Lugar */}
        {primerLugar && (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-80">
              <Image
                src={primerLugar.imageUrl}
                alt={primerLugar.name}
                layout="fill"
                className="object-contain"
                quality={100}
              />
            </div>
            <div className="mt-4">
              
            </div>
          </div>
        )}

        {/* Segundo Lugar */}
        {segundoLugar && (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-80">
              <Image
                src={segundoLugar.imageUrl}
                alt={segundoLugar.name}
                layout="fill"
                className="object-contain"
                quality={100}
              />
            </div>
             <div className="mt-4">
            </div>
          </div>
        )}

        {/* Tercer Lugar */}
        {tercerLugar && (
          <div className="flex flex-col items-center">
            <div className="relative w-full h-80">
              <Image
                src={tercerLugar.imageUrl}
                alt={tercerLugar.name}
                layout="fill"
                className="object-contain"
                quality={100}
              />
            </div>
             <div className="mt-4">
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
