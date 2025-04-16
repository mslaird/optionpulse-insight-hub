
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
  const pathname = location.pathname;
  const search = location.search;
  
  const sidebarItems: SidebarItem[] = [
    {
      path: "/",
      label: "Dashboard",
      icon: <Home size={20} />,
      active: pathname === "/"
    },
    {
      path: "/options-chain",
      label: "Options Chain",
      icon: <BarChart3 size={20} />,
      active: pathname === "/options-chain"
    },
    {
      path: "/tools",
      label: "Tools",
      icon: <Calculator size={20} />,
      active: pathname === "/tools"
    },
    {
      path: "/education",
      label: "Education Hub",
      icon: <BookOpen size={20} />,
      active: pathname === "/education"
    },
    {
      path: "/community",
      label: "Community",
      icon: <Users size={20} />,
      active: pathname === "/community"
    },
    {
      path: "/challenges",
      label: "Challenges",
      icon: <Trophy size={20} />,
      active: pathname === "/challenges"
    }
  ];

  const secondarySidebarItems: SidebarItem[] = [
    {
      path: "/alerts",
      label: "Alerts",
      icon: <Bell size={20} />,
      active: pathname === "/alerts"
    },
    {
      path: "/tools?tab=journal",
      label: "Trade Journal",
      icon: <BookMarked size={20} />,
      active: pathname === "/tools" && search.includes("tab=journal")
    },
    {
      path: "/settings",
      label: "Settings",
      icon: <Settings size={20} />,
      active: pathname === "/settings"
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
