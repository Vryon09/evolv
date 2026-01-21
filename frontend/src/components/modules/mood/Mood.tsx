import ModuleHeader from "@/components/layout/ModuleHeader";
import ModuleLayout from "@/components/layout/ModuleLayout";
import { Outlet, useLocation } from "react-router";

function Mood() {
  const location = useLocation();

  const pathname = location.pathname
    .split("/")
    .filter((name) => name !== "" && name !== "app")
    .map((name) => {
      const nameArr = name.split("");
      const firstLetter = nameArr.shift()?.toUpperCase();
      return firstLetter + nameArr.join("");
    })
    .join("/");

  return (
    <ModuleLayout>
      <ModuleHeader title={pathname} />
      <Outlet />
    </ModuleLayout>
  );
}

export default Mood;
