'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
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
    year: '2007',
    title: 'Consolidación en el Top 10',
    description: 'Gracias a su crecimiento sostenido, la compañía se afianzó de manera constante entre las 10 principales aseguradoras de Venezuela por el volumen de primas cobradas.'
  },
  {
    id: '05',
    year: '2008',
    title: 'Expansión Regional a Panamá',
    description: 'Siguiendo la estrategia de internacionalización del grupo, se estableció Banesco Seguros en Panamá, siendo su primer paso para diversificar sus mercados fuera de Venezuela.'
  },
  {
    id: '06',
    year: '2009',
    title: 'Posicionamiento Histórico',
    description: 'La empresa alcanzó una posición de liderazgo importante, ubicándose como la sexta aseguradora más grande del mercado venezolano.'
  },
  {
    id: '07',
    year: '2013',
    title: 'Expansión a República Dominicana',
    description: 'La compañía continuó su crecimiento internacional con el inicio de operaciones en República Dominicana, ampliando su alcance en el Caribe.'
  },
  {
    id: '08',
    year: '2014',
    title: 'Lanzamiento de Servicios Digitales',
    description: 'Se implementaron plataformas como Banesco Seguros Online, permitiendo a los clientes realizar autogestión de trámites, consultas y reportes de siniestros de manera más eficiente.'
  },
  {
    id: '09',
    year: '2020-Presente',
    title: 'Enfoque en Optimización Tecnológica',
    description: 'Se ha puesto énfasis en la modernización de la infraestructura tecnológica, la automatización de procesos internos y la búsqueda de eficiencias operativas para mejorar la atención y reducir costos.'
  },
  {
    id: '10',
    year: '2020-Presente',
    title: 'Adaptación a Nuevas Tendencias',
    description: 'La compañía ha trabajado en ajustar y desarrollar su oferta de productos para cubrir nuevos riesgos asociados al contexto actual, como la necesidad de mayor cobertura de salud y ciberseguridad.'
  }
];

function ComplianceGrid({ percentage, label, description }: { percentage: number, label: string, description: string }) {
  const filledCount = Math.min(100, Math.max(0, Math.round(percentage)));
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
      <div className="space-y-4">
        <span className="text-[#0054A6] text-7xl md:text-8xl font-bold tracking-tighter">
          {filledCount}%
        </span>
        <div className="pl-1 border-l-2 border-[#0054A6] space-y-1">
          <h4 className="text-slate-900 text-lg font-bold tracking-tight">{label}</h4>
          <p className="text-slate-500 text-[10px] md:text-[11px] font-light leading-snug max-w-[200px]">
            {description}
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-10 gap-1.5 w-fit">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-3.5 h-3.5 md:w-5 md:h-5 rounded-[4px] transition-colors duration-1000",
                i < filledCount ? "bg-[#0054A6]" : "bg-slate-100"
              )}
            />
          ))}
        </div>
        <p className="text-slate-400 text-[9px] font-light flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#0054A6]" />
          1 cuadrado = 1% de cumplimiento de meta
        </p>
      </div>
    </div>
  );
}

