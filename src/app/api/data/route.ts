import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// No necesitas 'users', 'tasks', etc. de /lib/data porque vendrán del script.

export async function GET(request: Request) {
  
  // Reemplaza esta URL con la que obtuviste de Google Apps Script
  const appsScriptUrl = "https://script.google.com/macros/s/AKfycbxRHVaNZ9AiiVfzG6JQ_0ueYiEmktL9RZlcGOfFgQo6yTIsAY-TKBtbV7lxvsL5rmQ_Mg/exec";

  if (!appsScriptUrl || appsScriptUrl === "PEGA_TU_URL_AQUI") {
    console.error('La URL de Apps Script no está configurada.');
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
      cache: 'no-store' // Desactivar caché para depuración
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Error desde Apps Script: ${response.status} - ${response.statusText}`, errorText);
      return NextResponse.json(
        { message: 'Error al contactar el servicio de datos.', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.error) {
      console.error('Error reportado por Apps Script:', data.message);
      return NextResponse.json(
        { message: data.message || 'Ocurrió un error al procesar los datos en el script.' },
        { status: 400 }
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
