import { Columns } from "@/lib/constants";
import Column from "./Board/Column";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";


const todo = Columns.find((c) => c.id === "todo")!;
const inProgress = Columns.find((c) => c.id === "in_progress")!;
const inReview = Columns.find((c) => c.id === "in_review")!;
const done = Columns.find((c) => c.id === "done")!;

export default function Board() {

  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="flex-1 flex justify-center h-screen overflow-hidden bg-background p-4">
      <div className="w-full max-w-[1500px] flex gap-6 rounded-lg">
        <Column label="To Do" status={todo.id} tasks={tasks}></Column>
        <Column label="In Progress" status={inProgress.id} tasks={tasks}></Column>
        <Column label="In Review" status={inReview.id} tasks={tasks}></Column>
        <Column label="Done" status={done.id} tasks={tasks}></Column>
      </div>
    </div>
  );
}