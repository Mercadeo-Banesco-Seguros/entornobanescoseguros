'use client';

import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-foreground tracking-tight uppercase">
          Gran Premio
        </h1>
        <p className="text-muted-foreground mt-2">
          ¡Descubre los grandiosos premios que te esperan en la meta!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {primerLugar && (
          <Card className="border-yellow-400 border-2 shadow-lg flex flex-col">
            <CardHeader>
              <div className="relative mx-auto w-48 h-48 mb-4">
                <Image
                  src={primerLugar.imageUrl}
                  alt={primerLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-yellow-500">
                {primerLugar.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{primerLugar.description}</CardDescription>
            </CardContent>
          </Card>
        )}

        {segundoLugar && (
          <Card className="border-gray-300 border-2 shadow-lg flex flex-col">
            <CardHeader>
              <div className="relative mx-auto w-48 h-48 mb-4">
                <Image
                  src={segundoLugar.imageUrl}
                  alt={segundoLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-400">
                {segundoLugar.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{segundoLugar.description}</CardDescription>
            </CardContent>
          </Card>
        )}

        {tercerLugar && (
          <Card className="border-amber-700 border-2 shadow-lg flex flex-col">
            <CardHeader>
              <div className="relative mx-auto w-48 h-48 mb-4">
                <Image
                  src={tercerLugar.imageUrl}
                  alt={tercerLugar.name}
                  layout="fill"
                  className="object-contain"
                  quality={100}
                />
              </div>
              <CardTitle className="text-2xl font-bold text-amber-600">
                {tercerLugar.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{tercerLugar.description}</CardDescription>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
