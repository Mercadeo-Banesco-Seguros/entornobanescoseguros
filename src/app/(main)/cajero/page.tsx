
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { prizes } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Ticket, Coins, ArrowUpRight } from 'lucide-react';
import type { Prize } from '@/lib/types';
import { jsPDF } from "jspdf";
import { cn } from '@/lib/utils';

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

  if (loading || !currentUser) {
    return (
      <div className="space-y-8">
        <div className="w-full h-80 bg-muted animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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
      <div className="relative w-full bg-secondary/50 rounded-lg overflow-hidden flex items-center grid grid-cols-1 md:grid-cols-2">
        <div className="relative z-10 p-8 md:p-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Tus CONECTCOINS: {currentUser.xp.toLocaleString()}</p>
          <h1 className="text-4xl md:text-6xl font-black text-foreground mt-2">Bazar de Reliquias.</h1>
          <p className="mt-4 max-w-md text-muted-foreground">Canjea tus CONECTCOINS por tesoros únicos de la expedición y lleva tu aventura al siguiente nivel.</p>
        </div>
        <div className="relative h-64 md:h-full w-full p-8">
          <Image
            src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Gemini_Generated_Image_agrfxbagrfxbagrf-Photoroom.png?raw=true"
            alt="Bazar de reliquias"
            layout="fill"
            className="object-cover"
            data-ai-hint="treasure chest"
          />
        </div>
      </div>

      {/* Prizes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {prizes.map((prize) => {
          const canAfford = currentUser.xp >= prize.cost;
          return (
            <Card
              key={prize.id}
              className={cn(
                'overflow-hidden rounded-2xl bg-card border shadow-sm transition-all',
                !canAfford && 'opacity-60'
              )}
            >
              <div className="p-4">
                <h3 className="font-semibold text-lg text-foreground">{prize.name}</h3>
                <p className="text-sm text-muted-foreground">Recompensa</p>
              </div>
              <div className="relative aspect-square">
                <Image
                  src={prize.imageUrl}
                  alt={prize.name}
                  fill
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 text-white font-bold text-2xl">
                  {prize.cost.toLocaleString()}
                </div>
                <Button
                  size="icon"
                  className={cn(
                    "absolute bottom-4 right-4 rounded-full h-10 w-10 transition-transform",
                     canAfford ? "bg-primary hover:scale-110" : "bg-muted text-muted-foreground"
                  )}
                  onClick={() => handleRedeemClick(prize)}
                  disabled={!canAfford}
                  aria-label={`Canjear ${prize.name}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Button>
              </div>
            </Card>
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
