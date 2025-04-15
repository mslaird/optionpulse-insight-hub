import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Home,
  Menu,
  Trophy,
  Users,
  BookMarked,
  Bell,
  Settings,
  X,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/brand/Logo";

type SidebarItem = {
  path: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface SidebarProps {
  onToggle?: (collapsed: boolean) => void;
}

export const Sidebar = ({ onToggle }: SidebarProps) => {
  const location = useLocation();
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

  const sidebarItems: SidebarItem[] = [
    {
      path: "/",
      label: "Dashboard",
      icon: <Home size={20} />,
      active: location.pathname === "/"
    },
    {
      path: "/options-chain",
      label: "Options Chain",
      icon: <BarChart3 size={20} />,
      active: location.pathname === "/options-chain"
    },
    {
      path: "/tools",
      label: "Tools",
      icon: <Calculator size={20} />,
      active: location.pathname === "/tools"
    },
    {
      path: "/education",
      label: "Education Hub",
      icon: <BookOpen size={20} />,
      active: location.pathname === "/education"
    },
    {
      path: "/community",
      label: "Community",
      icon: <Users size={20} />,
      active: location.pathname === "/community"
    },
    {
      path: "/challenges",
      label: "Challenges",
      icon: <Trophy size={20} />,
      active: location.pathname === "/challenges"
    }
  ];

  const secondarySidebarItems: SidebarItem[] = [
    {
      path: "/alerts",
      label: "Alerts",
      icon: <Bell size={20} />,
      active: location.pathname === "/alerts"
    },
    {
      path: "/watchlist",
      label: "Watchlist",
      icon: <BookMarked size={20} />,
      active: location.pathname === "/watchlist"
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings size={20} />,
      active: location.pathname === "/settings"
    }
  ];

  return (
    <>
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleMobileSidebar}
          className="text-foreground"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      
      <aside className={cn(
        "fixed h-full top-0 left-0 z-40 transition-all duration-300 bg-sidebar",
        "border-r border-border hidden md:flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}>
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
        
        <div className="flex flex-col flex-1 py-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            {sidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  item.active 
                    ? "bg-sidebar-accent text-primary" 
                    : "text-sidebar-foreground",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <div className={item.active ? "text-primary" : "text-sidebar-foreground"}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </nav>
          
          <div className="px-2 mt-8">
            <div className="mb-2 px-3">
              {!isCollapsed && (
                <p className="text-xs text-muted-foreground">UTILITIES</p>
              )}
            </div>
            {secondarySidebarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-all",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  item.active 
                    ? "bg-sidebar-accent text-primary" 
                    : "text-sidebar-foreground",
                  isCollapsed ? "justify-center" : "justify-start"
                )}
              >
                <div className={item.active ? "text-primary" : "text-sidebar-foreground"}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      
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
          
          <div className="flex flex-col flex-1 py-4 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-all",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.active 
                      ? "bg-sidebar-accent text-primary" 
                      : "text-sidebar-foreground"
                  )}
                  onClick={toggleMobileSidebar}
                >
                  <div className={item.active ? "text-primary" : "text-sidebar-foreground"}>
                    {item.icon}
                  </div>
                  <span className="ml-3 truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
            
            <div className="px-2 mt-8">
              <div className="mb-2 px-3">
                <p className="text-xs text-muted-foreground">UTILITIES</p>
              </div>
              {secondarySidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md transition-all",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    item.active 
                      ? "bg-sidebar-accent text-primary" 
                      : "text-sidebar-foreground"
                  )}
                  onClick={toggleMobileSidebar}
                >
                  <div className={item.active ? "text-primary" : "text-sidebar-foreground"}>
                    {item.icon}
                  </div>
                  <span className="ml-3 truncate">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
