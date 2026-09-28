import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Definir rutas públicas
  const isAuthPage = pathname.startsWith('/login');
  const isPublicAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/api') || 
                        pathname.includes('.') || // archivos estáticos como imágenes o favicons
                        pathname === '/favicon.ico';

  const token = request.cookies.get('auth_session')?.value;

  // Si no hay token y no es una ruta pública, redirigir al login
  if (!token && !isAuthPage && !isPublicAsset) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token e intenta ir al login, enviarlo al inicio
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
