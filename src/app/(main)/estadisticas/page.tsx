'use client';

import { useMemo, useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, XAxis, Tooltip, Pie, PieChart } from 'recharts';
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
  const { users, currentUser, vicepresidencias } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.cargo !== 'ADMINISTRADOR') {
      router.replace('/nosotros');
    }
  }, [currentUser, router]);

  if (currentUser?.cargo !== 'ADMINISTRADOR') {
    return null;
  }

  const competingUsers = useMemo(() => {
    return users.filter(user => user.cargo !== 'ADMINISTRADOR' && user.vicepresidencia);
  }, [users]);
  
  const vpAvgProgress = useMemo(() => {
    if (competingUsers.length === 0) return [];

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

    const avgData = Object.keys(vpData).map(vpName => {
      const avg = vpData[vpName].count > 0 ? vpData[vpName].total / vpData[vpName].count : 0;
      return {
        name: vpName,
        logro: parseFloat(avg.toFixed(2)),
      };
    });

    return avgData.sort((a, b) => b.logro - a.logro);
  }, [competingUsers]);

  const totalAvgProgress = useMemo(() => {
    if (competingUsers.length === 0) return 0;
    const total = competingUsers.reduce((sum, user) => sum + (user.progreso || 0), 0);
    return total / competingUsers.length;
  }, [competingUsers]);

  const avgSuscrito = useMemo(() => {
    if (competingUsers.length === 0) return 0;
    const total = competingUsers.reduce((sum, user) => sum + (user.prog_sus || 0), 0);
    return total / competingUsers.length;
  }, [competingUsers]);

  const avgCobrado = useMemo(() => {
    if (competingUsers.length === 0) return 0;
    const total = competingUsers.reduce((sum, user) => sum + (user.prog_cob || 0), 0);
    return total / competingUsers.length;
  }, [competingUsers]);

  const avgPolizas = useMemo(() => {
    if (competingUsers.length === 0) return 0;
    const total = competingUsers.reduce((sum, user) => sum + (user.prog_pol || 0), 0);
    return total / competingUsers.length;
  }, [competingUsers]);

  const radialChartData = useMemo(() => [
    { name: 'Logro Suscrito', value: parseFloat(avgSuscrito.toFixed(2)) },
    { name: 'Logro Cobrado', value: parseFloat(avgCobrado.toFixed(2)) },
    { name: 'Logro Pólizas', value: parseFloat(avgPolizas.toFixed(2)) },
  ], [avgSuscrito, avgCobrado, avgPolizas]);


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

  const [selectedVp, setSelectedVp] = useState('Todas');
  const [dynamicImageSrc, setDynamicImageSrc] = useState('https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png');

  useEffect(() => {
    if (selectedVp === 'Todas') {
        setDynamicImageSrc('https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png');
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
    setDynamicImageSrc('https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_mi81u2mi81u2mi81-Photoroom.png');
  }, [selectedVp]);


  const top10Users = useMemo(() => {
    const usersToFilter = selectedVp === 'Todas'
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

  const timeFilters = ['Octubre', 'Noviembre', 'Diciembre', 'All time'];
  const [suscritoTime, setSuscritoTime] = useState('All time');
  const [cobradoTime, setCobradoTime] = useState('All time');
  const [polizasTime, setPolizasTime] = useState('All time');

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground tracking-tighter">Estadísticas de Gestión</h1>
        <p className="text-muted text-lg mt-1 font-light">Análisis de rendimiento corporativo institucional.</p>
      </header>
      
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card className="border-none shadow-sm bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Suscrito</CardTitle>
            <Select value={suscritoTime} onValueChange={setSuscritoTime}>
              <SelectTrigger className="text-[10px] text-muted-foreground bg-slate-50 px-2 py-1 rounded-full h-auto border-none w-auto gap-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map(filter => <SelectItem key={filter} value={filter} className="text-xs">{filter}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">0</div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
              -
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Cobrado</CardTitle>
            <Select value={cobradoTime} onValueChange={setCobradoTime}>
              <SelectTrigger className="text-[10px] text-muted-foreground bg-slate-50 px-2 py-1 rounded-full h-auto border-none w-auto gap-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map(filter => <SelectItem key={filter} value={filter} className="text-xs">{filter}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">0</div>
             <p className="text-[10px] text-muted-foreground flex items-center gap-1">
               -
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm bg-white rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-slate-400">Total Pólizas</CardTitle>
            <Select value={polizasTime} onValueChange={setPolizasTime}>
              <SelectTrigger className="text-[10px] text-muted-foreground bg-slate-50 px-2 py-1 rounded-full h-auto border-none w-auto gap-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeFilters.map(filter => <SelectItem key={filter} value={filter} className="text-xs">{filter}</SelectItem>)}
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold tracking-tight">0</div>
            <p className="text-[10px] text-muted-foreground flex items-center gap-1">
               -
            </p>
          </CardContent>
        </Card>
      </div>

       <Card className="grid grid-cols-1 md:grid-cols-2 gap-4 border-none shadow-sm bg-white rounded-2xl overflow-hidden">
        <div className="md:col-span-1 p-8">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Logro Promedio Corporativo</p>
            <p className="text-5xl font-bold text-slate-900 mt-2 tracking-tighter">{totalAvgProgress.toFixed(2)}%</p>
            <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-2">
                {monthlyChange.isPositive ? (
                  <ArrowUp className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 text-destructive" />
                )}
                {monthlyChange.text}
            </p>
        </div>
        <div className="md:col-span-1">
            <div className="w-full h-[200px] p-0">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={areaChartData}
                        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" hide />
                        <Tooltip
                            contentStyle={{
                                background: "white",
                                border: "none",
                                borderRadius: "1rem",
                                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
                            }}
                        />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </Card>

      <Card className="overflow-hidden border-none shadow-sm rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#003B73] text-white p-8">
            <h3 className="text-2xl font-bold mb-8 tracking-tight leading-none">Distribución de Logro por VP</h3>
            <div className="space-y-5">
              {vpAvgProgress.map((vp) => (
                <div key={vp.name} className="grid grid-cols-5 items-center gap-2 text-sm">
                  <div className="col-span-2 font-light text-[10px] uppercase tracking-wider text-white/70 truncate">{vp.name}</div>
                  <div className="col-span-3">
                    <div className="h-6 flex items-center relative">
                        <div className="bg-white/20 h-full w-full rounded-full absolute" />
                        <div className="bg-white h-full rounded-full flex items-center justify-end pr-2 z-10" style={{ width: `${(vp.logro / maxLogro) * 100}%` }}>
                           <span className="text-[#003B73] text-[9px] font-bold">{vp.logro}%</span>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-8">
             <h3 className="text-2xl font-bold mb-8 text-[#003B73] tracking-tight leading-none">Indicadores Clave</h3>
             <div className="grid grid-cols-3 gap-4 text-center">
              {radialChartData.map((data, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <h4 className="font-medium text-slate-500 text-[10px] uppercase tracking-wider h-8 flex items-center justify-center">{data.name}</h4>
                  <div className="w-24 h-24 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[{ value: 1 }]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius="70%"
                          outerRadius="90%"
                          fill="rgba(0,0,0,0.05)"
                          stroke="none"
                        />
                        <Pie
                          data={[{ value: data.value }]}
                          dataKey="value"
                          cx="50%"
                          cy="50%"
                          innerRadius="70%"
                          outerRadius="90%"
                          startAngle={90}
                          endAngle={90 - (data.value / 100) * 360}
                          cornerRadius={999}
                          fill="#0054A6"
                          stroke="none"
                          paddingAngle={0}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-[#003B73] tracking-tighter">{data.value}%</span>
                    </div>
                  </div>
                </div>
              ))}
             </div>
          </div>
        </div>
      </Card>
      
       <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/2 bg-white rounded-3xl p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                  <h2 className="text-lg font-bold tracking-tighter">Top 10 Colaboradores</h2>
                  <p className="text-xs font-light text-slate-400 uppercase tracking-wider mt-0.5">por desempeño institucional</p>
                </div>
                <div className="w-44">
                   <Select onValueChange={setSelectedVp} value={selectedVp}>
                    <SelectTrigger className="bg-[#003B73] text-white rounded-full h-8 border-none text-[10px]">
                      <SelectValue placeholder="Filtrar por VP" />
                    </SelectTrigger>
                    <SelectContent>
                      {vicepresidencias.map((vp) => (
                        <SelectItem key={vp} value={vp} className="text-xs">{vp}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-4">
                {top10Users.map((user, index) => (
                  <div key={index} className="grid grid-cols-2 items-center gap-4">
                    <div className="col-span-1">
                      <p className="font-normal text-xs tracking-tight text-slate-700 truncate">{user.name}</p>
                    </div>
                    <div className="col-span-1">
                      <div className="h-6 w-full bg-slate-50 rounded-full relative overflow-hidden">
                        <div 
                          className="bg-[#0054A6] h-full flex items-center justify-end px-2"
                          style={{ width: `${Math.max(15, user.logro)}%` }}
                        >
                          <span className="text-white font-bold text-[9px]">{user.logro}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center items-center p-4">
              <Image
                src={dynamicImageSrc}
                alt="Identidad Corporativa"
                width={selectedVp === 'Todas' ? 500 : 400}
                height={selectedVp === 'Todas' ? 500 : 400}
                className="object-contain drop-shadow-2xl"
                key={dynamicImageSrc}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
