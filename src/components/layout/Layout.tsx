
import { ReactNode, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Handle sidebar state changes
  useEffect(() => {
    const handleSidebarChange = (e: Event) => {
      if (e instanceof CustomEvent) {
        setIsSidebarCollapsed(e.detail.collapsed);
      }
    };

    window.addEventListener('sidebar-toggle', handleSidebarChange as EventListener);
    
    return () => {
      window.removeEventListener('sidebar-toggle', handleSidebarChange as EventListener);
    };
  }, []);

  return (
    <div className="min-h-screen bg-optionpulse-navy text-foreground">
      <Sidebar onToggle={setIsSidebarCollapsed} />
      <Header toggleSidebar={() => {
        // This creates a custom event that both Header and Sidebar will listen to
        const event = new CustomEvent('sidebar-toggle', { 
          detail: { collapsed: !isSidebarCollapsed } 
        });
        window.dispatchEvent(event);
      }} />
      <main className={cn(
        "pt-16 min-h-screen transition-all duration-300",
        isSidebarCollapsed ? "md:pl-16" : "md:pl-64"
      )}>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
