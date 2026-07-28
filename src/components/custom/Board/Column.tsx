import TaskCard from "@/components/custom/Board/TaskCard";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Columns, fadedColorSlight } from "@/lib/constants";

// inside Column, using status to find the matching column's hex

export default function Column({ label, status, tasks, onEditTask,}: { label: string; status: string; tasks: any[]; onEditTask: (task: any) => void}) {
  const tasksInThisColumn = tasks.filter((t) => t.status === status);
  const countForColumn = tasks.filter((t) => t.status === status).length;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });
  
  const columnHex = Columns.find((c) => c.id === status)?.hex ?? "#000000";

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  }

  return (
<div
  ref={setNodeRef}
  className="flex-1 max-w-[800px] min-w-0 basis-0 min-w-0 flex flex-col h-full bg-card border border-1 shadow rounded-lg"
    >
      
      <div className={`flex items-center gap-3 px-6 py-6 shrink-0 ${isScrolled ? "border-b border-border" : ""}`}>
        <span className="flex-1 text-xl font-bold text-foreground">{label}</span>       
        <div className="rounded-full h-6 w-10 pt-0 items-center"
         style={{ backgroundColor: fadedColorSlight(columnHex), borderColor: columnHex, borderWidth: 2}}
        > 
        <p className="text-sm font-bold text-center text-primary"> {countForColumn}</p>

        </div>
      </div>

      <div 
      onScroll={handleScroll}
      className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3">
        {tasksInThisColumn.map((task) => (
          <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          priority={task.priority}
          description={task.description}
          user_id={task.user_id}
          created_at={task.created_at}
          onEditClick={() => onEditTask(task)}
          ></TaskCard>
        ))}
      </div>
    </div>
  );
}