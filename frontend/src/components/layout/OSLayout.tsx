import { Outlet } from "react-router";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import type { IPomodoroSettings } from "../modules/habit/PomodoroSettings";
import { Loader } from "lucide-react";
import { useAuth } from "@/contexts/useAuth";
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
  const { user, loading } = useAuth();

  if (loading) {
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
