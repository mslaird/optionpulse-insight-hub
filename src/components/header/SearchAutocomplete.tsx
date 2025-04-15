
import { useState } from "react";
import { Search, X, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { StockData, mockStocks } from "@/data/mockStockData";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import strategyDefinitions from "@/data/strategyDefinitions";

interface SearchAutocompleteProps {
  className?: string;
}

const SearchAutocomplete = ({ className }: SearchAutocompleteProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [showStrategyDialog, setShowStrategyDialog] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const filteredStocks = searchTerm.trim() === "" 
    ? [] 
    : mockStocks.filter(stock => {
        const searchLower = searchTerm.toLowerCase();
        return (
          stock.name.toLowerCase().includes(searchLower) || 
          stock.ticker.toLowerCase().includes(searchLower)
        );
      });

  const handleSelect = (stock: StockData) => {
    setSelectedStock(stock);
    setSearchTerm(stock.name);
    setIsOpen(false);

    // If it's a strategy, show the strategy details dialog
    if (stock.type === 'strategy') {
      const strategyKey = Object.keys(strategyDefinitions).find(key => 
        strategyDefinitions[key].name.toLowerCase() === stock.name.toLowerCase()
      );
      
      if (strategyKey) {
        setSelectedStrategy(strategyKey);
        setShowStrategyDialog(true);
      }
    }
  };

  const handleClear = () => {
    setSelectedStock(null);
    setSearchTerm("");
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : "";
    return `${sign}${change.toFixed(2)}%`;
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  // Get strategy definition for the dialog
  const strategyDefinition = selectedStrategy ? strategyDefinitions[selectedStrategy] : null;

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
        />
        <Input
          type="text"
          placeholder="Search tickers, strategies..."
          className="pl-10 pr-8 bg-muted/30 border-muted/30 focus:border-optionpulse-blue"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => {
            // Delay closing to allow for selection
            setTimeout(() => setIsOpen(false), 200);
          }}
        />
        {searchTerm && (
          <X
            size={16}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground cursor-pointer hover:text-foreground"
            onClick={handleClear}
          />
        )}
      </div>

      {isOpen && filteredStocks.length > 0 && (
        <div className="absolute z-50 mt-1 w-full">
          <Command className="rounded-lg border border-muted bg-popover shadow-md">
            <CommandList>
              <CommandGroup>
                {filteredStocks.map((stock) => (
                  <CommandItem
                    key={stock.id}
                    onSelect={() => handleSelect(stock)}
                    className="flex justify-between cursor-pointer hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <span>{stock.name}</span>
                      <span className="text-muted-foreground font-mono">
                        ({stock.ticker})
                      </span>
                    </div>
                    <span className={cn(
                      "text-xs font-medium",
                      stock.type === 'strategy' ? "text-optionpulse-blue" : ""
                    )}>
                      {stock.type === 'strategy' ? 'Strategy' : stock.type.toUpperCase()}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}

      {selectedStock && selectedStock.type !== 'strategy' && (
        <div className={cn(
          "mt-2 px-2 py-1.5 rounded bg-muted/20 text-sm font-medium flex items-center justify-between",
          "border-optionpulse-blue/30"
        )}>
          <span className="font-mono">{selectedStock.ticker}</span>
          <div className="flex items-center gap-2">
            <span className="font-medium">${formatPrice(selectedStock.price)}</span>
            <span className={cn(
              selectedStock.change >= 0 ? "text-green-500" : "text-red-500",
              "text-xs"
            )}>
              {formatChange(selectedStock.change)}
            </span>
          </div>
        </div>
      )}

      {/* Strategy Information Dialog */}
      <Dialog open={showStrategyDialog} onOpenChange={setShowStrategyDialog}>
        <DialogContent className="sm:max-w-md bg-sidebar-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground text-xl flex items-center gap-2">
              <TrendingUp className="text-optionpulse-blue" size={18} />
              {strategyDefinition?.name}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Strategy overview and details
            </DialogDescription>
          </DialogHeader>
          {strategyDefinition && (
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Badge variant="outline" className="bg-optionpulse-navy/30">
                  {strategyDefinition.type.toUpperCase()}
                </Badge>
                <Badge variant="outline" className={cn(
                  "bg-optionpulse-navy/30",
                  strategyDefinition.riskLevel === 'low' ? "text-green-500" :
                  strategyDefinition.riskLevel === 'medium' ? "text-yellow-500" : "text-red-500"
                )}>
                  {strategyDefinition.riskLevel.toUpperCase()} RISK
                </Badge>
                <Badge variant="outline" className="bg-optionpulse-navy/30">
                  {strategyDefinition.marketOutlook.toUpperCase()} OUTLOOK
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                <p className="text-foreground">{strategyDefinition.description}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Creator</h3>
                <p className="text-foreground">{strategyDefinition.creator}</p>
                {strategyDefinition.yearCreated && (
                  <p className="text-xs text-muted-foreground">First developed: {strategyDefinition.yearCreated}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">How It Works</h3>
                <p className="text-foreground whitespace-pre-line">{strategyDefinition.howItWorks}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchAutocomplete;
