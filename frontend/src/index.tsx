import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@/index.css";
import { OpenAPI } from "./client";
import { RequiredAuth } from "./components/common/RequiredAuth";
import ErrorPage from "./components/common/error-page";
import HomePage from "./routes";
import LoginPage from "./routes/auth/login";
import SignupPage from "./routes/auth/signup";
import UserPage from "./routes/userId";

OpenAPI.BASE = "http://localhost:8000";
OpenAPI.TOKEN = async () => {
  return localStorage.getItem("access_token") || "";
};
// Create a new router instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/auth/signup",
    element: <SignupPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/:userId",
    element: (
      <RequiredAuth>
        <UserPage />
      </RequiredAuth>
    ),
  },
]);

const queryClient = new QueryClient();

const rootEl = document.getElementById("root");
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
