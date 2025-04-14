
import { AlertType } from "@/pages/Alerts";
import { cn } from "@/lib/utils";
import { AlertCircle, TrendingUp, Bell } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Mock data for alerts
const alertsData = [
  {
    id: 1,
    symbol: "SPY",
    message: "IV spiked 5% - currently at 20%",
    timestamp: "Just now",
    type: "volatility" as const,
    priority: "high" as const
  },
  {
    id: 2,
    symbol: "AAPL",
    message: "IV spiked 10% - good time to sell a put?",
    timestamp: "2h ago",
    type: "volatility" as const,
    priority: "high" as const
  },
  {
    id: 3,
    symbol: "TSLA", 
    message: "Unusual options activity detected",
    timestamp: "4h ago",
    type: "volatility" as const,
    priority: "medium" as const
  },
  {
    id: 4,
    symbol: "MSFT",
    message: "IV crushed 15% after earnings",
    timestamp: "8h ago",
    type: "volatility" as const,
    priority: "low" as const
  },
  {
    id: 5,
    symbol: "AAPL",
    message: "Expected to rise 5% in 24 hours, 80% bullish sentiment",
    timestamp: "1h ago",
    type: "prediction" as const,
    priority: "high" as const
  },
  {
    id: 6,
    symbol: "AMZN",
    message: "Potential bearish trend forming, 60% probability",
    timestamp: "3h ago",
    type: "prediction" as const,
    priority: "medium" as const
  },
  {
    id: 7,
    symbol: "NFLX",
    message: "Earnings volatility expected to rise 20% next week",
    timestamp: "12h ago",
    type: "prediction" as const,
    priority: "medium" as const
  },
  {
    id: 8,
    symbol: "META",
    message: "Support level likely to hold at $300, 75% probability",
    timestamp: "5h ago",
    type: "prediction" as const,
    priority: "low" as const
  },
  {
    id: 9,
    symbol: "NVDA",
    message: "IV rank at 90th percentile - high premium selling opportunity",
    timestamp: "6h ago",
    type: "volatility" as const,
    priority: "high" as const
  }
];

interface AlertsListProps {
  filterType: AlertType;
}

const AlertsList = ({ filterType }: AlertsListProps) => {
  const filteredAlerts = filterType === "all" 
    ? alertsData 
    : alertsData.filter(alert => alert.type === filterType);

  if (filteredAlerts.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No alerts found. Create alert rules to receive notifications.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredAlerts.map((alert) => (
        <div key={alert.id}>
          <div 
            className={cn(
              "p-4 rounded-lg border flex items-start gap-3",
              alert.type === "volatility" && alert.priority === "high" && "bg-optionpulse-blue/10 border-optionpulse-blue/30",
              alert.type === "volatility" && alert.priority === "medium" && "bg-optionpulse-neutral/10 border-optionpulse-neutral/30",
              alert.type === "volatility" && alert.priority === "low" && "bg-optionpulse-neutral/5 border-optionpulse-neutral/20",
              alert.type === "prediction" && alert.priority === "high" && "bg-optionpulse-green/10 border-optionpulse-green/30",
              alert.type === "prediction" && alert.priority === "medium" && "bg-optionpulse-green/5 border-optionpulse-green/20",
              alert.type === "prediction" && alert.priority === "low" && "bg-optionpulse-neutral/5 border-optionpulse-neutral/20"
            )}
          >
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                alert.type === "volatility" && alert.priority === "high" && "bg-optionpulse-blue/20 text-optionpulse-blue",
                alert.type === "volatility" && alert.priority === "medium" && "bg-optionpulse-neutral/20 text-optionpulse-neutral",
                alert.type === "volatility" && alert.priority === "low" && "bg-optionpulse-neutral/10 text-optionpulse-neutral",
                alert.type === "prediction" && alert.priority === "high" && "bg-optionpulse-green/20 text-optionpulse-green",
                alert.type === "prediction" && alert.priority === "medium" && "bg-optionpulse-green/10 text-optionpulse-green",
                alert.type === "prediction" && alert.priority === "low" && "bg-optionpulse-neutral/10 text-optionpulse-neutral"
              )}
            >
              {alert.type === "volatility" ? 
                <Bell size={20} /> : 
                <TrendingUp size={20} />
              }
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{alert.symbol}</span>
                  <span 
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full", 
                      alert.type === "volatility" ? "bg-optionpulse-blue/20 text-optionpulse-blue" : "bg-optionpulse-green/20 text-optionpulse-green"
                    )}
                  >
                    {alert.type === "volatility" ? "Volatility" : "AI Prediction"}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{alert.timestamp}</span>
              </div>
              <p className="text-sm mt-1">{alert.message}</p>
            </div>
          </div>
          <Separator className="mt-4 opacity-10" />
        </div>
      ))}
    </div>
  );
};

export default AlertsList;
