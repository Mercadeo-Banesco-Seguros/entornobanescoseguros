'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { PlayCircle, Share2, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const academiaHeroStates = [
  {
    tag: "Cultura Institucional",
    title: "Sangre Azul Banesco Seguros",
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

interface NewsItem {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
}

function Counter({ end, duration = 5000, suffix = "", prefix = "" }: { end: number, duration?: number, suffix?: string, prefix?: string }) {
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

  return <>{prefix}{count}{suffix}</>;
}

function ConcentricArcs() {
  return (
    <div className="absolute right-[-10%] top-[-20%] w-[120%] h-[140%] pointer-events-none opacity-20 hidden lg:block overflow-hidden">
      <svg viewBox="0 0 1000 1000" className="w-full h-full text-white fill-none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="800" cy="400" r="150" strokeDasharray="4 4" />
        <circle cx="800" cy="400" r="250" />
        <circle cx="800" cy="400" r="350" strokeWidth="0.5" opacity="0.5" />
        <circle cx="800" cy="400" r="450" />
        <circle cx="800" cy="400" r="550" strokeDasharray="8 8" opacity="0.3" />
      </svg>
    </div>
  );
}

export default function AcademiaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);
  const [news, setNews] = React.useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = React.useState(true);

  const fetchNews = React.useCallback(async () => {
    setLoadingNews(true);
    try {
      const feedUrl = encodeURIComponent('https://news.google.com/rss?hl=es-419&gl=US&ceid=US:es-419');
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${feedUrl}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.status === 'ok') {
        setNews(data.items);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  }, []);

  React.useEffect(() => {
    setMounted(true);
    fetchNews();
    
    const heroTimer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % academiaHeroStates.length);
    }, 10000);

    return () => clearInterval(heroTimer);
  }, [fetchNews]);

  const currentState = academiaHeroStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);

  if (!mounted) return null;

  // Distribución de noticias
  const featuredPost = news[0];
  const latestPosts = news.slice(1, 5);
  const bottomPosts = news.slice(5, 8);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

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
                Comenzar Formación
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

      {/* 2. Categorías de Aprendizaje - Innovación y Temas Futuros */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-32 px-8 md:px-16 lg:px-24 overflow-hidden border-b border-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-20">
          <div className="w-full lg:w-[22%] space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tighter text-slate-900 leading-tight">IA Generativa</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed tracking-tighter">
                La adopción de IA en procesos diarios incrementa la <span className="bg-blue-50 px-1 font-light text-slate-900">productividad operativa en un 40%</span>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tighter text-slate-900 leading-tight">Agilidad Corporativa</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed tracking-tighter">
                Implementar marcos de trabajo ágiles permite una <span className="bg-blue-50 px-1 font-light text-slate-900">respuesta al mercado 2x más rápida</span>.
              </p>
            </div>
          </div>

          <div className="relative w-full lg:w-[45%] aspect-square flex items-center justify-center order-1 lg:order-2">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-slate-200">
              {Array.from({ length: 120 }).map((_, i) => (
                <line
                  key={i}
                  x1="50"
                  y1="2"
                  x2="50"
                  y2="12"
                  stroke="currentColor"
                  strokeWidth="0.4"
                  transform={`rotate(${(i * 360) / 120} 50 50)`}
                />
              ))}
            </svg>
            <div className="relative z-10 text-center px-6 md:px-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tighter text-slate-900 leading-[1.1] max-w-[280px] mx-auto">
                Aprender para Innovar
              </h2>
            </div>
          </div>

          <div className="w-full lg:w-[22%] space-y-12 order-3">
             <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tighter text-slate-900 leading-tight">Micro-learning</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed tracking-tighter">
                El consumo de contenidos breves y específicos mejora la <span className="bg-blue-50 px-1 font-light text-slate-900">retención de conocimientos en un 80%</span>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-light tracking-tighter text-slate-900 leading-tight">Habilidades Blandas</h3>
              <p className="text-slate-500 text-[13px] font-light leading-relaxed tracking-tighter">
                El desarrollo de empatía y comunicación es el <span className="bg-blue-50 px-1 font-light text-slate-900">diferenciador clave</span> en la era digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2b. Impacto de la Formación Corporativa */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-gradient-to-br from-[#004285] via-[#0054A6] to-[#0061C1] py-20 px-8 md:px-16 lg:px-24 text-white overflow-hidden">
        <ConcentricArcs />

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
                <span className="text-5xl font-bold tracking-tighter">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
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

      {/* 2c. Noticias e Insights */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-32 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {loadingNews ? (
            <div className="w-full flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-[#0054A6] animate-spin" />
              <p className="text-slate-400 font-light text-xs">Cargando noticias institucionales...</p>
            </div>
          ) : (
            <>
              {/* Top Row: Featured + Side List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Featured Post */}
                {featuredPost && (
                  <a href={featuredPost.link} target="_blank" rel="noopener" className="lg:col-span-2 group cursor-pointer block">
                    <div className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden bg-slate-100 mb-8">
                      <Image 
                        src={featuredPost.thumbnail || PlaceHolderImages.find(img => img.id === 'news-featured')?.imageUrl || "https://picsum.photos/seed/news/1200/800"}
                        alt={featuredPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 mb-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                          <span className="text-[9px] text-white font-light tracking-tight">Destacado</span>
                        </div>
                        <h3 className="text-white text-2xl md:text-3xl font-bold tracking-tighter leading-tight max-w-2xl">
                          {featuredPost.title}
                        </h3>
                        <p className="text-white/60 text-[10px] font-light mt-4">
                          {formatDate(featuredPost.pubDate)} • {featuredPost.author || 'Actualidad'}
                        </p>
                      </div>
                    </div>
                  </a>
                )}

                {/* Side List: Latest Posts */}
                <div className="space-y-8">
                  <div className="flex justify-between items-end">
                    <h3 className="text-lg font-bold tracking-tight text-slate-900 leading-none">Últimas Publicaciones</h3>
                    <button className="text-[10px] text-slate-400 font-light hover:text-slate-600 transition-colors">Ver todas</button>
                  </div>
                  <div className="space-y-6">
                    {latestPosts.map((post, idx) => (
                      <a key={idx} href={post.link} target="_blank" rel="noopener" className="flex gap-4 group cursor-pointer border-b border-slate-50 pb-4 last:border-0">
                        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 shrink-0">
                          <Image 
                            src={post.thumbnail || PlaceHolderImages.find(img => img.id === `news-${idx + 1}`)?.imageUrl || `https://picsum.photos/seed/side-${idx}/300/300`}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            unoptimized
                          />
                        </div>
                        <div className="flex flex-col justify-center space-y-1">
                          <h4 className="text-[12px] font-medium text-slate-800 leading-tight group-hover:text-[#0054A6] transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-[9px] text-slate-400 font-light">
                            {formatDate(post.pubDate)}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Row: Noticias de Interés Grid */}
              <div className="space-y-12">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold tracking-tighter text-slate-900">Noticias de Interés</h3>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {bottomPosts.map((post, idx) => (
                    <a key={idx} href={post.link} target="_blank" rel="noopener" className="group space-y-6 cursor-pointer block">
                      <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden bg-slate-100">
                        <Image 
                          src={post.thumbnail || PlaceHolderImages.find(img => img.id === `news-bottom-${idx + 1}`)?.imageUrl || `https://picsum.photos/seed/grid-${idx}/800/500`}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <div className="space-y-3 px-2">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-[#0054A6]" />
                           <span className="text-[10px] text-slate-400 font-light tracking-tight">{post.author || 'Gestión'}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-800 tracking-tight leading-tight group-hover:text-[#0054A6] transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 font-light leading-relaxed line-clamp-2">
                          {post.description?.replace(/<[^>]*>?/gm, '') || 'Accede a la nota completa para conocer todos los detalles de esta actualización informativa.'}
                        </p>
                        <p className="text-[9px] text-slate-400 font-light pt-2">
                          {formatDate(post.pubDate)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. Visita Nuestra Academia Banesco Seguros */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-slate-50 py-24 px-8 md:px-16 lg:px-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 w-fit backdrop-blur-sm border border-slate-300/30">
                <Share2 className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-light text-slate-600">Academia Banesco Seguros</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.9] text-slate-900">
                Visita Nuestra <br /> <span className="text-[#0054A6]">Academia Banesco Seguros</span>
              </h2>
            </div>
            <div className="max-w-md space-y-6 text-right">
              <p className="text-[10px] font-light leading-relaxed text-slate-500">
                Nuestros cursos están diseñados para potenciar tu carrera profesional con conceptos claros y aplicables al entorno actual.
              </p>
              <Button className="bg-[#0054A6] hover:bg-[#0054A6]/90 text-white rounded-xl px-10 h-11 text-[10px] font-light">
                Ver Todo el Catálogo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { id: '01', title: 'Gestión de Riesgos', subtitle: 'Nivel Avanzado', bg: 'bg-[#0054A6]' },
              { id: '02', title: 'Estrategia Comercial', subtitle: 'Liderazgo de Ventas', bg: 'bg-[#003B73]' },
              { id: '03', title: 'Atención al Cliente', subtitle: 'Excelencia en Servicio', bg: 'bg-[#002D54]' },
            ].map((course) => (
              <div key={course.id} className={cn(
                "group relative aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-sm",
                course.bg
              )}>
                <div className="absolute inset-0 p-10 flex flex-col justify-end">
                   <span className="text-[9px] font-light text-white/60 uppercase tracking-tight mb-2">{course.subtitle}</span>
                   <h3 className="text-2xl font-bold text-white tracking-tighter leading-none">{course.title}</h3>
                   <div className="mt-6 flex items-center gap-2 text-white text-[10px] font-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <PlayCircle className="w-4 h-4" />
                      </div>
                      Continuar Aprendiendo
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
