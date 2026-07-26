import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";
import { Priorities } from "@/lib/constants";
import type { PriorityId } from "@/lib/constants";

interface PriorityProps {
  priority: PriorityId;
}

export default function Priority({ priority }: PriorityProps) {
  const match = Priorities.find((p) => p.id === priority);

  return (
    <Badge variant="default" className="bg-card pl-0 gap-2 items-center">
      <Circle size={10} color={match?.hex} fill={match?.hex} strokeWidth={0} className="items-center m-0" ></Circle>
      <span className="text-sm font-medium items-center text-muted-foreground">{match?.label}</span>
    </Badge>
  );
}