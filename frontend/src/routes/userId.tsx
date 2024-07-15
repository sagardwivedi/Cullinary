import { Sidebar } from "@/components/common/Sidebar";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { Outlet } from "react-router-dom";

export default function UserPage() {
  const { user, logout } = useAuth();
  return (
    <main className="flex flex-row min-h-dvh">
      <Sidebar />
      <Outlet />
    </main>
  );
}
