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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
                <Skeleton className="w-full h-[600px] rounded-lg" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
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
