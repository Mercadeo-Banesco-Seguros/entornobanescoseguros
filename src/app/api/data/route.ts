
import { NextResponse } from 'next/server';
import { users, tasks, levels, avatars } from '@/lib/data';

// Este es el endpoint que actúa como proxy a tu Google Apps Script.
// Deberás reemplazar la lógica de esta función para que llame
// a la URL de tu script desplegado como API web.

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  // Asegúrate de que tu URL de Apps Script esté en una variable de entorno.
  const appsScriptUrl = process.env.APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    console.error("APPS_SCRIPT_URL no está configurada en las variables de entorno.");
    // Como fallback, devolvemos los datos estáticos si la URL no está configurada
    // para que la aplicación no se rompa durante el desarrollo.
    console.warn("Devolviendo datos estáticos de prueba.");
    return NextResponse.json({ users, tasks, levels, avatars });
  }

  try {
    // --- LÓGICA DE PRODUCCIÓN ---
    // Cuando estés listo, descomenta este bloque para llamar a tu Apps Script.
    /*
    const response = await fetch(appsScriptUrl, {
      method: 'POST', // O GET, dependiendo de cómo configures tu script
      headers: {
        'Content-Type': 'application/json',
      },
      // Envía el email para que tu script sepa qué datos de usuario buscar
      body: JSON.stringify({ email: email }),
      // Es recomendable cachear la respuesta para no llamar al script en cada carga
      next: { revalidate: 300 } // Revalida cada 5 minutos
    });

    if (!response.ok) {
      throw new Error(`Error desde Apps Script: ${response.statusText}`);
    }

    const data = await response.json();
    
    // El script debería devolver un objeto con la misma estructura que AppData
    return NextResponse.json(data);
    */

    // --- LÓGICA DE DESARROLLO (DATOS DE PRUEBA) ---
    // Mientras tanto, usamos los datos locales para simular la respuesta.
    // Esto te permite desarrollar el frontend sin tener el backend listo.
    console.log(`Simulando fetch para el email: ${email}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simular latencia de red
    return NextResponse.json({ users, tasks, levels, avatars });

  } catch (error) {
    console.error('Error al contactar con el proxy de Apps Script:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor al obtener los datos.' },
      { status: 500 }
    );
  }
}
