
import { AlertTriangle, Bell, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data
const volatilityAlerts = [
  {
    symbol: "AAPL",
    message: "IV spiked 10% - good time to sell a put?",
    timestamp: "2h ago",
    type: "opportunity"
  },
  {
    symbol: "TSLA", 
    message: "Unusual options activity detected",
    timestamp: "4h ago",
    type: "information"
  },
  {
    symbol: "MSFT",
    message: "IV crushed 15% after earnings",
    timestamp: "8h ago",
    type: "warning"
  }
];

const VolatilityAlerts = () => {
  return (
    <Card className="bg-card/30 backdrop-blur-sm border-border/50">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <AlertTriangle size={18} className="text-optionpulse-blue" />
          Volatility Alerts
        </CardTitle>
        <Link to="/alerts">
          <Button variant="ghost" size="sm" className="text-optionpulse-blue hover:text-optionpulse-blue-light">
            View All
            <ArrowRight size={16} className="ml-1" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {volatilityAlerts.map((alert, index) => (
            <div 
              key={index} 
              className={cn(
                "p-3 rounded-lg border flex items-start",
                alert.type === "opportunity" && "bg-optionpulse-blue/10 border-optionpulse-blue/30",
                alert.type === "information" && "bg-optionpulse-neutral/10 border-optionpulse-neutral/30",
                alert.type === "warning" && "bg-optionpulse-red/10 border-optionpulse-red/30"
              )}
            >
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                  alert.type === "opportunity" && "bg-optionpulse-blue/20 text-optionpulse-blue",
                  alert.type === "information" && "bg-optionpulse-neutral/20 text-optionpulse-neutral",
                  alert.type === "warning" && "bg-optionpulse-red/20 text-optionpulse-red"
                )}
              >
                <Bell size={16} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium text-white">{alert.symbol}</span>
                  <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
                </div>
                <p className="text-sm mt-1">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VolatilityAlerts;
