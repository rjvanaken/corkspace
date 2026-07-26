export default function Column({ label }: { label: string }) {
  return (
    <div className="flex-1 max-w-[800px] flex flex-col h-full bg-card rounded-lg overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 shrink-0">
        <span className="text-sm font-bold text-foreground">{label}</span>
        <div className="h-6 w-6 rounded-full border border-border"></div>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <p className="text-xs text-muted-foreground">{label} placeholder</p>
      </div>
    </div>
  );
}