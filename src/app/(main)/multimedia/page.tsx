'use client';

import * as React from 'react';
import { 
  LayoutGrid, 
  Star, 
  Layout, 
  FileText, 
  Code, 
  BookOpen, 
  Music, 
  Monitor, 
  Video, 
  Image as ImageIcon,
  Search,
  Mail,
  Download,
  ChevronRight,
  Folder,
  BadgeCheck,
  Coins,
  ShoppingBag,
  Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const sidebarCategories = [
  { id: 'todos', label: 'Todos', icon: LayoutGrid, active: true },
  { id: 'destacados', label: 'Destacados', icon: Star },
  { id: 'aplicaciones', label: 'Aplicaciones', icon: Layout },
  { id: 'documentos', label: 'Documentos', icon: FileText },
  { id: 'herramientas', label: 'Herramientas', icon: Code },
  { id: 'manuales', label: 'Manuales', icon: BookOpen },
  { id: 'musica', label: 'Música', icon: Music },
  { id: 'presentaciones', label: 'Presentaciones', icon: Monitor },
  { id: 'videos', label: 'Videos', icon: Video },
  { id: 'visuales', label: 'Visuales', icon: ImageIcon },
];

const topFilters = [
  { id: 'todos', label: 'Todos', active: true },
  { id: 'automovil', label: 'Automóvil' },
  { id: 'personas', label: 'Personas' },
  { id: 'patrimoniales', label: 'Patrimoniales' },
  { id: 'salud', label: 'Salud' },
];

const multimediaCards = [
  { 
    id: 'corp', 
    title: 'Corporativo', 
    tag: 'Generales', 
    icon: Folder, 
    color: 'text-blue-500', 
    tagColor: 'bg-blue-600',
    imageId: 'multimedia-corp'
  },
  { 
    id: 'prod', 
    title: 'Productos', 
    tag: 'Información', 
    icon: Search, 
    color: 'text-slate-700', 
    tagColor: 'bg-sky-500',
    imageId: 'multimedia-prod'
  },
  { 
    id: 'brand', 
    title: 'Marca', 
    tag: 'Identidad', 
    icon: BadgeCheck, 
    color: 'text-blue-400', 
    tagColor: 'bg-cyan-500',
    imageId: 'multimedia-brand'
  },
  { 
    id: 'finance', 
    title: 'Finanzas', 
    tag: 'Reportes', 
    icon: Coins, 
    color: 'text-green-500', 
    tagColor: 'bg-blue-600',
    imageId: 'multimedia-finance'
  },
  { 
    id: 'sales', 
    title: 'Comercial', 
    tag: 'Intermediación', 
    icon: ShoppingBag, 
    color: 'text-purple-400', 
    tagColor: 'bg-blue-500',
    imageId: 'multimedia-sales'
  },
  { 
    id: 'dev', 
    title: 'Desarrollo', 
    tag: 'Crecimiento', 
    icon: Plus, 
    color: 'text-blue-600', 
    tagColor: 'bg-indigo-600',
    imageId: 'multimedia-dev'
  },
];

export default function MultimediaPage() {
  const [mounted, setMounted] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState('todos');
  const [activeFilter, setActiveFilter] = React.useState('todos');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col w-full min-h-screen animate-in fade-in duration-700">
      <div className="flex w-full gap-12 pt-4 pb-10">
        
        {/* 1. Sidebar de Categorías - Ancho w-52, texto ultra reducido a 9px */}
        <aside className="w-52 shrink-0 flex flex-col gap-1">
          {sidebarCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center justify-between px-4 py-2.5 rounded-2xl transition-all duration-300 group border border-transparent",
                activeCategory === cat.id 
                  ? "bg-[#003B73] text-white" 
                  : "text-slate-400 hover:bg-slate-100/50 hover:text-slate-600"
              )}
            >
              <div className="flex items-center gap-3">
                <cat.icon 
                  className={cn("w-3.5 h-3.5", activeCategory === cat.id ? "text-white" : "text-slate-400 group-hover:text-slate-500")} 
                  strokeWidth={1} 
                />
                <span className="text-[9px] font-light tracking-tight">{cat.label}</span>
              </div>
              {activeCategory === cat.id && <ChevronRight className="w-3 h-3 text-white/60" />}
            </button>
          ))}
        </aside>

        {/* 2. Área Principal de Contenido */}
        <main className="flex-grow space-y-10">
          
          {/* Header con Filtros y Acciones - Texto reducido a 9px */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {topFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-[9px] font-light transition-all duration-300 border border-transparent tracking-tight",
                    activeFilter === filter.id 
                      ? "bg-[#003B73] text-white" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-5 text-slate-400">
              <button className="hover:text-slate-600 transition-colors"><Search className="w-4 h-4" strokeWidth={1} /></button>
              <button className="hover:text-slate-600 transition-colors"><Mail className="w-4 h-4" strokeWidth={1} /></button>
              <button className="hover:text-slate-600 transition-colors"><Download className="w-4 h-4" strokeWidth={1} /></button>
            </div>
          </div>

          {/* Grid de Tarjetas Multimedia */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {multimediaCards.map((card) => {
              return (
                <Card 
                  key={card.id} 
                  className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[1.5rem] overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1"
                >
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4 bg-white h-full relative">
                    <div className="space-y-2">
                      <div className={cn("px-4 py-0.5 rounded-full text-[8px] text-white font-light mx-auto w-fit", card.tagColor)}>
                        {card.tag}
                      </div>
                      <h3 className="text-xl font-bold tracking-tighter text-slate-800">{card.title}</h3>
                    </div>
                    
                    <div className="relative w-24 h-24 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
                      <card.icon 
                        className={cn("w-14 h-14 stroke-[1px] opacity-10 absolute", card.color)} 
                      />
                      <div className={cn("w-12 h-12 rounded-2xl blur-xl opacity-15 absolute", card.tagColor)} />
                      
                      <div className="relative z-10">
                        <card.icon className={cn("w-14 h-14 stroke-[0.5px]", card.color)} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}
