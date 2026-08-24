// Ruta desactivada por solicitud del usuario.
// El sistema opera actualmente en modo local estático.

export async function GET() {
  return new Response('API deshabilitada.', { status: 410 });
}

export async function POST() {
  return new Response('API deshabilitada.', { status: 410 });
}
