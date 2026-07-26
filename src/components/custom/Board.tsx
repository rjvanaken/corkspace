import Column from "@/components/custom/Board/Column";

export default function Board() {
  return (
    <div className="flex-1 flex h-screen">
      <Column label="To Do"></Column>
      <div className="border-l border-border flex-1 flex">
        <Column label="In Progress"></Column>
      </div>
      <div className="border-l border-border flex-1 flex">
        <Column label="In Review"></Column>
      </div>
      <div className="border-l border-border flex-1 flex">
        <Column label="Done"></Column>
      </div>
    </div>
  );
}