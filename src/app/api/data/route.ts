import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbzpmDQ7difOYXXUXcRv0YOrm76BkpGr_dvcDajIryP5lOyKglPGfTDMLCadEh7gvOUhuA/exec';


async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada.' },
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

  const action = method === 'GET' ? new URL(request.url).searchParams.get('action') : body.action;

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...body }),
      cache: 'no-store',
      redirect: 'follow', // Crucial para seguir las redirecciones de Google
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
  return handleRequest(request);
}

export async function POST(request: Request) {
  return handleRequest(request);
}

// Manejo de preflight requests para CORS
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
