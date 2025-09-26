'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function InicioPage() {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
            La Búsqueda por Nuestro ADN
          </h1>
          <p className="text-sm text-muted-foreground">
            ¡Explorador, la aventura ha comenzado! Este diario es el centro de nuestra expedición. Aquí encontrarás el mapa, tus misiones y cómo avanzamos juntos para reconstruir el ADN de Banesco Seguros.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="mt-4">
              Comenzar mi Expedición
            </Button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_5wzjq95wzjq95wzj-Photoroom.png?raw=true"
            alt="Diario de la expedición"
            width={450}
            height={450}
            className="object-contain"
            data-ai-hint="expedition journal"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
}
