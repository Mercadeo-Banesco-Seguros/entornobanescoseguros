'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const formSchema = z.object({
  username: z.string().min(1, { message: 'Por favor, introduce tu usuario.' }),
  cedula: z.string().min(1, { message: 'La cédula no puede estar vacía.' }),
});

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      cedula: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await login(values.username, values.cedula);
      router.push('/inicio');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error de autenticación",
        description: error.message || "Credenciales incorrectas. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex items-center justify-center py-12">
        <Card className="mx-auto w-full max-w-sm border-0 shadow-none">
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Introduce tus credenciales para entrar al circuito.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Usuario</FormLabel>
                      <FormControl>
                        <Input placeholder="tu.usuario" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cedula"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cédula</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="V-12345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Iniciando Sesión...' : 'Entrar a la Carrera'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
       <div className="hidden lg:block relative p-12">
        <Image
          src="https://www.banescoseguros.com/wp-content/uploads/2025/11/portadaVF.png"
          alt="Imagen de un auto de carreras"
          layout="fill"
          className="object-contain"
          data-ai-hint="race car"
        />
      </div>
    </div>
  );
}
