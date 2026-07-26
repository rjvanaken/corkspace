import { Columns } from "@/lib/constants";
import Column from "./Board/Column";
import {tasks} from "@/lib/dummy-data";


const todo = Columns.find((c) => c.id === "todo")!;
const inProgress = Columns.find((c) => c.id === "in_progress")!;
const inReview = Columns.find((c) => c.id === "in_review")!;
const done = Columns.find((c) => c.id === "done")!;

export default function Board() {
  return (
    <div className="flex-1 flex justify-center h-screen overflow-hidden bg-background p-4">
      <div className="w-full max-w-[1400px] flex gap-4 bg-muted border border-border rounded-lg p-4">
        <Column label="To Do" status={todo.id} tasks={tasks}></Column>
        <Column label="In Progress" status={inProgress.id} tasks={tasks}></Column>
        <Column label="In Review" status={inReview.id} tasks={tasks}></Column>
        <Column label="Done" status={done.id} tasks={tasks}></Column>
      </div>
    </div>
  );
}