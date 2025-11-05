'use client';

import CarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardContent() {
  const { currentUser, levels, loading, users } = useAuth();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
            <Skeleton className="w-96 h-96 rounded-lg" />
            <div className="flex items-end justify-center space-x-4 w-full">
              <Skeleton className="w-24 h-24 rounded-lg" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
              <Skeleton className="w-24 h-24 rounded-lg opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card className="h-full border-0 shadow-none">
          <CardContent className="flex flex-col items-center text-center gap-8 pt-6">
            <Skeleton className="w-96 h-96 rounded-lg mb-4" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentUser || !users) {
    return <div>Piloto no encontrado o no autorizado.</div>;
  }

  const userLevel = levels.find(l => l.id === currentUser.level);
  if (!userLevel) {
    return <div>Error: Pista del piloto no encontrada.</div>;
  }

  const rules = [
    "Periodo del concurso desde el 1 de octubre hasta el 19 de diciembre de 2025.",
    "Son válidas para participar, todas las pólizas estructuradas nuevas, suscritas y cobradas dentro del periodo del concurso.",
    "Las pólizas deben estar cobradas (en caso de fraccionamiento, la primera cuota) para ser contadas en el incentivo.",
    "Para participar debes mínimo suscribir 2.300$ y cobrar 200$ mensuales o alcanzar en total, mínimo 7.000$ y cobrar 800$ al cierre del concurso, el 19 de diciembre.",
    "Para subir de categoría debes cumplir con la cantidad de pólizas, prima suscrita y cobrada indicada por categoría.",
    "Serán descontadas del inventario las pólizas que sean suscritas y anuladas dentro del periodo del concurso, por lo que debes estar atento a tu progreso semanal.",
    "Las pólizas estructuradas son: RCV, Banesco Familia Segura de Servicio Funerario, Accidentes Personales, Indemnización Diaria por Hospitalización y Protección por Cáncer.",
    "Ganarán por cada Vicepresidencia, los 2 Asesores integrales de cada categoría que tengan el mayor cumplimiento en prima cobrada y suscrita.",
    "Los premios serán entregados en enero de 2026."
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="w-full">
          <CarEvolution currentUser={currentUser} />
        </div>
        <div className="w-full">
          <CurrentWorld currentUser={currentUser} levels={levels} users={users} />
        </div>
      </div>
       <div className="p-8">
        <div className="bg-[#003c71] text-white text-center py-6 px-4 rounded-2xl mb-8">
            <h2 className="text-3xl font-black">Reglas de Participación</h2>
        </div>
        <div className="space-y-3">
          {rules.map((rule, index) => (
            <div key={index} className="bg-[#00529b] text-white text-center text-sm p-4 rounded-full">
              <p>{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
