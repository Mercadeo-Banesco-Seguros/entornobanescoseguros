'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { BadgeCheck } from 'lucide-react';

type RulesModalProps = {
  onClose: () => void;
};

const rules = [
    'Periodo del concurso desde el 1 de octubre hasta el 19 de diciembre de 2025.',
    'Son válidas para participar, todas las pólizas estructuradas nuevas, suscritas y cobradas dentro del periodo del concurso.',
    'Las pólizas deben estar cobradas (en caso de fraccionamiento, la primera cuota) para ser contadas en el incentivo.',
    'Para participar debes mínimo suscribir 2.300$ y cobrar 200$ mensuales o alcanzar en total, mínimo 7.000$ y cobrar 800$ al cierre del concurso, el 19 de diciembre.',
    'Para subir de categoría debes cumplir con la cantidad de pólizas, prima suscrita y cobrada indicada por categoría.',
    'Serán descontadas del inventario las pólizas que sean suscritas y anuladas dentro del periodo del concurso, por lo que debes estar atento a tu progreso semanal.',
    'Las pólizas estructuradas son: RCV, Banesco Familia Segura de Servicio Funerario, Accidentes Personales, Indemnización Diaria por Hospitalización y Protección por Cáncer.',
    'Ganarán por cada Vicepresidencia, los 2 Asesores integrales de cada categoría que tengan el mayor cumplimiento en prima cobrada y suscrita.',
    'Los premios serán entregados en enero de 2026.',
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
