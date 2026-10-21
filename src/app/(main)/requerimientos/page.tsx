'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { mockDepartments } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { 
  MoreVertical, 
  Flag, 
  ArrowRight, 
  Briefcase, 
  Shield, 
  Scale, 
  LayoutGrid, 
  Users, 
  FolderKanban, 
  MoreHorizontal 
} from "lucide-react";
import type { Department } from "@/lib/placeholder-data";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const categories = [
    { id: "ALL", name: "TODOS", icon: LayoutGrid },
    { id: "Capital Humano", name: "Capital Humano", icon: Users },
    { id: "Comercial", name: "Comercial", icon: Briefcase },
    { id: "Legal", name: "Legal", icon: Scale },
    { id: "Seguridad", name: "Seguridad", icon: Shield },
    { id: "Proyectos", name: "Proyectos", icon: FolderKanban },
    { id: "Otros", name: "Otros", icon: MoreHorizontal }
];

interface DepartmentCardProps {
  department: Department;
  isActive: boolean;
  onReportError: () => void;
}

const DepartmentCard = ({ department, isActive, onReportError }: DepartmentCardProps) => {
  const Icon = department.icon || MoreHorizontal;
  
  const handleDropdownClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  
  return (
    <Card
      className={cn(
        "group cursor-pointer transition-all duration-500 flex flex-col text-left rounded-[2rem] h-full relative border-none shadow-none bg-white",
        "hover:shadow-xl hover:-translate-y-1",
        "hover:bg-[#003B73] hover:text-white",
        isActive ? "ring-1 ring-[#003B73]" : "border border-slate-100"
      )}
    >
      <CardContent className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-white/10 transition-colors">
                  <Icon className="h-6 w-6 text-[#003B73] group-hover:text-white" strokeWidth={1.5} />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 rounded-full group-hover:text-white group-hover:hover:bg-white/20"
                    onClick={handleDropdownClick}
                    >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="rounded-xl border-none shadow-2xl p-2" onClick={handleDropdownClick}>
                  <DropdownMenuItem onClick={onReportError} className="rounded-lg text-xs font-light py-2 cursor-pointer">
                    <Flag className="mr-2 h-3.5 w-3.5 text-slate-400" />
                    <span>Reportar Error</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
          <div className="flex-grow space-y-2">
            <p className="font-bold text-[15px] tracking-tight group-hover:text-white">{department.name}</p>
            <p className="text-[11px] font-light leading-relaxed text-slate-400 group-hover:text-white/70 tracking-tight">
              {department.description}
            </p>
          </div>
          <div className="mt-6 flex justify-end">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white/20 transition-all">
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
          </div>
      </CardContent>
    </Card>
  );
};

export default function RequerimientosPage() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  
  const { toast } = useToast();

  const filteredDepartments = activeCategory === 'ALL'
    ? mockDepartments
    : mockDepartments.filter(dept => dept.category === activeCategory);
    
  const handleReportError = () => {
    setIsReportDialogOpen(true);
  };

  const handleSendReport = () => {
    setIsReportDialogOpen(false);
    toast({
        title: "Reporte Enviado",
        description: "Gracias por tu feedback. Hemos recibido tu reporte y lo revisaremos pronto.",
    });
  }

  return (
    <div className="w-full min-h-screen bg-slate-50/50 pb-20 animate-in fade-in duration-700">
      <header className="mb-12 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tighter">Portal de Requerimientos</h1>
        <p className="text-slate-400 text-sm font-light tracking-tight">Selecciona un departamento para gestionar tus trámites institucionales.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        
        {/* Sidebar Nav */}
        <nav className="md:col-span-3 lg:col-span-2 sticky top-32 h-fit space-y-1">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "flex items-center gap-3 w-full p-3 rounded-2xl text-left transition-all duration-300 group",
                  isActive 
                    ? "bg-[#003B73] text-white shadow-lg" 
                    : "hover:bg-white hover:shadow-sm text-slate-400 hover:text-[#003B73]"
                )}
              >
                <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center transition-colors",
                     isActive ? "bg-white/10" : "bg-slate-100 group-hover:bg-[#003B73]/10"
                )}>
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-light tracking-tight">{category.name}</span>
              </button>
            );
          })}
        </nav>

        {/* Content Area */}
        <div className="md:col-span-9 lg:col-span-10">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => {
                  const href = dept.directLink || `/requerimientos/${dept.id}`;

                  return (
                      <Link 
                        href={href} 
                        key={dept.id} 
                        target={href.startsWith('http') ? "_blank" : undefined}
                        className="block h-full"
                      >
                         <DepartmentCard 
                              department={dept} 
                              isActive={activeCategory === dept.category}
                              onReportError={handleReportError}
                          />
                      </Link>
                  );
              })}
          </div>

          {filteredDepartments.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-100">
              <LayoutGrid className="w-12 h-12 text-slate-100 mb-4" />
              <p className="text-slate-400 text-xs font-light italic">No hay departamentos en esta categoría.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Error Report Modal */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="border-none shadow-2xl rounded-[3.5rem] p-10 bg-white max-w-md">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold tracking-tighter text-slate-800">Reportar un Error</DialogTitle>
            <DialogDescription className="text-[11px] font-light text-slate-500 leading-relaxed tracking-tight">
              Ayúdanos a mejorar tu experiencia. Describe el inconveniente que encontraste para que nuestro equipo pueda solventarlo.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <Textarea 
              placeholder="Describe el error detalladamente..." 
              className="min-h-[120px] rounded-2xl border-slate-100 focus-visible:ring-[#003B73] text-xs font-light p-4" 
            />
          </div>
          <DialogFooter className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setIsReportDialogOpen(false)}
              className="rounded-xl h-10 text-[11px] font-light flex-grow border-slate-100 hover:bg-slate-50"
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleSendReport}
              className="rounded-xl h-10 text-[11px] font-light flex-grow bg-[#003B73] hover:bg-[#002D54]"
            >
              Enviar Reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
