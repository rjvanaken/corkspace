import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import type { PriorityId } from "@/lib/constants";
import { GripVertical, MoreHorizontal } from "lucide-react";
import Priority from "./Priority";
import { useDraggable } from "@dnd-kit/core";

interface TaskCardProps {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "in_review" | "done";
  user_id: string;
  created_at: string;
  description: string;
  priority: PriorityId;
  isOverlay?: boolean;
  onEditClick: () => void ;
}

export default function TaskCard({
  id,
  title,
  description,
  status,
  user_id,
  created_at,
  priority,
  isOverlay = false,
  onEditClick,
}: TaskCardProps) {

  const borderColorClass = {
    todo: "border-column-todo",
    in_progress: "border-column-in_progress",
    in_review: "border-column-in_review",
    done: "border-column-done",
  }[status];

  const draggable = useDraggable({ id: id });

  //sets a transformation style used in the card if dragging
  const style = !isOverlay && draggable.transform
    ? {
        transform: `translate3d(${draggable.transform.x}px, ${draggable.transform.y}px, 0)`,
        opacity: draggable.isDragging ? 0.9 : 1,
      }
    : undefined;

  return (
    <Card
      ref={isOverlay ? undefined : draggable.setNodeRef}
      style={style}
      className={`shadow shrink-0 min-w-0 py-3 w-full gap-4 px-4 border border-neutral-300 ${isOverlay ? "shadow-xl" : ""}`}
    >
      <div className="flex flex-row items-center w-full gap-2 text-primary justify-between">
        <button
          {...(isOverlay ? {} : draggable.listeners)}
          {...(isOverlay ? {} : draggable.attributes)}
          className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        >
          <GripVertical className="size-4" />
        </button>
        <CardTitle className="items-start flex-1">{title}</CardTitle>
        <button className="rounded-full justify-end">
          <MoreHorizontal onClick={onEditClick} className="size-5 flex-1 text-foreground" />
        </button>
      </div>
      <CardDescription className=" w-full items-start">{description}</CardDescription>
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