
import { Trash2, BellRing, Calendar, CheckCircle, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDateString } from "../tools/journal/utils/formatUtils";

interface CustomAlert {
  id: string;
  ticker: string;
  strategy: string;
  strikePrice: number;
  expiryDate: string;
  itmProbability: number;
  sentimentDirection: "bullish" | "bearish" | "neutral";
  sentimentScore: number;
  timestamp: string;
}

interface CustomAlertsListProps {
  alerts: CustomAlert[];
  onDeleteAlert: (id: string) => void;
}

const CustomAlertsList = ({ alerts, onDeleteAlert }: CustomAlertsListProps) => {
  // Format the strategy name for display
  const formatStrategy = (strategy: string) => {
    return strategy
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (alerts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <BellRing className="mx-auto h-8 w-8 mb-4 opacity-50" />
        <p>No custom alerts set yet. Create one using the form above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={cn(
            "p-4 rounded-lg border flex items-start transition-all hover:shadow-md",
            alert.sentimentDirection === "bullish"
              ? "bg-optionpulse-blue/10 border-optionpulse-blue/30"
              : alert.sentimentDirection === "bearish"
              ? "bg-optionpulse-red/10 border-optionpulse-red/30"
              : "bg-optionpulse-neutral/10 border-optionpulse-neutral/30"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center mr-4 flex-shrink-0",
              alert.sentimentDirection === "bullish"
                ? "bg-optionpulse-blue/20 text-optionpulse-blue"
                : alert.sentimentDirection === "bearish"
                ? "bg-optionpulse-red/20 text-optionpulse-red"
                : "bg-optionpulse-neutral/20 text-optionpulse-neutral"
            )}
          >
            {alert.strategy.includes("leaps") ? (
              <Calendar size={20} />
            ) : alert.strategy.includes("iron_condor") ? (
              <TrendingUp size={20} />
            ) : (
              <BellRing size={20} />
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <span className="font-semibold text-white">
                {alert.ticker} ${alert.strikePrice.toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">
                {alert.timestamp}
              </span>
            </div>

            <div className="mt-1 space-y-1">
              <p className="text-sm">
                <span className="font-medium">Strategy:</span>{" "}
                {formatStrategy(alert.strategy)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Expiry:</span>{" "}
                {formatDateString(alert.expiryDate)}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <div className="text-xs px-2 py-1 rounded-full bg-optionpulse-neutral/20 text-optionpulse-neutral flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  ITM &gt;{alert.itmProbability}%
                </div>
                <div
                  className={cn(
                    "text-xs px-2 py-1 rounded-full flex items-center",
                    alert.sentimentDirection === "bullish"
                      ? "bg-optionpulse-green/20 text-optionpulse-green"
                      : alert.sentimentDirection === "bearish"
                      ? "bg-optionpulse-red/20 text-optionpulse-red"
                      : "bg-optionpulse-neutral/20 text-optionpulse-neutral"
                  )}
                >
                  {alert.sentimentDirection === "bullish" ? (
                    <ArrowUp size={12} className="mr-1" />
                  ) : alert.sentimentDirection === "bearish" ? (
                    <ArrowDown size={12} className="mr-1" />
                  ) : (
                    <TrendingUp size={12} className="mr-1" />
                  )}
                  {alert.sentimentScore}% {alert.sentimentDirection}
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDeleteAlert(alert.id)}
            className="text-muted-foreground hover:text-destructive transition-colors ml-2 -mt-1"
            aria-label={`Delete alert for ${alert.ticker}`}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default CustomAlertsList;
