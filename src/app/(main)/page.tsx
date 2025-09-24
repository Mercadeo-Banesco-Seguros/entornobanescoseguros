'use client';

import AvatarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import ObjectivesSidebar from '@/components/dashboard/objectives-sidebar';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { currentUser, levels, tasks, avatars, loading, users } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
            <Skeleton className="w-48 h-48 rounded-lg" />
            <div className="flex items-end justify-center space-x-4 w-full">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center">
            <Skeleton className="aspect-square w-full max-w-sm rounded-lg mb-4" />
            <Skeleton className="h-12 w-48" />
          </CardContent>
        </Card>
        <Card className="h-full bg-transparent border-0 shadow-none">
          <CardHeader className="px-2">
            <CardTitle className="font-bold text-xl text-foreground">Lista de Misiones</CardTitle>
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
    return <div>Usuario no encontrado o no autorizado.</div>;
  }

  const userLevel = levels.find(l => l.id === currentUser.level);
  if (!userLevel) {
    return <div>Error: Nivel de usuario no encontrado.</div>;
  }
  const levelTasks = tasks.filter(t => t.level === currentUser.level);

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3">
        <AvatarEvolution currentUser={currentUser} avatars={avatars} />
      </div>
      <div className="w-full lg:w-1/3">
        <CurrentWorld currentUser={currentUser} level={userLevel} />
      </div>
      <div className="w-full lg:w-1/3">
        <ObjectivesSidebar tasks={levelTasks} />
      </div>
    </div>
  );
}
