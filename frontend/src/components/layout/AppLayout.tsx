import { Outlet } from "react-router";
import Nav from "./nav";

function AppLayout() {
  return (
    <div>
      <Nav />
      <Outlet />
    </div>
  );
}

export default AppLayout;
