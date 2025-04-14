
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Mock option data
const mockOptionData = {
  symbol: "AAPL",
  strike: 150,
  bid: 10,
  ask: 11,
  type: "call",
  expiration: "2025-07-18"
};

const SimulatedTrading = () => {
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(false);
  const [hasTradePlaced, setHasTradePlaced] = useState(false);

  const handleGoLive = () => {
    setIsLive(!isLive);
    
    toast({
      title: isLive ? "Simulation Mode" : "Live Trading Mode",
      description: isLive 
        ? "Switched to simulation mode. No real trades will be executed." 
        : "Switched to live trading mode. Trades will be simulated.",
      variant: isLive ? "default" : "destructive",
    });
  };

  const handlePlaceTrade = () => {
    const { symbol, strike, ask, type, expiration } = mockOptionData;
    
    toast({
      title: "Trade Placed",
      description: `${symbol} $${strike} ${type}, $${ask} premium, exp. ${expiration}`,
      variant: "default",
    });
    
    setHasTradePlaced(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setHasTradePlaced(false);
    }, 3000);
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Zap size={18} className="text-[#00B7EB]" />
          Simulated Trading
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-3 rounded-lg border border-border bg-sidebar flex flex-col items-start">
            <div className="flex justify-between w-full items-center">
              <span className="font-semibold text-white">
                {mockOptionData.symbol} ${mockOptionData.strike} {mockOptionData.type.toUpperCase()}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#00B7EB]/20 text-[#00B7EB]">
                {mockOptionData.expiration}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-2 w-full">
              <div>
                <p className="text-xs text-muted-foreground">Bid</p>
                <p className="font-medium">${mockOptionData.bid.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ask</p>
                <p className="font-medium">${mockOptionData.ask.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleGoLive}
              variant={isLive ? "destructive" : "default"}
              className={cn(
                "relative",
                !isLive && "bg-[#00B7EB] hover:bg-[#00B7EB]/90"
              )}
            >
              {isLive ? (
                <>
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Exit Live Mode
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Go Live
                </>
              )}
            </Button>
            
            <Button
              onClick={handlePlaceTrade}
              disabled={hasTradePlaced}
              variant="outline"
              className={cn(
                "border-[#00FF7F] text-[#00FF7F] hover:bg-[#00FF7F]/10",
                hasTradePlaced && "bg-[#00FF7F]/10"
              )}
            >
              {hasTradePlaced ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Trade Placed
                </>
              ) : (
                "Place Trade"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedTrading;
