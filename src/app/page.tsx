
'use client';

import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center space-y-8 bg-background">
      <div className="bg-primary/5 p-3 rounded-full">
        <Sparkles className="h-8 w-8 text-primary" />
      </div>
      <div className="max-w-2xl space-y-4">
        <h1 className="text-5xl font-black tracking-tight sm:text-6xl italic uppercase text-foreground">
          Lienzo en Blanco
        </h1>
        <p className="text-xl text-muted-foreground">
          Este es el punto de partida de tu nueva gran idea. Comienza a construir tu Landing Page aquí mismo.
        </p>
      </div>
      <div className="flex gap-4">
        <Button size="lg" className="rounded-full font-bold">
          Comenzar Proyecto <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
