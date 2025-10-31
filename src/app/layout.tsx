import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Providers } from '@/context/providers';
import { Poppins as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '600', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Banesco Seguros: Circuito',
  description: 'Herramienta de gamificación para Asesores Integrales de Banesco Seguros.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
