'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useMemo, useState } from 'react';
import { Check, Trophy } from 'lucide-react';
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
      <div className="space-y-8 animate-in fade-in duration-700">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">Ranking Institucional</h1>
          <p className="text-slate-500 text-sm font-light mt-1">Cargando clasificación corporativa...</p>
        </header>
        <Card className="border-none shadow-none bg-white rounded-[2.5rem]">
          <CardContent className="p-6">
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
        <div className="space-y-4">
           {[...Array(5)].map((_, i) => (
             <Skeleton key={i} className="h-20 w-full rounded-2xl" />
           ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="py-20 text-center text-red-500 font-light">Error al cargar la clasificación: {error}</div>
  }
  
  const categoryOrder: { [key: string]: number } = { 'Oro': 3, 'Plata': 2, 'Bronce': 1, 'Base': 0 };

  const sortedUsers = [...displayedUsers].sort((a, b) => {
    const levelA = categoryOrder[a.avatar || 'Base'] ?? -1;
    const levelB = categoryOrder[b.avatar || 'Base'] ?? -1;

    if (levelA !== levelB) {
      return levelB - levelA; 
    }
    
    return (b.progreso || 0) - (a.progreso || 0);
  });

  const myRankIndex = sortedUsers.findIndex(u => u.id?.toString().toLowerCase() === me.id?.toString().toLowerCase());
  const myRank = myRankIndex !== -1 ? myRankIndex + 1 : 0;


  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">Ranking Institucional</h1>
          <p className="text-slate-400 text-sm font-light tracking-tight">Consulta tu nivel de desempeño y el de tus colegas en la organización.</p>
        </div>
        {me.cargo === 'ADMINISTRADOR' && (
          <div className="w-full sm:w-64">
            <Select onValueChange={setSelectedVp} value={selectedVp}>
              <SelectTrigger className="bg-[#003B73] text-white rounded-full h-10 border-none text-xs">
                <SelectValue placeholder="Filtrar por VP" />
              </SelectTrigger>
              <SelectContent>
                {vicepresidencias.map((vp) => (
                  <SelectItem key={vp} value={vp} className="text-xs">{vp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </header>

      {/* Mi Posición */}
      <Card className="border-none shadow-2xl bg-[#003B73] text-white rounded-[2.5rem] overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center justify-center w-24 h-24 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shrink-0">
                {me.cargo === 'ADMINISTRADOR' ? (
                  <Check className="h-10 w-10 text-white" strokeWidth={1} />
                ) : (
                  <div className="text-center">
                    <span className="text-xs font-light text-white/60 block uppercase tracking-widest mb-1">Pos.</span>
                    <span className="text-4xl font-black tracking-tighter">{myRank > 0 ? myRank : '-'}</span>
                  </div>
                )}
            </div>
            <div className="flex-grow text-center md:text-left space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">{me.name} <span className="text-white/40 font-light ml-2">(Tú)</span></h2>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-[9px] font-medium uppercase tracking-wider">{me.avatar || 'Base'}</span>
                {me.vicepresidencia && (
                  <span className="text-white/60 text-[10px] font-light tracking-tight border-l border-white/20 pl-3">{me.vicepresidencia}</span>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
              {me.cargo === 'ADMINISTRADOR' ? (
                  <div className="col-span-4 text-center md:text-right">
                    <span className="text-sm font-light text-white/60 uppercase tracking-widest">Administrador del Sistema</span>
                  </div>
              ) : (
                <>
                  <div className="text-center md:text-right">
                    <span className="text-2xl font-black tracking-tighter block">{(me.progreso || 0).toFixed(1)}%</span>
                    <span className="text-[8px] font-light text-white/50 uppercase tracking-widest">Total</span>
                  </div>
                   <div className="text-center md:text-right">
                    <span className="text-2xl font-black tracking-tighter block">{(me.prog_pol || 0).toFixed(1)}%</span>
                    <span className="text-[8px] font-light text-white/50 uppercase tracking-widest">Pólizas</span>
                  </div>
                   <div className="text-center md:text-right">
                    <span className="text-2xl font-black tracking-tighter block">{(me.prog_sus || 0).toFixed(1)}%</span>
                    <span className="text-[8px] font-light text-white/50 uppercase tracking-widest">Suscrito</span>
                  </div>
                   <div className="text-center md:text-right">
                    <span className="text-2xl font-black tracking-tighter block">{(me.prog_cob || 0).toFixed(1)}%</span>
                    <span className="text-[8px] font-light text-white/50 uppercase tracking-widest">Cobrado</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Lista de Colaboradores */}
      <div className="space-y-4">
        {sortedUsers.map((user, index) => {
          const rankPosition = index + 1;
          const isMe = user.id?.toString().toLowerCase() === me.id?.toString().toLowerCase();
          
          return (
            <div 
              key={user.id} 
              className={cn(
                "flex items-center p-6 rounded-[1.8rem] transition-all duration-300 border border-transparent",
                isMe 
                  ? "bg-slate-100/50 border-slate-200" 
                  : "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] hover:-translate-y-0.5"
              )}
            >
              <div className="w-12 h-12 flex items-center justify-center font-black text-xl text-slate-300 shrink-0">
                {rankPosition <= 3 ? (
                  <Trophy className={cn(
                    "w-6 h-6",
                    rankPosition === 1 ? "text-yellow-500" : rankPosition === 2 ? "text-slate-400" : "text-amber-600"
                  )} strokeWidth={2.5} />
                ) : `#${rankPosition}`}
              </div>
              
              <div className="flex-grow px-6">
                <p className="font-bold text-slate-800 tracking-tight">{user.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{user.avatar || 'Base'}</span>
                  <span className="text-slate-200 text-[10px]">•</span>
                  <span className="text-[10px] text-slate-400 font-light truncate max-w-[200px]">{user.vicepresidencia}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 sm:gap-10 text-right">
                 <div className="text-center hidden sm:block">
                    <span className="text-sm font-bold text-slate-800 block">{(user.prog_pol || 0).toFixed(0)}%</span>
                    <span className="text-[7px] text-slate-400 uppercase tracking-widest">Pólizas</span>
                 </div>
                 <div className="text-center">
                    <span className="text-lg font-black text-[#0054A6] block">{(user.progreso || 0).toFixed(1)}%</span>
                    <span className="text-[7px] text-slate-400 uppercase tracking-widest">Logro Total</span>
                 </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
