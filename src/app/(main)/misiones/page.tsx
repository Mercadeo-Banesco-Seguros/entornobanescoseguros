
'use client';

import ObjectivesSidebar from '@/components/dashboard/objectives-sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/context/auth-context';

export default function MisionesPage() {
  const { tasks, loading } = useAuth();

  if (loading) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Lista de Misiones</h1>
          <p className="text-muted text-lg mt-1">
            Aquí puedes ver todas tus misiones, completadas y pendientes.
          </p>
        </header>
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Lista de Misiones</h1>
        <p className="text-muted text-lg mt-1">
          Aquí puedes ver todas tus misiones, completadas y pendientes.
        </p>
      </header>
      <ObjectivesSidebar tasks={tasks} />
    </div>
  );
}
