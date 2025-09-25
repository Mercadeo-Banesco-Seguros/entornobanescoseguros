'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WelcomePage() {
  const router = useRouter();

  const handleAdvance = () => {
    localStorage.setItem('hasVisited', 'true');
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-foreground p-4">
      <div className="text-center max-w-2xl">
         <Image 
            src="https://raw.githubusercontent.com/Rduque2025/web-assets-banesco-seguros/main/BANESCO%20LOGO%20BLANCO.png"
            alt="Banesco Seguros Logo"
            width={150}
            height={150}
            className="mx-auto mb-8 bg-primary p-4 rounded-full"
          />
        <h1 className="text-5xl font-bold text-primary mb-4">Bienvenido a CONECTAD2S</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Tu expedición hacia el conocimiento y el éxito comienza ahora. Prepárate para desbloquear nuevos logros, competir con tus compañeros y convertirte en una leyenda.
        </p>
        <Button onClick={handleAdvance} size="lg" className="font-bold text-lg">
          Comenzar Expedición
        </Button>
      </div>
    </div>
  );
}
