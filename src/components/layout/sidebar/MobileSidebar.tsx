
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";
import { SidebarNavigation } from "./SidebarNavigation";

interface MobileSidebarProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

export const MobileSidebar = ({ 
  isMobileOpen, 
  toggleMobileSidebar 
}: MobileSidebarProps) => {
  return (
    <aside className={cn(
      "fixed inset-0 z-40 transition-all duration-300 md:hidden",
      isMobileOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="absolute inset-0 bg-black/50" onClick={toggleMobileSidebar} />
      <div className="absolute top-0 left-0 w-64 h-full bg-sidebar border-r border-border">
        <div className="flex items-center justify-between p-4 h-16 bg-[#1C2526]">
          <Link to="/" className="flex items-center gap-2">
            <Logo collapsed={false} />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            className="ml-auto"
          >
            <X size={20} />
          </Button>
        </div>
        
        <SidebarNavigation 
          isCollapsed={false} 
          isMobile={true}
          onMobileItemClick={toggleMobileSidebar}
        />
      </div>
    </aside>
  );
};
