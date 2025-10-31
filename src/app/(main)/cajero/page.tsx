'use client';

import Image from 'next/image';

export default function CajeroPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex items-center justify-center">
      <div className="relative w-full h-[80vh] max-h-[800px]">
        <Image
          src="https://github.com/Rduque2025/web-assets-banesco-seguros/blob/main/Tarjeta%20Datos%20Bancarios%20Org%C3%A1nico%20Rosa%20y%20Amarillo%20(2)-Photoroom.png?raw=true"
          alt="Información de premios del Circuito Banesco"
          layout="fill"
          className="object-contain"
        />
      </div>
    </div>
  );
}
