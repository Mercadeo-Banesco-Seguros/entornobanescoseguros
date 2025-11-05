'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BadgeCheck } from 'lucide-react';

type RulesModalProps = {
  onClose: () => void;
};

const rules = [
    'El concurso tiene una duración de 3 meses. Inicia el 01/10/2024 y finaliza el 31/12/2024.',
    'El Asesor Integral debe tener un mínimo de 3 meses de antigüedad en la empresa.',
    'La meta del concurso es de USD 3.300.',
    'El mínimo de cumplimiento para entrar en el concurso es del 75%.',
    'El concurso tiene una meta de 75 pólizas.',
    'Para el concurso se tomarán en cuenta todas las pólizas de Salud, Activos y Líneas Personales que se suscriban y cobren durante la vigencia del mismo.',
    'El concurso tiene una meta de cobrado de USD 300.',
];

export default function RulesModal({ onClose }: RulesModalProps) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Reglas de Participación</DialogTitle>
                <DialogDescription>
                    Asegúrate de cumplir con todos los requisitos para ser el próximo campeón del circuito.
                </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4">
                {rules.map((rule, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                        <p className="text-sm text-muted-foreground">{rule}</p>
                    </div>
                ))}
            </div>
        </DialogContent>
    </Dialog>
  );
}
