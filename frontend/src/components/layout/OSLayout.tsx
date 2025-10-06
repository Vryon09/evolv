import { Outlet, useNavigate } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { useEffect } from "react";

function OSLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("evolv_token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="size-8 cursor-pointer" />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default OSLayout;
