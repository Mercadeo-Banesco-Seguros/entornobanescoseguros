'use client';

import Image from 'next/image';

export default function MultimediaPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 animate-in fade-in duration-1000">
      <div className="relative w-full max-w-3xl aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 mb-12">
        <Image
          src="https://docs.google.com/drawings/d/e/2PACX-1vQDYWrs3tS3au8IfBhDzA21ZZBPGR4XCdiRMcDUXeI1ZSCGaVmrWNBMHj10NXVuFV7WEn5hOQOfERx2/pub?w=960&h=720"
          alt="Sección en construcción"
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-[11px] font-light text-slate-400 uppercase tracking-[0.2em]">Multimedia</h2>
        <p className="text-slate-500 font-light text-[13px] tracking-tight">
          Esta sección está en construcción. Pronto compartiremos contenido exclusivo contigo.
        </p>
      </div>
    </div>
  );
}
