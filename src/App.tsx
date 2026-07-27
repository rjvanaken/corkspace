import { MainHeader } from "@/components/custom/Header/MainHeader";
import { Toolbar } from "@/components/custom/Header/Toolbar";
import Board from "./components/custom/Board";
import TaskModal from "./components/custom/Board/TaskModal";

export default function App() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <MainHeader></MainHeader>
      <Toolbar></Toolbar>
      <TaskModal></TaskModal>
      <main className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        <Board></Board>
      </main>

    </div>
  );
}