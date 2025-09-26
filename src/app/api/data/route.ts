import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
// Asegúrate de que la URL esté entre comillas simples o dobles.
// Ejemplo: const appsScriptUrl = 'https://script.google.com/macros/s/ABC.../exec';
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyizQtJch2A7oWllK4m-J8diA3kK9O-tSyNAgoEg4WuPIAp9BhqVz7zAmA4kyvl76RAiA/exec';


async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada. Por favor, edita src/app/api/data/route.ts' },
      { status: 500 }
    );
  }

  let body: any = {};
  
  if (request.method === 'POST') {
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 });
    }
  }

  try {
    // Para las peticiones GET, añadimos el parámetro de acción directamente.
    const fetchUrl = request.method === 'GET' ? `${appsScriptUrl}?action=getData` : appsScriptUrl;

    const response = await fetch(fetchUrl, {
      method: 'POST', // Siempre usamos POST para el script
      headers: {
        'Content-Type': 'application/json',
      },
      // Apps Script espera un objeto 'postData' con una propiedad 'contents' que es un JSON stringificado.
      // Esta es la estructura correcta.
      body: JSON.stringify({
          ...body,
          // La acción también va dentro para que el script sepa qué hacer.
          action: body.action || 'getData'
      }),
      cache: 'no-store',
      redirect: 'follow', // Sigue las redirecciones de Apps Script
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
