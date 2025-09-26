'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import Image from 'next/image';

export default function InicioPage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-0 shadow-none bg-transparent">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-primary tracking-tight">
            La Búsqueda por Nuestro ADN
          </CardTitle>
          <CardDescription className="text-lg font-semibold text-muted-foreground mt-2">
            ¡Explorador, la aventura ha comenzado!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 pb-8">
          <div className="w-full md:w-3/5 text-center md:text-left">
            <p className="text-base text-foreground leading-relaxed">
              Este diario es el centro de nuestra expedición; aquí encontrarás: el mapa de los territorios a conquistar, ver tu progreso como explorador, las misiones activas y descubrir cómo avanzamos juntos hacia la reconstrucción del ADN Banesco Seguros.
            </p>
          </div>
          <div className="w-full md:w-2/5 flex justify-center">
            <Image
              src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_89wnk889wnk889wn.png?raw=true"
              alt="Diario de la expedición"
              width={300}
              height={300}
              className="object-contain"
              data-ai-hint="expedition journal"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
