import { Outlet, useNavigate } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/apiAuth";

function OSLayout() {
  const token = localStorage.getItem("evolv_token");

  const { data: user, isPending } = useQuery({
    queryKey: ["currentUser"],
    queryFn: () => fetchCurrentUser(token!),
    enabled: !!token,
    retry: 1,
  });

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("evolv_token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar username={user.name} />
        <Outlet context={{ user }} />
      </SidebarProvider>
    </div>
  );
}

export default OSLayout;
