'use client';

import { useRouter } from 'next/navigation';
import WelcomePage from './welcome/page';
import { useEffect, useState } from 'react';

export default function AppRoot() {
  const router = useRouter();
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setIsFirstTime(false);
      router.push('/dashboard');
    } else {
      setIsFirstTime(true);
    }
  }, [router]);

  const handleAdvance = () => {
    localStorage.setItem('hasVisited', 'true');
    router.push('/dashboard');
  };

  if (isFirstTime === null) {
    return <div className="w-full h-screen flex items-center justify-center bg-background">Cargando...</div>;
  }

  if (isFirstTime) {
    return (
      <div className="bg-background">
        <WelcomePage onAdvance={handleAdvance} />
      </div>
    );
  }

  // This part will likely just show a loading or redirecting state
  return <div className="w-full h-screen flex items-center justify-center bg-background">Redirigiendo...</div>;
}
