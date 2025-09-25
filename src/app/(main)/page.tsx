'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardContent from '@/components/dashboard/dashboard-content';

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
  
  useEffect(() => {
    if (isFirstTime === true) {
      router.push('/welcome');
    }
  }, [isFirstTime, router]);


  if (isFirstTime === null || isFirstTime === true) {
    // Muestra un loader o un estado vacío mientras se verifica el localStorage y/o redirige
    return <div className="w-full h-full flex items-center justify-center">Cargando...</div>;
  }

  return <DashboardContent />;
}
