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
      // Redirige la petición a Apps Script como una petición POST
      // con un cuerpo que se pueda parsear como JSON.
      body: JSON.stringify({
        // Incluye los parámetros originales de la petición
        ...body,
        // Establece la acción que debe ejecutar el script
        action,
        // Añadimos esto para que el script sepa que es una petición POST
        postData: { 
          contents: JSON.stringify(body)
        }
      }),
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
  // Las peticiones GET solo se usarán para obtener datos (ranking).
  // Se manejarán dentro de handleRequest como una acción 'getData'.
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}
