
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Ticket } from 'lucide-react';
import type { Prize } from '@/lib/types';
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils';

export default function CajeroPage() {
  const { currentUser, loading, prizes, redeemPrize } = useAuth();
  const [selectedPrize, setSelectedPrize] = useState<Prize | null>(null);
  const [isRedeemDialogOpen, setIsRedeemDialogOpen] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);

  const handleRedeemClick = (prize: Prize) => {
    if (currentUser && currentUser.xp >= prize.cost) {
      setSelectedPrize(prize);
      setIsRedeemDialogOpen(true);
    }
  };

  const confirmRedemption = async () => {
    if (!selectedPrize || !currentUser) return;
    try {
      await redeemPrize(selectedPrize);
      setIsRedeemDialogOpen(false);
      setIsTicketDialogOpen(true); // Mostrar el ticket después de confirmar
    } catch (error) {
      console.error(error);
      setIsRedeemDialogOpen(false);
      // Aquí podrías mostrar un toast de error
    }
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

  if (loading || !currentUser) {
    return (
      <div className="space-y-8">
        <Skeleton className="w-full h-80 rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-lg" />)}
        </div>
      </div>
    );
  }
  
  if (!prizes || prizes.length === 0) {
      return <div>No se encontraron premios.</div>;
  }

  const heroPrize = prizes.find(p => p.name === 'Premio Misterioso');
  const [heroPrizeName, heroPrizeSubtitle] = heroPrize ? heroPrize.name.split(' ') : ["Premio", "Misterioso"];


  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {heroPrize && (
        <div className="bg-blue-100 rounded-2xl grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
          <div className="p-8 md:p-16">
            <span className="bg-white/50 text-primary font-medium text-xs px-3 py-1 rounded-full">{heroPrize.category}</span>
            <h1 className="text-5xl font-bold text-foreground mt-0 -mb-2 tracking-tighter">
              Premio
            </h1>
            <p className="text-6xl md:text-8xl font-black text-foreground/10 tracking-tighter uppercase">
              SORPRESA
            </p>
            <Button 
              className="mt-4 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              onClick={() => handleRedeemClick(heroPrize)}
              disabled={currentUser.xp < heroPrize.cost}
            >
              Canjear por {heroPrize.cost}
            </Button>
          </div>
          <div className="relative h-64 md:h-full flex items-center justify-center">
            <Image
              src={heroPrize.imageUrl}
              alt={heroPrize.name}
              width={400}
              height={400}
              className="object-contain"
              data-ai-hint="headphone"
            />
          </div>
        </div>
      )}

      {/* Prizes Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-6">
        {prizes.filter(p => p.id !== heroPrize?.id).slice(0, 2).map((prize, index) => {
          const canAfford = currentUser.xp >= prize.cost;
          return (
            <div 
              key={prize.id} 
              className={cn(
                "rounded-2xl p-6 flex flex-col justify-between h-64",
                index === 0 ? "bg-black text-white" : "bg-yellow-400 text-black",
                !canAfford && 'opacity-60',
                canAfford && 'cursor-pointer'
              )}
              onClick={() => canAfford && handleRedeemClick(prize)}
            >
              <div>
                <p className="font-semibold text-sm">{prize.category}</p>
                <h2 className="text-2xl font-bold uppercase">{prize.name}</h2>
              </div>
              <div className="flex justify-between items-end">
                <Button variant="link" className="text-inherit p-0 h-auto" disabled={!canAfford}>Canjear</Button>
                <div className="relative w-24 h-24">
                  <Image src={prize.imageUrl} alt={prize.name} fill className="object-contain" />
                </div>
              </div>
            </div>
          );
        })}
        {prizes.filter(p => p.id !== heroPrize?.id).slice(2, 4).map((prize, index) => {
          const canAfford = currentUser.xp >= prize.cost;
          return (
            <div 
              key={prize.id} 
              className={cn(
                "col-span-2 rounded-2xl p-6 flex items-center justify-between h-64",
                 index === 0 ? "bg-red-500 text-white" : "bg-neutral-100 text-black",
                 !canAfford && 'opacity-60',
                 canAfford && 'cursor-pointer'
              )}
              onClick={() => canAfford && handleRedeemClick(prize)}
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="font-semibold text-sm">{prize.category}</p>
                  <h2 className="text-3xl font-bold uppercase">{prize.name}</h2>
                </div>
                <Button variant="link" className="text-inherit p-0 h-auto self-start" disabled={!canAfford}>Canjear</Button>
              </div>
              <div className="relative w-48 h-48">
                  <Image src={prize.imageUrl} alt={prize.name} fill className="object-contain" />
              </div>
            </div>
          );
        })}
         {prizes.filter(p => p.id !== heroPrize?.id).slice(4, 6).map((prize, index) => {
          const canAfford = currentUser.xp >= prize.cost;
          return (
            <div 
              key={prize.id} 
              className={cn(
                "col-span-2 rounded-2xl p-6 flex items-center justify-between h-64",
                 index === 0 ? "bg-green-500 text-white" : "bg-blue-500 text-white",
                 !canAfford && 'opacity-60',
                 canAfford && 'cursor-pointer'
              )}
              onClick={() => canAfford && handleRedeemClick(prize)}
            >
               <div className="flex flex-col justify-between h-full">
                <div>
                  <p className="font-semibold text-sm">{prize.category}</p>
                  <h2 className="text-3xl font-bold uppercase">{prize.name}</h2>
                </div>
                <Button variant="link" className="text-inherit p-0 h-auto self-start" disabled={!canAfford}>Canjear</Button>
              </div>
              <div className="relative w-48 h-48">
                  <Image src={prize.imageUrl} alt={prize.name} fill className="object-contain" />
              </div>
            </div>
          );
        })}
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
          <div className="mt-4 bg-secondary/50 border-dashed rounded-lg">
            <div className="p-4 text-center">
                <p className="text-sm text-muted-foreground">Premio Canjeado</p>
                <p className="text-lg font-bold text-foreground">{selectedPrize?.name}</p>
                 <p className="text-xs text-muted-foreground mt-2">ID de Canje: {Date.now()}</p>
            </div>
          </div>
          <DialogFooter className="mt-4">
             <Button variant="outline" onClick={() => setIsTicketDialogOpen(false)}>Cerrar</Button>
             <Button onClick={downloadTicket}>Descargar PDF</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
