import logo from "@/assets/logo-light-mode.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

interface MainHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onNewTaskClick: () => void;
}

export function MainHeader({ searchQuery, onSearchChange, onNewTaskClick }: MainHeaderProps) {
  return (
      <div className="bg-border">
    <header className=" flex-row flex w-full items-center justify-between px-8 py-3 border-b border-border shrink-0">
      <div className="w-1/7"><img src={logo} alt="Corkspace" className="h-12 w-auto" /> </div>

<div className="flex w-2/5 flex-row">
  <Input icon={<Search size={14} />}
        className="bg-card w-full"
        placeholder="Search for a task or label"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        ></Input>
        </div>
        <div>
          <Button
            className="px-4 bg-button hover:bg-button/80 transition-colors"
            size="lg"
            onClick={onNewTaskClick}
          >
            <Plus size={14} />
            New Task
          </Button>

        </div>
    </header>
  </div>
  );
}