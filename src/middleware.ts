import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

/**
 * Middleware para proteger rutas basado en cookies.
 * Optimizado para compatibilidad en entornos de desarrollo.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isAuthPage = pathname.startsWith('/login');
  const isPublicAsset = pathname.startsWith('/_next') || 
                        pathname.startsWith('/api') || 
                        pathname.includes('.') || 
                        pathname === '/favicon.ico';

  // Obtenemos el token de sesión
  const token = request.cookies.get('auth_session')?.value;

  // Si no hay token y no es una ruta pública, redirigir al login
  if (!token && !isAuthPage && !isPublicAsset) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Si hay token e intenta ir al login, enviarlo al inicio
  if (token && isAuthPage) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};