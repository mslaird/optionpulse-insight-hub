
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
  // Remove the toggle completely as we're using the Header toggle instead
  return null;
};
