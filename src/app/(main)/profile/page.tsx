'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { currentUser, tasks, avatars, levels, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Mi Evolución</h1>
          <p className="text-muted text-lg mt-1">Tu progreso y estadísticas en la expedición.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 flex flex-col items-center justify-center p-6">
            <Skeleton className="w-48 h-48 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-6 w-40 mx-auto mt-2" />
          </Card>
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Tu resumen de progreso total.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!currentUser || !levels || !avatars) {
    return <div>Usuario no encontrado o datos incompletos.</div>;
  }

  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const totalXp = currentUser.xp;
  const currentAvatar = avatars.find(a => a.name === currentUser.avatar);
  const currentLevel = levels.find(l => l.id === currentUser.level);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Mi Evolución</h1>
        <p className="text-muted text-lg mt-1">Tu progreso y estadísticas en la expedición.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 text-center p-6 flex flex-col items-center justify-start h-full">
          {currentAvatar && (
             <div className="relative w-48 h-48 mx-auto mb-4 p-2 rounded-full bg-secondary">
               <Image src={currentAvatar.imageUrl} alt={currentAvatar.name} layout="fill" className="object-contain" />
             </div>
          )}
          <h2 className="text-2xl font-bold text-foreground">{currentUser.name}</h2>
          {currentLevel && (
            <div className="mt-2 text-center">
                <p className="text-lg text-muted-foreground font-semibold">{currentLevel.worldName}</p>
                <Badge variant="secondary" className="mt-1">{currentUser.avatar} (Nivel {currentUser.level})</Badge>
            </div>
          )}
        </Card>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Estadísticas</CardTitle>
                    <CardDescription>Tu resumen de progreso total.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-secondary/50">
                    <p className="text-sm font-semibold text-muted-foreground">Tareas Completadas</p>
                    <p className="text-3xl font-bold text-primary">{completedTasksCount}</p>
                  </Card>
                  <Card className="p-4 bg-secondary/50">
                    <p className="text-sm font-semibold text-muted-foreground">CONECTCOINS Totales</p>
                    <p className="text-3xl font-bold text-primary">{totalXp.toLocaleString()}</p>
                  </Card>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
