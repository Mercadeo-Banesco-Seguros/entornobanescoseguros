'use client';

import type { Prize } from '@/lib/types';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type PrizeModalProps = {
  prize: Prize;
  onClose: () => void;
};

export default function PrizeModal({ prize, onClose }: PrizeModalProps) {

  const prizeDetails: { [key: number]: { title: string; description: React.ReactNode; images: React.ReactNode } } = {
    1: {
        title: "PRIMER LUGAR!!",
        description: (
            <>
                Tu esfuerzo extraordinario merece una recompensa legendaria. Alcanza la cima en nuestra competencia y prepárate para celebrar tu éxito con una escapada de lujo a la Isla de Margarita.
                <br /><br />
                El ganador disfrutará de 3 días y 2 noches inolvidables con TODO INCLUIDO en el espectacular resort Sunsol Ecoland.
                <br /><br />
                Un merecido descanso en el paraíso, donde tu única misión será relajarte. Y para celebrar tu victoria como se debe, ¡te llevas un abono equivalente a $200 en tu T5 de todoticket para disfrutar!
                <br /><br />
                ¿Estás listo para demostrar que eres el número uno?
            </>
        ),
        images: (
            <div className="flex justify-center items-center gap-4 mt-4">
                <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/image-Photoroom%20(26).png?raw=true" alt="Avión" width={180} height={180} className="object-contain" />
                <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/cb867c0cd96708c8ed4e0e6a0160d7f6-Photoroom.png?raw=true" alt="Dinero" width={112} height={75} className="object-contain" />
            </div>
        )
    },
    2: {
        title: "SEGUNDO LUGAR!!",
        description: (
             <>
                ¡Has demostrado ser uno de los mejores! Tu constancia y dedicación te han llevado a asegurar un merecido lugar en el podio. Como recompensa, te llevas un increíble bono de $150 en tu T5 de Todoticket para que lo disfrutes como prefieras.
                <br /><br />
                ¡Felicidades por este gran logro!
            </>
        ),
        images: (
             <div className="flex justify-center items-end mt-8">
                <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/cb867c0cd96708c8ed4e0e6a0160d7f6-Photoroom.png?raw=true" alt="Dinero" width={150} height={150} className="object-contain" />
            </div>
        )
    },
    3: {
        title: "TERCER LUGAR!!",
        description: (
             <>
                ¡Tu esfuerzo te ha colocado entre los tres mejores! Has luchado en cada curva y tu perseverancia ha dado frutos. Para celebrar tu victoria, te premiamos con un bono de $50 en tu T5 de Todoticket.
                <br /><br />
                ¡Sigue acelerando hacia el éxito!
            </>
        ),
        images: (
            <div className="flex justify-center items-end mt-8">
                <Image src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/cb867c0cd96708c8ed4e0e6a0160d7f6-Photoroom.png?raw=true" alt="Dinero" width={150} height={150} className="object-contain" />
            </div>
        )
    }
  };

  const details = prizeDetails[prize.id];

  return (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px] bg-primary text-primary-foreground border-0 p-10 overflow-hidden min-h-[580px] flex flex-col justify-between">
            <DialogHeader className="space-y-4">
                <DialogTitle className="text-6xl font-black tracking-tighter text-white">{details?.title}</DialogTitle>
                <DialogDescription asChild>
                    <div className="text-white/80 text-base">
                        {details?.description}
                    </div>
                </DialogDescription>
            </DialogHeader>
            {details?.images}
        </DialogContent>
    </Dialog>
  );
}
