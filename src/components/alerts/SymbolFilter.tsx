
import { useAlerts } from "@/components/alerts/AlertsContext";
import { Button } from "@/components/ui/button";
import { Check, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const SymbolFilter = () => {
  const { filterBySymbol, currentSymbolFilter, availableSymbols } = useAlerts();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Symbol:</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={currentSymbolFilter ? "bg-optionpulse-blue/20 text-optionpulse-blue border-optionpulse-blue/30" : ""}
          >
            <Filter size={14} className="mr-2" />
            {currentSymbolFilter || "All Symbols"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-background/90 backdrop-blur-sm border-border/50">
          <DropdownMenuLabel>Filter by Symbol</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup 
            value={currentSymbolFilter || ""} 
            onValueChange={(value) => filterBySymbol(value || null)}
          >
            <DropdownMenuRadioItem value="">
              <Check 
                size={14} 
                className={!currentSymbolFilter ? "mr-2 opacity-100" : "mr-2 opacity-0"} 
              />
              <span>All Symbols</span>
            </DropdownMenuRadioItem>
            {availableSymbols.map((symbol) => (
              <DropdownMenuRadioItem key={symbol} value={symbol}>
                <Check 
                  size={14} 
                  className={currentSymbolFilter === symbol ? "mr-2 opacity-100" : "mr-2 opacity-0"} 
                />
                <span>{symbol}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SymbolFilter;
