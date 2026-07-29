import { MainHeader } from "@/components/custom/Header/MainHeader";
import Board from "./components/custom/Board";
import { useEffect, useState } from "react";
import TaskModal from "./components/custom/Board/TaskModal";
import { supabase } from "./lib/supabaseClient";
import { colorForIndex, type ColumnId } from "./lib/constants";

export default function App() {

  const[isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<ColumnId>("todo");
  const [searchQuery, setSearchQuery] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);
  const [labels, setLabels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // filter the tasks 
const filteredTasks = tasks.filter((t) => {
  const query = searchQuery.toLowerCase();
  const matchesTitle = t.title.toLowerCase().includes(query);
  const matchesLabel = (t.labelIds ?? []).some((labelId: any) => {
    const label = labels.find((l) => l.id === labelId);
    return label?.name.toLowerCase().includes(query);
  });
  return matchesTitle || matchesLabel;
});
  
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

      // get user's labels (defaults are seeded server-side by a trigger on new users)
      async function loadLabels() {
        const { data, error } = await supabase.from("labels").select("*");

        if (error) {
          console.log("labels fetch error:", error);
          return [];
        }

        return data ?? [];
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

    async function handleCreateLabel(name: string) {
      const { data, error } = await supabase
        .from("labels")
        .insert({ name, color: colorForIndex(labels.length) })
        .select()
        .single();

      if (error) {
        console.log("create label error:", error);
        return null;
      }

      setLabels((current) => [...current, data]);
      return data;
    }

    function handleAddTask(status: string) {
      setNewTaskStatus(status as ColumnId);
      setIsModalOpen(true);
    }

    async function handleDeleteTask(task: any) {
      const { error: labelsError } = await supabase.from("task_labels").delete().eq("task_id", task.id);
      if (labelsError) {
        console.log("delete task_labels error:", labelsError);
      }

      const { error } = await supabase.from("tasks").delete().eq("id", task.id);
      if (error) {
        console.log("delete task error:", error);
        return;
      }

      setTasks((current) => current.filter((t) => t.id !== task.id));
    }




if (loading) {
    return <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">Loading...</div>;
  }

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <MainHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} onNewTaskClick={() => handleAddTask("todo")}></MainHeader>
      <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        <Board userLabels={labels} tasks={filteredTasks} setTasks={setTasks} onEditTask={setEditingTask} onDeleteTask={handleDeleteTask} onAddTask={handleAddTask}></Board>
      </main>
      <TaskModal
        userLabels={labels}
        onCreateLabel={handleCreateLabel}
        initialStatus={newTaskStatus}
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