export default function NosotrosPage() {
  const { currentUser } = useAuth();
  const [api, setApi] = React.useState<CarouselApi>();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onScroll = () => {
      setProgress(api.scrollSnapList().length > 0 ? api.scrollProgress() : 0);
    };

    api.on('scroll', onScroll);
    onScroll();

    return () => {
      api.off('scroll', onScroll);
    };
  }, [api]);

  // Usando los valores específicos solicitados: Suscrito 57% y Cobrado 47%
  const susProgress = 57;
  const cobProgress = 47;

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
            <p className="text-[9px] md:text-[10px] lg:text-[11px] font-light leading-relaxed max-w-xl text-white/90 tracking-tight">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Nuestra Trayectoria en Cifras */}
      <section className="bg-white pt-24 pb-12 px-8 md:px-16 lg:px-24 border-b border-slate-50">
        <div className="container mx-auto">
          <div className="space-y-4 mb-20">
            <span className="text-[#0054A6] text-[11px] font-bold tracking-tight uppercase">Resultados</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">Nuestra Trayectoria En Cifras</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl mt-6">
              Con más de tres décadas en el mercado, hemos consolidado una trayectoria de solidez, crecimiento y confianza. Nuestros números reflejan el compromiso con nuestros clientes, aliados y colaboradores, impulsando el bienestar en Venezuela.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0">
            <div className="lg:pr-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+32</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Años de servicio continuo y confianza.
              </p>
            </div>
            
            <div className="lg:px-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+200k</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Clientes que han depositado su confianza en nosotros.
              </p>
            </div>
            
            <div className="lg:px-12 lg:border-r border-slate-200">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">+100</span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug">
                Clínicas afiliadas a nuestra red a nivel nacional.
              </p>
            </div>
            
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
      <section 
        className="relative w-screen left-1/2 -ml-[50vw] py-10 transition-colors duration-700 ease-out text-white overflow-hidden"
        style={{
          backgroundColor: `rgb(${Math.round(17 + (26 - 17) * progress)}, ${Math.round(85 + (97 - 85) * progress)}, ${Math.round(204 + (171 - 204) * progress)})`,
          backgroundImage: `linear-gradient(to bottom right, rgba(17, 85, 204, ${1 - progress}), rgba(26, 97, 171, ${progress}))`
        }}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[150px] bg-white/20" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] bg-sky-200/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24">
          <div className="text-center space-y-2 mb-8">
            <span className="text-white/70 text-[9px] font-light tracking-widest uppercase">Historia De Banesco Seguros</span>
            <h2 className="text-xl md:text-3xl font-light tracking-tighter leading-none">
              Un Viaje A Través Del Tiempo
            </h2>
            <p className="text-white/70 text-[9px] md:text-[11px] font-light leading-relaxed max-w-2xl mx-auto tracking-tight">
              Desde nuestra fundación hasta hoy, hemos evolucionado para adaptarnos a los nuevos tiempos, manteniendo siempre nuestro compromiso con la excelencia y la innovación.
            </p>
          </div>

          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: false,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {historyItems.map((item) => (
                <CarouselItem key={item.id} className="pl-0 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="relative flex flex-col gap-4 h-full py-4 px-6 border-l border-white/20 group">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl md:text-4xl font-black text-white/30 tracking-tighter leading-none transition-colors group-hover:text-white/40">
                        {item.id}
                      </span>
                      <div className="px-3 py-1 rounded-full bg-white/20 text-[8px] font-light border border-white/10 uppercase tracking-normal">
                        {item.year}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-base md:text-lg font-bold tracking-tighter leading-tight max-w-[220px]">
                        {item.title}
                      </h3>
                      <p className="text-white/70 text-[9px] md:text-[10px] font-light leading-relaxed tracking-tight max-w-[280px]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex justify-center mt-8 gap-4">
              <CarouselPrevious className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/20 hover:text-white w-8 h-8" />
              <CarouselNext className="static translate-y-0 bg-transparent border-white/30 text-white hover:bg-white/20 hover:text-white w-8 h-8" />
            </div>
          </Carousel>
        </div>
      </section>

      {/* 4. Sección de Cumplimiento (Grids Visuales) - AHORA DEBAJO DE HISTORIA */}
      <section className="bg-white py-12 px-8 md:px-16 lg:px-24">
        <div className="container mx-auto">
          <div className="space-y-4 mb-8">
            <span className="text-[#0054A6] text-[11px] font-bold tracking-tight uppercase">Producción</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-slate-900">Cumplimiento De Metas</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl">
              Visualiza tu avance en los indicadores clave del circuito. Cada bloque representa un paso más hacia la meta final.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <ComplianceGrid 
              percentage={susProgress} 
              label="Suscrito" 
              description="Representa el porcentaje de pólizas nuevas suscritas en el periodo actual." 
            />
            <ComplianceGrid 
              percentage={cobProgress} 
              label="Cobrado" 
              description="Indica el nivel de recaudación efectiva sobre las pólizas suscritas." 
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Secciones futuras */}
        </div>
      </div>
    </div>
  );
}
