
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Percent, ThumbsUp, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

const StaticAlertWidget = () => {
  // Mock data for AI prediction alert
  const mockAlert = {
    symbol: "AAPL",
    message: "$250 call, 80% ITM by 4/25/2025",
    sentiment: 75,
    probability: 80,
    expiryDate: "4/25/2025"
  };

  return (
    <Card className="bg-card/30 backdrop-blur-sm border-2 border-[#00FF7F]/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp size={18} className="text-optionpulse-blue" />
          AI Options Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-black/30 p-5 rounded-md text-white shadow-md border border-optionpulse-green/20">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">{mockAlert.symbol}</span>
              <span className="bg-optionpulse-green/20 text-optionpulse-green px-2 py-0.5 rounded-full text-xs">
                AI Prediction
              </span>
            </div>
          </div>
          
          <p className="text-lg font-medium mb-4">
            {mockAlert.message}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md">
              <div className="w-8 h-8 rounded-full bg-optionpulse-blue/20 flex items-center justify-center text-optionpulse-blue">
                <Percent size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Probability</div>
                <div className="text-sm font-medium text-optionpulse-blue">{mockAlert.probability}% ITM</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                "bg-optionpulse-green/20 text-optionpulse-green"
              )}>
                <ThumbsUp size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Sentiment</div>
                <div className="text-sm font-medium text-optionpulse-green">{mockAlert.sentiment}% Bullish</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-black/20 p-2 rounded-md">
              <div className="w-8 h-8 rounded-full bg-optionpulse-neutral/20 flex items-center justify-center text-optionpulse-neutral">
                <Calendar size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Expiry</div>
                <div className="text-sm font-medium text-optionpulse-neutral">{mockAlert.expiryDate}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaticAlertWidget;
