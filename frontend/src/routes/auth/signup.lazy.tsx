import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createLazyFileRoute("/auth/signup")({
  component: SignupPage,
});

export default function SignupPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Sign Up
              </h1>
              <p className="text-muted-foreground">
                Create your Culinary account to get started.
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="JohnDoe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth/login" className="underline">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
