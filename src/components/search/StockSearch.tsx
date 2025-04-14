
import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Stock {
  name: string;
  ticker: string;
  price: number;
  change: number;
}

// Mock data for stock suggestions
const mockStocks: Stock[] = [
  { name: "Apple", ticker: "AAPL", price: 174.23, change: 0.9 },
  { name: "S&P 500 ETF", ticker: "SPY", price: 452.87, change: 0.32 },
  { name: "Tesla", ticker: "TSLA", price: 181.06, change: -1.25 },
  { name: "Microsoft", ticker: "MSFT", price: 321.88, change: 0.65 },
  { name: "Applied Materials", ticker: "AMAT", price: 145.32, change: 2.1 },
  { name: "Spotify", ticker: "SPOT", price: 241.99, change: 1.77 },
  { name: "Qualcomm", ticker: "QCOM", price: 171.75, change: -0.42 },
];

const StockSearch = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredStocks = mockStocks.filter((stock) => {
    const searchLower = search.toLowerCase();
    return (
      stock.name.toLowerCase().includes(searchLower) ||
      stock.ticker.toLowerCase().includes(searchLower)
    );
  });

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (stock: Stock) => {
    setSelectedStock(stock);
    setSearch(`${stock.name} (${stock.ticker})`);
    setOpen(false);
  };

  const clearSearch = () => {
    setSearch("");
    setSelectedStock(null);
    setOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="w-full space-y-3 max-w-2xl mx-auto">
      <div className="relative group" ref={inputRef}>
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
        />
        
        <Input
          type="text"
          placeholder="Search stocks or companies..."
          className="pl-10 pr-10 py-6 bg-optionpulse-charcoal/50 border-optionpulse-darkgray focus:border-optionpulse-blue focus:ring-1 focus:ring-optionpulse-blue"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (e.target.value.length > 0) {
              setOpen(true);
            } else {
              setSelectedStock(null);
            }
          }}
          onFocus={() => {
            if (search.length > 0) {
              setOpen(true);
            }
          }}
        />
        
        {search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
            type="button"
          >
            <X size={16} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        
        {open && search.length > 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-md border border-border bg-optionpulse-charcoal shadow-lg">
            <div className="max-h-64 overflow-y-auto p-1">
              {filteredStocks.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  No matches found
                </div>
              ) : (
                <ul>
                  {filteredStocks.map((stock) => (
                    <li key={stock.ticker}>
                      <button
                        className="w-full px-3 py-2 text-left rounded-md hover:bg-optionpulse-blue/10 focus:bg-optionpulse-blue/20 focus:outline-none transition-colors"
                        onClick={() => handleSelect(stock)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium">{stock.name}</span>
                            <span className="text-sm text-muted-foreground ml-1">
                              ({stock.ticker})
                            </span>
                          </div>
                          <div className="text-sm">
                            ${stock.price.toFixed(2)}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
      
      {selectedStock && (
        <div className="bg-optionpulse-charcoal/50 rounded-md p-3 border border-optionpulse-darkgray flex justify-between items-center animate-fade-in">
          <div className="flex items-center">
            <span className="font-semibold text-lg">{selectedStock.ticker}:</span>
            <span className="ml-2 text-lg">${selectedStock.price.toFixed(2)}</span>
          </div>
          <div className={cn(
            "text-sm font-medium",
            selectedStock.change >= 0 
              ? "text-optionpulse-green text-glow-green" 
              : "text-optionpulse-red text-glow-red"
          )}>
            {selectedStock.change >= 0 ? "+" : ""}{selectedStock.change.toFixed(2)}%
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
