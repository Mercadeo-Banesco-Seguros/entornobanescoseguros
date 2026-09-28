'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";

function LoginPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email.toLowerCase().endsWith('@banescoseguros.com')) {
      toast({
        title: "Correo no válido",
        description: "Por favor, utilice un correo con el dominio @banescoseguros.com",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      await login(email, password);
      toast({ title: "Acceso concedido", description: "Bienvenido al portal." });
      router.push('/');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo iniciar sesión.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 bg-white">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[280px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-2xl font-light tracking-tighter">
              Iniciar Sesión
            </h1>
            <p className="text-[10px] text-muted-foreground font-light tracking-tight">
              Introduce tu correo corporativo y cédula.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="email" className="text-[10px] font-light uppercase tracking-tight">Correo</Label>
              <Input
                id="email"
                type="email"
                placeholder="usuario@banescoseguros.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-8 text-xs font-light focus-visible:ring-1"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="password" className="text-[10px] font-light uppercase tracking-tight">Cédula</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                placeholder="Número de identidad"
                className="h-8 text-xs font-light focus-visible:ring-1"
              />
            </div>
            <Button type="submit" className="w-full h-8 text-xs font-light mt-2 bg-[#003B73] hover:bg-[#002D54]" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Entrar
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="https://docs.google.com/drawings/d/e/2PACX-1vQR7o46FhR0B1yJQHHz1pFafgj7M1PTDXj1CzioZ8t4B9nIhzuVNVuUZRXUaJXLJCUC1teJ_icZFlya/pub?w=960&h=720&format=png"
          alt="Banner Corporativo"
          fill
          unoptimized
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

export default function LoginPage() {
    return <LoginPageContent />;
}
