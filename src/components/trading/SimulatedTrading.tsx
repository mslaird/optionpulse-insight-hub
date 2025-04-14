import { useState } from "react";
import { DollarSign, Wallet, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockStocks } from "@/data/mockStockData";
import { cn } from "@/lib/utils";
import ExplanationTooltip from "@/components/tooltips/ExplanationTooltip";

// Mock options data
const mockOptionsData = {
  AAPL: { bid: 10, ask: 11, strike: 150 },
  SPY: { bid: 8.5, ask: 9.2, strike: 450 },
  TSLA: { bid: 15.2, ask: 16.0, strike: 240 },
  MSFT: { bid: 12.5, ask: 13.1, strike: 325 },
};

// Option types
const optionTypes = [
  { value: "call", label: "Call" },
  { value: "put", label: "Put" },
];

// Strategy explanations
const strategyExplanations = {
  nakedCall: {
    title: "Naked Call",
    content: "A naked call is selling a call option without owning the underlying stock, risking unlimited loss if the stock price rises significantly. Example: Sell AAPL $150 call for $5 premium; if AAPL rises to $200, you must buy at $200 to sell at $150, losing $45/share."
  },
  nakedPut: {
    title: "Naked Put",
    content: "A naked put is selling a put option without holding cash to buy the stock, risking loss if the stock price falls. Example: Sell AAPL $150 put for $5 premium; if AAPL drops to $100, you must buy at $150, losing $45/share."
  },
  cashSecuredPut: {
    title: "Cash-Secured Put",
    content: "A cash-secured put is selling a put option while holding enough cash to buy the stock if assigned. Example: Sell AAPL $150 put for $5 premium, hold $15,000 cash; if AAPL drops to $100, you buy at $150, but your cost basis is $145 after the premium."
  },
  coveredCall: {
    title: "Covered Call",
    content: "A covered call is selling a call option while owning the underlying stock, earning a premium but capping upside potential. Example: Own 100 AAPL shares at $150, sell $160 call for $5 premium; if AAPL rises to $170, you sell at $160, missing $10/share but keeping the $5 premium."
  }
};

const SimulatedTrading = () => {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTradeSummary, setShowTradeSummary] = useState(false);
  
  // Form state
  const [selectedTicker, setSelectedTicker] = useState("AAPL");
  const [optionType, setOptionType] = useState("call");
  const [strikePrice, setStrikePrice] = useState("150");
  const [quantity, setQuantity] = useState("1");
  
  // Filtered stock list (only stocks, not strategies)
  const stockOptions = mockStocks.filter(stock => stock.type === 'stock' || stock.type === 'etf');

  const handleSimulateTrade = () => {
    setIsSimulating(true);
    setShowTradeSummary(false);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsSimulating(false);
      setShowTradeSummary(true);
      
      // Show toast notification for trade confirmation
      toast({
        title: "Trade Simulated",
        description: `Simulated trade: ${quantity} ${selectedTicker} $${strikePrice} ${optionType}, $${mockOptionsData[selectedTicker]?.bid || 0} premium`,
        variant: "default",
        className: "bg-black/80 border-[#00B7EB]/30 text-white",
      });
    }, 1000);
  };

  // Calculate total cost
  const calculateTotalCost = () => {
    const bid = mockOptionsData[selectedTicker]?.bid || 0;
    const qty = parseInt(quantity) || 0;
    return (bid * 100 * qty).toLocaleString('en-US');
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <DollarSign size={18} className="text-optionpulse-blue" />
          Simulated Trading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticker" className="text-sm text-muted-foreground">
                Select Ticker
              </Label>
              <Select 
                value={selectedTicker} 
                onValueChange={setSelectedTicker}
              >
                <SelectTrigger id="ticker" className="w-full bg-background/50">
                  <SelectValue placeholder="Select Ticker" />
                </SelectTrigger>
                <SelectContent>
                  {stockOptions.map((stock) => (
                    <SelectItem key={stock.id} value={stock.ticker}>
                      {stock.ticker} - {stock.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="optionType" className="text-sm text-muted-foreground">
                Option Type
              </Label>
              <Select 
                value={optionType} 
                onValueChange={setOptionType}
              >
                <SelectTrigger id="optionType" className="w-full bg-background/50">
                  <SelectValue placeholder="Select Option Type" />
                </SelectTrigger>
                <SelectContent>
                  {optionTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="strike" className="text-sm text-muted-foreground">
                Strike Price ($)
              </Label>
              <Input
                id="strike"
                type="number"
                value={strikePrice}
                onChange={(e) => setStrikePrice(e.target.value)}
                className="bg-background/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="quantity" className="text-sm text-muted-foreground">
                Quantity (Contracts)
              </Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-background/50"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleSimulateTrade} 
              disabled={isSimulating}
              className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue/80 text-white transition-colors"
            >
              <Wallet size={18} className="mr-2" />
              {isSimulating ? "Processing..." : "Simulate Trade"}
            </Button>
          </div>
          
          {showTradeSummary && (
            <div className={cn(
              "mt-4 p-4 rounded-lg border bg-black/30 transition-all duration-300 animate-in fade-in",
              "border-optionpulse-blue/30"
            )}>
              <h3 className="text-sm font-semibold text-optionpulse-blue mb-2">Trade Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Instrument:</span>
                  <span className="font-medium">{selectedTicker} ${strikePrice} {optionType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Premium:</span>
                  <span className="font-medium">${mockOptionsData[selectedTicker]?.bid || 0} per share</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contracts:</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-muted/20">
                  <span className="text-muted-foreground">Total Cost:</span>
                  <span className="font-semibold text-optionpulse-blue">${calculateTotalCost()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedTrading;
