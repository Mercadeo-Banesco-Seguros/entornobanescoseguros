'use client';

import CarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardContent() {
  const { currentUser, levels, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
            <Skeleton className="w-96 h-96 rounded-lg" />
            <div className="flex items-end justify-center space-x-4 w-full">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
            <Skeleton className="w-96 h-96 rounded-lg mb-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser) {
    return <div>Piloto no encontrado o no autorizado.</div>;
  }

  const userLevel = levels.find(l => l.id === currentUser.level);
  if (!userLevel) {
    return <div>Error: Pista del piloto no encontrada.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <CarEvolution currentUser={currentUser} />
        </div>
        <div className="w-full">
          <CurrentWorld currentUser={currentUser} levels={levels} />
        </div>
      </div>
    </div>
  );
}
