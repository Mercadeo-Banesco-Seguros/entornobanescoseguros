import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// No necesitas 'users', 'tasks', etc. de /lib/data porque vendrán del script.

export async function GET(request: Request) {
  
  // Reemplaza esta URL con la que obtuviste de Google Apps Script
  const appsScriptUrl = "PEGA_TU_URL_AQUI";

  if (!appsScriptUrl || appsScriptUrl === "PEGA_TU_URL_AQUI") {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada. Pega tu URL en `src/app/api/data/route.ts`' },
      { status: 500 }
    );
  }

  try {
    // --- LÓGICA DE PRODUCCIÓN ---
    // Hacemos una petición GET. El script de Google se encargará de identificar al usuario.
    const response = await fetch(appsScriptUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Cachear la respuesta para no llamar al script en cada carga.
      // Puedes ajustar el tiempo de revalidación.
      next: { revalidate: 300 } // Revalida cada 5 minutos
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error desde Apps Script: ${response.statusText} - ${errorText}`);
      // Intenta parsear el error por si Apps Script devolvió un JSON de error
      try {
        const errorJson = JSON.parse(errorText);
        return NextResponse.json(
          { message: 'Error desde el servicio de datos.', error: errorJson.message || 'Detalles no disponibles.' },
          { status: response.status }
        );
      } catch (e) {
         return NextResponse.json(
          { message: 'Error desde el servicio de datos. La respuesta no era un JSON válido.', error: errorText },
          { status: response.status }
        );
      }
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { message: data.message || 'Ocurrió un error al procesar los datos.' },
        { status: 404 } // O el código de estado apropiado
      );
    }
    
    // El script debería devolver un objeto con la estructura que espera la app.
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Error al contactar con el proxy de Apps Script:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener los datos.', error: error.message },
      { status: 500 }
    );
  }
}
