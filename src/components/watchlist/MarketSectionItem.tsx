
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MarketItemProps {
  symbol: string;
  value: string | number;
  isPositive?: boolean;
  showPercentage?: boolean;
  prefix?: string;
}

const MarketSectionItem = ({ 
  symbol, 
  value, 
  isPositive = true, 
  showPercentage = true,
  prefix = ""
}: MarketItemProps) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-medium">{symbol}</span>
      {showPercentage ? (
        <span className={`${isPositive ? "text-accent text-glow-green" : "text-destructive text-glow-red"} flex items-center`}>
          {isPositive ? (
            <ArrowUpRight size={14} className="mr-1" />
          ) : (
            <ArrowDownRight size={14} className="mr-1" />
          )}
          {value}{showPercentage && "%"}
        </span>
      ) : (
        <span>{prefix}{value}</span>
      )}
    </div>
  );
};

export default MarketSectionItem;
