'use client';

import { ArrowRight, Sparkles, Shield, GraduationCap, Library, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-[#003B73] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" />
              Bienvenidos a tu nuevo espacio
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-slate-900 leading-tight">
              Diseñamos el futuro <br />
              <span className="text-[#003B73]">juntos</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Un lienzo en blanco para construir las mejores experiencias corporativas. Todo lo que necesitas, en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button size="lg" className="rounded-full px-10 font-bold bg-[#003B73] hover:bg-[#004B8D]">
                Empezar ahora <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-10 font-bold border-slate-200 hover:bg-slate-50">
                Saber más
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Access Cards */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-[#003B73]" />}
              title="Seguridad"
              description="Tu información y procesos protegidos bajo los más altos estándares corporativos."
              link="/nosotros"
            />
            <FeatureCard 
              icon={<GraduationCap className="h-10 w-10 text-[#003B73]" />}
              title="Formación"
              description="Rutas de aprendizaje diseñadas para potenciar tu talento y crecimiento profesional."
              link="/academia"
            />
            <FeatureCard 
              icon={<Library className="h-10 w-10 text-[#003B73]" />}
              title="Recursos"
              description="Biblioteca completa de documentos, manuales y herramientas para tu día a día."
              link="/biblioteca"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-2 font-bold text-xl text-slate-900">
            <Rocket className="h-6 w-6 text-[#003B73]" />
            <span>Portal Corporativo</span>
          </div>
          <p className="text-slate-500 text-sm max-w-md mx-auto">
            © 2024 Innovación y compromiso en cada paso.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, link }: { icon: React.ReactNode, title: string, description: string, link: string }) {
  return (
    <Link href={link} className="p-8 rounded-3xl border border-transparent bg-white shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group">
      <div className="mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-4 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed mb-6">{description}</p>
      <div className="flex items-center gap-2 text-[#003B73] font-bold text-sm uppercase tracking-wider">
        Explorar <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
