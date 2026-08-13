'use client';

import { ArrowRight, Sparkles, CheckCircle2, Layout, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>MiProyecto</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">Características</Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">Nosotros</Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contacto</Link>
          </div>
          <Button size="sm">Empezar ahora</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
              <Zap className="h-3 w-3" />
              Lanzamiento 2024
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-foreground italic uppercase">
              Tu gran idea <span className="text-primary">empieza aquí</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bienvenido a tu lienzo en blanco. Hemos limpiado todo el ruido para que puedas concentrarte en lo que importa: construir el futuro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="rounded-full px-8 font-bold">
                Comenzar Proyecto <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 font-bold">
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
        {/* Background Decoration */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-10">
           <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
           <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl lg:text-4xl font-black uppercase tracking-tight">Todo lo que necesitas</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Herramientas potentes y una arquitectura limpia para escalar sin límites.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="h-10 w-10 text-primary" />}
              title="Velocidad Extrema"
              description="Optimizado con Next.js 15 para tiempos de carga instantáneos y SEO perfecto."
            />
            <FeatureCard 
              icon={<Layout className="h-10 w-10 text-primary" />}
              title="Diseño Adaptable"
              description="Componentes ShadCN UI que se ven increíbles en cualquier dispositivo."
            />
            <FeatureCard 
              icon={<Globe className="h-10 w-10 text-primary" />}
              title="Escalabilidad"
              description="Arquitectura modular lista para crecer junto a tu negocio."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight italic">
            ¿Listo para despegar?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
            Únete a cientos de desarrolladores que ya están construyendo el futuro con nuestra plataforma.
          </p>
          <Button size="lg" variant="secondary" className="rounded-full px-12 font-bold text-primary">
            ¡Quiero empezar ya!
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 font-bold text-xl mb-6">
            <Sparkles className="h-6 w-6 text-primary" />
            <span>MiProyecto</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 MiProyecto. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl border bg-card hover:shadow-xl transition-all group">
      <div className="mb-6 transform group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-4 uppercase tracking-tight italic">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      <div className="mt-6 flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider">
        Saber más <CheckCircle2 className="h-4 w-4" />
      </div>
    </div>
  );
}
