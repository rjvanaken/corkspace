import logo from "@/assets/logo-light-mode.png";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function MainHeader({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (value: string) => void }) {
  return (
      <div className="">
    <header className=" flex-row flex w-full items-center justify-between px-6 py-3 border-b border-border shrink-0">
      <div className="w-full"><img src={logo} alt="Corkspace" className="h-12 w-auto" /> </div>

<div className="flex w-1/4 flex-row">
  <Input icon={<Search size={14} />}
        className="bg-card"
        placeholder="Search for a task or label"
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        ></Input>
        </div>
    </header>
  </div>
  );
}