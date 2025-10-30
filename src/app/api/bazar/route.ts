
import { NextResponse } from 'next/server';

const appsScriptUrl = 'https://script.google.com/macros/s/AKfycbwRsdRFb3Hzui7CRX-4DXWZFSzDLBV-rPQuxvnRTUtbo2ep4tTfyb38YpBxSxePTGz4wQ/exec';


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
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, ...body }),
      cache: 'no-store',
      redirect: 'follow', // Seguir redirecciones de Google
    });

    if (response.ok) {
      const result = await response.json();
      if(result.error) {
        throw new Error(result.message);
      }
      return NextResponse.json(result);
    } else {
      const errorText = await response.text();
      console.error('Error desde Apps Script (Bazar):', errorText);
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos del bazar.', details: errorText },
        { status: response.status }
      );
    }

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

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
