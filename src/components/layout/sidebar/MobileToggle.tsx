
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToggleProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

export const MobileToggle = ({ 
  isMobileOpen, 
  toggleMobileSidebar 
}: MobileToggleProps) => {
  if (isMobileOpen) {
    return null; // Remove the toggle when sidebar is open
  }

  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleMobileSidebar}
        className="text-foreground"
      >
        <Menu size={20} />
      </Button>
    </div>
  );
};
