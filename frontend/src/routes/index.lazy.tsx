import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-primary to-primary-foreground">
        <div className="container px-4 md:px-6 text-primary-foreground">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Discover the Joy of Cooking
              </h1>
              <p className="text-lg md:text-xl">
                Explore a world of delicious recipes, coonect with a community
                of food enthusiasts, and unleash your culinary creativity.
              </p>
              <div className="flex gap-4">
                <Button size="lg">Get Started</Button>
                <Button variant={"outline"} size={"lg"}>
                  Explore Recipes
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="/Hero.jpeg"
                alt="curllinary"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <CardComponent
              title="Recipes"
              description="Browse our colletion of decilious recipes."
              image="/homemade-pasta-carbonara.jpeg"
              contentTitle="Homemade Pasta Carbonara"
              contentDescription="A classic Italian dish made with fresh pasta, crispy pancetta, and a creamy egg-based sauce."
              linkText="View all recipes"
            />
            <CardComponent
              title="Community"
              description="Connect with fellow food enthusiasts."
              image="/community.jpeg"
              contentTitle="Join the Culinary Community"
              contentDescription="Share recipes, connect with like-minded foodies, and get inspired."
              linkText="Explore the community"
            />
            <CardComponent
              title="Profile"
              description="Showcase your culinary skills and connect with others."
              image="/homemade-pasta-carbonara.jpeg"
              contentTitle="Your culinary profile"
              contentDescription="Share your recipes, connect with others, and showcase your culinary skills."
              linkText="View Your Profile"
            />
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Join the Culinary Community
            </h2>
            <p className="text-lg md:text-xl">
              Connect with fellow food enthusiasts, share recipes, and discover
              new culinary inspirations.
            </p>
            <div>
              <Button asChild variant={"secondary"} size="lg">
                <Link to="/auth/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

interface Props {
  title: string;
  description: string;
  image: string;
  contentTitle: string;
  contentDescription: string;
  linkText: string;
}

function CardComponent(props: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="group">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={props.image}
                width={400}
                height={300}
                alt="Recipe"
                className="object-cover w-full h-full duration-200 ease-in-out group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="mt-2 grid gap-1">
              <div className="text-sm font-medium">{props.contentTitle}</div>
              <div className="text-sm text-muted-foreground line-clamp-2">
                {props.contentDescription}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={props.linkText} className="text-primary hover:underline">
          {props.linkText}
        </Link>
      </CardFooter>
    </Card>
  );
}
