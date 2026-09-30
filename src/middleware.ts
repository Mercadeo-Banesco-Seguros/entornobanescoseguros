import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/request';

/**
 * Middleware simplificado para compatibilidad con entornos de previsualización.
 * Dejamos que el AuthGuard (lado del cliente) maneje la protección de rutas
 * para evitar problemas con el bloqueo de cookies en iframes.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
