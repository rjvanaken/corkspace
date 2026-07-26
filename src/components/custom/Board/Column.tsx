import { Circle } from "lucide-react";

export default function Column({ label }: { label: string }) {
  return (
    <div className="flex-1 flex-col h-full w-full flex items-center justify-center text-muted-foreground text-xs">
  <div className="px-6 py-4 w-full items-center justify gap-5 flex-row flex-1 flex">
    <p className="text-xl font-bold">{label}</p>
    <Circle />
  </div>
      <p className="w-full h-full text-center">{label} placeholder</p>
    </div>
  );
}