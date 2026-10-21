'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { mockDepartments } from "@/lib/placeholder-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AlertTriangle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from '@/lib/utils';
import Image from 'next/image';

const renderDepartmentContent = (department: (typeof mockDepartments)[0]) => {
  const defaultIcon = department.icon || AlertTriangle;
  
  if (department.id === 'pmo') {
    return (
        <div className="space-y-12">
            <div className="bg-white/5 backdrop-blur-sm rounded-[2rem] p-10 border border-white/10 shadow-2xl">
              <p className="text-white/80 text-[13px] font-light leading-relaxed max-w-4xl whitespace-pre-wrap tracking-tight">
                  La Unidad Oficina de Proyectos (PMO) impulsa la ejecución exitosa de proyectos, requerimientos e iniciativas estratégicas en Banesco Seguros. Gestiona desde la planificación hasta la evaluación, buscando eficiencia, rentabilidad, logro de beneficios, documentación y entrega de resultados de alto valor.
                  {'\n\n'}
                  Para ello, la Unidad PMO supervisa la ejecución de todos los proyectos y requerimientos, identificando y aplicando las metodologías y herramientas más adecuadas para una gestión óptima. Coordinando recursos y articulando la participación entre unidades para mantener comunicaciones fluidas sobre el estado de los proyectos, sus posibles desviaciones, riesgos y las alternativas de mejora.
                  {'\n\n'}
                  Proveemos servicios e información a través de los siguientes vínculos:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {department.requests?.map((req, index) => {
                 const RequestIcon = req.icon || defaultIcon;
                 const cardContent = (
                    <div 
                      className={cn(
                        "group relative p-8 rounded-[2rem] border transition-all h-full flex flex-col gap-6",
                        req.link
                          ? "bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer"
                          : "bg-white/5 border-white/5 text-white/40 cursor-not-allowed opacity-60"
                      )}
                    >
                      <div className="flex items-start gap-5 flex-grow">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                            <RequestIcon className={cn("h-6 w-6", req.link ? "text-white" : "text-white/40")} strokeWidth={1.5} />
                          </div>
                          <div className="flex-grow space-y-1">
                              <h3 className="font-bold text-lg tracking-tighter leading-tight">{req.title}</h3>
                              <p className="text-[10px] uppercase tracking-widest font-light opacity-60">
                                {req.type === 'request' ? 'Formulario de solicitud' : 'Recurso Informativo'}
                              </p>
                          </div>
                      </div>
                      {req.link && (
                        <div className="flex justify-end mt-4">
                           <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <ArrowRight className="h-4 w-4 text-white" />
                           </div>
                        </div>
                      )}
                  </div>
                 );

                 if (req.link) {
                    return (
                        <Link href={req.link} key={index} target="_blank" rel="noopener noreferrer" className="block h-full">
                            {cardContent}
                        </Link>
                    )
                 }
                 
                 return (
                    <div key={index} className="h-full">
                        {cardContent}
                    </div>
                );
              })}
            </div>
        </div>
    );
  }

  if (department.requests && department.requests.length > 0) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {department.requests?.map((req, index) => {
             const RequestIcon = req.icon || defaultIcon;
             const cardContent = (
                <div 
                  className={cn(
                    "group relative p-8 rounded-[2rem] border transition-all h-full flex flex-col gap-6",
                    req.link
                      ? "bg-white/10 hover:bg-white/20 border-white/20 text-white cursor-pointer"
                      : "bg-white/5 border-white/5 text-white/40 cursor-not-allowed opacity-60"
                  )}
                >
                  <div className="flex items-start gap-5 flex-grow">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0">
                        <RequestIcon className={cn("h-6 w-6", req.link ? "text-white" : "text-white/40")} strokeWidth={1.5} />
                      </div>
                      <div className="flex-grow space-y-1">
                          <h3 className="font-bold text-lg tracking-tighter leading-tight">{req.title}</h3>
                          <p className="text-[10px] uppercase tracking-widest font-light opacity-60">
                            {req.type === 'request' ? 'Formulario de solicitud' : 'Información'}
                          </p>
                      </div>
                  </div>
                  {req.link && (
                    <div className="flex justify-end mt-4">
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                         <ArrowRight className="h-4 w-4 text-white" />
                       </div>
                    </div>
                  )}
              </div>
             );

             if (req.link) {
                return (
                    <Link href={req.link} key={index} target="_blank" rel="noopener noreferrer" className="block h-full">
                        {cardContent}
                    </Link>
                )
             }
             
             return (
                <div key={index} className="h-full">
                    {cardContent}
                </div>
            );
          })}
        </div>
      );
  }

  return (
    <div className="w-full py-20 text-center bg-white/5 rounded-[3rem] border border-white/10 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6 max-w-md mx-auto">
        <div className="w-20 h-20 rounded-[2.5rem] bg-amber-400/20 flex items-center justify-center">
          <AlertTriangle className="h-10 w-10 text-amber-400" strokeWidth={1} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tighter text-white">Sección en Construcción</h3>
          <p className="text-[11px] text-white/50 font-light leading-relaxed tracking-tight">
            El portal de gestión específica para <span className="text-white font-medium">{department.name}</span> está actualmente en fase de implementación.
          </p>
        </div>
      </div>
    </div>
  );
};

export default function DepartmentRequestPage() {
  const { slug } = useParams() as { slug: string };
  const department = mockDepartments.find(d => d.id === slug);
  
  if (!department) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
          <div className="w-20 h-20 rounded-[2.5rem] bg-slate-100 flex items-center justify-center text-slate-300">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tighter text-slate-800">Recurso no encontrado</h2>
            <p className="text-[11px] text-slate-400 font-light italic">El departamento solicitado no existe en el sistema.</p>
          </div>
          <Link href="/requerimientos">
            <Button variant="outline" className="rounded-xl px-8 h-10 text-[10px] font-light border-slate-200">
              <ArrowLeft className="mr-2 h-3.5 w-3.5" />
              Volver al Portal
            </Button>
          </Link>
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 -ml-[50vw] -mt-32 pt-48 pb-24 bg-[#003B73] min-h-screen">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-400 blur-[150px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-blue-300 blur-[120px] translate-y-1/4 -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-8 md:px-16 lg:px-24 relative z-10">
            <header className="mb-16 space-y-6">
                <div className="flex items-center gap-4">
                  <Link href="/requerimientos">
                    <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </Link>
                  <span className="text-[10px] text-white/50 font-light uppercase tracking-widest">Portal de Requerimientos</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[0.9]">{department.name}</h1>
                  {department.id !== 'pmo' && (
                    <p className="text-white/60 text-[11px] md:text-xs font-light max-w-2xl leading-relaxed tracking-tight">{department.description}</p>
                  )}
                </div>
            </header>

            <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                {renderDepartmentContent(department)}
            </main>
      </div>
    </div>
  );
}
