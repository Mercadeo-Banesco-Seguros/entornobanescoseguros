'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { UserCircle, Check } from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="md:col-span-1 flex flex-col items-center justify-center p-8 border border-slate-100 shadow-none bg-white rounded-[2.5rem]">
            <Skeleton className="w-48 h-48 rounded-full mb-6" />
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-48" />
          </Card>
          <div className="md:col-span-2 space-y-6">
            <Card className="border border-slate-100 shadow-none bg-white rounded-[2.5rem] p-8">
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
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {/* Card de Identidad */}
        <Card className="lg:col-span-1 border border-slate-100 shadow-none bg-white rounded-[2.5rem] overflow-hidden p-12 flex flex-col items-center justify-center text-center">
          <div className="w-40 h-40 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 mb-8">
            <UserCircle className="w-20 h-24 text-slate-200 stroke-[0.5]" />
          </div>
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-light text-slate-900 tracking-tight leading-tight">{currentUser.name}</h2>
              <p className="text-slate-400 text-[10px] font-light">{currentUser.email}</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <Badge className="bg-[#003B73] hover:bg-[#003B73] text-white px-6 py-1.5 rounded-full text-[8px] font-light justify-center">
                {currentUser.rol}
              </Badge>
              <span className="text-[9px] text-slate-500 font-light tracking-tight bg-slate-50 py-2 px-6 rounded-full border border-slate-100">
                {currentUser.cargo}
              </span>
            </div>
          </div>
        </Card>

        {/* Información Detallada */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-none bg-[#003B73] rounded-[2.5rem] p-7 text-white">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-xl font-light text-white tracking-tight">Datos Corporativos</CardTitle>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Nombre completo</span>
                <p className="text-[10px] text-white font-light">{currentUser.name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Correo electrónico</span>
                <p className="text-[10px] text-white font-light">{currentUser.email}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Identificación (ID)</span>
                <p className="text-[10px] text-white font-light">{currentUser.id}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Rol de sistema</span>
                <p className="text-[10px] text-white font-light">{currentUser.rol}</p>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Cargo actual</span>
                <div className="flex items-center gap-1.5">
                  <p className="text-[10px] text-white font-light">{currentUser.cargo}</p>
                  <Check className="w-3 h-3 text-white/70" />
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[8px] text-white/50 font-light">Fecha de nacimiento</span>
                <p className="text-[10px] text-white font-light">{currentUser.birthDate || 'No especificada'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Banner Informativo */}
          <div className="bg-[#003B73] rounded-[2.5rem] p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="text-xl font-light tracking-tight">Portal Corporativo</h3>
              <p className="text-white/60 text-[9px] font-light leading-relaxed max-w-sm">
                Tu perfil institucional te permite acceder a todas las herramientas de gestión y formación de Banesco Seguros.
              </p>
            </div>
            <button className="bg-white text-[#003B73] px-10 py-3 rounded-xl text-[9px] font-light hover:bg-slate-50 transition-colors whitespace-nowrap">
              Contactar Soporte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}