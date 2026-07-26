// src/components/Header/Header.tsx
import logo from "@/assets/logo-light-mode.png";

export function MainHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-border shrink-0">
      <img src={logo} alt="Corkspace" className="h-12 w-auto" />
      {/* TODO: If time allows, set breakpoints to turn into the C logo to avoid team collision */}

      <div className="h-8 px-3 rounded-full bg-muted text-muted-foreground text-xs flex items-center">
        Team roster (placeholder)
      </div>
    </header>
  );
}