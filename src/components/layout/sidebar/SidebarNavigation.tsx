
import { cn } from "@/lib/utils";
import { SidebarLink, useSidebarItems } from "./SidebarItems";

interface SidebarNavigationProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  onMobileItemClick?: () => void;
}

export const SidebarNavigation = ({ 
  isCollapsed, 
  isMobile = false,
  onMobileItemClick
}: SidebarNavigationProps) => {
  const { sidebarItems, secondarySidebarItems } = useSidebarItems();

  return (
    <div className="flex flex-col flex-1 py-4 overflow-y-auto">
      <nav className="flex-1 px-2 space-y-1">
        {sidebarItems.map((item) => (
          <div key={item.path} onClick={isMobile ? onMobileItemClick : undefined}>
            <SidebarLink item={item} isCollapsed={isCollapsed} />
          </div>
        ))}
      </nav>
      
      <div className="px-2 mt-8">
        <div className="mb-2 px-3">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">UTILITIES</p>
          )}
        </div>
        {secondarySidebarItems.map((item) => (
          <div key={item.path} onClick={isMobile ? onMobileItemClick : undefined}>
            <SidebarLink item={item} isCollapsed={isCollapsed} />
          </div>
        ))}
      </div>
    </div>
  );
};
