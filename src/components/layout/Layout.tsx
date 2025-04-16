
import { ReactNode, useState } from "react";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Simplify the toggle function
  const toggleSidebar = () => {
    setIsSidebarCollapsed((prevState) => {
      const newState = !prevState;
      console.log("Toggling sidebar, new state:", newState);
      return newState;
    });
  };

  return (
    <div className="min-h-screen bg-optionpulse-navy text-foreground">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
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
