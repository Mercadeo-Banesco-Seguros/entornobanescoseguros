
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { useEffect } from 'react';

export default function RankingPage() {
  const { currentUser: me, users: rankingUsers, levels, avatars, loading, error, fetchUsers } = useAuth();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (loading || !me) {
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Clasificación de Pilotos</h1>
          <p className="text-muted text-lg mt-1">Mira tu posición y la de tus compañeros en el circuito.</p>
        </header>
        <Card className="sticky top-20 z-10">
          <CardContent className="p-6">
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
        <Card>
          <Table>
            <TableBody>
              {[...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-6 w-10" /></TableCell>
                  <TableCell><Skeleton className="h-10 w-48" /></TableCell>
                  <TableCell className="text-center"><Skeleton className="h-6 w-24 mx-auto" /></TableCell>
                  <TableCell className="text-right"><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    )
  }

  if (error) {
    return <div className="text-destructive text-center">Error al cargar la clasificación: {error}</div>
  }
  
  const sortedUsers = [...rankingUsers].sort((a, b) => b.xp - a.xp);

  const myRank = sortedUsers.findIndex(u => u.email.toLowerCase() === me.email.toLowerCase()) + 1;
  const myLevel = levels.find(l => l.id === me.level);
  const myAvatar = avatars.find(av => av.name === me.avatar);

  const getAvatar = (avatarName: string) => {
    return avatars.find(av => av.name === avatarName);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Clasificación de Pilotos</h1>
        <p className="text-muted text-lg mt-1">Mira tu posición y la de tus compañeros en el circuito.</p>
      </header>

      <Card className="sticky top-20 z-10 bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="font-bold text-lg text-white w-[80px]">#{myRank > 0 ? myRank : '-'}</div>
            <div className="flex-grow flex items-center gap-4">
              <div className="p-1 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">
                {myAvatar && (
                  <Image src={myAvatar.imageUrl} alt={me.avatar} width={40} height={40} className="object-contain" />
                )}
              </div>
              <div>
                <p className="font-semibold text-base">{me.name} (Tú)</p>
                <p className="text-xs text-primary-foreground/80">{me.avatar}</p>
              </div>
            </div>
            <div className="text-center w-48">
              {myLevel && (
                <span className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1 rounded-full">
                  {myLevel.worldName}
                </span>
              )}
            </div>
            <div className="text-right w-48 flex items-baseline justify-end gap-1.5">
              <span className="text-2xl font-bold">{me.xp.toLocaleString()}</span>
              <span className="text-xs font-normal text-primary-foreground/80">Puntos</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              {sortedUsers.slice(0, 10).map((user, index) => {
                const userLevel = levels.find(l => l.id === user.level);
                const userAvatar = getAvatar(user.avatar);
                return (
                  <TableRow key={user.id} className={user.email.toLowerCase() === me.email.toLowerCase() ? 'bg-secondary/50' : ''}>
                    <TableCell className="font-bold text-lg text-muted w-[80px]">#{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                          <div className="p-1 bg-secondary rounded-full w-12 h-12 flex items-center justify-center">
                            {userAvatar && (
                              <Image src={userAvatar.imageUrl} alt={user.avatar} width={32} height={32} className="object-contain" />
                            )}
                          </div>
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.avatar}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center w-48">
                      {userLevel && (
                        <span className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1 rounded-full">
                          {userLevel.worldName}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right w-48">
                      <span className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1 rounded-full">
                        {user.xp.toLocaleString()}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
