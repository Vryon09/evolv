import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

function OSLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default OSLayout;
