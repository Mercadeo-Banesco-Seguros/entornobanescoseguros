'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { prizes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Ticket, Coins, Trophy } from 'lucide-react';
import type { Prize } from '@/lib/types';
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils';

export default function CajeroPage() {
  const { currentUser, levels, avatars, loading } = useAuth();
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


  if (loading || !currentUser) {
    // SKELETON LOADER
    return (
      <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Cajero de Premios</h1>
          <p className="text-muted text-lg mt-1">Canjea tus CONECTCOINS por premios increíbles.</p>
        </header>
         <Card className="sticky top-20 z-10">
          <CardContent className="p-6">
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="flex flex-col"><CardContent className="p-0"><Skeleton className="w-full h-48 rounded-t-lg" /></CardContent><CardHeader><Skeleton className="h-6 w-3/4" /><Skeleton className="h-4 w-1/2 mt-1" /></CardHeader><CardFooter><Skeleton className="h-10 w-full" /></CardFooter></Card>
          ))}
        </div>
      </div>
    );
  }
  
  const myLevel = levels.find(l => l.id === currentUser.level);
  const myAvatar = avatars.find(av => av.name === currentUser.avatar);

  const leftPrizes = prizes.slice(0, Math.ceil(prizes.length / 2));
  const rightPrizes = prizes.slice(Math.ceil(prizes.length / 2));

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-foreground">Cajero de Premios</h1>
        <p className="text-muted text-lg mt-1">Canjea tus <span className="font-bold text-primary">{currentUser.xp.toLocaleString()} CONECTCOINS</span> por premios increíbles.</p>
      </header>
      
      <Card className="sticky top-20 z-10 bg-primary text-primary-foreground shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center"><div className="flex-grow flex items-center gap-4"><div className="p-1 bg-white/20 rounded-full w-12 h-12 flex items-center justify-center">{myAvatar && (<Image src={myAvatar.imageUrl} alt={currentUser.avatar} width={40} height={40} className="object-contain" />)}</div><div><p className="font-semibold text-base">{currentUser.name} (Tú)</p><p className="text-xs text-primary-foreground/80">{currentUser.avatar}</p></div></div><div className="text-center w-48">{myLevel && (<span className="bg-primary text-primary-foreground font-bold text-xs px-3 py-1 rounded-full border">{myLevel.worldName}</span>)}</div><div className="text-right w-48 flex items-baseline justify-end gap-1.5"><span className="text-2xl font-bold">{currentUser.xp.toLocaleString()}</span><span className="text-xs font-normal text-primary-foreground/80">CONECTCOINS</span></div></div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {leftPrizes.map((prize) => {
            const canAfford = currentUser.xp >= prize.cost;
            return (
              <Card 
                key={prize.id}
                onClick={() => handleRedeemClick(prize)}
                className={cn(
                  'transition-all duration-300 ease-in-out',
                  canAfford ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed',
                  canAfford && 'bg-primary text-primary-foreground'
                )}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-3">
                    <Coins className="h-5 w-5"/>
                    {prize.name}
                  </CardTitle>
                  <CardDescription className={cn(canAfford && "text-primary-foreground/80")}>
                    Costo: {prize.cost.toLocaleString()} CONECTCOINS
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>

        {/* Center Column */}
        <div className="flex items-center justify-center">
            <Trophy className="w-64 h-64 md:w-80 md:h-80 text-primary/20" strokeWidth={1} />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
           {rightPrizes.map((prize) => {
            const canAfford = currentUser.xp >= prize.cost;
            return (
              <Card 
                key={prize.id}
                onClick={() => handleRedeemClick(prize)}
                className={cn(
                  'transition-all duration-300 ease-in-out',
                  canAfford ? 'cursor-pointer hover:scale-105 hover:shadow-xl' : 'opacity-50 cursor-not-allowed',
                  canAfford && 'bg-primary text-primary-foreground'
                )}
              >
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-3">
                    <Coins className="h-5 w-5"/>
                    {prize.name}
                  </CardTitle>
                  <CardDescription className={cn(canAfford && "text-primary-foreground/80")}>
                     Costo: {prize.cost.toLocaleString()} CONECTCOINS
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
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
