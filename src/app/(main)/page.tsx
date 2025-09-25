'use client';

import { useState, useEffect } from 'react';
import DashboardContent from '@/components/dashboard/dashboard-content';

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render a loading state or nothing while we wait for client-side rendering.
    return <div className="w-full h-screen flex items-center justify-center bg-background">Cargando...</div>;
  }
  
  return <DashboardContent />;
}
