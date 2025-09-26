import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Reemplaza esta URL con la que obtuviste de tu NUEVO script de autenticación
  const authScriptUrl = "PEGA_AQUI_TU_NUEVA_URL_DE_AUTENTICACION";

  if (!authScriptUrl || authScriptUrl.startsWith("PEGA_AQUI")) {
    console.error('La URL del script de autenticación no está configurada.');
    return NextResponse.json(
      { authorized: false, message: 'Error de configuración del servidor.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(authScriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // No cachear la respuesta de autenticación
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error desde Auth Apps Script: ${response.status}`, errorText);
      return NextResponse.json(
        { authorized: false, message: 'Error al contactar el servicio de autenticación.' },
        { status: response.status }
      );
    }

    const authData = await response.json();
    
    // Devolvemos directamente la respuesta del script (que debería ser { authorized: boolean, user?: ..., message?: ... })
    return NextResponse.json(authData);

  } catch (error: any) {
    console.error('Error interno al llamar al script de autenticación:', error);
    return NextResponse.json(
      { authorized: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
