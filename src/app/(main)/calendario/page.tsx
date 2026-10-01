'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight, Cake, CalendarDays, Loader2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type EventType = 'payment' | 'birthday' | 'holiday' | 'allowance';

interface CalendarEvent {
  date: string; 
  title: string;
  type: EventType;
}

const dayNames = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const months = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

interface SelectedDayData {
  day: number;
  month: number;
  year: number;
  dateStr: string;
  events: string[];
  birthdays: string[];
}

export default function CalendarioPage() {
  const { currentUser, fetchCalendarData, updateCalendarDay } = useAuth();
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = React.useState(new Date()); 
  const [calendarData, setCalendarData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [selectedDay, setSelectedDay] = React.useState<SelectedDayData | null>(null);
  const [editForm, setEditFom] = React.useState<{ events: string[], birthdays: string[] }>({
    events: ['', '', '', '', ''],
    birthdays: ['', '', '', '', '']
  });

  const isAdmin = currentUser?.cargo === 'ADMINISTRADOR';

  const loadData = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCalendarData();
      setCalendarData(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error loading calendar data:", e);
      setCalendarData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchCalendarData]);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  const viewMonth = currentDate.getMonth();
  const viewYear = currentDate.getFullYear();

  const prevMonth = () => setCurrentDate(new Date(viewYear, viewMonth - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(viewYear, viewMonth + 1, 1));

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const calendarDays = [];
  for (let i = offset - 1; i >= 0; i--) {
    calendarDays.push({ day: daysInPrevMonth - i, month: viewMonth - 1, year: viewYear, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push({ day: i, month: viewMonth, year: viewYear, isCurrentMonth: true });
  }
  const remainingCells = 42 - calendarDays.length;
  for (let i = 1; i <= remainingCells; i++) {
    calendarDays.push({ day: i, month: viewMonth + 1, year: viewYear, isCurrentMonth: false });
  }

  const getDayData = (day: number, month: number, year: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const data = (calendarData || []).find(d => d && d.date === dateStr);
    return data || { events: [], birthdays: [] };
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    const data = getDayData(day, month, year);
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDay({ day, month, year, dateStr, events: data.events || [], birthdays: data.birthdays || [] });
    
    if (isAdmin) {
      setEditFom({
        events: [...(data.events || []), '', '', '', '', ''].slice(0, 5),
        birthdays: [...(data.birthdays || []), '', '', '', '', ''].slice(0, 5)
      });
    }
  };

  const handleSave = async () => {
    if (!selectedDay) return;
    setSaving(true);
    try {
      const filteredUpdates = {
        events: editForm.events.filter(e => e && e.trim() !== ''),
        birthdays: editForm.birthdays.filter(b => b && b.trim() !== '')
      };
      await updateCalendarDay(selectedDay.dateStr, filteredUpdates);
      toast({ title: "Guardado", description: "El calendario se ha actualizado correctamente." });
      await loadData();
      setSelectedDay(null);
    } catch (e) {
      toast({ title: "Error", description: "No se pudo guardar la información.", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 text-[#003B73] animate-spin" />
        <p className="text-[10px] text-slate-400 font-light uppercase tracking-widest">Sincronizando Calendario...</p>
      </div>
    );
  }

  return (
    <div className="relative w-screen left-1/2 -ml-[50vw] px-6 md:px-12 lg:px-16 animate-in fade-in duration-700">
      <div className="max-w-[1800px] mx-auto space-y-8">
        <header className="flex items-end justify-between pb-8">
          <div className="space-y-0.5">
            <h1 className="text-3xl font-semibold text-slate-800 tracking-[-0.1em]">
              {months[viewMonth]} {viewYear}
            </h1>
            <p className="text-slate-400 text-xs font-light tracking-tight">Gestión de tiempos e hitos institucionales.</p>
          </div>
          <div className="flex items-center h-9">
            <button onClick={prevMonth} className="px-2 hover:text-slate-600 transition-colors text-slate-400"><ChevronLeft className="w-3.5 h-3.5" /></button>
            <div className="px-4 flex items-center justify-center min-w-[90px]"><span className="text-[10px] font-light text-slate-700 tracking-tight">{months[viewMonth]}</span></div>
            <button onClick={nextMonth} className="px-2 hover:text-slate-600 transition-colors text-slate-400"><ChevronRight className="w-3.5 h-3.5" /></button>
          </div>
        </header>

        <div className="mb-8">
          <div className="grid grid-cols-7">
            {dayNames.map(name => (
              <div key={name} className="py-4 text-center"><span className="text-[10px] font-light text-slate-400">{name}</span></div>
            ))}
          </div>

          <div className="grid grid-cols-7 border-l border-slate-100">
            {calendarDays.map((date, idx) => {
              const dayData = getDayData(date.day, date.month, date.year);
              const isToday = new Date().toDateString() === new Date(date.year, date.month, date.day).toDateString();

              return (
                <div 
                  key={idx} 
                  onClick={() => handleDayClick(date.day, date.month, date.year)}
                  className={cn(
                    "min-h-[126px] p-4 border-r border-b border-slate-100 transition-all hover:bg-white relative group cursor-pointer",
                    !date.isCurrentMonth ? "bg-slate-50/40" : "bg-transparent"
                  )}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={cn("text-base font-bold tracking-tighter", date.isCurrentMonth ? "text-slate-800" : "text-slate-300")}>
                      {date.day < 10 ? `0${date.day}` : date.day}
                    </span>
                    {isToday && <span className="px-2 py-0.5 rounded-full bg-[#0054A6] text-white text-[7px] font-light">Hoy</span>}
                  </div>

                  <div className="space-y-1.5">
                    {(dayData.events || []).map((ev: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-[8px] font-light leading-none truncate max-w-full bg-[#8abaff] text-white shadow-sm border border-transparent">
                        <span className="truncate">{ev}</span>
                      </div>
                    ))}
                    {(dayData.birthdays || []).map((bd: string, i: number) => (
                      <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-full text-[8px] font-light leading-none truncate max-w-full bg-pink-100 text-pink-500 border-pink-200">
                        <Cake className="w-2.5 h-2.5 shrink-0" />
                        <span className="truncate">{bd}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDay} onOpenChange={(open) => !open && setSelectedDay(null)}>
        <DialogContent className="sm:max-w-[500px] p-8">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-lg font-bold tracking-tight text-slate-800">
              {selectedDay && `${selectedDay.day} de ${months[selectedDay.month % 12]} ${selectedDay.year}`}
            </DialogTitle>
            <DialogDescription className="text-[10px] font-light text-slate-400 mt-1">
              {isAdmin ? 'Edita los eventos y cumpleaños de este día.' : 'Eventos y recordatorios institucionales.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {isAdmin ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase text-blue-600 tracking-widest">Eventos (Máx 5)</h4>
                  {editForm.events.map((ev, i) => (
                    <Input 
                      key={`ev-${i}`}
                      placeholder={`Evento ${i+1}`}
                      value={ev}
                      onChange={(e) => {
                        const newEvents = [...editForm.events];
                        newEvents[i] = e.target.value;
                        setEditFom({ ...editForm, events: newEvents });
                      }}
                      className="h-8 text-[11px] font-light"
                    />
                  ))}
                </div>
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold uppercase text-pink-600 tracking-widest">Cumpleaños (Máx 5)</h4>
                  {editForm.birthdays.map((bd, i) => (
                    <Input 
                      key={`bd-${i}`}
                      placeholder={`Cumpleañero ${i+1}`}
                      value={bd}
                      onChange={(e) => {
                        const newBirthdays = [...editForm.birthdays];
                        newBirthdays[i] = e.target.value;
                        setEditFom({ ...editForm, birthdays: newBirthdays });
                      }}
                      className="h-8 text-[11px] font-light"
                    />
                  ))}
                </div>
                <Button 
                  onClick={handleSave} 
                  disabled={saving} 
                  className="w-full bg-[#003B73] h-9 text-xs font-light"
                >
                  {saving ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Save className="w-3 h-3 mr-2" />}
                  Guardar Cambios
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {(!selectedDay?.events?.length && !selectedDay?.birthdays?.length) ? (
                  <div className="py-10 text-center space-y-2">
                    <CalendarDays className="w-6 h-6 text-slate-200 mx-auto" strokeWidth={1} />
                    <p className="text-slate-400 text-[10px] font-light italic">Sin eventos programados.</p>
                  </div>
                ) : (
                  <>
                    {(selectedDay?.events || []).map((ev, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-blue-50/40 border border-blue-100/50 rounded-xl">
                        <CalendarDays className="w-3.5 h-3.5 text-blue-500" />
                        <span className="text-[11px] font-medium text-slate-700">{ev}</span>
                      </div>
                    ))}
                    {(selectedDay?.birthdays || []).map((bd, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-pink-50/40 border border-pink-100/50 rounded-xl">
                        <Cake className="w-3.5 h-3.5 text-pink-500" />
                        <span className="text-[11px] font-medium text-slate-700">{bd}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
