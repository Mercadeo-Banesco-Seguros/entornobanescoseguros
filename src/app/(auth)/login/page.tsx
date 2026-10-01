'use client';

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [cedula, setCedula] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(username, cedula);
      toast({ title: "Acceso Exitoso", description: "Iniciando sesión corporativa..." });
    } catch (error) {
      toast({
        title: "Error de acceso",
        description: error instanceof Error ? error.message : "No se pudo validar la identidad.",
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
              Portal Corporativo
            </h1>
            <p className="text-[10px] text-muted-foreground font-light tracking-tight uppercase">
              Usuario y Cédula para acceder al sistema
            </p>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <Label htmlFor="username" className="text-[10px] font-light uppercase tracking-tight">Correo Banesco Seguros</Label>
              <Input
                id="username"
                type="text"
                placeholder="fulanito@banescoseguros.com"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                className="h-8 text-xs font-light focus-visible:ring-1 border-slate-100"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="cedula" className="text-[10px] font-light uppercase tracking-tight">Cédula de Identidad</Label>
              <Input
                id="cedula"
                type="password"
                required
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                disabled={isLoading}
                placeholder="V12345789"
                className="h-8 text-xs font-light focus-visible:ring-1 border-slate-100"
              />
            </div>
            <Button type="submit" className="w-full h-8 text-xs font-light mt-2 bg-[#003B73] hover:bg-[#002D54]" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
              Entrar al Portal
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative overflow-hidden bg-[#F8FAFC]">
        <Image
          src="https://docs.google.com/drawings/d/e/2PACX-1vQR7o46FhR0B1yJQHHz1pFafgj7M1PTDXj1CzioZ8t4B9nIhzuVNVuUZRXUaJXLJCUC1teJ_icZFlya/pub?w=960&h=720"
          alt="Banner Corporativo"
          fill
          unoptimized
          className="object-contain p-12"
          priority
        />
      </div>
    </div>
  );
}
