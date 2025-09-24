'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { Task as TaskType } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

type ObjectivesSidebarProps = {
  tasks: TaskType[];
};

export default function ObjectivesSidebar({ tasks: initialTasks }: ObjectivesSidebarProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const { toast } = useToast();

  const handleCompleteTask = (taskId: number) => {
    const completedTask = tasks.find(t => t.id === taskId);
    if (completedTask) {
        toast({
            title: "¡Objetivo completado!",
            description: `Has ganado ${completedTask.xp} XP por: "${completedTask.title}"`,
        });
    }

    setTasks(currentTasks => 
        currentTasks.map(task => 
            task.id === taskId ? { ...task, status: 'completed' } : task
        )
    );
  };

  useEffect(() => {
    const firstPending = initialTasks.find(t => t.status === 'pending');
    if (firstPending) {
      const timer = setTimeout(() => {
        if (document.visibilityState === 'visible') {
            handleCompleteTask(firstPending.id)
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialTasks]);

  const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);
  const firstCompleted = sortedTasks.find(t => t.status === 'completed');
  const otherTasks = sortedTasks.filter(t => t.id !== firstCompleted?.id);

  return (
    <Card className="h-full bg-transparent border-0 shadow-none">
      <CardHeader className="px-2">
        <CardTitle className="font-bold text-xl text-foreground">Lista de Misiones</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
            {firstCompleted && (
                 <Card key={firstCompleted.id} className="p-4 shadow-sm bg-primary text-primary-foreground">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-semibold">{firstCompleted.title}</p>
                            <p className="text-sm text-primary-foreground/80">{firstCompleted.description}</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-green-400 flex-shrink-0 ml-4" />
                    </div>
                </Card>
            )}
            {otherTasks.map(task => (
                <Card key={task.id} className="p-4 shadow-sm bg-card">
                    <div className="flex items-center justify-between">
                         <div>
                            <p className="text-md font-semibold">{task.title}</p>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                        <XCircle className="h-8 w-8 text-red-500 flex-shrink-0 ml-4" />
                    </div>
                </Card>
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
