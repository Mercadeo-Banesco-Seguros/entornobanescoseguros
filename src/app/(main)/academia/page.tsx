'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Loader2, Plus, ArrowRight } from 'lucide-react';

const academiaHeroStates = [
  {
    tag: "Cultura Institucional",
    title: "Identidad Banesco Seguros",
    imageId: "academia-hero-1",
  },
  {
    tag: "Valores Institucionales",
    title: "Compromiso con el Código de Ética",
    imageId: "academia-hero-2",
  },
  {
    tag: "Formación Comercial",
    title: "Conoce Nuestros Productos",
    imageId: "academia-hero-3",
  }
];

const CATEGORIES_CONFIG = [
  { 
    label: 'Finanzas y Seguros', 
    query: 'bancos seguros inversiones finanzas venezuela', 
    imageUrl: 'https://docs.google.com/drawings/d/e/2PACX-1vTxjoPqb80l0nbk1nJ9NcDh8j7VYcNKE4AjBso3D5j_LxC-TfeH-HnlCdtXwFtJREAu2oiX7KIiEU6J/pub?w=960&h=720' 
  },
  { 
    label: 'Tecnología Financiera', 
    query: 'fintech tecnologia bancaria ciberseguridad financiera', 
    imageUrl: 'https://docs.google.com/drawings/d/e/2PACX-1vR_IXWOoXk7W3pneAtVDb9AacyP6g7RdVymUbMXCql7nXrhqLUZcOdVj1HyDSpHat2i8_NmmcX9BCjD/pub?w=960&h=720' 
  }
];

const securityStates = [
  {
    title: "Consulta Nuestras Políticas de Seguridad",
    imageId: "security-policies",
    tag: "Seguridad de la Información"
  },
  {
    title: "Desarrolla con Seguridad",
    imageId: "security-dev",
    tag: "Cultura de Prevención"
  }
];

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  categoryLabel?: string;
  categoryImage?: string;
}

function Counter({ end, duration = 4000, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
  const [count, setCount] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(false);
  const containerRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isVisible) return;

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
  }, [end, duration, isVisible]);

  return <span ref={containerRef}>{prefix}{count}{suffix}</span>;
}

