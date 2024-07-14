import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { BookIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="bg-primary text-primary-foreground border-b flex items-center justify-between px-4 sm:px-6 h-16">
        <Link href="#" className="flex items-center gap-2">
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
          <div className="container px-4 md:px-6 text-primary-foreground">
            1
          </div>
        </section>
      </main>
    </div>
  );
}
