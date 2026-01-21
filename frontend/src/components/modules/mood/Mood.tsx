import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import { Outlet, useLocation } from "react-router";

function Mood() {
  const location = useLocation();

  const pathname = location.pathname
    .split("/")
    .filter((name) => name !== "" && name !== "app")
    .map((segment) => segment[0].toUpperCase() + segment.slice(1))
    .join(" / ");

  return (
    <ModuleLayout>
      <ModuleHeader title={pathname} />
      <Outlet />
    </ModuleLayout>
  );
}

export default Mood;
