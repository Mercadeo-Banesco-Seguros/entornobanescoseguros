'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function InicioPage() {
  const { currentUser, levels, loading } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-black text-foreground tracking-tight uppercase">
            El Circuito Banesco Seguros
          </h1>
          <p className="text-sm text-muted-foreground">
            ¡Piloto, la carrera ha comenzado! Este es tu panel de control. Aquí encontrarás el mapa del circuito, tus objetivos y cómo avanzas en la competición para llegar a la meta.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="mt-4">
              Ir a mi Panel de Piloto
            </Button>
          </Link>
        </div>

        <div className="flex justify-center">
          <Image
            src="https://www.banescoseguros.com/wp-content/uploads/2025/10/inicio.png"
            alt="Casco de carreras"
            width={450}
            height={450}
            className="object-contain"
            data-ai-hint="racing helmet"
            quality={100}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
         <div className="w-full">
            {loading ? (
              <Skeleton className="w-full h-[400px] rounded-lg" />
            ) : (
              <Image 
                src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/55022831-2d7c-4034-8b63-b23023e3f4e1-removebg-preview.png"
                alt="Mapa del circuito de carreras"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
                data-ai-hint="race track map"
                quality={100}
              />
            )}
        </div>
        <div className="space-y-4">
           <h2 className="text-3xl font-bold text-foreground">RUTA DEL PILOTO</h2>
           <p className="text-sm text-muted-foreground max-w-3xl">
            Descubre las pistas y sigue tu trazada hacia la meta. Este es tu punto actual en el circuito. A medida que vayas completando objetivos y acumules puntos, la ruta hacia nuevas pistas se desbloqueará para ti.
          </p>
        </div>
      </div>

    </div>
  );
}
