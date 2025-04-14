
import React from "react";
import { Badge } from "@/components/ui/badge";

const mockOptionsData = {
  symbol: "AAPL",
  strike: 150,
  type: "call",
  bid: 10,
  ask: 11,
  expiry: "2025-06-20",
};

const OptionsChainWidget = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg border border-optionpulse-blue/30 bg-optionpulse-blue/10">
        <div className="flex justify-between mb-2">
          <span className="font-medium text-white">
            {mockOptionsData.symbol} ${mockOptionsData.strike} {mockOptionsData.type}
          </span>
          <span className="text-xs text-muted-foreground">Exp: {mockOptionsData.expiry}</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Bid</div>
            <div className="text-lg font-medium text-optionpulse-blue">${mockOptionsData.bid.toFixed(2)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground">Ask</div>
            <div className="text-lg font-medium text-optionpulse-blue">${mockOptionsData.ask.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Badge variant="outline" className="border-optionpulse-green text-optionpulse-green">
          High Volume
        </Badge>
        <span className="text-xs text-muted-foreground">Updated 2m ago</span>
      </div>
    </div>
  );
};

export default OptionsChainWidget;
