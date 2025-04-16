
import { useState } from "react";
import { DesktopSidebar } from "./sidebar/DesktopSidebar";
import { MobileSidebar } from "./sidebar/MobileSidebar";

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

export const Sidebar = ({ onToggle }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    
    if (onToggle) {
      onToggle(newCollapsedState);
    }
    
    const event = new CustomEvent('sidebar-toggle', { 
      detail: { collapsed: newCollapsedState } 
    });
    window.dispatchEvent(event);
  };
  
  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <DesktopSidebar 
        isCollapsed={isCollapsed} 
        toggleSidebar={toggleSidebar} 
      />
      
      <MobileSidebar 
        isMobileOpen={isMobileOpen} 
        toggleMobileSidebar={toggleMobileSidebar} 
      />
    </>
  );
};

export default Sidebar;
