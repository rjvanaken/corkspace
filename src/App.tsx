import { MainHeader } from "@/components/custom/Header/MainHeader";
import Toolbar from "@/components/custom/Header/Toolbar";
import Board from "./components/custom/Board";
import { useEffect, useState } from "react";
import TaskModal from "./components/custom/Board/TaskModal";
import { supabase } from "./lib/supabaseClient";
import { colorForIndex } from "./lib/constants";

const DEFAULT_LABEL_NAMES = ["Bug", "Feature", "Design", "Task"];

export default function App() {

  const[isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filter the tasks 
  const filteredTasks = tasks.filter((t) =>
  t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  t.description?.toLowerCase().includes(searchQuery.toLowerCase())
);
  
  // load data for the card
  useEffect(() => {
      // make sure we have a signed-in (possibly anonymous) user before touching any tables
      async function ensureSession() {
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          return true;
        }

        const { error } = await supabase.auth.signInAnonymously();

        if (error) {
          console.log("guest sign-in error:", error);
          return false;
        }

        return true;
      }

      // get user's labels, on startup add labels to database
      async function loadLabels() {
        const { data, error } = await supabase.from("labels").select("*");

        if (error) {
          console.log("labels fetch error:", error);
          return [];
        }

        if (data && data.length > 0) {
          return data;
        }

        const seeds = DEFAULT_LABEL_NAMES.map((name, index) => ({
          name,
          color: colorForIndex(index),
        }));

        const { data: seeded, error: seedError } = await supabase.from("labels").insert(seeds).select();

        if (seedError) {
          console.log("labels seed error:", seedError);
          return [];
        }

        return seeded ?? [];
      }

      async function loadTasks() {
        const { data, error } = await supabase.from("tasks").select("*, task_labels(label_id)");

        if (error) {
          console.log("fetch error:", error);
        } else {
          const withLabelIds = (data ?? []).map((task: any) => ({
            ...task,
            labelIds: (task.task_labels ?? []).map((tl: any) => tl.label_id),
          }));
          setTasks(withLabelIds);
        }
      }

      async function init() {
        const signedIn = await ensureSession();

        if (!signedIn) {
          setLoading(false);
          return;
        }

        setLabels(await loadLabels());
        await loadTasks();
        setLoading(false);
      }

      init();
    }, []);

    


if (loading) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <MainHeader searchQuery={searchQuery} onSearchChange={setSearchQuery}></MainHeader>
      <Toolbar onNewTaskClick={() => setIsModalOpen(true)}></Toolbar>
      <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        <Board userLabels={labels} tasks={filteredTasks} setTasks={setTasks} onEditTask={setEditingTask}></Board>
      </main>
      <TaskModal
        userLabels={labels}
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