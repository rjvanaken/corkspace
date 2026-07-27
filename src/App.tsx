import { MainHeader } from "@/components/custom/Header/MainHeader";
import Toolbar from "@/components/custom/Header/Toolbar";
import Board from "./components/custom/Board";
import { useEffect, useState } from "react";
import TaskModal from "./components/custom/Board/TaskModal";
import { supabase } from "./lib/supabaseClient";


export default function App() {

  const[isModalOpen, setIsModalOpen] = useState(false);
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
    <div className="h-screen bg-background text-foreground flex flex-col">
      <MainHeader></MainHeader>
      <Toolbar onNewTaskClick={() => setIsModalOpen(true)}></Toolbar>
      <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        <Board tasks={tasks} setTasks={setTasks}></Board>
      </main>
      <TaskModal open={isModalOpen} onOpenChange={setIsModalOpen} onSaved={(newTask) => setTasks((current) => [...current, newTask])}></TaskModal>

    </div>
  );
}