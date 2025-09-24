'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, CircleDot } from 'lucide-react';
import type { Task as TaskType } from '@/lib/types';
import { cn } from '@/lib/utils';

type ObjectivesSidebarProps = {
  tasks: TaskType[];
};

export default function ObjectivesSidebar({ tasks: initialTasks }: ObjectivesSidebarProps) {
  const [tasks] = useState(initialTasks);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(
    tasks.find(t => t.status === 'completed')?.id || null
  );

  const sortedTasks = [...tasks].sort((a, b) => a.id - b.id);

  return (
    <Card className="h-full bg-transparent border-0 shadow-none">
      <CardHeader className="px-2">
        <CardTitle className="font-bold text-xl text-foreground">Lista de Misiones</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="space-y-3">
          {sortedTasks.map(task => (
            <Card
              key={task.id}
              className={cn(
                "p-4 shadow-sm cursor-pointer transition-colors",
                selectedTaskId === task.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card'
              )}
              onClick={() => setSelectedTaskId(task.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{task.title}</p>
                  <p className={cn(
                      "text-xs",
                      selectedTaskId === task.id ? "text-primary-foreground/80" : "text-muted-foreground"
                    )}
                  >
                    {task.description}
                  </p>
                </div>
                {task.status === 'completed' ? (
                   <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 ml-4" />
                ) : (
                   <CircleDot className="h-6 w-6 text-amber-500 flex-shrink-0 ml-4" />
                )}
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
