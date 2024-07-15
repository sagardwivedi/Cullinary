import { Outlet, createRootRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { NotFound } from "@/components/common/NotFound";

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
    };
  });

const TanStackDevtools =
  process.env.NODE_ENV === "production" ? () => null : lazy(loadDevtools);

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex flex-col antialiased min-h-dvh">
        <Header />
        <Outlet />
        <Footer />
      </div>
      <Suspense>
        <TanStackDevtools />
      </Suspense>
    </>
  ),
  notFoundComponent: () => <NotFound />,
});
