import logo from "@/assets/logo-dark-mode.png";
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
      <div className="bg-primary shadow">
    <header className=" flex-row flex w-full items-center justify-between px-8 py-3 shrink-0">
      <div className="w-1/7"><img src={logo} alt="Corkspace" className="h-12 w-auto" /> </div>

<div className="flex w-2/5 flex-row">
  <Input icon={<Search size={14} />}
        className="header-search-input bg-white/5 w-full border-none"
        style={{ color: "#ffffff", ["--header-search-placeholder" as string]: "#a3a3a3" } as React.CSSProperties}
        placeholder="Search for a task or label"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        ></Input>
        </div>
        <div>
          <Button
            className="px-4 bg-primary-foreground hover:bg-neutral-200/80 transition-colors text-primary"
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