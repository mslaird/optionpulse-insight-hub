
import { Link } from "react-router-dom";
import Logo from "@/components/brand/Logo";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

export const SidebarHeader = ({ isCollapsed }: SidebarHeaderProps) => {
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
    </div>
  );
};
