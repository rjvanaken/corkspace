import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {DialogClose} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import PriorityBadge from "./PriorityBadge";
import { Priorities, type PriorityId } from "@/lib/constants";

export default function TaskModal() {

// interface TaskModalProps {
// mode : "new" | "edit ;

// }



  const [open, setOpen] = useState(false);
  const [priority, setPriority] = useState<PriorityId>("normal");

  return (
    <>
    <button onClick={() => setOpen(true)}> <Plus/> New Task</button>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="pb-7">
<div className="flex-col flex gap-3">
        <DialogHeader className="flex flex-row items-center justify-between pb-4">
          <DialogTitle className="text-xl font-bold text-foreground">New Task</DialogTitle>
          <DialogClose className="h-5 w-auto">
          </DialogClose>
        </DialogHeader>
      <div className="gap-2 flex-col flex">
        <p className="font-medium text-foreground">TITLE</p>
        <Input className="bg-card"></Input>
     </div>
     <div className="gap-2 flex-col flex">
        <p className="font-medium text-foreground">DESCRIPTION</p>
        <Textarea></Textarea>
      </div>
        
     <div className="gap-2 flex-col flex">
        <p className="font-medium text-foreground">PRIORITY</p>
        <div className="flex flex-row flex-1 gap-3">
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

      </DialogContent>
    </Dialog>
    </>
  );
}