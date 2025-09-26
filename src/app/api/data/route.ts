import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
// Asegúrate de que la URL esté entre comillas simples o dobles.
// Ejemplo: const appsScriptUrl = 'https://script.google.com/macros/s/ABC.../exec';
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyoQwtPHe5wTyhPz3_jCefOtzAGcdF8FZsiK2t1jVW3z7iZbgG5XygjAG5NJEphK-gO1A/exec';


async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada. Por favor, edita src/app/api/data/route.ts' },
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

  // Para peticiones GET, el 'action' viene en la URL. Para POST, está en el body.
  const action = method === 'GET' ? 'getData' : body.action;

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST', // Apps Script siempre recibe POST
      headers: {
        // Usar 'text/plain' es una técnica para evitar preflight requests de CORS
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      // El cuerpo se envía como un string JSON. Apps Script lo parseará.
      body: JSON.stringify({ action, ...body }),
      cache: 'no-store', // Deshabilitar caché para obtener siempre datos frescos
      redirect: 'follow', // Seguir las redirecciones de Apps Script
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error desde Apps Script:', errorText);
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
  // Las peticiones GET solo se usarán para obtener datos (ranking).
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}
