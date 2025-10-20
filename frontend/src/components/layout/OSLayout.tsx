import { Outlet, useNavigate } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/services/apiAuth";
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
  pomodoroSettings: {
    pomodoro: number;
    short: number;
    long: number;
    autoPomodoro: boolean;
    autoBreak: boolean;
  };
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
    return <div>Loading...</div>;
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
