import { Plus } from "lucide-react";
import TaskModal from "@/components/custom/Board/TaskModal";

export function Toolbar() {
  return (
    <div className="flex items-center justify-between px-8 py-2 border-b border-border shrink-0">
      <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
        Team roster (placeholder)
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
          Filter (placeholder)
        </div>
      <TaskModal></TaskModal>
      </div>
    </div>
  );
}