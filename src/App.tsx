import { MainHeader } from "@/components/custom/Header/MainHeader";
import Toolbar from "@/components/custom/Header/Toolbar";
import Board from "./components/custom/Board";
import { useEffect, useState } from "react";
import TaskModal from "./components/custom/Board/TaskModal";
import { supabase } from "./lib/supabaseClient";


export default function App() {

  const[isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filter the tasks 
  const filteredTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  t.description?.toLowerCase().includes(searchQuery.toLowerCase())
);
  
  // load data for the card
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
      <MainHeader searchQuery={searchQuery} onSearchChange={setSearchQuery}></MainHeader>
      <Toolbar onNewTaskClick={() => setIsModalOpen(true)}></Toolbar>
      <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        <Board tasks={filteredTasks} setTasks={setTasks} onEditTask={setEditingTask}></Board>
      </main>
      <TaskModal 
        open={isModalOpen || !!editingTask}
        onOpenChange={(open) => {setIsModalOpen(open); if (!open) setEditingTask(null);}} 
        onSaved={(savedTask) =>
          setTasks((current) => {
            const exists = current.some((t) => t.id === savedTask.id);
            return exists
              ? current.map((t) => (t.id === savedTask.id ? savedTask : t))
              : [...current, savedTask];
          })
        }
        task={editingTask}>
      </TaskModal>

    </div>
  );
}