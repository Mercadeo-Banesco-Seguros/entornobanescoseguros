'use client';

import CarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import ObjectivesSidebar from '@/components/dashboard/objectives-sidebar';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardContent() {
  const { currentUser, levels, tasks, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
            <div className="flex items-end justify-center space-x-4 w-full">
               <Skeleton className="w-24 h-24 rounded-lg" />
               <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
               <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
               <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="h-full bg-transparent border-0 shadow-none">
          <CardHeader className="px-2">
            <CardTitle className="font-bold text-xl text-foreground">Lista de Objetivos</CardTitle>
          </CardHeader>
          <CardContent className="px-2 space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
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
  
  // Mostrar solo los objetivos del nivel actual del piloto
  const levelTasks = tasks.filter(t => t.level === currentUser.level);

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
      <div className="w-full">
        <ObjectivesSidebar tasks={levelTasks} />
      </div>
    </div>
  );
}
