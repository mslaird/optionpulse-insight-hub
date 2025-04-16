
import { useState } from "react";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const Sidebar = ({ isCollapsed = false, onToggle }: SidebarProps) => {
  // Use the prop for controlled state
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <DesktopSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={onToggle} 
      />
      
      <MobileSidebar 
        isMobileOpen={isMobileOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
    </>
  );
};

export default Sidebar;
