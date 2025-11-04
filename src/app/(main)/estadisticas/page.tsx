'use client';

import { useMemo, useState } from 'react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Line, LineChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp } from 'lucide-react';

const areaChartData = [
  { month: 'Octubre', value: 4.0 },
];

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
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Suscrito</CardTitle>
             <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">November</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowDown className="h-4 w-4 text-destructive" />
              25% vs. last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cobrado</CardTitle>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">All time</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
             <p className="text-xs text-muted-foreground flex items-center gap-1">
               <ArrowUp className="h-4 w-4 text-green-600" />
              0.2% vs. last Monday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pólizas</CardTitle>
            <span className="text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-full">November</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
               <ArrowUp className="h-4 w-4 text-green-600" />
              0.2% vs. last Monday
            </p>
          </CardContent>
        </Card>
      </div>

       <Card className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 p-6">
            <p className="text-sm font-medium text-muted-foreground">Logro Promedio de los Participantes</p>
            <p className="text-4xl font-bold text-foreground mt-2">4,5%</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <ArrowDown className="h-4 w-4 text-destructive" />
                32.5K vs. last month
            </p>
        </div>
        <div className="md:col-span-2">
            <div className="w-full h-[200px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={areaChartData}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" axisLine={false} tickLine={false} fontSize={12} />
                        <Tooltip
                            contentStyle={{
                                background: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "var(--radius)"
                            }}
                            cursor={{stroke: "hsl(var(--primary))", strokeWidth: 1, strokeDasharray: "3 3"}}
                        />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </Card>


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
