'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { prizes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Ticket, Coins, ArrowUpRight, Diamond, Award, Shield, Gem } from 'lucide-react';
import type { Prize, PrizeCategory } from '@/lib/types';
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const categoryConfig: Record<PrizeCategory, { icon: React.ElementType, color: string }> = {
  'Diamante': { icon: Diamond, color: 'text-blue-400' },
  'Oro': { icon: Award, color: 'text-yellow-500' },
  'Plata': { icon: Shield, color: 'text-gray-400' },
  'Bronce': { icon: Gem, color: 'text-orange-500' },
};

export default function CajeroPage() {
  const { currentUser, loading } = useAuth();
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  const handleRedeemClick = (prize: Prize) => {
    if (currentUser && currentUser.xp >= prize.cost) {
      setSelectedPrize(prize);
      setIsRedeemDialogOpen(true);
    }
  };

  const confirmRedemption = () => {
    // Lógica de canje (restar puntos, etc.) se implementará después
    console.log(`Canjeando ${selectedPrize?.name} para ${currentUser?.name}`);
    setIsRedeemDialogOpen(false);
    setIsTicketDialogOpen(true); // Mostrar el ticket después de confirmar
  };
  
  const downloadTicket = () => {
    if (!selectedPrize || !currentUser) return;
    
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Ticket de Canje - Banesco Expedición", 105, 20, { align: "center" });

    doc.setFontSize(14);
    doc.text(`¡Felicidades, ${currentUser.name}!`, 105, 40, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Has canjeado el siguiente premio:`, 105, 60, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(selectedPrize.name, 105, 75, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`ID de Canje: ${Date.now()}`, 105, 85, { align: "center" });
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 105, 90, { align: "center" });

    doc.setFontSize(12);
    doc.text("Instrucciones:", 20, 110);
    doc.setFont("helvetica", "normal");
    doc.text("Presenta este ticket (impreso o digital) en el departamento de", 20, 120);
    doc.text("Capital Humano para recibir tu premio.", 20, 125);

    doc.save(`Ticket-${selectedPrize.name.replace(/\s/g, '_')}-${currentUser.name}.pdf`);
  };
  
  const renderPrizeCategory = (category: PrizeCategory) => {
    const categoryPrizes = prizes.filter(p => p.category === category);
    const CategoryIcon = categoryConfig[category].icon;

    return (
      <div key={category} className="space-y-4">
        <Carousel
          opts={{
            align: "start",
            loop: false,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
             <CarouselItem className="basis-auto pl-4">
                <div className="flex flex-col items-center justify-center text-center h-full w-48 p-4">
                  <p className="text-sm text-muted-foreground">Categoría</p>
                  <p className="text-2xl font-bold">{category}</p>
                  <CategoryIcon className={`h-16 w-16 mt-2 ${categoryConfig[category].color}`} />
                </div>
              </CarouselItem>

            {categoryPrizes.map((prize) => {
              const canAfford = currentUser && currentUser.xp >= prize.cost;
              return (
                <CarouselItem key={prize.id} className="basis-1/2 md:basis-1/3 lg:basis-1/5 pl-4">
                   <Card
                      className={cn(
                        'overflow-hidden rounded-2xl bg-card border shadow-sm transition-all h-full flex flex-col group',
                        !canAfford && 'opacity-60'
                      )}
                      onClick={() => handleRedeemClick(prize)}
                    >
                      <CardContent className="p-4 flex-grow flex flex-col justify-center items-center text-center">
                         <div className="relative w-32 h-32 mb-4">
                           <Image
                              src={prize.imageUrl}
                              alt={prize.name}
                              fill
                              className="object-contain"
                            />
                         </div>
                         <h3 className="font-semibold text-base text-foreground truncate">{prize.name}</h3>
                         <p className="text-sm text-muted-foreground">Recompensa</p>
                         <p className="text-lg font-bold text-primary mt-1">{prize.cost.toLocaleString()}</p>
                      </CardContent>
                      <CardFooter className="p-2">
                        <Button
                          className="w-full"
                          disabled={!canAfford}
                        >
                          Canjear
                        </Button>
                      </CardFooter>
                    </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-14" />
          <CarouselNext className="mr-14" />
        </Carousel>
      </div>
    );
  };


  if (loading || !currentUser) {
    return (
      <div className="space-y-8">
        <div className="w-full h-80 bg-muted animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
             <Card key={i} className="overflow-hidden rounded-xl">
              <CardHeader className="p-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="p-0">
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="relative w-full rounded-lg overflow-hidden flex items-center grid grid-cols-1 md:grid-cols-2">
        <div className="relative z-10 p-8 md:p-16">
          <div className='mb-4'>
            <p className="text-sm font-medium text-muted-foreground">Tus CONECTCOINS</p>
            <p className="text-4xl font-bold text-primary">{currentUser.xp.toLocaleString()}</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mt-2">Bazar de Reliquias.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">Canjea tus CONECTCOINS por tesoros únicos de la expedición y lleva tu aventura al siguiente nivel.</p>
        </div>
        <div className="relative h-64 md:h-full w-full flex items-center justify-start">
          <Image
            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_ghydwqghydwqghyd-Photoroom.png?raw=true"
            alt="Bazar de reliquias"
            width={400}
            height={400}
            className="object-contain"
            data-ai-hint="bazaar stall"
          />
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="space-y-12">
        {renderPrizeCategory('Diamante')}
        {renderPrizeCategory('Oro')}
        {renderPrizeCategory('Plata')}
        {renderPrizeCategory('Bronce')}
      </div>


      {/* Confirmation Dialog */}
      <Dialog open={isRedeemDialogOpen} onOpenChange={setIsRedeemDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Canje</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que quieres canjear <span className="font-bold">{selectedPrize?.cost.toLocaleString()} CONECTCOINS</span> por el premio <span className="font-bold">{selectedPrize?.name}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRedeemDialogOpen(false)}>Cancelar</Button>
            <Button onClick={confirmRedemption}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Ticket Dialog */}
      <Dialog open={isTicketDialogOpen} onOpenChange={setIsTicketDialogOpen}>
        <DialogContent className="max-w-md">
           <DialogHeader>
            <div className="flex items-center justify-center flex-col text-center gap-2">
                <Ticket className="h-16 w-16 text-primary" />
                <DialogTitle className="text-2xl">¡Canje Exitoso!</DialogTitle>
            </div>
            <DialogDescription className="text-center pt-2">
              Se ha generado tu ticket de canje. Guárdalo bien y preséntalo en Capital Humano para recibir tu premio.
            </DialogDescription>
          </DialogHeader>
          <Card className="mt-4 bg-secondary/50 border-dashed">
            <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Premio Canjeado</p>
                <p className="text-lg font-bold text-foreground">{selectedPrize?.name}</p>
                 <p className="text-xs text-muted-foreground mt-2">ID de Canje: {Date.now()}</p>
            </CardContent>
          </Card>
          <DialogFooter className="mt-4">
             <Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Cerrar</Button>
             <Button onClick={downloadTicket}>Descargar PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
