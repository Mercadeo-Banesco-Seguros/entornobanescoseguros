'use client';

export default function NosotrosPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section - Nuestra Visión 2026 */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[350px] md:min-h-[400px] overflow-hidden flex items-center bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/20" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-sky-300/10" />
        </div>
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              Nuestra Visión para el 2026
            </h1>
            <p className="text-[10px] md:text-[11px] lg:text-[12px] font-light leading-relaxed max-w-xl text-white/90 tracking-tight">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Nuestra Trayectoria en Cifras */}
      <section className="bg-white py-24 px-8 md:px-16 lg:px-24">
        <div className="container mx-auto">
          <div className="space-y-4 mb-20">
            <span className="text-[#0054A6] text-[11px] font-bold tracking-tight uppercase">Resultados</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">Nuestra Trayectoria en Cifras</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl mt-6">
              Con más de tres décadas en el mercado, hemos consolidado una trayectoria de solidez, crecimiento y confianza. Nuestros números reflejan el compromiso con nuestros clientes, aliados y colaboradores, impulsando el bienestar en Venezuela.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            {/* Stat 1 */}
            <div className="lg:pr-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+32</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Años de servicio continuo y confianza.
              </p>
            </div>
            
            {/* Stat 2 */}
            <div className="lg:px-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+200k</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Clientes que han depositado su confianza en nosotros.
              </p>
            </div>
            
            {/* Stat 3 */}
            <div className="lg:px-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+100</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Clínicas afiliadas a nuestra red a nivel nacional.
              </p>
            </div>
            
            {/* Stat 4 */}
            <div className="lg:pl-12">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+200</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Empleados comprometidos con nuestra misión y valores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido adicional centrado */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Secciones futuras de la página nosotros */}
        </div>
      </div>
    </div>
  );
}
