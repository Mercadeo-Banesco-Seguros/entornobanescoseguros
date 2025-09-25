import { NextResponse } from 'next/server';

// No necesitas 'users', 'tasks', etc. de /lib/data porque vendrán del script.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Reemplaza esta URL con la que obtuviste de Google Apps Script
  const appsScriptUrl = "URL_DE_TU_APPS_SCRIPT_AQUI";

  if (!appsScriptUrl || appsScriptUrl === "URL_DE_TU_APPS_SCRIPT_AQUI") {
    return NextResponse.json(
      { message: 'La URL de Apps Script no está configurada en src/app/api/data/route.ts' },
      { status: 500 }
    );
  }

  try {
    // --- LÓGICA DE PRODUCCIÓN ---
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Aunque el script actual no usa el email, lo enviamos para futuras mejoras.
      body: JSON.stringify({ email: email }),
      // Cachear la respuesta para no llamar al script en cada carga.
      // Puedes ajustar el tiempo de revalidación.
      next: { revalidate: 300 } // Revalida cada 5 minutos
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error desde Apps Script: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    
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
