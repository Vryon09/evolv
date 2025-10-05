import { Outlet } from "react-router";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";

function OSLayout() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="size-10 cursor-pointer" />
        <Outlet />
      </SidebarProvider>
    </div>
  );
}

export default OSLayout;
