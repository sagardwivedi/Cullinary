import { isLoggedIn } from "@/hooks/useAuth";
import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export function RequiredAuth({ children }: { children: ReactNode }) {
  const authed = isLoggedIn();
  const location = useLocation();

  return authed === true ? (
    children
  ) : (
    <Navigate to="/auth/login" replace state={{ path: location.pathname }} />
  );
}
