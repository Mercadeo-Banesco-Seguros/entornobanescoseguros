'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';

export default function RankingPage() {
  const { users, avatars, currentUser: me, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Ranking de la Expedición</h1>
          <p className="text-muted text-lg mt-1">Mira tu progreso y el de tus compañeros.</p>
        </header>
        <Card className="sticky top-20 z-10">
          <CardContent className="p-4">
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Posición</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead className="text-center">Nivel</TableHead>
                <TableHead className="text-right">Puntos (XP)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-6 w-10 mx-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }
  
  if (!me || !users) {
    return <div>Cargando ranking...</div>
  }

  const sortedUsers = [...users].sort((a, b) => b.xp - a.xp);
  const myRank = sortedUsers.findIndex(u => u.id === me.id) + 1;

  const getAvatarIcon = (level: number) => {
    const avatarData = avatars.find(av => av.level === level);
    return avatarData ? <avatarData.Icon className="h-6 w-6 text-primary" /> : null;
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Ranking de la Expedición</h1>
        <p className="text-muted text-lg mt-1">Mira tu progreso y el de tus compañeros.</p>
      </header>

      <Card className="sticky top-20 z-10 bg-primary/5 border-primary/20 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-primary">#{myRank}</span>
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-secondary rounded-full">
                    {getAvatarIcon(me.level)}
                 </div>
                <div>
                  <p className="font-bold text-lg text-foreground">{me.name} (Tú)</p>
                  <p className="text-sm text-muted">Nivel {me.level} &bull; {me.xp} XP</p>
                </div>
              </div>
            </div>
            <span className="text-lg font-bold text-primary">{me.xp.toLocaleString()} XP</span>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Posición</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead className="text-center">Nivel</TableHead>
                <TableHead className="text-right">Puntos (XP)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow key={user.id} className={user.id === me.id ? 'bg-secondary/50' : ''}>
                  <TableCell className="font-bold text-lg text-muted">#{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-secondary rounded-full">
                            {getAvatarIcon(user.level)}
                        </div>
                      <div>
                        <p className="font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.avatar}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-semibold">{user.level}</TableCell>
                  <TableCell className="text-right font-bold text-primary">{user.xp.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
