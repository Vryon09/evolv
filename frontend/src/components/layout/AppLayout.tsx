import { Outlet } from "react-router";
import Nav from "./Nav";

function AppLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default AppLayout;
