import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/auth-context';
import MainLayout from './(main)/layout';

export const metadata: Metadata = {
  title: 'Banesco Seguros: Expedition',
  description: 'Herramienta de motivación y formación interna para Banesco Seguros.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script src="https://apis.google.com/js/api.js"></script>
      </head>
      <body className={cn('font-body antialiased bg-background')}>
        <AuthProvider>
            <MainLayout>
              {children}
            </MainLayout>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}