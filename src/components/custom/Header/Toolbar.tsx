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

      <button onClick={onNewTaskClick} className="flex items-center gap-1.5 rounded-md bg-primary text-secondary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity">
                <Plus size={14} />
                New Task
              </button>


      </div>
    </div>
  );
}