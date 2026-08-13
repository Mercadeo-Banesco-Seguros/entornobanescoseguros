
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Mi Nueva Landing Page',
  description: 'Creada desde cero con un lienzo en blanco.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={cn(inter.variable, "min-h-screen bg-background font-sans antialiased")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
