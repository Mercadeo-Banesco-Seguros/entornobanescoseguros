
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function RankingPage() {
  const { currentUser: me, users: rankingUsers, loading, error, fetchUsers } = useAuth();
  
  const competingUsers = useMemo(() => {
    return rankingUsers.filter(user => user.cargo !== 'ADMINISTRADOR');
  }, [rankingUsers]);

  const vicepresidencias = useMemo(() => {
    const allVps = competingUsers.map(user => user.vicepresidencia).filter(Boolean);
    return ['Todas', ...Array.from(new Set(allVps))];
  }, [competingUsers]);

  const [selectedVp, setSelectedVp] = useState('Todas');

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  useEffect(() => {
    if (me?.cargo !== 'ADMINISTRADOR' && me?.vicepresidencia) {
      setSelectedVp(me.vicepresidencia);
    }
  }, [me]);

  const displayedUsers = useMemo(() => {
    if (!me) return [];

    if (me.cargo === 'ADMINISTRADOR') {
      if (selectedVp === 'Todas') {
        return competingUsers;
      }
      return competingUsers.filter(user => user.vicepresidencia === selectedVp);
    }
    
    return competingUsers.filter(user => user.vicepresidencia === me.vicepresidencia);
  }, [me, competingUsers, selectedVp]);

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
  
  const sortedUsers = [...displayedUsers].sort((a, b) => {
    const posA = a.posicion || Infinity;
    const posB = b.posicion || Infinity;
    if (posA !== posB) {
      return posA - posB;
    }
    return (b.progreso || 0) - (a.progreso || 0);
  });

  const myRankIndex = sortedUsers.findIndex(u => u.id.toString().toLowerCase() === me.id.toString().toLowerCase());
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : me.posicion || 0;


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Clasificación de Pilotos</h1>
        <p className="text-muted text-lg mt-1">Mira tu posición y la de tus compañeros en el circuito.</p>
      </header>

      <Card className="sticky top-20 z-10 bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center">
            <div className="font-bold text-lg text-white w-[80px] flex items-center justify-center">
                {me.cargo === 'ADMINISTRADOR' ? (
                  <div className="bg-white text-primary rounded-full h-8 w-8 flex items-center justify-center">
                    <Check className="h-5 w-5" />
                  </div>
                ) : `#${myRank > 0 ? myRank : '-'}`}
            </div>
            <div className="flex-grow flex items-center gap-4">
               <div>
                <p className="font-semibold text-base">{me.name} (Tú)</p>
                <p className="text-xs text-primary-foreground/80">{me.avatar}</p>
              </div>
            </div>
             <div className="text-center w-64">
              {me.cargo === 'ADMINISTRADOR' ? (
                 <Select onValueChange={setSelectedVp} value={selectedVp}>
                  <SelectTrigger className="w-64 bg-white/20 border-0 text-white text-xs">
                    <SelectValue placeholder="Filtrar por VP" />
                  </SelectTrigger>
                  <SelectContent>
                    {vicepresidencias.map((vp) => (
                      <SelectItem key={vp} value={vp}>{vp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                me.vicepresidencia && (
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap">
                    {me.vicepresidencia}
                  </span>
                )
              )}
            </div>
            <div className="text-right w-48 flex items-baseline justify-end gap-1.5">
              {me.cargo === 'ADMINISTRADOR' ? (
                  <span className="text-sm font-semibold text-white/90">Administrador</span>
              ) : (
                <>
                  <span className="text-2xl font-bold">{(me.progreso || 0).toFixed(2)}%</span>
                  <span className="text-xs font-normal text-primary-foreground/80">de Logro</span>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableBody>
              {sortedUsers.map((user, index) => {
                const rankPosition = user.posicion > 0 ? user.posicion : index + 1;
                return (
                  <TableRow key={user.id} className={user.id.toString().toLowerCase() === me.id.toString().toLowerCase() ? 'bg-secondary/50' : ''}>
                    <TableCell className="font-bold text-lg text-muted w-[80px]">#{rankPosition}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.avatar}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center w-64">
                      {user.vicepresidencia && (
                        <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full whitespace-nowrap">
                          {user.vicepresidencia}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right w-48">
                      <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                        {(user.progreso || 0).toFixed(2)}%
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
