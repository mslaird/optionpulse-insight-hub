
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileToggleProps {
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
}

export const MobileToggle = ({ 
  isMobileOpen, 
  toggleMobileSidebar 
}: MobileToggleProps) => {
  return (
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
  );
};
