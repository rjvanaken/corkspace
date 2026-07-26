import Column from "@/components/custom/Board/Column";

export default function Board() {
  return (
    <div className="flex-1 flex">
      <Column label="To Do"></Column>
      <Column label="In Progress"></Column>
      <Column label="In Review"></Column>
      <Column label="Done"></Column>
    </div>
  );
}