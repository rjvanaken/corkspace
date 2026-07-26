import { Circle } from "lucide-react";
import TaskCard from "@/components/custom/Board/TaskCard";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function Column({ label, status, tasks }: { label: string; status: string; tasks: any[] }) {
  const tasksInThisColumn = tasks.filter((t) => t.status === status);

  const [isScrolled, setIsScrolled] = useState(false);
  const { setNodeRef, isOver } = useDroppable({ id: status });

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    setIsScrolled(e.currentTarget.scrollTop > 0);
  }

  return (
<div
  ref={setNodeRef}
  className="flex-1 max-w-[800px] flex flex-col h-full bg-card border border-1 shadow rounded-lg"
    >
      <div className={`flex items-center gap-3 px-6 py-6 shrink-0 ${isScrolled ? "border-b border-border" : ""}`}>
        <span className="text-xl font-bold text-foreground">{label}</span>
        <Circle></Circle>
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
          ></TaskCard>
        ))}
      </div>
    </div>
  );
}