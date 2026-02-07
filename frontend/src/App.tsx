import { Route, Routes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OSLayout from "./components/layout/OSLayout";
import Dashboard from "./components/modules/dashboard/Dashboard";
import Habit from "./components/modules/habit/Habit";
import Mood from "./components/modules/mood/Mood";
import Finance from "./components/modules/finance/Finance";
import { PomodoroTimerProvider } from "./contexts/PomodoroTimerContext";
import { MoodProvider } from "./contexts/MoodContext";
import Journals from "./components/modules/mood/journal/Journals";
import MoodPage from "./components/modules/mood/MoodPage";
import MoodCalendar from "./components/modules/mood/MoodCalendar";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <MoodProvider>
        <PomodoroTimerProvider>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
              </Route>
              <Route path="/app" element={<OSLayout />}>
                <Route path="/app/dashboard" element={<Dashboard />} />
                <Route path="/app/habit" element={<Habit />} />
                <Route path="/app/mood" element={<Mood />}>
                  <Route path="/app/mood/" element={<MoodPage />} />
                  <Route path="/app/mood/journals" element={<Journals />} />
                  <Route path="/app/mood/calendar" element={<MoodCalendar />} />
                </Route>
                <Route path="/app/finance" element={<Finance />} />
              </Route>
            </Routes>
          </QueryClientProvider>
        </PomodoroTimerProvider>
      </MoodProvider>
    </AuthProvider>
  );
}

export default App;
