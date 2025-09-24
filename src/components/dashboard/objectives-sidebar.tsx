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
    const completedTask = tasks.find(t => t.id === 1 && t.status === 'pending');
    if (completedTask) {
        handleCompleteTask(1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);
  const firstCompleted = sortedTasks.find(t => t.status === 'completed');
  const otherTasks = sortedTasks.filter(t => t.id !== firstCompleted?.id);

  return (
    <Card className="h-full bg-transparent border-0 shadow-none">
      <CardHeader className="px-2">
        <CardTitle className="font-bold text-xl text-foreground">What's your goal?</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
            {firstCompleted && (
                 <Card key={firstCompleted.id} className="p-4 shadow-sm bg-foreground text-background">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-semibold">{firstCompleted.title}</p>
                            <p className="text-sm text-muted-foreground">{firstCompleted.description}</p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0 ml-4" />
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