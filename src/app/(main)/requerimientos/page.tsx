'use client';

import * as React from 'react';
import Image from 'next/image';
import { Mail, Clock, Hammer } from 'lucide-react';

export default function RequerimientosPage() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full px-6 text-center animate-in fade-in duration-1000">
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-50/50" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-slate-100/50" />
      </div>

      <div className="max-w-2xl space-y-8">
        {/* Icon Container */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0054A6]/5 rounded-3xl rotate-6 animate-pulse" />
          <div className="absolute inset-0 bg-[#0054A6]/10 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500" />
          <div className="relative bg-white shadow-xl rounded-2xl w-16 h-16 flex items-center justify-center border border-slate-50">
            <Hammer className="w-8 h-8 text-[#0054A6] stroke-[1.5]" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100">
            <Clock className="w-3 h-3 text-[#0054A6]" />
            <span className="text-[10px] text-[#0054A6] font-light uppercase tracking-widest">Próximamente</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-tight">
            Sección en Construcción
          </h1>
          
          <p className="text-slate-500 text-sm md:text-base font-light leading-relaxed max-w-md mx-auto">
            Esta sección se encuentra en construcción en este momento. Estamos trabajando para integrar nuestro sistema de gestión de solicitudes en tu flujo de trabajo diario.
          </p>
          
          <p className="text-[#0054A6] text-xs font-medium tracking-tight">
            Estará disponible muy pronto.
          </p>
        </div>
      </div>
    </div>
  );
}
