import TaskCard from "@/components/custom/Board/TaskCard";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { ColumnEmptyMessages, type ColumnId } from "@/lib/constants";
import { Plus } from "lucide-react";

const COLUMN_BORDER_COLOR = "#7C8B90";

export default function Column({ label, status, tasks, onEditTask, onDeleteTask, onAddTask, userLabels, isSearching}: { label: string; status: ColumnId; tasks: any[]; onEditTask: (task: any) => void; onDeleteTask: (task: any) => void; onAddTask: (status: string) => void; userLabels : any[]; isSearching: boolean}) {
  const tasksInThisColumn = tasks.filter((t) => t.status === status);
  const countForColumn = tasks.filter((t) => t.status === status).length;

  const [isScrolled, setIsScrolled] = useState(false);
  const { setNodeRef} = useDroppable({ id: status });

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  }

  return (
<div
  ref={setNodeRef}
  className="flex-1 max-w-[1500px] min-w-[100px] basis-0 flex flex-col h-full bg-card border-t-0 border-l ring-1border-r border-b shadow rounded-lg"
    >
      <div style={{ borderColor: COLUMN_BORDER_COLOR}}
      className="p-0 m-0 border-t-4 rounded-lg">
      <div className={`flex items-center gap-3 px-6 py-6 shrink-0 ${isScrolled ? "border-b border-border" : ""}`}>
        <span className="flex-1 text-xl font-bold text-foreground">{label}</span>       
        <div className="rounded-full h-6 min-w-6 px-2 flex items-center justify-center"
         style={{ backgroundColor: "#70707024" }}
        >
        <p className="text-sm font-bold text-center text-primary">{countForColumn}</p>
</div>
        <button
          type="button"
          onClick={() => onAddTask(status)}
          className="rounded-full h-6 w-6 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-neutral-500/10 transition-colors"
        >
          <Plus size={16} />
        </button>
        </div>
      </div>
      

      <div
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3">
        {tasksInThisColumn.length === 0 ? (
          isSearching ? (
            <p className="text-sm text-muted-foreground text-center py-6">No matches in this column</p>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-6">{ColumnEmptyMessages[status]}</p>
          )
        ) : (
          tasksInThisColumn.map((task) => (
            <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            status={task.status}
            priority={task.priority}
            description={task.description}
            user_id={task.user_id}
            created_at={task.created_at}
            userLabels={userLabels}
            labelIds={task.labelIds}
            onEditClick={() => onEditTask(task)}
            onDeleteClick={() => onDeleteTask(task)}
            ></TaskCard>
          ))
        )}
      </div>
    </div>
  );
}