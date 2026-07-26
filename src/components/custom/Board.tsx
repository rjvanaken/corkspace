import Column from "./Board/Column";

export default function Board() {
  return (
    <div className="flex-1 flex justify-center overflow-hidden bg-background p-4">
      <div className="w-full max-w-[1400px] flex gap-4 bg-muted border border-border rounded-lg p-4">
        <Column label="To Do"></Column>
        <Column label="In Progress"></Column>
        <Column label="In Review"></Column>
        <Column label="Done"></Column>
      </div>
    </div>
  );
}