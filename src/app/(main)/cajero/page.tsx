'use client';

import Image from 'next/image';

export default function CajeroPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center">
        <div className="mb-8">
            <h1 className="text-4xl font-black text-foreground tracking-tight uppercase">
              Gran Premio
            </h1>
            <p className="text-muted-foreground mt-2">
              ¡Descubre los grandiosos premios!
            </p>
        </div>
      <div className="relative w-full h-[70vh] max-h-[700px]">
        <Image
          src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Tarjeta%20Datos%20Bancarios%20Org%C3%A1nico%20Rosa%20y%20Amarillo%20(3)-Photoroom.png?raw=true"
          alt="Información de premios del Circuito Banesco"
          layout="fill"
          className="object-contain"
          quality={100}
        />
      </div>
    </div>
  );
}
