
import React from "react";
import { CircleDollarSign } from "lucide-react";
import { Trade } from "./types";

interface TradeDetailsProps {
  trade: Trade;
}

const TradeDetails: React.FC<TradeDetailsProps> = ({ trade }) => {
  return (
    <div className="bg-muted/20 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Trade Details</div>
          <div className="text-sm">
            {trade.action === 'buy' ? 'Bought' : 'Sold'} {trade.quantity} x {trade.ticker} {trade.strategy} @ ${trade.premium.toFixed(2)}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Contract Value</div>
          <div className="text-sm font-medium">
            ${(trade.premium * trade.quantity * 100).toFixed(2)}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Strike & Expiry</div>
          <div className="text-sm">
            ${trade.strike} expiring {trade.expiryDate}
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="text-xs text-muted-foreground">Profit/Loss</div>
          <div className={`text-sm font-medium ${trade.profitLoss > 0 ? 'text-optionpulse-green' : trade.profitLoss < 0 ? 'text-optionpulse-red' : ''}`}>
            <CircleDollarSign size={14} className="inline mr-1" />
            {trade.profitLoss > 0 ? '+' : ''}{trade.profitLoss.toFixed(2)} 
            {trade.profitLoss !== 0 && (
              <span className="text-xs ml-1">
                ({((trade.profitLoss / (trade.premium * trade.quantity * 100)) * 100).toFixed(1)}%)
              </span>
            )}
          </div>
        </div>
      </div>
      
      {trade.notes && (
        <div className="bg-muted/30 p-3 rounded-md">
          <div className="text-xs text-muted-foreground mb-1">Notes</div>
          <div className="text-sm">{trade.notes}</div>
        </div>
      )}
    </div>
  );
};

export default TradeDetails;
