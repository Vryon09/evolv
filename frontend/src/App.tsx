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
import Knowledge from "./components/modules/knowledge/Knowledge";
import Opportunity from "./components/modules/opportunity/Opportunity";
import Finance from "./components/modules/finance/Finance";
import { PomodoroTimerProvider } from "./contexts/PomodoroTimerContext";
import { MoodProvider } from "./contexts/MoodContext";
import Journals from "./components/modules/mood/journal/Journals";
import MoodPage from "./components/modules/mood/MoodPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
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
              </Route>
              <Route path="/app/knowledge" element={<Knowledge />} />
              <Route path="/app/opportunity" element={<Opportunity />} />
              <Route path="/app/finance" element={<Finance />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </PomodoroTimerProvider>
    </MoodProvider>
  );
}

export default App;
