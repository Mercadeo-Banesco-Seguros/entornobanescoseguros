import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbwKhJu1WyG0Eu5Betp93M19WDKnqM926Xdus5_vzo3mEmyoXeNZAIxdVga9E6VdGvEzYg/exec';

async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada.' },
      { status: 500 }
    );
  }

  const method = request.method;
  let requestPayload: any;

  try {
    if (method === 'POST') {
      requestPayload = await request.json();
    } else if (method === 'GET') {
      const { searchParams } = new URL(request.url);
      const params: any = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      requestPayload = params;
    }
  } catch (e) {
    return NextResponse.json({ message: 'Cuerpo de la petición inválido.' }, { status: 400 });
  }


  if (!requestPayload || !requestPayload.action) {
    return NextResponse.json({ message: 'La acción no fue especificada.' }, { status: 400 });
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST', // Siempre usamos POST para hablar con el script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestPayload), // Enviamos el payload construido
      cache: 'no-store',
      redirect: 'follow', // Crucial para seguir las redirecciones de Google
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Error desde Apps Script (Respuesta no OK):', responseText);
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos.', details: responseText },
        { status: response.status }
      );
    }
    
    try {
      const data = JSON.parse(responseText);
      if (data.error) {
        return NextResponse.json({ message: data.message || 'Error del script de Google.' }, { status: 401 });
      }
      return NextResponse.json(data);
    } catch(e) {
      console.error('Error al parsear la respuesta JSON de Apps Script:', responseText);
      return NextResponse.json(
        { message: 'La respuesta del servicio de datos no es un JSON válido.', details: responseText },
        { status: 500 }
      );
    }

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
