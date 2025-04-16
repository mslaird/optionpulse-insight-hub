
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNavigation } from "./SidebarNavigation";

interface DesktopSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const DesktopSidebar = ({ 
  isCollapsed, 
  toggleSidebar 
}: DesktopSidebarProps) => {
  return (
    <aside className={cn(
      "fixed h-full top-0 left-0 z-40 transition-all duration-300 bg-sidebar",
      "border-r border-border hidden md:flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <SidebarHeader isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <SidebarNavigation isCollapsed={isCollapsed} />
    </aside>
  );
};
