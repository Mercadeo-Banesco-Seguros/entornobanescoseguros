'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardPage from "./(main)/page";
import WelcomePage from './welcome/page';

export default function HomePageController() {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const visited = localStorage.getItem('hasVisited');
    if (visited) {
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, []);

  const handleAdvance = () => {
    localStorage.setItem('hasVisited', 'true');
    setIsFirstTime(false);
    router.push('/'); // Vuelve al dashboard
  };

  if (isFirstTime === null) {
    // Muestra un loader o un estado vacío mientras se verifica el localStorage
    return <div className="w-full h-screen flex items-center justify-center">Cargando...</div>;
  }

  if (isFirstTime) {
    return <WelcomePage onAdvance={handleAdvance} />;
  }

  return <DashboardPage />;
}
