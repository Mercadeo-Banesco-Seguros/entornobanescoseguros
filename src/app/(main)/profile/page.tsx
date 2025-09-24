import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { avatars, currentUser, tasks } from '@/lib/data';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
  const totalXp = currentUser.xp;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Mi Evolución</h1>
        <p className="text-muted text-lg mt-1">Tu progreso y avatares desbloqueados en la expedición.</p>
      </header>

      <Card>
          <CardHeader>
              <CardTitle>Avatares</CardTitle>
              <CardDescription>Tu colección de avatares ganados.</CardDescription>
          </CardHeader>
          <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {avatars.map(avatar => {
                  const isUnlocked = avatar.level <= currentUser.level;
                  return (
                    <Card key={avatar.id} className={cn("text-center p-6 transition-all", !isUnlocked && "bg-secondary/30 border-dashed")}>
                      <div className={cn("relative inline-block p-6 rounded-full mb-4", isUnlocked ? 'bg-secondary' : 'bg-gray-200 dark:bg-gray-700')}>
                        <avatar.Icon className={cn("h-16 w-16", isUnlocked ? 'text-primary' : 'text-gray-400')} />
                        {!isUnlocked && (
                            <div className="absolute top-0 right-0 bg-muted text-muted-foreground rounded-full p-1 flex items-center justify-center">
                                <Lock className="h-3 w-3" />
                            </div>
                        )}
                      </div>
                      <h3 className={cn("font-semibold text-lg", isUnlocked ? 'text-foreground' : 'text-muted')}>{avatar.name}</h3>
                      <p className="text-sm text-muted">Desbloqueado en Nivel {avatar.level}</p>
                    </Card>
                  );
                })}
              </div>
          </CardContent>
      </Card>

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
              <p className="text-sm font-semibold text-muted-foreground">XP Totales Ganados</p>
              <p className="text-3xl font-bold text-primary">{totalXp.toLocaleString()}</p>
            </Card>
          </CardContent>
      </Card>
    </div>
  );
}
