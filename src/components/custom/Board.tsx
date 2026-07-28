import { Columns } from "@/lib/constants";
import Column from "./Board/Column";
import TaskCard from "@/components/custom/Board/TaskCard";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";


const todo = Columns.find((c) => c.id === "todo")!;
const inProgress = Columns.find((c) => c.id === "in_progress")!;
const inReview = Columns.find((c) => c.id === "in_review")!;
const done = Columns.find((c) => c.id === "done")!;

export default function Board({ tasks, setTasks, onEditTask}: { tasks: any[]; setTasks: (tasks: any[] | ((current: any[]) => any[])) => void; onEditTask: (task: any) => void }) {


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
    <div className="w-full max-w-[1600px]">
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="flex-1 flex justify-center h-screen overflow-hidden bg-background p-4">
      <div className="w-full flex-1 flex gap-6 rounded-lg">
        <Column label="To Do" status={todo.id} tasks={tasks} onEditTask={onEditTask}></Column>
        <Column label="In Progress" status={inProgress.id} tasks={tasks} onEditTask={onEditTask}></Column>
        <Column label="In Review" status={inReview.id} tasks={tasks} onEditTask={onEditTask}></Column>
        <Column label="Done" status={done.id} tasks={tasks} onEditTask={onEditTask}></Column>
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
        isOverlay
        onEditClick={() => {}}
        ></TaskCard>
      ) : null}
    </DragOverlay>
        </DndContext>
        </div>
  );
}