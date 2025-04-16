
import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  BookOpen,
  Home,
  Trophy,
  Users,
  BookMarked,
  Bell,
  Settings,
  Calculator
} from "lucide-react";

export type SidebarItem = {
  path: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
};

export const useSidebarItems = () => {
  const location = useLocation();
  
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

  return { sidebarItems, secondarySidebarItems };
};

export const SidebarLink = ({ item, isCollapsed }: { item: SidebarItem, isCollapsed: boolean }) => {
  return (
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
  );
};
