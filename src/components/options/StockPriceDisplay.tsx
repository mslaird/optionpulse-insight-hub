
import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StockPriceDisplayProps {
  stockPrice: number;
  stockChange: number;
  stockChangePercent: number;
}

const StockPriceDisplay: React.FC<StockPriceDisplayProps> = ({ 
  stockPrice, 
  stockChange, 
  stockChangePercent 
}) => {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold">${stockPrice.toFixed(2)}</span>
      <span className={cn(
        "flex items-center gap-1 text-sm",
        stockChange > 0 ? "text-optionpulse-green" : "text-optionpulse-red"
      )}>
        {stockChange > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        {stockChange > 0 ? "+" : ""}{stockChange.toFixed(2)} ({stockChangePercent.toFixed(2)}%)
      </span>
    </div>
  );
};

export default StockPriceDisplay;
