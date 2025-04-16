
import React from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TradeSummaryProps {
  show: boolean;
  expiryType: string;
  selectedTicker: string;
  strikePrice: string;
  optionType: string;
  leapsExpiry: string;
  estimatedPnL: {
    value: number;
    percent: number;
    greeks: {
      delta: number;
      theta: number;
    }
  };
  calculateTotalCost: () => number;
  selectedLeapsOption: any;
  mockOptionsData: any;
  quantity: string;
}

const TradeSummary = ({
  show,
  expiryType,
  selectedTicker,
  strikePrice,
  optionType,
  leapsExpiry,
  estimatedPnL,
  calculateTotalCost,
  selectedLeapsOption,
  mockOptionsData,
  quantity
}: TradeSummaryProps) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        "mt-4 p-4 rounded-lg border bg-black/30 transition-all duration-300 animate-in fade-in",
        expiryType === "leaps" ? "border-emerald-500/30" : "border-optionpulse-blue/30"
      )}
    >
      <h3
        className={cn(
          "text-sm font-semibold mb-2",
          expiryType === "leaps" ? "text-emerald-400" : "text-optionpulse-blue"
        )}
      >
        Trade Summary
      </h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Instrument:</span>
          <span className="font-medium">
            {selectedTicker} ${strikePrice} {optionType}
            {expiryType === "leaps" && ` (${leapsExpiry})`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Premium:</span>
          <span className="font-medium">
            $
            {expiryType === "leaps" && selectedLeapsOption
              ? selectedLeapsOption.bid
              : mockOptionsData[selectedTicker]?.standard?.bid || 0} per share
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Contracts:</span>
          <span className="font-medium">{quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Greeks:</span>
          <span className="font-medium">
            Δ: {estimatedPnL.greeks.delta.toFixed(2)}, θ: {estimatedPnL.greeks.theta.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-muted/20">
          <span className="text-muted-foreground">Total Cost:</span>
          <span
            className={cn(
              "font-semibold",
              expiryType === "leaps" ? "text-emerald-400" : "text-optionpulse-blue"
            )}
          >
            ${calculateTotalCost().toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between pt-2 border-t border-muted/20">
          <span className="text-muted-foreground">Est. P&L:</span>
          <span
            className={cn(
              "font-semibold",
              estimatedPnL.value >= 0 ? "text-green-400" : "text-red-400"
            )}
          >
            ${estimatedPnL.value.toFixed(2)} ({estimatedPnL.percent.toFixed(1)}%)
          </span>
        </div>
      </div>
      
      <div className="mt-4 pt-3 border-t border-muted/20">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Trade has been logged to your journal</span>
          <Link to="/education">
            <Button variant="link" size="sm" className="h-7 px-0 text-xs">
              Learn more about {expiryType === "leaps" ? "LEAPS strategies" : "options trading"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TradeSummary;
