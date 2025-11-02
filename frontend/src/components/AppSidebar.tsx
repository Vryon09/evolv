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
import { Link, useLocation, useNavigate } from "react-router";
import { usePomodoroTimer } from "@/contexts/usePomodoroTimer";

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
  const { timerState } = usePomodoroTimer();

  function handleLogout() {
    localStorage.removeItem("evolv_token");
    localStorage.removeItem("evolv_user");
    navigate("/login");
  }

  return (
    <Sidebar className="border-transparent">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-border">
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
                        ? `bg-muted hover:bg-muted`
                        : `hover:bg-muted`
                    }
                  >
                    <a
                      onClick={() => {
                        if (location.pathname.split("/")[2] === item.url)
                          return;

                        if (
                          location.pathname === "/app/habit" &&
                          timerState === "running"
                        ) {
                          const isConfirmed = confirm(
                            "Pomodoro timer will reset when you go to another module.",
                          );
                          if (isConfirmed) {
                            navigate(`/app/${item.url}`);
                          }
                          return;
                        }

                        navigate(`/app/${item.url}`);
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton className="hover:bg-muted cursor-pointer">
            {username}
          </SidebarMenuButton>
          <SidebarMenuButton
            className="hover:bg-muted cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
