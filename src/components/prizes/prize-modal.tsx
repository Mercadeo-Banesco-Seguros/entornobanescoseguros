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
                <p>Tu esfuerzo extraordinario merece una recompensa legendaria. Alcanza la cima en nuestra competencia y prepárate para celebrar tu éxito con una escapada de lujo a la Isla de Margarita.</p>
                <p>El ganador disfrutará de 3 días y 2 noches inolvidables con TODO INCLUIDO en el espectacular resort Sunsol Ecoland.</p>
                <p>Un merecido descanso en el paraíso, donde tu única misión será relajarte. Y para celebrar tu victoria como se debe, ¡te llevas un bono de $200 en tu T5 de Todoticket para consentirte!</p>
                <p>¿Estás listo para demostrar que eres el número uno?</p>
            </>
        ),
        images: (
            <div className="flex justify-between items-end mt-8 -mb-12">
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/10/Gemini_Generated_Image_v29k8wv29k8wv29k-Photoroom.png" alt="Avión" width={300} height={200} className="object-contain" />
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/10/Gemini_Generated_Image_b6r01ib6r01ib6r0-Photoroom.png" alt="Dinero" width={200} height={150} className="object-contain" />
            </div>
        )
    },
    2: {
        title: "SEGUNDO LUGAR!!",
        description: (
             <>
                <p>¡Has demostrado ser uno de los mejores! Tu constancia y dedicación te han llevado a asegurar un merecido lugar en el podio. Como recompensa, te llevas un increíble bono de $150 en tu T5 de Todoticket para que lo disfrutes como prefieras.</p>
                <p>¡Felicidades por este gran logro!</p>
            </>
        ),
        images: (
             <div className="flex justify-center items-end mt-8 -mb-12">
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/10/Gemini_Generated_Image_b6r01ib6r01ib6r0-Photoroom.png" alt="Dinero" width={250} height={180} className="object-contain" />
            </div>
        )
    },
    3: {
        title: "TERCER LUGAR!!",
        description: (
             <>
                <p>¡Tu esfuerzo te ha colocado entre los tres mejores! Has luchado en cada curva y tu perseverancia ha dado frutos. Para celebrar tu victoria, te premiamos con un bono de $50 en tu T5 de Todoticket.</p>
                <p>¡Sigue acelerando hacia el éxito!</p>
            </>
        ),
        images: (
            <div className="flex justify-center items-end mt-8 -mb-12">
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/10/Gemini_Generated_Image_b6r01ib6r01ib6r0-Photoroom.png" alt="Dinero" width={200} height={150} className="object-contain" />
            </div>
        )
    }
  };

  const details = prizeDetails[prize.id];

  return (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px] bg-primary text-primary-foreground border-0 p-10 overflow-hidden">
            <DialogHeader className="space-y-4">
                <DialogTitle className="text-6xl font-black tracking-tighter text-white">{details?.title}</DialogTitle>
                <DialogDescription className="text-white/80 space-y-3 text-base">
                    {details?.description}
                </DialogDescription>
            </DialogHeader>
            {details?.images}
        </DialogContent>
    </Dialog>
  );
}
