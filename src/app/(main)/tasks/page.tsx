'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '@/context/auth-context';
import { CheckCircle2, CircleDot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TasksPage() {
  const { tasks, loading } = useAuth();
  
  if (loading) {
    return (
       <div className="space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground">Historial de Tareas</h1>
          <p className="text-muted text-lg mt-1">Revisa todas tus tareas, pendientes y completadas.</p>
        </header>
        <div className="space-y-4">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </div>
    )
  }

  const pendingTasks = tasks.filter((task) => task.status === "pending");
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const TaskList = ({ tasks }: { tasks: typeof tasks }) => (
    <Accordion type="single" collapsible className="w-full space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <AccordionItem value={`item-${task.id}`} key={task.id} className="border-b-0">
             <Card className="shadow-sm">
                <AccordionTrigger className="p-4 text-left hover:no-underline">
                    <div className="flex items-center gap-4 w-full">
                        {task.status === 'completed' 
                            ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                            : <CircleDot className="h-5 w-5 text-amber-500 flex-shrink-0" />
                        }
                        <span className="font-semibold text-foreground flex-grow">{task.title}</span>
                        <Badge variant="outline" className="mr-4">Nivel {task.level}</Badge>
                        <Badge variant="secondary">{task.xp} XP</Badge>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                    <p className="text-muted-foreground ml-9">{task.description}</p>
                </AccordionContent>
             </Card>
          </AccordionItem>
        ))
      ) : (
        <p className="text-muted text-center py-8">No hay tareas en esta categoría.</p>
      )}
    </Accordion>
  );

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold text-foreground">Historial de Tareas</h1>
        <p className="text-muted text-lg mt-1">Revisa todas tus tareas, pendientes y completadas.</p>
      </header>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 max-w-md">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="completed">Completadas</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <TaskList tasks={tasks} />
        </TabsContent>
        <TabsContent value="pending" className="mt-6">
          <TaskList tasks={pendingTasks} />
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <TaskList tasks={completedTasks} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
