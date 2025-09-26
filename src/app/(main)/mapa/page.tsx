'use client';

import WorldMap from '@/components/map/world-map';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function MapaPage() {
  const { currentUser, levels, loading } = useAuth();

  if (loading || !currentUser || !levels) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Mapa de la Expedición</h1>
          <p className="text-muted text-lg mt-1">Explora los mundos y tu progreso.</p>
        </header>
        <Skeleton className="w-full h-[600px] rounded-lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Mapa de la Expedición</h1>
        <p className="text-muted text-lg mt-1">Explora los mundos y tu progreso.</p>
      </header>
      <WorldMap currentUser={currentUser} levels={levels} />
    </div>
  );
}