export default function AcademiaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [activeSecurityIndex, setActiveSecurityIndex] = React.useState(0);
  const [categorizedNews, setCategorizedNews] = React.useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = React.useState(true);
  const [interactiveTitle, setInteractiveTitle] = React.useState("Aprendizaje Interactivo");

  const fetchCategorizedNews = React.useCallback(async () => {
    const fetchByQuery = async (config: typeof CATEGORIES_CONFIG[0]) => {
      try {
        const query = encodeURIComponent(config.query);
        const feedUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${query}&hl=es-419&gl=US&ceid=US:es-419`);
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.status === 'ok' && data.items.length > 0) {
          return data.items.slice(0, 8).map((item: any) => ({
            ...item,
            categoryLabel: config.label,
            categoryImage: config.imageUrl
          }));
        }
      } catch (e) {
        console.error(`Error fetching news for ${config.label}:`, e);
      }
      return [];
    };

    const results = await Promise.all(CATEGORIES_CONFIG.map(config => fetchByQuery(config)));
    const flatResults = results.flat() as NewsItem[];
    return flatResults.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  }, []);

  const loadData = React.useCallback(async () => {
    setLoadingNews(true);
    try {
      const allNews = await fetchCategorizedNews();
      setCategorizedNews(allNews);
    } catch (error) {
      console.error('Error loading news data:', error);
    } finally {
      setLoadingNews(false);
    }
  }, [fetchCategorizedNews]);

  React.useEffect(() => {
    setMounted(true);
    loadData();
    
    const heroTimer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % academiaHeroStates.length);
    }, 10000);

    const textTimer = setTimeout(() => {
      setInteractiveTitle("Academia Banesco Seguros");
    }, 10000);

    const securityTimer = setInterval(() => {
      setActiveSecurityIndex((prev) => (prev + 1) % securityStates.length);
    }, 6000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(securityTimer);
      clearTimeout(textTimer);
    };
  }, [loadData]);

  const currentState = academiaHeroStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);

  if (!mounted) return null;

  const displayNews = categorizedNews.slice(0, 3);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Dynamic Hero Section */}
      <section className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-32 h-[528px] overflow-hidden flex flex-col items-center justify-start transition-colors duration-700 bg-gradient-to-br from-[#0054A6] via-[#003B73] to-[#002D54] shadow-2xl">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full blur-[150px] bg-blue-400/20 -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[800px] h-[800px] rounded-full blur-[150px] bg-white/10 translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
          <div 
            key={`text-${currentStateIndex}`}
            className="w-full md:w-1/2 pl-16 md:pl-32 space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[10px] text-white font-light tracking-tight">
                {currentState.tag}
              </span>
            </div>
            <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter leading-tight max-w-md drop-shadow-md">
              {currentState.title}
            </h2>
            <div className="flex gap-4">
              <button className="px-10 py-3 rounded-xl bg-white text-[#0054A6] text-[10px] font-light hover:bg-white/90 transition-colors">
                Más Información
              </button>
            </div>
          </div>

          <div className="hidden md:flex w-1/2 h-full items-end justify-end">
            <div 
              key={`image-${currentStateIndex}`}
              className="relative transition-all duration-1000 ease-in-out w-[800px] h-[700px] translate-y-10"
            >
              {heroImage && (
                <Image 
                  src={heroImage.imageUrl}
                  alt={currentState.title}
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom"
                  data-ai-hint={heroImage.imageHint}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Aprendizaje Interactivo Section */}
      <section id="aprendizaje-interactivo" className="relative w-screen left-1/2 -ml-[50vw] h-[600px] overflow-hidden flex items-center justify-center">
        {/* Soft Blurred Background Blobs */}
        <div className="absolute inset-0 bg-white">
          <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] rounded-full bg-cyan-100/60 blur-[120px] animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[60%] h-[70%] rounded-full bg-yellow-100/60 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-[20%] right-[15%] w-[40%] h-[50%] rounded-full bg-blue-50/40 blur-[100px]" />
        </div>

        <div className="relative z-10 text-center space-y-8 px-6 max-w-4xl mx-auto">
          <h2 key={interactiveTitle} className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter text-slate-800 animate-in fade-in duration-1000">
            {interactiveTitle}
          </h2>
          <div className="flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-500">
            <button className="px-12 py-3 rounded-full bg-white/40 backdrop-blur-md border border-slate-200 text-slate-600 text-[11px] font-light tracking-wide hover:bg-white/60 transition-all duration-300">
              Próximamente
            </button>
          </div>
        </div>
      </section>

      {/* 3. Impacto de la Formación Corporativa */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-gradient-to-br from-[#004285] via-[#0054A6] to-[#0061C1] py-20 px-8 md:px-16 lg:px-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col space-y-4 mb-20 max-w-2xl text-left">
            <span className="text-white/60 text-[11px] font-light tracking-normal">Estadísticas Clave</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95]">
              El Impacto de la <br /> Formación Corporativa
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16">
            {[
              { value: 250, suffix: "%", label: "Crecimiento Proyectado", desc: "Incremento estimado del e-learning corporativo para el cierre del ciclo 2026." },
              { value: 92, suffix: "%", label: "Satisfacción Interna", desc: "Porcentaje de colaboradores que valoran positivamente los planes de carrera." },
              { value: 90, suffix: "%", label: "Adopción Digital", desc: "Empresas líderes que utilizan formación online como eje de capacitación." },
              { value: 218, suffix: "%", label: "Rendimiento Operativo", desc: "Aumento de ingresos por empleado en organizaciones con formación integral." }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col space-y-6 border-l border-white/10 pl-8 group">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold tracking-tighter">
                    <Counter end={stat.value} suffix={stat.suffix} duration={4000} />
                  </span>
                </div>
                <div className="space-y-3">
                   <h4 className="text-[12px] font-medium tracking-tight text-white/90">{stat.label}</h4>
                   <p className="text-[10px] font-light text-white/60 leading-relaxed max-w-[200px]">
                      {stat.desc}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Sección Interactiva de Seguridad */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-slate-50 py-24 overflow-hidden border-y border-slate-100">
        <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              key={`sec-text-${activeSecurityIndex}`}
              className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0054A6]/10 border border-[#0054A6]/20">
                <span className="text-[#0054A6] text-[10px] font-light tracking-tight uppercase">
                  {securityStates[activeSecurityIndex].tag}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-tight max-md">
                {securityStates[activeSecurityIndex].title}
              </h2>
              <p className="text-slate-500 text-[10px] md:text-[11px] font-light leading-relaxed max-sm tracking-tight">
                Garantizar la integridad de nuestra infraestructura y el cumplimiento de los estándares normativos es fundamental para nuestra excelencia operativa.
              </p>
              <button className="px-10 py-2.5 rounded-full bg-[#0054A6] text-white text-[11px] font-light tracking-wide hover:bg-[#0054A6]/90 transition-all duration-300 shadow-sm">
                Próximamente
              </button>
            </div>

            <div 
              key={`sec-image-${activeSecurityIndex}`}
              className="relative aspect-video md:aspect-square w-full max-w-[500px] justify-self-center md:justify-self-end animate-in fade-in zoom-in-95 duration-1000"
            >
              {(() => {
                const img = PlaceHolderImages.find(i => i.id === securityStates[activeSecurityIndex].imageId);
                return img ? (
                  <Image 
                    src={img.imageUrl}
                    alt={securityStates[activeSecurityIndex].title}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                    data-ai-hint={img.imageHint}
                  />
                ) : (
                  <div className="w-full h-full bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-light italic">
                    Cargando recurso de seguridad...
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Noticias y Novedades */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-[#001A3D] py-16 px-8 md:px-16 lg:px-24 text-white overflow-hidden">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Background Atmospheric Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[100px] translate-y-1/4 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header de la sección */}
          <div className="flex flex-col space-y-2 mb-10 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter text-white/90 leading-tight">
              Noticias y Novedades <br />
              <span className="text-blue-400/80">te mantenemos al día</span>
            </h2>
          </div>

          {loadingNews ? (
            <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-white/40 animate-spin" />
              <p className="text-white/40 font-light text-xs">Sincronizando actualidad...</p>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {displayNews.map((post, idx) => (
                  <a 
                    key={idx} 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener" 
                    className="group block"
                  >
                    <div className="bg-white rounded-[2rem] overflow-hidden flex flex-col h-full shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2">
                      {/* Text Content Area */}
                      <div className="p-8 lg:p-10 flex flex-col gap-5 flex-grow relative">
                        <div className="space-y-3">
                          <span className="text-[9px] font-light text-blue-500/80 block">
                            {post.categoryLabel || 'Corporativo'}
                          </span>
                          <h3 className="text-[13px] font-light text-slate-800 leading-snug group-hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                        </div>
                        
                        {/* Plus Button Icon - Moved further up and right */}
                        <div className="absolute top-5 right-5">
                          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:rotate-90">
                            <Plus className="w-4 h-4" />
                          </div>
                        </div>
                      </div>

                      {/* Image Area at Bottom */}
                      <div className="relative h-44 lg:h-48 w-full overflow-hidden">
                        <Image 
                          src={post.categoryImage || `https://picsum.photos/seed/${post.guid}/800/600`}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                        {/* Soft overlay on image */}
                        <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
