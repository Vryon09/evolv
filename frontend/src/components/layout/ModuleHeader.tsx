import { Separator } from "../ui/separator";
import { SidebarTrigger } from "../ui/sidebar";

function ModuleHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center border-b border-neutral-950/10 p-2">
      <SidebarTrigger className="cursor-pointer" />
      <Separator
        orientation="vertical"
        className="mx-4 bg-neutral-950/10 data-[orientation=vertical]:h-4"
      />
      <h1 className="font-semibold">{title}</h1>
    </header>
  );
}

export default ModuleHeader;
