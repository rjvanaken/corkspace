import { Circle } from "lucide-react";
import TaskCard from "@/components/custom/Board/TaskCard";

export default function Column({ label, status, tasks }: { label: string; status: string; tasks: any[] }) {
  const tasksInThisColumn = tasks.filter((t) => t.status === status);

  return (
    <div className="flex-1 max-w-[800px] flex flex-col h-full bg-card rounded-lg overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-6 shrink-0">
        <span className="text-xl font-bold text-foreground">{label}</span>
        <Circle></Circle>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-3">
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