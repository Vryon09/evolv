import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AppLayout from "./components/AppLayout";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
