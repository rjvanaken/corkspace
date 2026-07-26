export function Toolbar() {
  return (
    <div className="flex items-center justify-between px-6 py-2 border-b border-border shrink-0">
      <div className="h-8 px-3 text-muted-foreground text-s flex items-center">
        Search (placeholder)
      </div>

      <div className="flex items-center gap-2">
        <div className="h-8 px-3 text-muted-foreground text-s flex items-center">
          Filter (placeholder)
        </div>

        <div className="h-8 px-3 text-muted-foreground text-s flex items-center">
          New Task (placeholder)
        </div>
      </div>
    </div>
  );
}