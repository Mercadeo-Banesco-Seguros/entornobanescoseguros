'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import type { Task as TaskType } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

type ObjectivesSidebarProps = {
  tasks: TaskType[];
};

export default function ObjectivesSidebar({ tasks: initialTasks }: ObjectivesSidebarProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const { toast } = useToast();

  const handleCompleteTask = (taskId: number) => {
    setTasks(currentTasks => 
        currentTasks.map(task => {
            if (task.id === taskId && task.status === 'pending') {
                toast({
                    title: "¡Objetivo completado!",
                    description: `Has ganado ${task.xp} XP por: "${task.title}"`,
                });
                return { ...task, status: 'completed' };
            }
            return task;
        })
    );
  };

  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

  return (
    <Card className="h-full bg-secondary/30 border-dashed">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-foreground">Objetivos del Nivel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
            {pendingTasks.length > 0 && (
                <div className="space-y-3">
                    <h4 className="font-semibold text-muted-foreground text-sm">Pendientes</h4>
                    {pendingTasks.map(task => (
                        <Card key={task.id} className="p-3 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-foreground pr-4">{task.title}</span>
                                <Button size="icon" variant="outline" className="h-8 w-8 flex-shrink-0" onClick={() => handleCompleteTask(task.id)}>
                                    <span className="sr-only">Marcar como completado</span>
                                    <X className="h-4 w-4 text-muted" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {completedTasks.length > 0 && (
                <div className="space-y-3 pt-4">
                    <h4 className="font-semibold text-muted-foreground text-sm">Completados</h4>
                    {completedTasks.map(task => (
                        <Card key={task.id} className="p-3 bg-white/50 opacity-60">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-foreground line-through">{task.title}</span>
                                <div className="h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-md border bg-green-100 text-green-600">
                                    <Check className="h-4 w-4" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
