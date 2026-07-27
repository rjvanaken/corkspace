import { Plus } from "lucide-react";

export function Toolbar() {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-border shrink-0">
      <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
        Search (placeholder)
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 px-3 text-muted-foreground text-sm flex items-center">
          Filter (placeholder)
        </div>

        <button className="flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground px-3 py-1.5 text-sm font-medium hover:opacity-90 transition-opacity">
          <Plus size={14} />
          New Task
        </button>
      </div>
    </div>
  );
}