
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader = ({ isCollapsed, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 h-16 bg-[#1C2526]">
      {!isCollapsed ? (
        <Link to="/" className="flex items-center gap-2">
          <Logo collapsed={false} />
        </Link>
      ) : (
        <Link to="/" className="mx-auto">
          <Logo collapsed={true} />
        </Link>
      )}
      {!isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="ml-auto"
        >
          <Menu size={20} />
        </Button>
      )}
      {isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mx-auto"
        >
          <Menu size={20} />
        </Button>
      )}
    </div>
  );
};
