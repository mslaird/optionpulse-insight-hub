
import { useState } from "react";
import { PlayCircle, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const mockOptionData = {
  symbol: "AAPL",
  strike: 150,
  type: "call",
  bid: 10,
  ask: 11,
  expiry: "2025-06-20",
};

const SimulatedTrading = () => {
  const { toast } = useToast();
  const [isTrading, setIsTrading] = useState(false);
  const isMobile = useIsMobile();

  const handleTrade = () => {
    setIsTrading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsTrading(false);
      
      // Show toast notification for trade confirmation
      toast({
        title: "Trade Confirmed",
        description: `Trade placed: ${mockOptionData.symbol} $${mockOptionData.strike} ${mockOptionData.type}, $${mockOptionData.bid} premium`,
        variant: "default",
        className: "bg-black/80 border-[#00B7EB]/30 text-white",
      });
    }, 1500);
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
          <div className="p-4 rounded-lg border border-optionpulse-blue/30 bg-optionpulse-blue/10">
            <div className="flex justify-between mb-2">
              <span className="font-medium text-white">{mockOptionData.symbol} ${mockOptionData.strike} {mockOptionData.type}</span>
              <span className="text-xs text-muted-foreground">Exp: {mockOptionData.expiry}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Bid</div>
                <div className="text-lg font-medium text-optionpulse-blue">${mockOptionData.bid.toFixed(2)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Ask</div>
                <div className="text-lg font-medium text-optionpulse-blue">${mockOptionData.ask.toFixed(2)}</div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleTrade} 
            disabled={isTrading}
            className="w-full bg-optionpulse-blue hover:bg-optionpulse-blue-dark text-white transition-colors"
          >
            <PlayCircle size={isMobile ? 16 : 18} className="mr-2" />
            {isTrading ? "Processing..." : "Go Live"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SimulatedTrading;
