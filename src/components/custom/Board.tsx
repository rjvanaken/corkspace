import { Columns } from "@/lib/constants";
import Column from "./Board/Column";
import TaskCard from "@/components/custom/Board/TaskCard";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";



export default function Board({ tasks, setTasks, onEditTask, onDeleteTask, userLabels }: { tasks: any[]; setTasks: (tasks: any[] | ((current: any[]) => any[])) => void; onEditTask: (task: any) => void; onDeleteTask: (task: any) => void; userLabels: any[] }) {


  const [activeTask, setActiveTask] = useState<any>(null);



  // drag start
  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  // drag
  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as string;

    const task = tasks.find((t) => t.id === taskId);
    if (!task || task.status === newStatus) return;

    // update data locally
    setTasks((current) =>
      current.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );

    const { error } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId);
    if (error) {
      console.log("move error:", error);
    }
  }


  
  return (
    <div className="w-full pt-3 max-w-[1550px]">
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="flex-1 flex justify-center h-screen overflow-hidden bg-background p-4">
      <div className="w-full flex-1 flex gap-6 rounded-lg">
            {Columns.map((col) => (
              <Column
                key={col.id}
                label={col.label}
                status={col.id}
                tasks={tasks}
                userLabels={userLabels}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              ></Column>
            ))}
      </div>
    </div>

    {/* floating copy of card so drag and drop effect works */}
    <DragOverlay>
      {activeTask ? (
        <TaskCard
        id={activeTask.id}
        title={activeTask.title}
        status={activeTask.status}
        priority={activeTask.priority}
        description={activeTask.description}
        user_id={activeTask.user_id}
        created_at={activeTask.created_at}
        userLabels={userLabels}
        labelIds={activeTask.labelIds}
        isOverlay
        onEditClick={() => {}}
        onDeleteClick={() => {}}
        ></TaskCard>
      ) : null}
    </DragOverlay>
        </DndContext>
        </div>
  );
}