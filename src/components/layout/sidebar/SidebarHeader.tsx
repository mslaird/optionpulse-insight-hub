
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";

interface SidebarHeaderProps {
  isCollapsed: boolean;
  toggleSidebar?: () => void;
}

export const SidebarHeader = ({ isCollapsed, toggleSidebar }: SidebarHeaderProps) => {
  // Create a handler that checks if the function exists
  const handleToggle = () => {
    if (toggleSidebar) {
      console.log("SidebarHeader: Toggle button clicked");
      toggleSidebar();
    }
  };

  return (
    <div className="flex items-center justify-between p-4 h-16 bg-[#1C2526]">
      {!isCollapsed ? (
        <div className="flex items-center w-full justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo collapsed={false} />
          </Link>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggle}
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft size={20} />
          </Button>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Link to="/" className="mx-auto">
            <Logo collapsed={true} />
          </Link>
        </div>
      )}
    </div>
  );
};
