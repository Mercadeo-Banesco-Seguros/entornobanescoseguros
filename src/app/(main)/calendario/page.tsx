
'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Cake } from 'lucide-react';
import { cn } from '@/lib/utils';

type EventType = 'payment' | 'birthday' | 'holiday' | 'allowance';

interface CalendarEvent {
  date: string; // ISO format YYYY-MM-DD
  title: string;
  type: EventType;
  color?: string;
}

const events: CalendarEvent[] = [
  // Julio (Días previos en la vista de Agosto)
  { date: '2026-07-28', title: '2da Quincena', type: 'payment' },
  { date: '2026-07-28', title: 'Ticket de Alimentación', type: 'allowance' },
  { date: '2026-07-28', title: 'Cumpleaños de Sergialis Co...', type: 'birthday' },
  { date: '2026-07-29', title: 'Cumpleaños de Carlis Acuna', type: 'birthday' },
  { date: '2026-07-30', title: 'Cumpleaños de Maria Velas...', type: 'birthday' },
  // Agosto
  { date: '2026-08-02', title: 'Cumpleaños de Yurandith Lo...', type: 'birthday' },
  { date: '2026-08-02', title: 'Cumpleaños de Jesus Aguilar', type: 'birthday' },
  { date: '2026-08-03', title: 'Bono Transporte', type: 'payment' },
  { date: '2026-08-10', title: 'Bono Variable Indexado', type: 'payment' },
  { date: '2026-08-12', title: '1era Quincena', type: 'payment' },
  { date: '2026-08-12', title: 'Cumpleaños de Ana Martinez', type: 'birthday' },
  { date: '2026-08-12', title: 'Cumpleaños de Ramon Gonz...', type: 'birthday' },
  { date: '2026-08-15', title: 'Asunción de la Virgen (Feriado...', type: 'holiday' },
  { date: '2026-08-17', title: 'Complemento Alimentación', type: 'allowance' },
  { date: '2026-08-18', title: 'Cumpleaños de Liliana More...', type: 'birthday' },
  { date: '2026-08-21', title: 'Cumpleaños de Indira Farias', type: 'birthday' },
  { date: '2026-08-24', title: 'Provisión Gastos de Salud (PGS)', type: 'payment' },
  { date: '2026-08-26', title: '2da Quincena', type: 'payment' },
  { date: '2026-08-26', title: 'Ticket de Alimentación', type: 'allowance' },
];

const dayNames = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO'];
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function CalendarioPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date(2026, 7, 1)); // Iniciado en Agosto 2026 para el diseño
  const [today, setToday] = React.useState<Date | null>(null);

  React.useEffect(() => {
    // Evitar errores de hidratación con fechas dinámicas
    setToday(new Date(2026, 7, 25)); // Fijado en 25 de Agosto para el diseño solicitado
  }, []);

  const viewMonth = currentDate.getMonth();
  const viewYear = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(viewYear, viewMonth + 1, 1));

  // Lógica de generación de días
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  // Ajuste para que Lunes sea el primer día (ISO)
  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const calendarDays = [];

  // Días del mes anterior
  for (let i = offset - 1; i >= 0; i--) {
    calendarDays.push({
      day: daysInPrevMonth - i,
      month: viewMonth - 1,
      year: viewYear,
      isCurrentMonth: false,
    });
  }

  // Días del mes actual
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({
      day: i,
      month: viewMonth,
      year: viewYear,
      isCurrentMonth: true,
    });
  }

  // Completar la cuadrícula con días del mes siguiente (hasta 42 celdas - 6 semanas)
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({
      day: i,
      month: viewMonth + 1,
      year: viewYear,
      isCurrentMonth: false,
    });
  }

  const getEventsForDate = (day: number, month: number, year: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-700">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
          {months[viewMonth]} {viewYear}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex bg-white rounded-xl shadow-sm border border-slate-100 p-1">
            <button 
              onClick={prevMonth}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="px-4 py-2 flex items-center justify-center min-w-[80px]">
              <span className="text-xs font-bold text-slate-700 uppercase">
                {months[viewMonth].substring(0, 3)}
              </span>
            </div>
            <button 
              onClick={nextMonth}
              className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
        {/* Cabecera de días */}
        <div className="grid grid-cols-7 border-b border-slate-50">
          {dayNames.map(name => (
            <div key={name} className="py-6 text-center">
              <span className="text-[10px] font-bold text-slate-300 tracking-[0.2em]">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Cuadrícula del calendario */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, idx) => {
            const isToday = today && 
                          date.day === today.getDate() && 
                          date.month === today.getMonth() && 
                          date.year === today.getFullYear();
            
            const dateEvents = getEventsForDate(date.day, date.month, date.year);

            return (
              <div 
                key={idx} 
                className={cn(
                  "min-h-[140px] p-4 border-r border-b border-slate-50 transition-colors hover:bg-slate-50/50",
                  (idx + 1) % 7 === 0 && "border-r-0",
                  !date.isCurrentMonth && "bg-slate-50/20"
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={cn(
                    "text-sm font-bold tracking-tighter",
                    date.isCurrentMonth ? "text-slate-800" : "text-slate-300"
                  )}>
                    {date.day < 10 ? `0${date.day}` : date.day}
                  </span>
                  {isToday && (
                    <span className="px-2 py-0.5 rounded-full bg-[#0054A6] text-white text-[8px] font-bold uppercase tracking-wider">
                      Hoy
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {dateEvents.map((event, eventIdx) => (
                    <div 
                      key={eventIdx}
                      className={cn(
                        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[8px] font-medium leading-none truncate max-w-full",
                        event.type === 'payment' && "bg-[#8abaff] text-white",
                        event.type === 'allowance' && "bg-[#6c63ff] text-white",
                        event.type === 'birthday' && "bg-pink-100 text-pink-500",
                        event.type === 'holiday' && "bg-purple-100 text-purple-400"
                      )}
                    >
                      {event.type === 'birthday' && <Cake className="w-2.5 h-2.5 shrink-0" />}
                      <span className="truncate">{event.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
