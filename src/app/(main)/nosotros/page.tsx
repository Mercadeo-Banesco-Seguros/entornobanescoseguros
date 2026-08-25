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
import Image from 'next/image';
import { Plus, Network, PieChart, TrendingUp, MessageSquare, LayoutGrid, FolderKanban, Mail, Phone } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

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

const teamMembers = [
  {
    name: 'Ramon Gonzalez',
    role: 'Gerente General',
    imageId: 'team-ramon'
  },
  {
    name: 'Martha Gomez',
    role: 'Gerente Comercial',
    imageId: 'team-martha'
  },
  {
    name: 'Mallaury Martinez',
    role: 'Lider de Finanzas',
    imageId: 'team-mallaury'
  }
];

const corporateApps = [
  { name: 'Inteligencia Comercial', icon: Network, bgColor: 'bg-[#0054A6]', iconColor: 'text-white' },
  { name: 'Site Actuarial', icon: PieChart, bgColor: 'bg-slate-800', iconColor: 'text-white' },
  { name: 'Sistemática Comercial', icon: TrendingUp, bgColor: 'bg-[#003B73]', iconColor: 'text-white' },
  { name: 'Portal de Peticiones', icon: MessageSquare, bgColor: 'bg-black', iconColor: 'text-white' },
  { name: 'Site Operaciones', icon: LayoutGrid, bgColor: 'bg-sky-400', iconColor: 'text-white' },
  { name: 'Site de Proyectos', icon: FolderKanban, bgColor: 'bg-[#002D54]', iconColor: 'text-white' },
];

