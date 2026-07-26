import { Columns } from "@/lib/constants";
import Column from "./Board/Column";
import TaskCard from "@/components/custom/Board/TaskCard";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";


const todo = Columns.find((c) => c.id === "todo")!;
const inProgress = Columns.find((c) => c.id === "in_progress")!;
const inReview = Columns.find((c) => c.id === "in_review")!;
const done = Columns.find((c) => c.id === "done")!;

export default function Board() {

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<any>(null);


  // load tasks
  useEffect(() => {
    async function loadTasks() {
      let { data: sessionData } = await supabase.auth.getSession();

      if (!sessionData.session) {
        const { data: signInData, error } = await supabase.auth.signInAnonymously();
        
        if (error) {
          console.log("guest sign-in error:", error);
          setLoading(false);
          return;
        }
        sessionData = { session: signInData.session };
      }

      console.log("guest id:", sessionData.session?.user?.id);

      const { data, error } = await supabase.from("tasks").select("*");

      if (error) {
        console.log("fetch error:", error);
      } else {
        setTasks(data ?? []);
      }
      setLoading(false);
    }

    loadTasks();
  }, []);


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

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>;
  }

  return (
  <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
    <div className="flex-1 flex justify-center h-screen overflow-hidden bg-background p-4">
      <div className="w-full max-w-[1500px] flex gap-6 rounded-lg">
        <Column label="To Do" status={todo.id} tasks={tasks}></Column>
        <Column label="In Progress" status={inProgress.id} tasks={tasks}></Column>
        <Column label="In Review" status={inReview.id} tasks={tasks}></Column>
        <Column label="Done" status={done.id} tasks={tasks}></Column>
      </div>
    </div>

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
        ></TaskCard>
      ) : null}
    </DragOverlay>
        </DndContext>
  );
}