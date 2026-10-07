'use client';

import * as React from 'react';

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

      <div className="max-w-2xl space-y-6 flex flex-col items-center">
        {/* Text Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mx-auto">
            <span className="text-[10px] text-[#0054A6] font-light uppercase tracking-widest">Próximamente</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-tight">
            Sección en Construcción
          </h1>
          
          <p className="text-slate-500 text-[10px] font-light leading-relaxed max-w-sm mx-auto">
            Esta sección se encuentra en construcción en este momento. Estamos trabajando para integrar nuestro sistema de gestión de solicitudes en tu flujo de trabajo diario.
          </p>
          
          <p className="text-[#0054A6] text-[10px] font-medium tracking-tight">
            Estará disponible muy pronto.
          </p>
        </div>
      </div>
    </div>
  );
}
