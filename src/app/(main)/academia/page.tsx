'use client';

import * as React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { BookOpen, GraduationCap, Award, Search, Share2, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const academiaHeroStates = [
  {
    tag: "Cultura Institucional",
    title: "Sangre Azul Banesco Seguros",
    imageId: "academia-hero-1",
  },
  {
    tag: "Valores Institucionales",
    title: "Comprometidos con el código de ética",
    imageId: "academia-hero-2",
  },
  {
    tag: "Formación Comercial",
    title: "Conoce Nuestros Productos",
    imageId: "academia-hero-3",
  }
];

const categories = [
  { id: 'cultura', label: 'Cultura Corporativa', icon: Award },
  { id: 'productos', label: 'Nuestros Productos', icon: BookOpen },
  { id: 'ventas', label: 'Técnicas de Venta', icon: Search },
  { id: 'liderazgo', label: 'Liderazgo', icon: GraduationCap },
];

export default function AcademiaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [currentStateIndex, setCurrentStateIndex] = React.useState(0);

  React.useEffect(() => {
    setMounted(true);
    
    const timer = setInterval(() => {
      setCurrentStateIndex((prev) => (prev + 1) % academiaHeroStates.length);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const currentState = academiaHeroStates[currentStateIndex];
  const heroImage = PlaceHolderImages.find(img => img.id === currentState.imageId);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* 1. Dynamic Hero Section - Exact Layout from Bienestar */}
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
              className={cn(
                "relative transition-all duration-1000 ease-in-out",
                currentStateIndex === 0 
                  ? "w-[650px] h-[550px] translate-y-4 scale-100" 
                  : "w-[800px] h-[700px] translate-y-10"
              )}
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

      {/* 2. Categorías de Aprendizaje */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-white py-20 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-[#0054A6] text-[11px] font-light tracking-tight uppercase">Explorar</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-slate-900 leading-none">Categorías de Aprendizaje</h2>
              <p className="text-slate-500 text-[11px] font-light leading-relaxed max-w-xl mt-4">
                Domina cada área de nuestra organización con contenido especializado y herramientas de vanguardia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="group p-8 rounded-[2.5rem] bg-slate-50 hover:bg-[#0054A6] transition-all duration-500 cursor-pointer border border-slate-100 hover:border-transparent">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:bg-white/10 group-hover:shadow-none transition-colors">
                  <cat.icon className="w-6 h-6 text-[#0054A6] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-white transition-colors mb-2">{cat.label}</h3>
                <p className="text-[10px] font-light text-slate-400 group-hover:text-white/60 transition-colors leading-relaxed">
                  Accede a materiales exclusivos y certificaciones oficiales.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Programas Especializados */}
      <section className="relative w-screen left-1/2 -ml-[50vw] bg-slate-50 py-24 px-8 md:px-16 lg:px-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-16 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/50 w-fit backdrop-blur-sm border border-slate-300/30">
                <Share2 className="w-3 h-3 text-slate-600" />
                <span className="text-[10px] font-light text-slate-600">Academia Banesco Seguros</span>
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-[0.9] text-slate-900">
                Programas <br /> <span className="text-[#0054A6]">Especializados</span>
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
              { id: '01', title: 'Gestión de Riesgos', subtitle: 'Nivel Avanzado', img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&h=400' },
              { id: '02', title: 'Estrategia Comercial', subtitle: 'Liderazgo de Ventas', img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&h=400' },
              { id: '03', title: 'Atención al Cliente', subtitle: 'Excelencia en Servicio', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&h=400' },
            ].map((course) => (
              <div key={course.id} className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500">
                <Image src={course.img} alt={course.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                   <span className="text-[8px] font-light text-white/60 uppercase tracking-widest mb-1">{course.subtitle}</span>
                   <h3 className="text-xl font-bold text-white tracking-tight">{course.title}</h3>
                   <div className="mt-4 flex items-center gap-2 text-white text-[9px] font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <PlayCircle className="w-4 h-4" />
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
