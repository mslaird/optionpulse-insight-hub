
import { ArrowDown, ArrowUp, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// Mock data
const marketData = [
  { symbol: "SPY", price: 427.86, change: 1.25, percentChange: 0.29 },
  { symbol: "QQQ", price: 368.42, change: -2.13, percentChange: -0.58 },
  { symbol: "VIX", price: 21.43, change: 0.72, percentChange: 3.48 },
  { symbol: "AAPL", price: 174.23, change: 1.56, percentChange: 0.90 }
];

const MarketOverview = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp size={18} className="text-optionpulse-blue" />
          Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {marketData.map((item) => (
            <div key={item.symbol} className="bg-card/40 p-3 rounded-lg border border-border/50">
              <div className="flex justify-between items-start">
                <span className="font-medium">{item.symbol}</span>
                {item.percentChange > 0 ? (
                  <TrendingUp size={16} className="text-optionpulse-green" />
                ) : (
                  <TrendingDown size={16} className="text-optionpulse-red" />
                )}
              </div>
              <div className="mt-2 text-lg font-semibold">${item.price.toFixed(2)}</div>
              <div className={cn(
                "flex items-center text-sm mt-1",
                item.change > 0 ? "text-optionpulse-green" : "text-optionpulse-red"
              )}>
                {item.change > 0 ? (
                  <ArrowUp size={14} className="mr-1" />
                ) : (
                  <ArrowDown size={14} className="mr-1" />
                )}
                <span>{Math.abs(item.change).toFixed(2)}</span>
                <span className="ml-1">({Math.abs(item.percentChange).toFixed(2)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
