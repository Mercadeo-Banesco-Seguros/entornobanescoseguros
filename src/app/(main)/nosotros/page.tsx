
'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const historyItems = [
  {
    id: '01',
    year: '1993',
    title: 'Fundación y Establecimiento',
    description: 'La compañía obtuvo la autorización para constituirse y realizó su Registro Mercantil, iniciando formalmente sus operaciones como parte del naciente grupo financiero Banesco.'
  },
  {
    id: '02',
    year: '1994-1999',
    title: 'Construcción de la Cartera Inicial',
    description: 'Durante la última mitad de la década, la compañía se enfocó en establecer sus productos básicos (como seguros de automóviles, vida y patrimoniales) y en construir una red de clientes y de comercialización sólida.'
  },
  {
    id: '03',
    year: '2004-2006',
    title: 'Aceleración del Crecimiento',
    description: 'Banesco Seguros ingresó a una fase de crecimiento acelerado, reportando aumentos de primas muy superiores a los del promedio del sector, lo que marcó su ascenso en el mercado.'
  },
  {
    id: '04',
    year: '2012-2016',
    title: 'Expansión Masiva',
    description: 'Consolidación del modelo de negocio masivo, llevando protección básica a una mayor parte de la población venezolana a través de nuevos canales.'
  },
  {
    id: '05',
    year: '2020-Actualidad',
    title: 'Innovación y Transformación',
    description: 'Adaptación a las nuevas realidades digitales y fortalecimiento de la sostenibilidad operativa para los desafíos del futuro.'
  }
];

export default function NosotrosPage() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Hero Section - Nuestra Visión 2026 */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/20" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-sky-300/10" />
        </div>
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              Nuestra Visión Para El 2026
            </h1>
            <p className="text-[14px] md:text-[16px] lg:text-[18px] font-light leading-relaxed max-w-xl text-white/90 tracking-tight">
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
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">Nuestra Trayectoria En Cifras</h2>
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

      {/* 3. Historia - Un Viaje a Través del Tiempo */}
      <section className="relative w-screen left-1/2 -ml-[50vw] py-16 bg-gradient-to-br from-sky-400 via-blue-400 to-blue-500 text-white overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-white/20" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-sky-200/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24">
          <div className="text-center space-y-4 mb-12">
            <span className="text-white/70 text-[10px] font-light tracking-widest uppercase">Historia De Banesco Seguros</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tighter leading-none">
              Un Viaje A Través Del Tiempo
            </h2>
            <p className="text-white/70 text-[10px] md:text-[12px] font-light leading-relaxed max-w-3xl mx-auto tracking-tight">
              Desde nuestra fundación hasta hoy, hemos evolucionado para adaptarnos a los nuevos tiempos, manteniendo siempre nuestro compromiso con la excelencia y la innovación.
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {historyItems.map((item, index) => (
                <CarouselItem key={item.id} className="pl-0 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="relative flex flex-col gap-6 h-full py-4 px-8 border-l border-white/20 group">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl md:text-5xl font-black text-white/30 tracking-tighter leading-none transition-colors group-hover:text-white/40">
                        {item.id}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-white/20 text-[8px] font-bold tracking-widest border border-white/10 uppercase">
                        {item.year}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg md:text-xl font-bold tracking-tighter leading-tight max-w-[180px]">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-[10px] md:text-[11px] font-light leading-relaxed tracking-tight max-w-[280px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-12 gap-4">
              <CarouselPrevious className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/20 hover:text-white w-10 h-10" />
              <CarouselNext className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/20 hover:text-white w-10 h-10" />
            </div>
          </Carousel>
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
