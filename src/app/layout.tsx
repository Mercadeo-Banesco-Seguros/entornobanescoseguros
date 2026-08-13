import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/layout/navbar';

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-sans' 
});

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
      <body className={cn(poppins.variable, "min-h-screen bg-slate-50 font-sans antialiased")}>
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
