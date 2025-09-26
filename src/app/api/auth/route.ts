import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Reemplaza esta URL con la que obtuviste de tu NUEVO script de autenticación
  const authScriptUrl = "https://script.google.com/macros/s/AKfycbxruwhs38PIex2YoJPftF-BvTCxe-uIpj9S580l2EiVgganM3FBSnqUnzVLulJN1fpgUQ/exec";

  if (!authScriptUrl || authScriptUrl.startsWith("https://script.google.com/macros/s/AKfycbxruwhs38PIex2YoJPftF-BvTCxe-uIpj9S580l2EiVgganM3FBSnqUnzVLulJN1fpgUQ/exec")) {
    console.error('La URL del script de autenticación no está configurada.');
    return NextResponse.json(
      { authorized: false, message: 'Error de configuración del servidor: La URL del script de autenticación no está definida.' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(authScriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Desactivar la caché para asegurar que la autenticación siempre sea fresca
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error desde Auth Apps Script: ${response.status}`, errorText);
      return NextResponse.json(
        { authorized: false, message: `Error al contactar el servicio de autenticación. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const authData = await response.json();
    
    // Devolvemos directamente la respuesta del script
    // (que debería ser { authorized: boolean, user?: ..., message?: ... })
    return NextResponse.json(authData);

  } catch (error: any) {
    console.error('Error interno al llamar al script de autenticación:', error);
    return NextResponse.json(
      { authorized: false, message: 'Error interno del servidor al procesar la autenticación.' },
      { status: 500 }
    );
  }
}
