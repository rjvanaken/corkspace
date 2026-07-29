import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {DialogClose} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { Priorities, type PriorityId } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import LabelPicker from "./LabelPicker";

interface Task {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "in_review" | "done";
    priority: PriorityId
    description: string;
    user_id: string;
    created_at: string;
    labelIds: string[];
}


export default function TaskModal({
    open,
  onOpenChange,
  onSaved,
  task,
  userLabels,
  onCreateLabel,
  initialStatus = "todo",
}:{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (task: any) => void;
  task?: Task;
  userLabels: any[];
  onCreateLabel: (name: string) => Promise<any>;
  initialStatus?: Task["status"];

}) {



  // pre-populate the form - empty for new task, filled for edit
  const [priority, setPriority] = useState<PriorityId>(task?.priority ?? "normal");
  const isEditMode = !!task;
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [status, setStatus] = useState<Task["status"]>(task?.status ?? initialStatus);
  const [selectedLabelIds, setSelectedLabelIds] = useState<string[]>(task?.labelIds ?? []);

  function handleToggleLabel(labelId: string) {
    setSelectedLabelIds((current) =>
      current.includes(labelId)
        ? current.filter((id) => id !== labelId)
        : [...current, labelId]
    );
  }

  // reset fields on close
  useEffect(() => {
  if (!open) {
    setTitle("");
    setDescription("");
    setPriority("normal");
    setStatus("todo");
    setSelectedLabelIds([]);
  }
}, [open]);

// pre-fill fields whenever the modal opens with a task to edit
  useEffect(() => {
    if (open) {
      setTitle(task?.title ?? "");
      setDescription(task?.description ?? "");
      setPriority(task?.priority ?? "normal");
      setStatus(task?.status ?? initialStatus);
      setSelectedLabelIds(task?.labelIds ?? []);
    }
  }, [open, task, initialStatus]);
  

  async function handleSave() {
          if (!title.trim()) return;
          const { data: sessionData } = await supabase.auth.getSession();
          console.log("current session user:", sessionData.session?.user?.id);
          
          const { data, error } = isEditMode
               ? await supabase
                .from("tasks")
                .update({
                  title: title,
                  description: description,
                  priority: priority,
                })
                .eq("id", task!.id)
                .select()
                .single()
          : await supabase
              .from("tasks")
              .insert({
                  title: title,
                  description: description,
                  priority: priority,
                  status: status,

              })
              .select()
              .single();

          if (error) {
              console.log("save error:", error);
              return;
          }

          const taskId = data.id;

          if (isEditMode) {
            const { error: clearError } = await supabase.from("task_labels").delete().eq("task_id", taskId);
            if (clearError) {
              console.log("label clear error:", clearError);
            }
          }

          if (selectedLabelIds.length > 0) {
            const { error: labelError } = await supabase
              .from("task_labels")
              .insert(selectedLabelIds.map((labelId) => ({ task_id: taskId, label_id: labelId })));
            if (labelError) {
              console.log("label save error:", labelError);
            }
          }

          onSaved({ ...data, labelIds: selectedLabelIds });
          setTitle("");
          setDescription("");
          setPriority("normal");
          setSelectedLabelIds([]);
          // TODO: add the rest later
          onOpenChange(false);
      }




  return (
    <>


    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-7 flex-col gap-8">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-foreground">{isEditMode ? "Edit Task" : "New Task"} </DialogTitle>
          <DialogClose className="h-5 w-auto">
          </DialogClose>
        </DialogHeader>
<div className="flex-col flex gap-3">
      <div className="gap-2 flex-col flex">
        <p className="font-medium text-muted-foreground">TITLE</p>
        <Input 
        className="bg-card"
        placeholder="What's the task?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ></Input>
     </div>
     <div className="gap-2 flex-col flex">
        <p className="font-medium text-muted-foreground">DESCRIPTION</p>
        <Textarea
        className="bg-card"
        placeholder="Add some more info"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        
        ></Textarea>
      </div>
        
     <div className="gap-2 flex-col flex">
        <p className="font-medium text-muted-foreground">PRIORITY</p>
        <div className="flex flex-row flex-1 gap-3.5">
          {Priorities.map((p) => (
            <PriorityBadge
              key={p.id}
              priority={p.id}
              selectedPriority={priority}
              onSelect={setPriority}
            ></PriorityBadge>
          ))}
        </div>
</div>
     <div className="gap-2 flex-col flex">
        <p className="font-medium text-muted-foreground">LABELS</p>
        <LabelPicker
          userLabels={userLabels}
          selectedLabelIds={selectedLabelIds}
          onToggle={handleToggleLabel}
          onCreateLabel={onCreateLabel}
        ></LabelPicker>
     </div>
</div>
        <div className="flex flex-rowflex-1 h-10 w-full gap-3.5 items-center">
<Button
  className="flex-1"
  size="lg"
  variant="outline"
  onClick={() => onOpenChange(false)}
>
  Cancel
</Button>

<Button
  className="flex-1 py-2 h-full bg-button hover:bg-button/80 transition-colors"
  size="lg"
  disabled={!title.trim()}
  onClick={() => handleSave()}
>
  Save Task
</Button>
            </div>

      </DialogContent>
      <DialogFooter>

      </DialogFooter>
    </Dialog>
    </>
  );
}
