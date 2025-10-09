import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

function ModuleHeader({ title }: { title: string }) {
  return (
    <header className="flex justify-between border-b p-2">
      <div className="flex items-center">
        <SidebarTrigger className="cursor-pointer" />
        <Separator
          orientation="vertical"
          className="mx-4 data-[orientation=vertical]:h-4"
        />
        <h1 className="font-semibold">{title}</h1>
      </div>
    </header>
  );
}

export default ModuleHeader;
