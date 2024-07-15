import { BookIcon, HomeIcon } from "lucide-react";

export function Sidebar() {
  return (
    <header className="p-2">
      <div>
        <BookIcon />
      </div>
      {/* Desktop navigation */}
      <div>
        <HomeIcon />
      </div>

      {/* Small Screen Navigation */}

      {/* Mobile Navigation */}
    </header>
  );
}
