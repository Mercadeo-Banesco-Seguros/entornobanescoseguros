import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Mi Portal Corporativo',
  description: 'Un espacio diseñado para tu bienestar y crecimiento.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={cn(inter.variable, "min-h-screen bg-slate-50 font-sans antialiased pt-24")}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
