'use client';

import { useMemo, useState } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function EstadisticasPage() {
  const { users, currentUser } = useAuth();
  const router = useRouter();

  if (currentUser?.cargo !== 'ADMINISTRADOR') {
    router.replace('/inicio');
    return null;
  }

  const competingUsers = useMemo(() => {
    return users.filter(user => user.cargo !== 'ADMINISTRADOR' && user.vicepresidencia);
  }, [users]);
  
  const vicepresidencias = useMemo(() => {
    const allVps = competingUsers.map(user => user.vicepresidencia).filter(Boolean);
    return ['Todas', ...Array.from(new Set(allVps as string[]))];
  }, [competingUsers]);

  const [selectedVp, setSelectedVp] = useState('Todas');
  
  const vpAvgProgress = useMemo(() => {
    const vpData: { [key: string]: { total: number; count: number } } = {};
    competingUsers.forEach(user => {
      if (user.vicepresidencia) {
        if (!vpData[user.vicepresidencia]) {
          vpData[user.vicepresidencia] = { total: 0, count: 0 };
        }
        vpData[user.vicepresidencia].total += user.progreso || 0;
        vpData[user.vicepresidencia].count++;
      }
    });

    return Object.entries(vpData)
      .map(([name, { total, count }]) => ({
        name,
        logro: parseFloat((total / count).toFixed(2)),
      }))
      .sort((a, b) => b.logro - a.logro);
  }, [competingUsers]);

  const top10UsersByVp = useMemo(() => {
    let filteredUsers = competingUsers;
    if (selectedVp !== 'Todas') {
      filteredUsers = competingUsers.filter(u => u.vicepresidencia === selectedVp);
    }
    return filteredUsers
      .sort((a, b) => (b.progreso || 0) - (a.progreso || 0))
      .slice(0, 10)
      .map(u => ({
          name: u.name,
          logro: parseFloat((u.progreso || 0).toFixed(2)),
      }));
  }, [competingUsers, selectedVp]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Estadísticas</h1>
        <p className="text-muted text-lg mt-1">Análisis de rendimiento en el circuito.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Logro Promedio por Vicepresidencia</CardTitle>
          <CardDescription>Comparativa del progreso medio entre las diferentes vicepresidencias.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={vpAvgProgress} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} interval={0} fontSize={12} />
                <YAxis unit="%" />
                <Tooltip
                    formatter={(value) => `${value}%`}
                    cursor={{fill: 'hsl(var(--muted) / 0.2)'}}
                />
                <Legend />
                <Bar dataKey="logro" name="Logro Promedio" fill="hsl(var(--primary))" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Top 10 Pilotos</CardTitle>
              <CardDescription>Los pilotos con mayor progreso.</CardDescription>
            </div>
            <Select onValueChange={setSelectedVp} value={selectedVp}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Filtrar por Vicepresidencia" />
              </SelectTrigger>
              <SelectContent>
                {vicepresidencias.map((vp) => (
                  <SelectItem key={vp} value={vp}>{vp}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10UsersByVp} margin={{ top: 5, right: 20, left: -10, bottom: 5 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" unit="%" />
                <YAxis dataKey="name" type="category" width={150} interval={0} fontSize={12} />
                <Tooltip 
                  formatter={(value) => `${value}%`}
                  cursor={{fill: 'hsl(var(--muted) / 0.2)'}}
                />
                <Legend />
                <Bar dataKey="logro" name="Progreso" fill="hsl(var(--primary))" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
