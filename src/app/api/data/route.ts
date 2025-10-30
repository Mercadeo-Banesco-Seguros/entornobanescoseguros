
import { NextResponse } from 'next/server';

// Pega la URL de implementación de tu Google Apps Script aquí.
const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbw2xRwLsIxEnotSZFIGBNVt08X6ITVRddtg1ELMOmrTCG3vEXWMaRg2hhSf-uldD8udBg/exec';

async function handleRequest(request: Request) {
  if (!appsScriptUrl) {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada.' },
      { status: 500 }
    );
  }

  let requestPayload: any;
  try {
      requestPayload = await request.json();
  } catch (e) {
      // Si el cuerpo está vacío o no es JSON, usa los parámetros de la URL para GET
      const { searchParams } = new URL(request.url);
      const params: any = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      requestPayload = params;
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
      body: JSON.stringify(requestPayload),
      cache: 'no-store',
      redirect: 'follow',
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
        // El script devolvió un error JSON, lo cual es bueno. Lo reenviamos.
        return NextResponse.json({ message: data.message || 'Error del script de Google.' }, { status: 400 });
      }
      return NextResponse.json(data);
    } catch(e) {
      // Esto se activa si la respuesta NO es JSON (probablemente una página de error de Google).
      console.error('Error al parsear la respuesta JSON de Apps Script. Contenido recibido:', responseText);
      return NextResponse.json(
        { message: 'La respuesta del servicio de datos no es un JSON válido. Revisa los logs del servidor.', details: responseText },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Error crítico al contactar con el proxy de Apps Script:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al procesar la petición.', error: error.message },
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
