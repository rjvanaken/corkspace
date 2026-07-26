import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { PriorityId } from "@/lib/constants";
import { MoreHorizontal } from "lucide-react";
import Priority from "./Priority";

interface TaskCardProps {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "in_review" | "done";
  user_id: string;
  created_at: string;
  description: string;
  priority: PriorityId;
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  user_id,
  created_at,
  priority,
}: TaskCardProps) {

    const borderColorClass = {
    todo: "border-column-todo",
    in_progress: "border-column-in_progress",
    in_review: "border-column-in_review",
    done: "border-column-done",
  }[status];
  return (
    <Card className={`py-3 gap-4 px-4 border-t-4 ${borderColorClass}`}>
      <div className="flex flex-row items-center items-center text-primary gap-5 justify-between">
        <CardTitle className="items-start flex-1">{title}</CardTitle>
        <button className="rounded-full justify-end">
          <MoreHorizontal className="size-5 flex-1 text-foreground" />
        </button>
      </div>
      <CardDescription className="items-start">{description}</CardDescription>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-start gap-2">
          <Priority priority={priority}></Priority>
          <span>date</span>
        </div>
        <span>user</span>
      </div>
    </Card>
  );
}