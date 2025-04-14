
import { TrendingUp, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock sentiment data
const sentimentData = [
  {
    symbol: "AAPL",
    bullishPercentage: 75,
    bearishPercentage: 25,
    total: 100,
    source: "X/Twitter"
  },
  {
    symbol: "TSLA",
    bullishPercentage: 65,
    bearishPercentage: 35,
    total: 120,
    source: "X/Twitter"
  },
  {
    symbol: "SPY",
    bullishPercentage: 45,
    bearishPercentage: 55,
    total: 80,
    source: "X/Twitter"
  }
];

const SentimentAnalysis = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp size={18} className="text-[#00FF7F]" />
          Sentiment Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sentimentData.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.symbol}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Twitter size={12} />
                  <span>{item.total} posts</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xs mb-1">
                <span className={item.bullishPercentage > 50 ? "text-[#00FF7F]" : "text-muted-foreground"}>
                  Bullish {item.bullishPercentage}%
                </span>
                <span className={item.bearishPercentage > 50 ? "text-optionpulse-red" : "text-muted-foreground"}>
                  Bearish {item.bearishPercentage}%
                </span>
              </div>
              
              <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                <div 
                  className="bg-[#00FF7F]" 
                  style={{ width: `${item.bullishPercentage}%` }} 
                />
                <div 
                  className="bg-optionpulse-red" 
                  style={{ width: `${item.bearishPercentage}%` }} 
                />
              </div>
              
              {item.bullishPercentage >= 70 && (
                <div className="text-xs mt-1 p-1 rounded bg-[#00FF7F]/10 text-[#00FF7F] font-medium">
                  Strong bullish sentiment detected
                </div>
              )}
              
              {item.bearishPercentage >= 70 && (
                <div className="text-xs mt-1 p-1 rounded bg-optionpulse-red/10 text-optionpulse-red font-medium">
                  Strong bearish sentiment detected
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
