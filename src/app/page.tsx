'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AppRoot() {
  const router = useRouter();

  useEffect(() => {
    // Redirige siempre al dashboard principal.
    router.replace('/dashboard');
  }, [router]);

  // Muestra una pantalla de carga mientras se realiza la redirección.
  return (
    <div className="w-full h-screen flex items-center justify-center bg-background">
      Cargando expedición...
    </div>
  );
}
