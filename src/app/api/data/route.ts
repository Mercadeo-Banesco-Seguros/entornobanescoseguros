import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbyFlj39v2_OzLc0-mEg2MuSXjXwkzWSjHluWEexjXK7OL-rLHZjXbnLFmesV0NX9C_8ig/exec';

async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada.' },
      { status: 500 }
    );
  }

  let requestPayload: any;
  try {
      if (request.method === 'POST') {
        requestPayload = await request.json();
      } else {
        const { searchParams } = new URL(request.url);
        const params: any = {};
        searchParams.forEach((value, key) => {
          params[key] = value;
        });
        requestPayload = params;
      }
  } catch (e) {
      requestPayload = {};
  }

  if (!requestPayload || !requestPayload.action) {
    return NextResponse.json({ message: 'La acción no fue especificada.', error: true }, { status: 400 });
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Recomendado para evitar problemas de preflight con Apps Script
      },
      body: JSON.stringify(requestPayload),
      cache: 'no-store',
      redirect: 'follow',
    });

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos.', details: responseText, error: true },
        { status: response.status }
      );
    }
    
    try {
      const data = JSON.parse(responseText);
      if (data.error) {
        return NextResponse.json({ message: data.message || 'Error del script de Google.', error: true }, { status: 400 });
      }
      return NextResponse.json(data);
    } catch(e) {
      return NextResponse.json(
        { message: 'La respuesta del servicio no es un JSON válido.', details: responseText.substring(0, 200), error: true },
        { status: 500 }
      );
    }

  } catch (error: any) {
    return NextResponse.json(
      { message: 'Error interno al procesar la petición.', error: true, details: error.message },
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
