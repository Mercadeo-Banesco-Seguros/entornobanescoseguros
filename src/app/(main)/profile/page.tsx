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
          <h1 className="text-4xl font-bold text-foreground">Mi Perfil de Piloto</h1>
          <p className="text-muted text-lg mt-1">Tu progreso y estadísticas en el circuito.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 flex flex-col items-center justify-center p-6 border-0 shadow-none">
            <Skeleton className="w-64 h-64 rounded-full mx-auto mb-4" />
            <Skeleton className="h-8 w-32 mx-auto" />
            <Skeleton className="h-6 w-40 mx-auto mt-2" />
          </Card>
          <div className="md:col-span-2 space-y-4">
            <Card className="border-0 shadow-none">
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
                <CardDescription>Tu resumen de progreso en la carrera.</CardDescription>
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
        <h1 className="text-4xl font-bold text-foreground">Mi Perfil de Piloto</h1>
        <p className="text-muted text-lg mt-1">Tu progreso y estadísticas en el circuito.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        <Card className="md:col-span-1 text-center p-6 flex flex-col items-center justify-start h-full border-0 shadow-none">
          {currentAvatar && (
             <div className="relative w-64 h-64 mx-auto mb-4">
               <Image src={currentAvatar.imageUrl} alt={currentAvatar.name} layout="fill" className="object-contain" />
             </div>
          )}
          {currentLevel && (
            <div className="mt-2 text-center flex flex-col items-center gap-2">
                <span className="bg-primary text-primary-foreground font-bold text-sm px-4 py-1 rounded-full">
                    {currentLevel.worldName}
                </span>
                <span className="bg-primary text-primary-foreground font-bold text-sm px-4 py-1 rounded-full">
                    {currentUser.avatar}
                </span>
            </div>
          )}
        </Card>

        <div className="md:col-span-2">
            <Card className="border-0 shadow-none">
                <CardHeader>
                    <CardTitle>Estadísticas de Carrera</CardTitle>
                    <CardDescription>Tu resumen de progreso total.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-secondary/50 border-0 shadow-none">
                    <p className="text-sm font-semibold text-muted-foreground">Objetivos Completados</p>
                    <p className="text-3xl font-bold text-primary">{completedTasksCount}</p>
                  </Card>
                  <Card className="p-4 bg-secondary/50 border-0 shadow-none">
                    <p className="text-sm font-semibold text-muted-foreground">Puntos Totales</p>
                    <p className="text-3xl font-bold text-primary">{totalXp.toLocaleString()}</p>
                  </Card>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
