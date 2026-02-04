import { Banknote, Home, LogOut, Meh, TreePalm } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
    title: "Finance",
    url: "finance",
    icon: Banknote,
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
                    className={cn(
                      "hover:bg-muted active:bg-accent cursor-pointer",
                      location.pathname.split("/")[2] === item.url
                        ? `bg-muted`
                        : ``,
                    )}
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
                      <span className="select-none">{item.title}</span>
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
          <SidebarMenuButton className="hover:bg-muted active:bg-accent cursor-pointer">
            <span className="select-none">{username}</span>
          </SidebarMenuButton>
          <SidebarMenuButton
            className="hover:bg-muted active:bg-accent cursor-pointer"
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
