
import { useAlerts } from "@/components/alerts/AlertsContext";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ExpiryFilter = () => {
  const { filterByExpiry, currentExpiryFilter, availableExpiries } = useAlerts();

  // Only show if there are expiry dates available (applies to prediction alerts)
  if (availableExpiries.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Expiry:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={currentExpiryFilter ? "bg-optionpulse-green/20 text-optionpulse-green border-optionpulse-green/30" : ""}
          >
            <Calendar size={14} className="mr-2" />
            {currentExpiryFilter || "All Dates"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-background/90 backdrop-blur-sm border-border/50">
          <DropdownMenuLabel>Filter by Expiry Date</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={currentExpiryFilter || ""} 
            onValueChange={(value) => filterByExpiry(value || null)}
          >
            <DropdownMenuRadioItem value="">
              <Check 
                size={14} 
                className={!currentExpiryFilter ? "mr-2 opacity-100" : "mr-2 opacity-0"} 
              />
              <span>All Dates</span>
            </DropdownMenuRadioItem>
            {availableExpiries.map((expiry) => (
              <DropdownMenuRadioItem key={expiry} value={expiry}>
                <Check 
                  size={14} 
                  className={currentExpiryFilter === expiry ? "mr-2 opacity-100" : "mr-2 opacity-0"} 
                />
                <span>{expiry}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ExpiryFilter;
