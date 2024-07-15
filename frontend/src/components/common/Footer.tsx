import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background border-t flex items-center justify-between px-4 sm:px-6 h-16">
      <div className="text-sm text-muted-foreground">
        &copy; 2024 Culinary. All rights reserved.
      </div>
      <div className="flex gap-4">
        <Link href="#" className="text-sm hover:underline">
          Terms of Service
        </Link>
        <Link href="#" className="text-sm hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
