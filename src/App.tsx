import { MainHeader } from "@/components/custom/Header/MainHeader";
import { Toolbar } from "@/components/custom/Header/Toolbar";

export default function App() {
  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      <MainHeader></MainHeader>
      <Toolbar></Toolbar>
    </div>
  );
}