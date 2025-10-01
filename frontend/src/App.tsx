import { Route, Routes } from "react-router";
import AppLayout from "./components/layout/AppLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import OSLayout from "./components/layout/OSLayout";
import Dashboard from "./components/modules/dashboard/Dashboard";

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
      </Route>
    </Routes>
  );
}

export default App;
