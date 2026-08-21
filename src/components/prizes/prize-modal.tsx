'use client';

import type { Prize } from '@/lib/types';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Link from 'next/link';

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
                El ganador disfrutará de 3 días y 2 noches inolvidables con TODO INCLUIDO.
                <br /><br />
                Un merecido descanso en el paraíso, donde tu única misión será relajarte. Y para celebrar tu victoria como se debe, ¡te llevas un abono de 51.000 Bs. en tu T5 de todoticket para disfrutar!
                <br /><br />
                ¿Estás listo para demostrar que eres el número uno?
            </>
        ),
        images: (
            <div className="flex justify-center items-center gap-4 mt-4">
                <Link href="https://drive.google.com/drive/folders/1ynl2HLESEungCG5_6YLgBW5Nv9y2Lm1b?usp=drive_link" target="_blank" rel="noopener noreferrer">
                    <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/11/image-Photoroom-26.png" alt="Avión" width={240} height={240} className="object-contain" />
                </Link>
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_ennz50ennz50ennz-Photoroom.png" alt="Dinero" width={112} height={75} className="object-contain" />
            </div>
        )
    },
    2: {
        title: "SEGUNDO LUGAR!!",
        description: (
             <>
                ¡Has demostrado ser uno de los mejores! Tu constancia y dedicación te han llevado a asegurar un merecido lugar en el podio. Como recompensa, te llevas un increíble bono de 34.000 Bs. en tu T5 de Todoticket para que lo disfrutes como prefieras.
                <br /><br />
                ¡Felicidades por este gran logro!
            </>
        ),
        images: (
             <div className="flex justify-center items-end mt-8">
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_ennz50ennz50ennz-Photoroom.png" alt="Dinero" width={200} height={200} quality={100} className="object-contain" />
            </div>
        )
    },
    3: {
        title: "TERCER LUGAR!!",
        description: (
             <>
                ¡Tu esfuerzo te ha colocado entre los tres mejores! Has luchado en cada curva y tu perseverancia ha dado frutos. Para celebrar tu victoria, te premiamos con un bono de 17.000 Bs. en tu T5 de Todoticket.
                <br /><br />
                ¡Sigue acelerando hacia el éxito!
            </>
        ),
        images: (
            <div className="flex justify-center items-end mt-8">
                <Image src="https://www.banescoseguros.com/wp-content/uploads/2025/11/Gemini_Generated_Image_ennz50ennz50ennz-Photoroom.png" alt="Dinero" width={200} height={200} quality={100} className="object-contain" />
            </div>
        )
    }
  };

  const details = prizeDetails[prize.id];

  return (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px] bg-white text-slate-900 border-slate-200 p-10 overflow-hidden flex flex-col justify-between min-h-[580px] shadow-2xl">
            <DialogHeader className="space-y-4">
                <DialogTitle className="text-6xl font-black tracking-tighter text-slate-900 uppercase">{details?.title}</DialogTitle>
                <DialogDescription asChild>
                    <div className="text-slate-500 text-base font-light leading-relaxed">
                        {details?.description}
                    </div>
                </DialogDescription>
            </DialogHeader>
            <div className="relative z-10">
                {details?.images}
            </div>
        </DialogContent>
    </Dialog>
  );
}
