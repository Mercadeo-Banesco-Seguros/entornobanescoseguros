import { NextResponse } from 'next/server';

const appsScriptUrl = process.env.APPS_SCRIPT_URL;

async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada en las variables de entorno.' },
      { status: 500 }
    );
  }

  let action = 'getData';
  let body = {};
  
  if (request.method === 'POST') {
    try {
      body = await request.json();
      if ('action' in body) {
        action = (body as { action: string }).action;
      }
    } catch (e) {
      return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 });
    }
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body, action }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos.', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error al contactar con el proxy de Apps Script:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener los datos.', error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  // Redirigir GET a POST para un manejo unificado
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}
