
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
  Calculator,
  CreditCard,
  Sparkles
} from "lucide-react";
import { useAuth } from "@/utils/auth";

export type SidebarItem = {
  path: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  badge?: {
    text: string;
    variant: "green" | "blue" | "yellow";
  };
};

export const useSidebarItems = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const search = location.search;
  const { user } = useAuth();
  
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
      active: pathname === "/tools" && !search.includes("tab=journal")
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
      path: "/pricing",
      label: "Pricing",
      icon: <CreditCard size={20} />,
      active: pathname === "/pricing",
      badge: user && user.tier !== 'Free' ? {
        text: user.tier,
        variant: user.tier === 'Pro' ? 'yellow' : 'blue'
      } : undefined
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
        <div className="ml-3 flex items-center justify-between w-full">
          <span className="truncate">{item.label}</span>
          {item.badge && (
            <span className={cn(
              "text-xs px-1.5 py-0.5 rounded-full ml-2",
              item.badge.variant === 'green' && "bg-optionpulse-green/20 text-optionpulse-green",
              item.badge.variant === 'blue' && "bg-optionpulse-blue/20 text-optionpulse-blue",
              item.badge.variant === 'yellow' && "bg-yellow-400/20 text-yellow-400 flex items-center"
            )}>
              {item.badge.variant === 'yellow' && <Sparkles size={10} className="mr-1" />}
              {item.badge.text}
            </span>
          )}
        </div>
      )}
      {isCollapsed && item.badge && (
        <span className={cn(
          "absolute top-0 right-0 h-2 w-2 rounded-full",
          item.badge.variant === 'green' && "bg-optionpulse-green",
          item.badge.variant === 'blue' && "bg-optionpulse-blue",
          item.badge.variant === 'yellow' && "bg-yellow-400"
        )} />
      )}
    </Link>
  );
};
