import { Link } from "@tanstack/react-router";
import { BookIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground border-b flex items-center justify-between px-4 sm:px-6 h-16">
      <Link to="/" className="flex items-center gap-2">
        <BookIcon className="w-6 h-6" />
        <span className="text-lg font-bold">Culinary</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="#" className="text-sm font-medium hover:underline">
          Home
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline">
          Recipes
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline">
          Community
        </Link>
        <Link href="#" className="text-sm font-medium hover:underline">
          Profile
        </Link>
      </nav>
      <Button variant="default" size="sm">
        Get Started
      </Button>
    </header>
  );
}
