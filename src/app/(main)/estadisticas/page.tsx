'use client';

import { useMemo, useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip, PieChart, Pie } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ArrowDown, ArrowUp } from 'lucide-react';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { vicepresidenciaMessages } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const areaChartData = [
  { month: 'Octubre', value: 4.0 },
  { month: 'Noviembre', value: 3.0 },
  { month: 'Diciembre', value: 4.2 },
];

const radialChartData = [
  { name: 'Logro Suscrito', value: 25 },
  { name: 'Logro Cobrado', value: 75 },
  { name: 'Logro Pólizas', value: 75 },
];

const getVpKeyFromName = (name: string): string | null => {
  if (!name) return null;
  const lowerName = name.toLowerCase();
  if (lowerName.includes('gran caracas')) return 'gran-caracas';
  if (lowerName.includes('ctro. occid') || lowerName.includes('andes')) return 'centro-occidente-andes';
  if (lowerName.includes('centro llanos') || lowerName.includes('carabobo')) return 'centro-llanos-carabobo';
  if (lowerName.includes('oriente')) return 'oriente';
  if (lowerName.includes('zulia') || lowerName.includes('falcón')) return 'zulia-falcon';
  return null;
};


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
  
  const vpAvgProgress = useMemo(() => {
    const data = [
      { name: "VP. COMERCIAL CTRO. OCCID. LOS ANDES", logro: 42.05 },
      { name: "VP. COMERCIAL ORIENTE", logro: 39.24 },
      { name: "VP. COMERCIAL GRAN CARACAS", logro: 29.75 },
      { name: "VP. COMERCIAL CENTRO LLANOS-CARABOBO", logro: 29.22 },
      { name: "VP. COMERCIAL ZULIA - FALCON", logro: 25.13 }
    ].sort((a, b) => b.logro - a.logro);
    return data;
    
  }, []);

  const totalAvgProgress = useMemo(() => {
    if (competingUsers.length === 0) return 0;
    const total = competingUsers.reduce((sum, user) => sum + (user.progreso || 0), 0);
    return total / competingUsers.length;
  }, [competingUsers]);

  const monthlyChange = useMemo(() => {
    if (areaChartData.length < 2) return { text: 'Datos insuficientes', isPositive: true, diff: '0.0' };
    const lastMonth = areaChartData[areaChartData.length - 2];
    const currentMonth = areaChartData[areaChartData.length - 1];
    const difference = currentMonth.value - lastMonth.value;
    const percentageChange = (difference / lastMonth.value) * 100;
    return {
      text: `${Math.abs(percentageChange).toFixed(1)}% vs. el mes pasado`,
      isPositive: percentageChange >= 0,
      diff: percentageChange.toFixed(1)
    };
  }, []);


  const maxLogro = useMemo(() => {
    if (vpAvgProgress.length === 0) return 0;
    return Math.max(...vpAvgProgress.map(vp => vp.logro));
  }, [vpAvgProgress]);

  const vicepresidencias = useMemo(() => {
    const allVps = competingUsers.map(user => user.vicepresidencia).filter(Boolean);
    return ['Total', ...Array.from(new Set(allVps))];
  }, [competingUsers]);

  const [selectedVp, setSelectedVp] = useState('Total');
  const [dynamicImageSrc, setDynamicImageSrc] = useState('https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png?raw=true');

  useEffect(() => {
    if (selectedVp === 'Total') {
        setDynamicImageSrc('https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png?raw=true');
        return;
    }
    const vpKey = getVpKeyFromName(selectedVp);
    if (vpKey) {
        const vpData = vicepresidenciaMessages[vpKey];
        if (vpData) {
            const image = PlaceHolderImages.find(p => p.id === vpData.worldImageId);
            if (image) {
                setDynamicImageSrc(image.imageUrl);
                return;
            }
        }
    }
    setDynamicImageSrc('https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png?raw=true');
  }, [selectedVp]);


  const top10Users = useMemo(() => {
    const usersToFilter = selectedVp === 'Total'
      ? competingUsers
      : competingUsers.filter(user => user.vicepresidencia === selectedVp);

    return usersToFilter
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
            <div className="text-2xl font-bold tracking-tight">450</div>
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
            <div className="text-2xl font-bold tracking-tight">245</div>
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
            <div className="text-2xl font-bold tracking-tight">245</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
               <ArrowUp className="h-4 w-4 text-green-600" />
              0.2% vs. last Monday
            </p>
          </CardContent>
        </Card>
      </div>

       <Card className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1 p-6">
            <p className="text-sm font-medium text-muted-foreground">Logro Promedio de los Participantes</p>
            <p className="text-4xl font-bold text-foreground mt-2 tracking-tight">{totalAvgProgress.toFixed(2)}%</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                {monthlyChange.isPositive ? (
                  <ArrowUp className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDown className="h-4 w-4 text-destructive" />
                )}
                {monthlyChange.text}
            </p>
        </div>
        <div className="md:col-span-1">
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
                        <XAxis 
                          dataKey="month" 
                          axisLine={false} 
                          tickLine={false}
                          tick={false}
                        />
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


      <Card className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-primary text-primary-foreground p-6">
            <h3 className="text-2xl font-bold mb-6 tracking-tight">Distribución de Logro Promedio por VP</h3>
            <div className="space-y-4">
              {vpAvgProgress.map((vp) => (
                <div key={vp.name} className="grid grid-cols-5 items-center gap-2 text-sm">
                  <div className="col-span-2 font-semibold text-xs">{vp.name}</div>
                  <div className="col-span-3">
                    <div className="h-8 flex items-center relative">
                        <div className="bg-white h-full rounded-full flex items-center justify-end pr-2" style={{ width: `${(vp.logro / maxLogro) * 90}%` }}>
                           <span className="text-primary text-xs font-normal">{vp.logro}%</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary/50 p-6">
             <h3 className="text-2xl font-bold mb-6 text-primary tracking-tight">Indicadores de Rendimiento por Logro</h3>
             <div className="grid grid-cols-3 gap-4 text-center">
              {radialChartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center">
                  <h4 className="font-semibold text-foreground text-sm mb-2">{data.name}</h4>
                  <div className="w-32 h-32 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[{ value: 1 }]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius="60%"
                          outerRadius="80%"
                          fill="hsl(var(--border))"
                          stroke="none"
                        >
                        </Pie>
                        <Pie
                          data={[{ value: data.value }]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius="60%"
                          outerRadius="80%"
                          startAngle={90}
                          endAngle={90 - (data.value / 100) * 360}
                          cornerRadius={999}
                          fill="hsl(var(--primary))"
                          stroke="none"
                          paddingAngle={5}
                        >
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary tracking-tight">{data.value}</span>
                    </div>
                  </div>
                </div>
              ))}
             </div>
          </div>
        </div>
      </Card>
      
       <Card className="border-0 shadow-none">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src={dynamicImageSrc}
                alt="Imagen de Vicepresidencia"
                width={selectedVp === 'Total' ? 500 : 400}
                height={selectedVp === 'Total' ? 500 : 400}
                className="object-contain"
                key={dynamicImageSrc}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-6">
                <div className="text-left">
                  <h2 className="text-lg font-bold tracking-tighter">Top 10 Pilotos</h2>
                  <p className="text-lg font-semibold tracking-tighter text-muted-foreground -mt-1">por Logro Promedio</p>
                </div>
                <Select onValueChange={setSelectedVp} value={selectedVp}>
                  <SelectTrigger className="w-48 bg-primary text-primary-foreground text-xs rounded-full">
                    <SelectValue placeholder="Filtrar por VP" />
                  </SelectTrigger>
                  <SelectContent>
                    {vicepresidencias.map((vp) => (
                      <SelectItem key={vp} value={vp}>{vp}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-4">
                {top10Users.map((user, index) => (
                  <div key={index} className="grid grid-cols-3 items-center gap-4">
                    <div className="col-span-1">
                      <p className="font-normal text-xs tracking-tight truncate">{user.name}</p>
                    </div>
                    <div className="col-span-2">
                      <div 
                        className="bg-primary rounded-full h-8 flex items-center justify-end px-2"
                        style={{ width: `${Math.max(15, user.logro)}%` }} // Asegura un ancho mínimo
                      >
                        <span className="text-primary-foreground font-normal text-xs">{user.logro}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
