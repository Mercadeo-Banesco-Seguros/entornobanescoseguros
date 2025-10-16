
import { NextResponse } from 'next/server';

// Pega la URL de tu NUEVA implementación de Google Apps Script aquí.
const appsScriptUrl = '';


async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada para el bazar.' },
      { status: 500 }
    );
  }

  let body: any = {};
  const method = request.method;
  
  if (method === 'POST') {
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 });
    }
  }
  
  const action = body.action;

  if (action !== 'registerPurchase') {
      return NextResponse.json({ message: 'Acción no válida para esta ruta.' }, { status: 400 });
  }

  try {
    // Todas las peticiones al Apps Script se hacen por POST
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify({ action, ...body }),
      cache: 'no-store',
      redirect: 'follow',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error desde Apps Script (Bazar):', errorText);
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos del bazar.', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error al contactar con el proxy del bazar:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al procesar el canje.', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return handleRequest(request);
}

// Permite las peticiones OPTIONS para el preflight de CORS si es necesario.
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-control-allow-headers': 'Content-Type',
    },
  });
}
