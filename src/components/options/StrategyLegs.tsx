
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { OptionContract } from "@/types/options";

interface StrategyLegsProps {
  legs: OptionContract[];
}

const StrategyLegs: React.FC<StrategyLegsProps> = ({ legs }) => {
  return (
    <div className="space-y-1">
      {legs.map((leg, index) => (
        <div key={index} className="flex items-center gap-1">
          <Badge variant={leg.type === "CALL" ? "default" : "outline"} className={cn(
            "text-xs",
            leg.type === "CALL" ? "bg-optionpulse-blue text-white" : "border-optionpulse-red text-optionpulse-red"
          )}>
            {leg.type}
          </Badge>
          <span className={cn(
            "text-xs",
            leg.opportunity === "buy" ? "text-optionpulse-green" : "text-optionpulse-red"
          )}>
            {leg.opportunity === "buy" ? "BUY" : "SELL"} ${leg.strike}
          </span>
        </div>
      ))}
    </div>
  );
};

export default StrategyLegs;
