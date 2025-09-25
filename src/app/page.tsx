'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardPage from "./(main)/page";
import WelcomePage from './welcome/page';

export default function HomePageController() {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    // This effect should only run on the client side.
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
    // After setting, we can just let the component re-render to show the dashboard.
    // No need to push to router if we are already at the root.
  };

  if (isFirstTime === null) {
    // Render a loading state or nothing while we check localStorage.
    return <div className="w-full h-screen flex items-center justify-center bg-background">Cargando...</div>;
  }

  if (isFirstTime) {
    return (
      <div className="bg-background">
        <WelcomePage onAdvance={handleAdvance} />
      </div>
    );
  }

  return <DashboardPage />;
}
