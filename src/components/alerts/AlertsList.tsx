
import { AlertType } from "@/pages/Alerts";
import { cn } from "@/lib/utils";
import { AlertCircle, TrendingUp, Bell, Percent, ThumbsUp, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAlerts } from "@/components/alerts/AlertsContext";

interface AlertsListProps {
  filterType: AlertType;
}

const AlertsList = ({ filterType }: AlertsListProps) => {
  const { alerts } = useAlerts();
  
  const filteredAlerts = filterType === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === filterType);

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
              
              <p className="text-sm mt-1 mb-2">{alert.message}</p>
              
              {alert.type === "prediction" && (
                <div className="flex flex-wrap gap-3 mt-2 text-xs">
                  {alert.probability !== undefined && (
                    <div className="flex items-center gap-1 text-optionpulse-blue">
                      <Percent size={14} />
                      <span>{alert.probability}% ITM Probability</span>
                    </div>
                  )}
                  
                  {alert.sentiment !== undefined && (
                    <div className={cn(
                      "flex items-center gap-1",
                      alert.sentiment >= 50 ? "text-optionpulse-green" : "text-optionpulse-red"
                    )}>
                      <ThumbsUp size={14} className={alert.sentiment < 50 ? "rotate-180" : ""} />
                      <span>{alert.sentiment}% {alert.sentiment >= 50 ? "Bullish" : "Bearish"} Sentiment</span>
                    </div>
                  )}
                  
                  {alert.expiryDate && (
                    <div className="flex items-center gap-1 text-optionpulse-neutral">
                      <Calendar size={14} />
                      <span>Expires {alert.expiryDate}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <Separator className="mt-4 opacity-10" />
        </div>
      ))}
    </div>
  );
};

export default AlertsList;
