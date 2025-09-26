import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define las rutas públicas que no requieren autenticación
  const publicPaths = ['/login', '/register'];

  // Si la ruta no es pública, no hacemos nada y dejamos que el layout principal maneje la lógica.
  if (!publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  
  return NextResponse.next();
}

export const config = {
  // El matcher asegura que el middleware se ejecute en todas las rutas excepto las de la API,
  // las de Next.js y los archivos estáticos.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
