import { Brain, Home, LogOut, Meh, Network, TreePalm } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Link, NavLink, useLocation, useNavigate } from "react-router";

const items = [
  {
    title: "Home",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Habit",
    url: "habit",
    icon: TreePalm,
  },
  {
    title: "Mood",
    url: "mood",
    icon: Meh,
  },
  {
    title: "Knowledge",
    url: "knowledge",
    icon: Brain,
  },
  {
    title: "Opportunity",
    url: "opportunity",
    icon: Network,
  },
];

function AppSidebar({ username }: { username: string }) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("evolv_token");
    localStorage.removeItem("evolv_user");
    navigate("/login");
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-neutral-200">
              <Link to="/app/dashboard">eVolV</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      location.pathname.split("/")[2] === item.url
                        ? `bg-neutral-200 hover:bg-neutral-200`
                        : `hover:bg-neutral-200`
                    }
                  >
                    <NavLink to={`/app/${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleLogout}>
            {username}
          </SidebarMenuButton>
          <SidebarMenuButton onClick={handleLogout}>
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
