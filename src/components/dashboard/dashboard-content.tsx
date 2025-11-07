'use client';

import CarEvolution from '@/components/dashboard/avatar-evolution';
import CurrentWorld from '@/components/dashboard/current-world';
import { useAuth } from '@/context/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

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
      
      <Card className="border-0 shadow-none">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Recursos Estratégicos</CardTitle>
              <CardDescription>
                Aquí encontrarás todo el material de apoyo que necesitas para dominar cada tramo del circuito. Accede a manuales de productos, guías de venta, y herramientas exclusivas para optimizar tu estrategia y acelerar hacia la victoria.
              </CardDescription>
            </CardHeader>
            <div className="pt-6">
              <Link href="https://drive.google.com/file/d/1GtASq9tTkrNhtCZBhqSKzTbC2Uq0XuNp/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                <Button>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Acceder a Recursos
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src="https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_xebblzxebblzxebb-Photoroom-1.png"
              alt="Recursos estratégicos"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
