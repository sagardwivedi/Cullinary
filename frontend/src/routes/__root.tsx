import { buttonVariants } from "@/components/ui/button"
import { Link, Outlet, createRootRoute } from "@tanstack/react-router"
import { Suspense, lazy } from "react"

const loadDevtools = () =>
  Promise.all([
    import("@tanstack/router-devtools"),
    import("@tanstack/react-query-devtools"),
  ]).then(([routerDevtools, reactQueryDevtools]) => {
    return {
      default: () => (
        <>
          <routerDevtools.TanStackRouterDevtools />
          <reactQueryDevtools.ReactQueryDevtools />
        </>
      ),
    }
  })

const TanStackDevtools =
  process.env.NODE_ENV === "production" ? () => null : lazy(loadDevtools)

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div className="antialiased">
      <div className="p-6 flex gap-2 justify-end">
        <Link to="/auth/login" className={buttonVariants()}>
          Log In
        </Link>{" "}
        <Link
          to="/auth/signup"
          className={buttonVariants({ variant: "outline" })}
        >
          Sign Up
        </Link>
      </div>
      <hr />
      <div className="h-[calc(100vh_-_89px)]">
        <Outlet />
      </div>
      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </div>
  )
}
