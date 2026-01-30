import { Outlet, useNavigate } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/apiAuth";
import type { IPomodoroSettings } from "../modules/habit/PomodoroSettings";
import { Loader } from "lucide-react";
export interface IUser {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  settings: {
    theme: "light" | "dark" | "system";
    notificationsEnabled: boolean;
  };
  pomodoroSettings: IPomodoroSettings;
  tags: string[];
  habits: string[]; // references to Habit IDs
  journals: string[]; // references to Journal IDs
  notes: string[]; // references to Note IDs
  contacts: string[]; // references to Contact IDs
  lastLogin?: string; // or Date, if you parse it as a Date object
  createdAt: string; // or Date
  updatedAt: string; // or Date
}

function OSLayout() {
  const token = localStorage.getItem("evolv_token");

  const { data: user, isPending } = useQuery<IUser>({
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
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader size={64} />
      </div>
    );
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar username={user?.name as string} />
        <Outlet context={{ user }} />
      </SidebarProvider>
    </div>
  );
}

export default OSLayout;
