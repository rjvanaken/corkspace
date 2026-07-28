import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Toolbar({ onNewTaskClick }: { onNewTaskClick: () => void }) {
  return (
    <div className="flex items-center justify-between px-8 py-2 border-b border-border shrink-0">
      <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
        Team roster (placeholder)
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
          Filter (placeholder)
        </div>

              <Button
  className="flex-1 px-4 bg-button hover:bg-button/80 transition-colors"
  size="lg"
  onClick={onNewTaskClick}
>
  <Plus size={14} />
  New Task
</Button>


      </div>
    </div>
  );
}