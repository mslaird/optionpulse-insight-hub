
import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Trade {
  id: number;
  ticker: string;
  type: string;
  strike: string;
  expiry: string;
  quantity: number;
  cost: number;
  timestamp: string;
  isLeaps: boolean;
}

interface TradeHistoryProps {
  trades: Trade[];
}

const TradeHistory = ({ trades }: TradeHistoryProps) => {
  if (trades.length === 0) return null;

  return (
    <div className="mt-2">
      <h3 className="text-sm font-medium mb-2">Recent Trades</h3>
      <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
        {trades.slice(0, 3).map(trade => (
          <div
            key={trade.id}
            className={cn(
              "p-2 rounded-lg border text-xs",
              trade.isLeaps ? "border-emerald-500/30 bg-emerald-500/5" : "border-optionpulse-blue/30 bg-optionpulse-blue/5"
            )}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="font-medium">{trade.ticker} ${trade.strike} {trade.type}</span>
                {trade.isLeaps && (
                  <Badge className="ml-2 h-4 text-[10px] bg-emerald-500/20 text-emerald-400 border-emerald-500/40">
                    LEAPS
                  </Badge>
                )}
              </div>
              <span className="text-muted-foreground">{trade.timestamp}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Qty: {trade.quantity}, Exp: {trade.expiry}</span>
              <span>${trade.cost.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TradeHistory;