function Counter({ end, suffix = "", duration = 4000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <>{count}{suffix}</>;
}

function ComplianceGrid({ value, label, description, isPercentage = true }: { value: number, label: string, description: string, isPercentage?: boolean }) {
  const [animatedValue, setAnimatedValue] = React.useState(0);

  React.useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2500;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setAnimatedValue(progress * value);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value]);

  const animationProgress = value > 0 ? animatedValue / value : 0;
  
  const filledCount = Math.round(animationProgress * 100);
  
  return (
    <div className="flex flex-col gap-6 py-8">
      <div className="flex flex-row items-center gap-5">
        <span className="text-white text-6xl md:text-7xl font-bold tracking-tighter shrink-0">
          {Math.round(animatedValue)}{isPercentage ? '%' : ''}
        </span>
        <div className="pl-4 border-l-2 border-white/30 space-y-0.5">
          <h4 className="text-white text-[10px] md:text-[11px] font-light tracking-tighter uppercase">{label}</h4>
          <p className="text-white/70 text-[8px] md:text-[9px] font-light leading-snug max-w-[220px]">
            {description}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="grid grid-cols-20 gap-1 md:gap-1.5 w-fit">
          {[...Array(100)].map((_, i) => (
            <div 
              key={i} 
              className={cn(
                "w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-[2px] transition-colors duration-500",
                i < filledCount ? "bg-white" : "bg-white/10"
              )}
              style={{ transitionDelay: `${i * 10}ms` }}
            />
          ))}
        </div>
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

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Hero Section - Nuestra Visión 2026 */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 min-h-[500px] md:min-h-[600px] overflow-hidden flex items-center bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] bg-blue-400/20" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-sky-300/10" />
        </div>
        <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 text-white text-right">
          <div className="max-w-3xl space-y-6 ml-auto flex flex-col items-end">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight">
              Nuestra Visión Para El 2026
            </h1>
            <p className="text-[9px] md:text-[10px] lg:text-[11px] font-light leading-relaxed max-w-lg text-white/90 tracking-tight text-right">
              Convertirnos en una compañía con foco en el negocio masivo, con un modelo sostenible de crecimiento rentable. Desarrollando productos de bajo costo dirigidos a la población venezolana que actualmente no tiene acceso a seguros, pero cuenta con ingresos para invertir en su protección básica.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Nuestra Trayectoria en Cifras - Full Width Row */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white pt-24 pb-12 px-8 md:px-16 lg:px-24 border-b border-slate-50 overflow-hidden">
        <div className="w-full">
          <div className="space-y-4 mb-20 px-4">
            <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Resultados</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900">Nuestra Trayectoria En Cifras</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-3xl mt-6">
              Con más de tres décadas en el mercado, hemos consolidado una trayectoria de solidez, crecimiento y confianza. Nuestros números reflejan el compromiso con nuestros clientes, aliados y colaboradores, impulsando el bienestar en Venezuela.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 w-full border-t border-slate-100">
            <div className="py-12 px-8 border-b sm:border-b-0 xl:border-r border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors hover:bg-slate-50/50 group">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">
                +<Counter end={32} />
              </span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug max-w-[150px]">
                Años de servicio continuo y confianza.
              </p>
            </div>
            
            <div className="py-12 px-8 border-b sm:border-b-0 lg:border-r border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors hover:bg-slate-50/50">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">
                +<Counter end={200} suffix="k" />
              </span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug max-w-[150px]">
                Clientes que han depositado su confianza en nosotros.
              </p>
            </div>
            
            <div className="py-12 px-8 border-b md:border-b-0 xl:border-r border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors hover:bg-slate-50/50">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">
                +<Counter end={100} />
              </span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug max-w-[150px]">
                Clínicas afiliadas a nuestra red a nivel nacional.
              </p>
            </div>

            <div className="py-12 px-8 border-b md:border-b-0 lg:border-r border-slate-100 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors hover:bg-slate-50/50">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">
                +<Counter end={50} />
              </span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug max-w-[150px]">
                Talleres afiliados comprometidos con la excelencia.
              </p>
            </div>
            
            <div className="py-12 px-8 flex flex-col items-center sm:items-start text-center sm:text-left transition-colors hover:bg-slate-50/50">
              <span className="text-[#0054A6] text-4xl md:text-5xl font-bold tracking-tighter">
                +<Counter end={200} />
              </span>
              <p className="text-slate-500 text-[9px] md:text-[11px] font-light mt-4 leading-snug max-w-[150px]">
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
          backgroundImage: `linear-gradient(to bottom right, #1155cc, #1A61AB)`
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

      {/* 4. Sección: Nuestro fantástico equipo */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-24 px-8 md:px-16 lg:px-24">
        <div className="w-full flex flex-col md:flex-row gap-6">
          {/* Card Principal */}
          <div className="md:w-1/4 bg-[#003B73] rounded-[2.5rem] p-10 flex flex-col justify-between items-start min-h-[400px]">
            <div className="space-y-4">
              <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tighter leading-tight">
                Nuestro fantástico equipo
              </h2>
              <p className="text-white/80 text-[11px] font-light leading-relaxed max-w-[200px]">
                Estas personas trabajan para hacer nuestro producto el mejor.
              </p>
            </div>
            <button className="bg-white text-[#003B73] px-6 py-2.5 rounded-xl text-[11px] font-light hover:bg-slate-100 transition-colors">
              Ver todo el equipo
            </button>
          </div>

          {/* Cards de Miembros */}
          <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, idx) => {
              const placeholder = PlaceHolderImages.find(img => img.id === member.imageId);
              return (
                <div key={idx} className="flex flex-col gap-4 group bg-slate-50/50 rounded-[2.5rem] p-6 h-full transition-all duration-500 hover:bg-white border border-transparent hover:border-slate-100">
                  <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-slate-200">
                    {placeholder && (
                      <Image 
                        src={placeholder.imageUrl}
                        alt={member.name}
                        fill
                        className="object-cover"
                        data-ai-hint={placeholder.imageHint}
                      />
                    )}
                  </div>
                  <div className="flex flex-col flex-grow justify-between gap-4 mt-2">
                    <div className="space-y-1 px-2 overflow-hidden">
                      <h4 className="text-slate-900 text-[12px] sm:text-[13px] md:text-sm font-normal tracking-tighter leading-tight whitespace-nowrap">
                        {member.name}
                      </h4>
                      <p className="text-slate-500 text-[10px] md:text-[11px] font-light">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-2 pb-2">
                      <button className="text-slate-400 hover:text-[#0054A6] transition-colors p-2 rounded-lg bg-white shadow-sm border border-slate-100">
                        <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <button className="text-slate-400 hover:text-[#0054A6] transition-colors p-2 rounded-lg bg-white shadow-sm border border-slate-100">
                        <Phone className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                      <div className="ml-auto">
                        <button className="text-slate-300 hover:text-[#0054A6] transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Sección de Cumplimiento (Grids Visuales) - Full Width Azul */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-[#0054A6] py-20 px-8 md:px-16 lg:px-24 shadow-2xl">
        <div className="w-full">
          <div className="space-y-4 mb-12 px-4">
            <span className="text-white/60 text-[11px] font-light tracking-tight uppercase">Producción</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white">Cumplimiento De Metas</h2>
            <p className="text-white/80 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl mt-6">
              Visualiza tu avance en los indicadores clave de gestión. Cada bloque representa un paso más hacia el cumplimiento total.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 px-4 w-full">
            <ComplianceGrid 
              value={57} 
              label="Suscrito" 
              description="Representa el porcentaje de pólizas nuevas suscritas en el periodo actual." 
            />
            <ComplianceGrid 
              value={47} 
              label="Cobrado" 
              description="Indica el nivel de recaudación efectiva sobre las pólizas suscritas." 
            />
            <ComplianceGrid 
              value={13} 
              label="Ranking" 
              description="El ranking se calcula en función de las primas cobradas en el mercado."
              isPercentage={false}
            />
          </div>
        </div>
      </section>

      {/* 6. Sección: Nuestro Ecosistema Digital (Tienda de Apps) */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-32 px-8 md:px-16 lg:px-24 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Ecosistema</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-none">Nuestras Soluciones Digitales</h2>
            <p className="text-slate-500 text-[10px] md:text-[12px] font-light leading-relaxed max-w-2xl mx-auto mt-6">
              Accede a nuestro conjunto de herramientas diseñadas para potenciar tu productividad y facilitar la gestión estratégica en cada área de la organización.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-16 max-w-6xl mx-auto">
            {corporateApps.map((app, i) => (
              <div key={i} className="flex flex-col items-center gap-6 group cursor-pointer">
                <div className={cn(
                  "w-24 h-24 md:w-32 md:h-32 rounded-[2.2rem] flex items-center justify-center transition-all duration-500 border border-slate-100/50 group-hover:scale-105 group-hover:-translate-y-2",
                  app.bgColor
                )}>
                  <app.icon className={cn("w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110", app.iconColor)} strokeWidth={1} />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[9px] md:text-[11px] font-light text-slate-700 tracking-tighter leading-tight block max-w-[140px]">
                    {app.name}
                  </span>
                  <div className="w-1 h-1 bg-blue-500 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Espacio para contenido adicional */}
        </div>
      </div>
    </div>
  );
}
