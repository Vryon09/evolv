import { Route, Routes } from "react-router";
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

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/app" element={<OSLayout />}>
        <Route path="/app/dashboard" element={<Dashboard />} />
        <Route path="/app/habit" element={<Habit />} />
        <Route path="/app/mood" element={<Mood />} />
        <Route path="/app/knowledge" element={<Knowledge />} />
        <Route path="/app/opportunity" element={<Opportunity />} />
      </Route>
    </Routes>
  );
}

export default App;
