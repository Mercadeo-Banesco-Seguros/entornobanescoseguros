'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { UserCircle } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <header>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">Mi Perfil Institucional</h1>
          <p className="text-slate-500 text-sm font-light mt-1">Cargando información corporativa...</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 flex flex-col items-center justify-center p-10 border-none shadow-none bg-white rounded-[2.5rem]">
            <Skeleton className="w-48 h-48 rounded-full mb-6" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </Card>
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-none bg-white rounded-[2.5rem] p-8">
              <Skeleton className="h-24 w-full" />
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return <div className="py-20 text-center text-slate-400 font-light">Usuario no encontrado.</div>;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <header className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">Mi Perfil Institucional</h1>
        <p className="text-slate-400 text-sm font-light tracking-tight">Información oficial del colaborador en Banesco Seguros.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Card de Identidad */}
        <Card className="lg:col-span-1 border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] overflow-hidden p-10 flex flex-col items-center text-center">
          <div className="w-48 h-48 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mb-8">
            <UserCircle className="w-24 h-24 text-slate-200 stroke-[0.5]" />
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight leading-tight">{currentUser.name}</h2>
              <p className="text-slate-400 text-xs font-light mt-1">{currentUser.email}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Badge className="bg-[#003B73] hover:bg-[#003B73] text-white px-4 py-1 rounded-full text-[10px] font-light justify-center">
                {currentUser.rol}
              </Badge>
              <span className="text-[11px] text-slate-500 font-medium tracking-tight bg-slate-50 py-1.5 px-4 rounded-full border border-slate-100">
                {currentUser.cargo}
              </span>
            </div>
          </div>
        </Card>

        {/* Información Detallada */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white rounded-[2.5rem] p-10">
            <CardHeader className="p-0 mb-8">
              <CardTitle className="text-xl font-bold text-slate-900">Datos Corporativos</CardTitle>
              <CardDescription className="text-[11px] font-light text-slate-400 mt-1">Detalles de vinculación institucional.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Nombre Completo</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Correo Electrónico</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Identificación (ID)</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.id}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Rol de Sistema</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.rol}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Cargo Actual</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.cargo}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Fecha de Nacimiento</span>
                <p className="text-sm text-slate-700 font-normal">{currentUser.birthDate || 'No especificada'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Banner Informativo */}
          <div className="bg-[#003B73] rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Portal Corporativo</h3>
              <p className="text-white/60 text-[11px] font-light leading-relaxed max-w-sm">
                Tu perfil institucional te permite acceder a todas las herramientas de gestión y formación de Banesco Seguros.
              </p>
            </div>
            <button className="bg-white text-[#003B73] px-10 py-3 rounded-xl text-[11px] font-medium hover:bg-slate-50 transition-colors whitespace-nowrap">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
