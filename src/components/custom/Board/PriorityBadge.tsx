import { Priorities, fadedColor, type PriorityId } from "@/lib/constants";

interface PriorityBadgeProps {
  priority: PriorityId;
  selectedPriority: PriorityId;
  onSelect: (priority: PriorityId) => void;
}

export default function PriorityBadge({ priority, selectedPriority, onSelect }: PriorityBadgeProps) {
  const match = Priorities.find((p) => p.id === priority);
  const selected = priority === selectedPriority;

  return (
    <button onClick={() => onSelect(priority)} className="flex-1">
      <div
        className="bg-card rounded-lg py-2.5 flex flex-col items-center gap-2 shadow-sm border"
        style={{
          backgroundColor: selected && match ? fadedColor(match.hex) : undefined,
          borderColor: selected ? match?.hex : undefined,
        }}
      >
        <span
          className="text-sm text-muted-foreground"
          style={{
            color: selected ? match?.hex : undefined,
            fontWeight: selected ? 700 : 500,
          }}
        >
          {match?.label}
        </span>
      </div>
    </button>
  );
}