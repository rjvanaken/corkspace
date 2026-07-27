import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {DialogClose} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { Priorities, type PriorityId } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";

interface Task {
    id: string;
    title: string;
    status: "todo" | "in_progress" | "in_review" | "done";
    priority: PriorityId
    description: string;
    user_id: string;
    created_at: string;
}


export default function TaskModal({
    open,
  onOpenChange,
  onSaved,
}:{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (task: any) => void;

}) {

  
  
  
  const [priority, setPriority] = useState<PriorityId>("normal");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  

  async function handleSave() {
          if (!title.trim()) return;
          const { data: sessionData } = await supabase.auth.getSession();
          console.log("current session user:", sessionData.session?.user?.id);
          const { data, error } = await supabase
              .from("tasks")
              .insert({
                  title: title,
                  description: description,
                  priority: priority,
                  status: "todo",

              })
              .select()
              .single();

          if (error) {
              console.log("save error:", error);
              return;
          }


          onSaved(data);
          setTitle("");
          setDescription("");
          setPriority("normal");
          // TODO: add the rest later
          onOpenChange(false);
      }




  return (
    <>


    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="pb-7 flex-col gap-8">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-foreground">New Task</DialogTitle>
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
</div>
        <div className="flex flex-row flex-1 w-full gap-3.5">
<Button
  className="flex-1"
  size="lg"
  variant="outline"
  onClick={() => onOpenChange(false)}
>
  Cancel
</Button>

<Button
  className="flex-1 bg-button hover:bg-button/80 transition-colors"
  size="lg"
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
