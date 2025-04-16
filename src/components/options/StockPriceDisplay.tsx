
import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

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
  const isPositive = stockChange >= 0;
  
  return (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="text-lg font-bold">${stockPrice.toFixed(2)}</h3>
        <div className={`flex items-center text-sm ${isPositive ? 'text-optionpulse-green' : 'text-optionpulse-red'}`}>
          {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
          <span className="ml-1">
            {isPositive ? '+' : ''}{stockChange.toFixed(2)} ({isPositive ? '+' : ''}{stockChangePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockPriceDisplay;
