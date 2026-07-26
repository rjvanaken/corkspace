export default function Column({ label }: { label: string }) {
  return (
    <div className="flex-1 h-full flex items-center justify-center text-muted-foreground text-xs">
      <p>{label} placeholder</p>
    </div>
  );
}